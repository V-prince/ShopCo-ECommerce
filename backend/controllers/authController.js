const User = require("../models/User");
const sendEmail = require("../utils/EmailSender");
const bcrypt = require('bcryptjs');
const resetOtpTempate = require('../utils/EmailTemplates/resetOtpVerificationTemplate')

exports.SentEmailForForgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Please Enter a Email" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "User with this email does not exist" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpire = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpire = otpExpire;
    const resetContent = resetOtpTempate(user.name,otp)
    
    await user.save();


    await sendEmail(user.email,"Reset Verification", resetContent);

    return res.status(200).json({ success: true, message: "OTP sent to email successfully" })
  }
  catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.verifyOtpForForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Please Enter OTP" })
    }

    const user = await User.findOne({ email })

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" })
    }

    user.otp = null;
    user.otpExpire = null;
    user.isOtpVerified = true;

    await user.save();
    return res.status(200).json({ success: true, message: "OTP verified successfully" })
  }
  catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.sendNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ success: false, message: "Please enter a new password" })
    }
    
    const user = await User.findOne({ email })
    
    if (!user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "OTP verification required"
      });
    }
    const encreptPassword = await bcrypt.hash(newPassword, 10)

    user.password = encreptPassword

    user.isOtpVerified = false;
    user.otp = null;
    user.otpExpire = null;

    await user.save()

    return res.status(200).json({ success: true, message: "Password updated sucessfully " })

  }
  catch (err) {
    return res.status(500).json({ message: err.message })
  }

}

