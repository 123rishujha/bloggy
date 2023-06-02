const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    chatName: { type: String, default:"sender"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "user" }], //ref will be the name of collection don't include (s-letter) given by mongoDb in database;
    isGroupChat : { type: Boolean, default:false },
    groupAdmin: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
    // latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: "ChatModel"}
},{
    timestamps: true,
    versionKey: false
})

const ChatModel = mongoose.model("chat",chatSchema);

module.exports = {
    ChatModel
}
