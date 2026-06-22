const { Schema, default: mongoose } = require("mongoose")
const Product = require("../models/Product")
const Rating = require("../models/Rating")
exports.postAddRatings = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body

    const existingRating = await Rating.findOne({ userId: req.user.id, productId })

    await Rating.create({
      userId: req.user.id,
      productId,
      rating,
      comment
    })

    const avgRatings = await Rating.aggregate([

      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId)

        }
      }
      ,
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" }
        }
      }
    ])

    await Product.findByIdAndUpdate(productId,{
      avgRatings:avgRatings[0]?.avgRating || 0
    })

    res.status(200).json({ success: true, message: "Rating created sucessfully " })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getAllRatings = async (req, res) => {
  try {
    const productId = req.params.id
    const filter = req.query.filter

    let ratings;

    if (filter === "latest") {
      ratings = await Rating.find({ productId }).populate("userId", "name email imageUrl").sort({ "createdAt": -1 })
      res.status(200).json({ success: true, ratings })
      return
    }
    else if (filter === "old") {
      ratings = await Rating.find({ productId }).populate("userId", "name email imageUrl").sort({ "createdAt": 1 })
      res.status(200).json({ success: true, ratings })
      return
    }
    else {
      ratings = await Rating.find({ productId }).populate("userId", "name email imageUrl").sort({ "createdAt": 1 })
      res.status(200).json({ success: true, ratings })
      return
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}