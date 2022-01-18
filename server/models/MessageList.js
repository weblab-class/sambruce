const mongoose = require("mongoose");

const MessageList = new mongoose.Schema({
  userId:String,
  chats : Object,
  current_chat:String,
});

// compile model from schema
module.exports = mongoose.model("MessageList", MessageList);