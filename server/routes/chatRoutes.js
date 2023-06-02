const express = require("express");
//auth middelware to authenticate user is loggedIn or not;
const { authMiddleware } = require("../middlewares/authMiddleware");

//controllers;
const { accessChat,getChats } = require("../controllers/chatControllers");


const chatRouter = express.Router();

//enterChatRoom- (post)- -> /api/chat/
chatRouter.post("/",authMiddleware,accessChat);// if chat is already present then enter to chatRoom otherwise create new chatRoom

//get all chatroom- (get)- -> /api/chat/
chatRouter.get("/",authMiddleware,getChats) // get all the available chat's


module.exports = {
    chatRouter
}
