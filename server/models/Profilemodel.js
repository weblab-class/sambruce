const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId:String,
  name: String,
  location: String,
  schedule:String,
  favorite:String,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);
