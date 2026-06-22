const express = require('express');
const ratingController = require('../controllers/ratingController');
const { Auth } = require('../middleware/authMiddlewear');
const ratingRouter = express.Router();

ratingRouter.post('/add/comment',Auth,ratingController.postAddRatings)
ratingRouter.get('/v1/show/:id',Auth,ratingController.getAllRatings)

exports.ratingRouter = ratingRouter;
