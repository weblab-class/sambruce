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
const MessageList = require("./models/MessageList");

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

router.get("/randuser",(req,res) => { //returns a random user not previously matched with, and if update is true, finds a new user
  //If not logged in
  if (!req.user){
    return res.send({});
  }
  
  prior_connections = []
  cList = null
  //finds logged in user's connection list and if update is true, includes current connection
  ConnectList.findOne({userId :req.query.id}).then((user_connections) => { 
    cList = user_connections;
    if (cList) {
      if(req.query.update == "true") prior_connections = [...cList.connections,cList.current_connection];
      else prior_connections = cList.connections;

      //Adds user to the messageList if connect button was pressed
      if (req.query.connect == "true") {
        MessageList.findOne({userId:req.query.id}).then((mList) => {
          newChat = cList.current_connection
          if (newChat == "false") { () => {
            Profile.findOne({userId : {$nin : [...prior_connections,req.query.id] }}).then((profile) => {
              newChat = profile.userId;
            });
          }}
          if (!mList) {
            newMessageList = new MessageList({userId:req.query.id,chats:{},current_chat:null});
            newMessageList.chats[newChat] = [];
            newMessageList.save();
          }
          else {
            newChatList = {};
            for (var chatuser in mList.chats){
              newChatList[chatuser] = mList.chats[chatuser];
            }
            newChatList[newChat] = [];
            mList.chats = newChatList;
            mList.save();
          }
        });
      }
    }
  }).then(() => {
    //Once connection list found, adds self and queries first user not on the list
    let query = {userId : {$nin : [...prior_connections,req.query.id] }};

    Profile.findOne(query).then((profile) => {
      //If there are no new users to connect with, updates connection list (no current connection) and returns
      if (!profile) {
        if (cList && cList.current_connection != "false") {
          cList.connections = [...cList.connections,cList.current_connection];
          cList.current_connection = false;
          cList.save();
        }
        res.send({});
        return;
      }
      if (req.query.update == "true") { //If the button to find a new user was clicked, adds current connection to past connections, and updates current connection
        if (cList.current_connection != "false") cList.connections = [...cList.connections,cList.current_connection];
        cList.current_connection = profile.userId;
        cList.save(); 
      }
      else{ 
        if(!cList){ //if the page is visited for the first time (button not pressed), creates new connection list for the user
          newConnectProfile = new ConnectList({userId:req.query.id, connections:[],current_connection:profile.userId});
          newConnectProfile.save();
        }
        else { //if a new profile was added after ran out of content, resets current connection
          if (cList.current_connection == "false") {
            cList.current_connection = profile.userId;
            cList.save();
          }
        }
      }
      res.send(profile);
    });
  });
});

router.get("/messageList", (req,res) => {
  MessageList.findOne({userId:req.query.id}).then((mList) => {
    if (!mList) {
      res.send([]);
    }
    else{
      let connections = mList.chats;
      let open_chats = [];
      let counter = 0;
      for (c_Id in connections){
        MessageList.findOne({userId:c_Id}).then((c_mList) => {
          counter = counter+1;
          if(c_mList && req.query.id in c_mList.chats){
            open_chats.push(c_Id);
          }
          if (counter == Object.keys(connections).length){
            console.log(open_chats);
            res.send(open_chats);
          }
        });
      } 
    }
  });

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
