/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Profile = require("./models/Profilemodel");
const ConnectList = require("./models/ConnectList");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.get("/userdata", (req,res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  let query = {userId:req.query.id};
  Profile.findOne(query).then((profile) => res.send(profile))
});

router.get("/randuser",(req,res) => {
  if (!req.user){
    return res.send({});
  }
  let query = {userId : {$ne : req.query.id}}
  Profile.findOne(query).then((profile) => {
    ConnectList.findOne({userId:req.query.id}).then((cList) => {
      if (req.query.update == "true") {
        if (cList && cList.userId) {
          console.log("found profile");
          console.log("connectId: ".concat(profile.userId));
          console.log(cList);
          cList.connections = [...cList.connections,profile.userId];
          console.log(cList);
          cList.save();
        } 
        else {
          console.log(cList);
          newConnectProfile = new ConnectList({userId:req.query.id, connections:[profile.userId]});
          newConnectProfile.save();
      }
    }
  });
    
    res.send(profile);
  }
);
});

/* router.post("/addconnection", (req,res) => {
  [user_id,connectId] = req.body;
  ConnectList.findOne({userId:user_id}).then((cList) => {
    
    if (cList && cList.userId) {
      console.log("found profile");
      console.log("connectId: ".concat(connectId));
      cList.connections = [...cList.connections,connectId];
    }
    else {
      console.log(cList);
      newConnectProfile = new ConnectList({userId:user_id, connections:[connectId]});
      newConnectProfile.save();
    }
  })
  res.send({});
}); */

router.post("/updateuserdata",(req,res) => {
  [username,loc,sch,fav,user_id] = req.body
  let query = {userId:user_id};
  Profile.deleteMany(query).then( () => {
  const profile = new Profile({ 
    name:username, 
    location:loc, 
    schedule:sch,
    favorite:fav,
    userId:user_id, 
  })
  profile.save();
  });
  res.send({});
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
