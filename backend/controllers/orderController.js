const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Razorpay = require('razorpay')
const crypto = require('crypto');
const EmailSender = require("../utils/EmailSender");
const orderSuccessTemplate = require("../utils/EmailTemplates/orderSuccessTemplate");
const User = require("../models/User");
const hostOrderTemplate = require("../utils/EmailTemplates/hostEmailTemplate");
const InovoiceTemplate = require("../utils/InovoiceTemplete/inovoiceTemplate");
const hostOrderCancelledTemplate = require("../utils/EmailTemplates/hostOrderCancelledTemplate");
const PDFDocument = require('pdfkit')


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.CreateOrder = async (req, res) => {
  try {

    const cartproducts = await Cart.find({ userId: req.user.id }).populate('productId')

    let discountAmount = 0;
    let deleveryFee = 15;
    let subTotal = 0;

    cartproducts.forEach((item) => {
      const product = item.productId

      subTotal += item.quantity * product.price

      discountAmount += (product.discount * product.price) / 100 * item.quantity

    })


    const finalPrice = Math.round(subTotal - discountAmount + deleveryFee)

    const options = {
      amount: Math.round(finalPrice * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    }

    const order = await razorpay.orders.create(options)

    res.status(201).json({ success: true, order, finalPrice, razorpayKey: process.env.RAZORPAY_API_KEY_ID, message: "Order created successfully" });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



exports.VerifyPayment = async (req, res) => {
  try {
    const { phoneNo, address, city, postalCode, paymentMethod, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!phoneNo || !address || !city || !postalCode || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing shipping details" });
    }

    const user = await User.findById(req.user.id)

    const cartproducts = await Cart.find({ userId: req.user.id }).populate('productId')


    let discountAmount = 0;
    let deleveryFee = 15;
    let subTotal = 0;
    let orderItem = [];


    const Reducestock = async (productId, quantity, color, size) => {

      const product = await Product.findById(productId)

      const variantions = product.variations.find((v) => v.color === color && v.size === size)

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (variantions.stock < quantity) {
        throw new Error(`Product ${product.title} is out of stock`);
      }

      variantions.stock -= quantity;

      product.soldCount += quantity


      await product.save();
    }

    for (const item of cartproducts) {
      const product = item.productId

      subTotal += item.quantity * product.price

      discountAmount += (product.discount * product.price) / 100 * item.quantity

      const TotalPrice = (item.quantity * product.price) - (product.discount * product.price) / 100 * item.quantity

      orderItem.push({
        productId: product._id,
        hostId: product.hostId,
        quantity: item.quantity,
        price: product.price,
        discount: product.discount,
        title: product.title,
        image: product.image,
        size: item.size,
        color: item.color,
        totalPrice: TotalPrice
      })

    }

    const finalPrice = Math.round(subTotal - discountAmount + deleveryFee)

    // COD TYPE PAYMENT HANDLING

    if (paymentMethod === "cod") {

      for (const item of cartproducts) {

        await Reducestock(item.productId._id, item.quantity, item.color, item.size)
      }

      const order = await Order.create({
        userId: req.user.id,
        products: orderItem,
        subtotal: subTotal,

        discountAmount: discountAmount,

        deliveryFee: deleveryFee,

        finalAmount: finalPrice,

        address,

        city,

        postalCode,

        phoneNo,

        paymentMethod,

        paymentStatus: "pending",

        razorpayOrderId: razorpay_order_id,

        razorpayPaymentId: razorpay_payment_id,

        orderStatus: "pending",
      })

      await Cart.deleteMany({
        userId: req.user.id
      });

      res.status(200).json({
        success: true,
        message: "Order placed successfully"
      });

      const uniqueEmail = [...new Set(
        order.products.map(item => item.hostId.toString())
      )]

      for (const hostId of uniqueEmail) {

        const host = await User.findById(hostId);

        const sellerProducts = order.products.filter(
          item => item.hostId.toString() === hostId
        );

        const hostContent = hostOrderTemplate(
          host.name,
          order._id,
          sellerProducts
        );

        await EmailSender(
          host.email,
          "New Order Received 🎉",
          hostContent
        );
      }

      const ordercontent = orderSuccessTemplate(user.name, order._id, finalPrice)

      await EmailSender(user.email, "Order Success Email", ordercontent)

      return;
    }

    // Razorpay payment verification

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id).digest("hex")

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment Signature"
      });
    }

    for (const item of cartproducts) {
      await Reducestock(item.productId._id, item.quantity, item.color, item.size)
    }

    const order = await Order.create({
      userId: req.user.id,
      products: orderItem,
      subtotal: subTotal,

      discountAmount: discountAmount,

      deliveryFee: deleveryFee,

      finalAmount: finalPrice,

      address,

      city,

      postalCode,

      phoneNo,

      paymentMethod,

      paymentStatus: "paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      orderStatus: "pending",
    })


    await Cart.deleteMany({
      userId: req.user.id
    });

    const ordercontent = orderSuccessTemplate(user.name, order._id, finalPrice)

    res.status(200).json({
      success: true,
      message:
        "Payment Verified Successfully"
    });


    console.time("email")

    const uniqueEmail = [...new Set(
      order.products.map(item => item.hostId.toString())
    )]

    for (const hostId of uniqueEmail) {

      const host = await User.findById(hostId);

      const sellerProducts = order.products.filter(
        item => item.hostId.toString() === hostId
      );

      const hostContent = hostOrderTemplate(
        host.name,
        order._id,
        sellerProducts
      );

      await EmailSender(
        host.email,
        "New Order Received 🎉",
        hostContent
      );
      console.timeEnd("email")
    }

    await EmailSender(user.email, "Order Success Email", ordercontent)



  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}





exports.generateInvoice = async (req, res) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findById(orderId).populate("userId", "name email phoneNo")

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    const doc = new PDFDocument({ margin: 50 })

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Shopco-invoice-${order._id}.pdf`,
    })

    doc.pipe(res)


    doc.fontSize(26).font('Helvetica-Bold').text('ShopCo-INVOICE', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).font('Helvetica')
      .text(`Invoice ID: ${order._id}`, { align: 'right' })
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, { align: 'right' })

    doc.moveDown()
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
    doc.moveDown()


    doc.fontSize(14).font('Helvetica-Bold').text('Customer Details:')
    doc.fontSize(12).font('Helvetica')
      .text(`Name: ${order.userId.name}`)
      .text(`Email: ${order.userId.email}`)
      .text(`Phone: ${order.userId.phoneNo}`)

    doc.moveDown()
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
    doc.moveDown()


    doc.fontSize(14).font('Helvetica-Bold').text('Order Items:')
    doc.moveDown(0.5)

    order.products.forEach((item, index) => {
      doc.fontSize(12).font('Helvetica')
        .text(`${index + 1}. ${item.title}`)
        .text(`Quantity: ${item.quantity}   Price: ${item.price}`, { indent: 20 })
      doc.moveDown(0.3)
    })

    doc.moveDown()
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
    doc.moveDown()


    doc.fontSize(14).font('Helvetica-Bold')
      .text(`Total Amount: ${order.finalAmount}`, { align: 'right' })

    doc.moveDown()


    doc.fontSize(12).font('Helvetica')
      .text(`Payment Status: ${order.paymentStatus?.paymentStatus || 'N/A'}`, { align: 'right' })
      .text(`Order Status: ${order.orderStatus}`, { align: 'right' })

    doc.moveDown(2)
    doc.fontSize(10).font('Helvetica')
      .text('Thank you for shopping with ShopCo!', { align: 'center' })

    doc.end()

  } catch (err) {
    console.error("Invoice error:", err.message)
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.CancleOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId

    const order = await Order.findOne({ _id: orderId, userId: req.user.id })

    const user = await User.findById(req.user.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (["shipped",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ].includes(order.orderStatus)) {
      return res.status(500).json({ success: false, message: "Order can no longer be cancelled" });
    }

    for (const item of order.products) {

      const product = await Product.findById(item.productId)

      const variation = product.variations.find(
        v => v.color === item.color && v.size === item.size
      )

      variation.stock += item.quantity

      await product.save()
    }

    order.orderStatus = "cancelled";
    order.paymentStatus = "refunded"
    await order.save()

    const uniqueHost = [... new Set(order.products.map(product => product.hostId.toString()))]


    for (const hostId of uniqueHost) {

      const host = await User.findById(hostId)

      const Hostordercancell = hostOrderCancelledTemplate(host.name, user.name, orderId)

      await EmailSender(host.email, "Product Cancellation Mail", Hostordercancell)
    }
    res.status(200).json({ success: true, message: "order cancelled " });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}