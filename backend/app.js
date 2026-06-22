const env = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { hostRouter } = require('./routers/hostRouter');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer');
const rootDirectry = require('./utils/rootDirectry');
const { userRouter } = require('./routers/userRouter');
const { orderRouter } = require('./routers/orderRouter');
const { authRouter } = require('./routers/authRouter');
const { ratingRouter } = require('./routers/ratingController');
const { AiRouter } = require('./routers/AiRouter');
const app = express();

const storage = multer.memoryStorage()

app.use(cors());
app.use(multer({ storage: storage }).single('image'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRouter);
app.use('/api', userRouter);
app.use('/api/host', hostRouter);
app.use('/api/ai', AiRouter);
app.use('/api/products', orderRouter);
app.use('/api/rating',ratingRouter)

mongoose.connect(process.env.MONGO_URL).then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`server http://localhost:${process.env.PORT}`);
  });
})