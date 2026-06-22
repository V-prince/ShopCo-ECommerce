const express = require('express');
const orderController = require('../controllers/orderController');
const { Auth } = require('../middleware/authMiddlewear');
const orderRouter = express.Router();

orderRouter.get('/razorpay/order/create', Auth, orderController.CreateOrder)

orderRouter.post('/razorpay/verify/payment', Auth, orderController.VerifyPayment)

orderRouter.post('/order/cancle/:orderId',Auth, orderController.CancleOrder)

orderRouter.get('/invoice/:orderId', orderController.generateInvoice)



exports.orderRouter = orderRouter;