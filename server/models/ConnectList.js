const mongoose = require("mongoose");

const ConnectList = new mongoose.Schema({
  userId:String,
  connections: Array,
  current_connection:String,
});

// compile model from schema
module.exports = mongoose.model("connectList", ConnectList);