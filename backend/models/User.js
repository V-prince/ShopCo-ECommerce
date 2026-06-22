
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "host"], default: "user" },
  imageUrl: { type: String, required: true },
  otp: String,
  otpExpire: Date,
  isOtpVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', CartSchema);

module.exports = User;