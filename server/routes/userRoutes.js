const express = require("express");
const userRouter = express.Router();
//controllers;
const { registerController, loginController } = require("../controllers/userControllers");


//register user -> /api/auth/register
userRouter.post("/register",registerController);
//login user -> /api/auth/login
userRouter.post("/login",loginController);

module.exports = {
    userRouter
}

