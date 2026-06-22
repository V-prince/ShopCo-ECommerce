const express = require('express');
const userController = require('../controllers/userControllers');
const { Auth } = require('../middleware/authMiddlewear');
const userRouter = express.Router();

userRouter.get('/products',userController.getAllProducts);

userRouter.get('/products/search',userController.SearchAllProducts);

userRouter.get('/products/carts',Auth,userController.FetchAllCartsById);


userRouter.post('/products/cart',Auth,userController.postAddCartData);

userRouter.get('/products/:id',userController.getProductsById);

userRouter.get('/user/orders/myorders',Auth,userController.getMyOrders);

userRouter.delete('/products/cart/delete/:id',Auth,userController.DeleteCartItemById);

userRouter.patch('/products/cart/quantity/:id',Auth,userController.IncrementAndDecrementCounterFromCart);

userRouter.post('/signup',userController.CreateSignupPage)

userRouter.post('/login',userController.CreateLoginPage)
userRouter.post('/verify/otp',userController.verifyOtpForLogin)


exports.userRouter = userRouter;