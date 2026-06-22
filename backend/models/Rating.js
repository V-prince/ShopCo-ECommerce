const { default: mongoose, Schema } = require("mongoose");


const RatingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 1
  },

  comment: {
    type: String,
    required: true,
    trim: true
  },
}, { timestamps: true })

module.exports = mongoose.model("Rating", RatingSchema);