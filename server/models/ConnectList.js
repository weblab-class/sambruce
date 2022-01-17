const mongoose = require("mongoose");

const ConnectList = new mongoose.Schema({
  userId:String,
  connections: Array,
});

// compile model from schema
module.exports = mongoose.model("connectList", ConnectList);