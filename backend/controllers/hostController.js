const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const fs = require('fs')
const cloudinary = require('../config/cloudinary')
exports.addProduct = async (req, res) => {

    try {
        const { title, description, price, discount } = req.body

        if (!req.body && !req.file) {
            return res.status(400).json({ message: "Please provide all fields" })
        }
        const variations = JSON.parse(req.body.variations)

        const imageResult = await cloudinary.uploader.upload(req.file.path,{
            folder:"shopco-product-images"
        })

        const product = await Product.create({ hostId: req.user.id, title, description, price, discount, image:imageResult.secure_url, variations, soldCount: 0 });

        res.status(201).json({ message: 'Product added successfully' });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


exports.editProduct = async (req, res) => {
    try {
        const id = req.params.id

        const { title, description, price, discount } = req.body

        const variations = JSON.parse(req.body.variations)
        const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : undefined;

        if (!id) {
            return res.status(500).json({ message: "id is not comes to server" });
        }
        const product = await Product.findByIdAndUpdate(id, { hostId: req.user.id, title, description, price, discount, variations, image: imageUrl }, { new: true })

        res.status(201).json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id

        const product = await Product.findOneAndDelete({ _id: id, hostId: req.user.id })

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        fs.unlink(product.image, (err) => {
            if (err) {
                return console.log(err)
            }
        })

        res.status(201).json({ product, message: 'Product deleted successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getMyproducts = async (req, res, next) => {
    try {

        const filter = req.query.filter;
        let products;

        if (filter === "all") {
            products = await Product.find({ hostId: req.user.id })
        }
        else if (filter === "low") {
            products = await Product.find({ hostId: req.user.id }).sort({ price: 1 })
        }
        else if (filter === "high") {
            products = await Product.find({ hostId: req.user.id }).sort({ price: -1 })
        }
        else if (filter === "latest") {
            products = await Product.find({ hostId: req.user.id }).sort({ createdAt: -1 })
        }

        else if (filter === "discount") {
            products = await Product.find({ hostId: req.user.id }).sort({ discount: -1 })
        }
        else {
            products = await Product.find({ hostId: req.user.id })
        }

        if (!products) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(201).json(products)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getHostOrders = async (req, res) => {
    try {
        const hostId = req.user.id;
        const orders = await Order.find({ "products.hostId": hostId }).populate("products.productId").populate("userId", "name email");

        res.status(200).json({ success: true, orders });
    }
    catch (err) {

        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        console.log("OrderId", req.params.id, "NewStatus", req.body)

        await Order.findByIdAndUpdate(req.params.id, {
            orderStatus: req.body.newStatus
        }, { new: true })

        res.status(200).json({ success: true, message: "Order status updated successfully" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


exports.getAnalytics = async (req, res) => {
    try {
        const hostId = req.user.id;
        const products = await Product.find({ hostId })

        const orders = await Order.find({ "products.hostId": hostId });

        let totalRevenue = 0;

        orders.forEach(order => {
            order.products.forEach(product => {
                totalRevenue += product.totalPrice;
            })
        })

        const monthlySalary = await Order.aggregate([
            {
                $unwind: "$products",
            },

            {
                $match: {
                    "products.hostId": new mongoose.Types.ObjectId(hostId)
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    sales: {
                        $sum: "$products.totalPrice"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const status = await Order.aggregate([
            {
                $unwind: "$products"
            },
            {
                $match: {
                    "products.hostId": new mongoose.Types.ObjectId(hostId)
                }
            },
            {
                $group: {
                    _id: "$orderStatus",
                    Total: {
                        $sum: 1
                    }
                }
            }
        ])

        const topSelling = await Order.aggregate([
            {
                $unwind: "$products"
            }
            ,
            {
                $match: {
                    "products.hostId": new mongoose.Types.ObjectId(hostId)
                }
            },
            {
                $group: {
                    _id: "$products.title",
                    topSelling: {
                        $sum: "$products.quantity"
                    }

                }
            }
            , {
                $sort: {
                    topSelling: -1
                }
            }
        ])

        const lowStockProducts = [];

        products.map(product => {
            product.variations.map(variant => {
                if (variant.stock < 5) {
                    lowStockProducts.push({ productTitle: product.title, size: variant.size, color: variant.color, stock: variant.stock });
                }
            })
        })

        const recentOrders = await Order.find({ "products.hostId": new mongoose.Types.ObjectId(req.user.id) }).populate("userId", "name").sort({ "createdAt": -1 }).limit(10);

        res.status(200).json({ success: true, totalRevenue, monthlySalary, status, topSelling, lowStockProducts, recentOrders, productsCount: products.length, ordersCount: orders.length });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}