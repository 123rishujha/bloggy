const express = require("express");
const userRouter = express.Router();
//controllers;
const { registerController, loginController, getAllUsers, getUser } = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");


//register user -> /api/user/register
userRouter.post("/register",registerController);
//login user -> /api/user/login
userRouter.post("/login",loginController);
//get users -> /api/user/
userRouter.get("/",authMiddleware,getAllUsers);
//get single user -> /api/user/profile
userRouter.get("/profile/:userId?",authMiddleware,getUser);

module.exports = {
    userRouter
}

