const express = require("express");
//authmiddleware 
const { authMiddleware } = require("../middlewares/authMiddleware");
//controllers
const { sendMessage, getMessages } = require("../controllers/messageControllers");

const messageRoutes = express.Router();


//sendMessage - (post)- -> /api/message/:chatId
messageRoutes.post("/:chatId",authMiddleware,sendMessage);

//sendMessage - (get)- -> /api/message/:chatId
messageRoutes.get("/:chatId",authMiddleware,getMessages);


module.exports = {
    messageRoutes
}
