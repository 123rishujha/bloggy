const express = require("express");
const userRouter = express.Router();
//controllers;
const { registerController, loginController, logoutController , getAllUsers, getUser } = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");


//register user -> /api/user/register
userRouter.post("/register",registerController);
//login user -> /api/user/login
userRouter.post("/login",loginController);

//logout user -> /api/user/logout
userRouter.post("/logout",authMiddleware,logoutController);

//get users -> /api/user/
userRouter.get("/",authMiddleware,getAllUsers);
//get single user -> /api/user/profile
userRouter.get("/profile/:userId?",authMiddleware,getUser);

module.exports = {
    userRouter
}

