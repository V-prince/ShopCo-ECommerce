const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  products: [

    {

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      title: {
        type: String,
        required: true
      },

      image: {
        type: String
      },

      price: {
        type: Number,
        required: true
      },

      quantity: {
        type: Number,
        required: true
      },

      size: {
        type: String,
        required: true
      },

      color: {
        type: String,
        required: true
      },

      discount: {
        type: Number,
        default: 0
      },

      totalPrice: {
        type: Number,
        required: true
      }

    }

  ],

  subtotal: {
    type: Number,
    required: true
  },

  discountAmount: {
    type: Number,
    required: true
  },

  deliveryFee: {
    type: Number,
    required: true
  },

  finalAmount: {
    type: Number,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  postalCode: {
    type: String,
    required: true
  },

  phoneNo: {
    type: String,
    required: true
  },

  paymentMethod: {

    type: String,

    enum: ["card", "cod"],

    default: "cod"

  },

  paymentStatus: {

    type: String,

    enum: ["pending", "paid", "failed","refund_pending","refunded"],

    default: "pending"

  },

  razorpayOrderId: String,

  razorpayPaymentId: String,

  orderStatus: {

    type: String,

    enum: [
      "pending",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ],

    default: "pending"

  }

},
  {
    timestamps: true
  });

module.exports = mongoose.model("Order", orderSchema);