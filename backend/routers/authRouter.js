const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();


authRouter.post('/forgotpassword' , authController.SentEmailForForgotPassword)
authRouter.post('/verifyotp' , authController.verifyOtpForForgotPassword)
authRouter.post('/newpassword' , authController.sendNewPassword)


module.exports = { authRouter };