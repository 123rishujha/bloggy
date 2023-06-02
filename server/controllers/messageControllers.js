const { MessageModel } = require("../models/messageModel");



const sendMessage = async (req,res,next) =>{
    const chatId = req.params.chatId;
    const {message} = req.body;
    if(!chatId || !message){
        let error = new Error("please provide all the fields");
        return next(error);
    }
    try{
        let newMessage = new MessageModel({
            chatId,
            sender: req.user._id,
            message
        });
        let savedMessage = await newMessage.save();
        try{
            savedMessage = await savedMessage.populate("sender","-password");
            res.json({success:true,message:"message sent",result: savedMessage});
        }
        catch(err){
            console.log("error occured while populating savedMessage");
            next(err);
        }
    }
    catch(err){
        console.log("error occured while sending/saving message->messageController");
        next(err);
    }
}

const getMessages = async (req,res,next) =>{
    const { chatId } = req.params;
    try{
        let message = await MessageModel.find({chatId});
        res.json({
            success:true,
            message: "fetched all messages",
            result: message,
        })
    }
    catch(err){
        console.log("error occured while fetching message in messageController");
        next(err);
    }

}


module.exports = {
    sendMessage,
    getMessages
}
