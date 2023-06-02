const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    chatId: {type: mongoose.Schema.Types.ObjectId, ref: "chat"},
    sender : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    message: { type: String, required:true },
},{
    timestamp: true,
    versionKey: false
})

const MessageModel = mongoose.model("message",messageSchema);

module.exports = {MessageModel};