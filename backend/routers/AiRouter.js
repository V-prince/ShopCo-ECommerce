const express = require('express');
const AiController = require('../controllers/AiController');
const { Auth } = require('../middleware/authMiddlewear');
const AiRouter = express.Router();


AiRouter.post('/gemini/chat',Auth, AiController.chatwithAi)


module.exports = { AiRouter };