const express = require('express');
const { createUser } = require('../controllers/users.controller.js');

const userRouter = express.Router();

userRouter.post('/', createUser);

module.exports = userRouter;