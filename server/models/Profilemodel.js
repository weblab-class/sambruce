const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId:String,
  name: String,
  location: String,
  schedule:String,
  tod:String,
  split:String,
  favoriteWorkout:String,
  favoriteSport:String,
  other:String,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);
