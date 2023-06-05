const { ChatModel } = require("../models/chatModel");

//enter to chatRoom if already present otherwise create new ChatRoom(Priveate Room only two users);
const accessChat = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    let error = new Error("Please provide user Id to who I wana talk");
    next(error);
  }
  try {
    let existingChatRoom = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } }, //userId->to who we are messaging
        { users: { $elemMatch: { $eq: req.user._id } } }, //req.user._id->logedIn user
      ],
    }).populate("users", "-password");

    if (existingChatRoom.length > 0) {
      res.json({
        success: true,
        message: "chat successfuly fetched",
        chat: existingChatRoom,
      });
    } else {
      let newChatRoom = new ChatModel({
        users: [userId, req.user._id],
        isGroupChat: false,
      });
      try {
        let savedChat = await newChatRoom.save();
        // console.log("saved Chat",savedChat);
        try {
          // savedChat = await ChatModel.findById({_id:savedChat._id}).populate("users","-password")
          savedChat = await savedChat.populate("users", "-password");
          console.log("finding after saving chat");
          res.json({
            success: true,
            message: "new chat created successfully",
            chat: savedChat,
          });
        } catch (err) {
          console.log(
            "error occured while fetching new chat with populated field ",
            err
          );
          next(err);
        }
      } catch (err) {
        console.log("error occured while saving new Chat");
        next(err);
      }
    }
  } catch (err) {
    console.log("accessChat error ");
    next(err);
  }
};

//fetch all the chat's for particular user
const getChats = async (req, res, next) => {
  try {
    let chats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .sort({ updatedAt: -1 });
    res.json({
      success: true,
      message: "successfully got the chats for logedIn user",
      result: chats,
    });
  } catch (err) {
    console.log("error occured while fetching all the chat's");
    next(err);
  }
};

module.exports = {
  accessChat,
  getChats,
};
