const express = require('express');
const hostController = require('../controllers/hostController');
const { Auth } = require('../middleware/authMiddlewear');
const hostRouter = express.Router();

hostRouter.post('/add-product',Auth,hostController.addProduct);
hostRouter.get('/myproducts',Auth,hostController.getMyproducts);
hostRouter.put('/edit/:id',Auth,hostController.editProduct);
hostRouter.delete('/delete/:id',Auth,hostController.deleteProduct);

hostRouter.get('/orders',Auth,hostController.getHostOrders);
hostRouter.patch('/orders/:id/status',Auth,hostController.updateOrderStatus);
hostRouter.get('/analytics',Auth,hostController.getAnalytics);


exports.hostRouter = hostRouter;
