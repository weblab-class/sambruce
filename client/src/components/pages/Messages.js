import React, { useEffect,useState,Component } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Messages.css";

import Chat from "../modules/Chat.js"

const Messages = ({userId}) => {
  const [chatList,setChatList] = useState([]);
  const [currentChats,setCurrentChats] = useState([]);
  const [currentChatUser,setCurrentChatUser] = useState({});

  const getUserConnections = () => {
    // compiles list of userId's that have mutual connections in userId:name format
    get("/api/messageList",{id:userId}).then((cList) => {
      get("/api/namesFromIds",({ids:cList})).then((name_map) => {
        setChatList(name_map)});
      });
  }

  const updateCurrentChat = (chat_id) => {
    get("/api/currentChat", {id:userId,chatId:chat_id}).then((chat) => {
      if(Object.keys(chat).length == 0) return;
      get("/api/userdata",{id:chat.chatId}).then((profile) => setCurrentChatUser({id:profile.userId,name:profile.name}));
      setCurrentChats(chat.chats);
    });
  }

  const postChat = (chat) => {
    post("/api/singleChat",{id:userId,c_id:currentChatUser.id, message:chat}).then(
      (updated_chats) => setCurrentChats(updated_chats.chats));
  }

  useEffect(() => {
    getUserConnections();
    setCurrentChats([]);
    setCurrentChatUser({});
    updateCurrentChat(null);
  },[userId]);

  return (
    <div className="Messages-flexContainer">
      <div className="Messages-sidebar">
        <div className="Messages-header"> <div className="u-title">Messages</div></div>
        <div className="Messages-chatList">
          {Object.keys(chatList).map((chatId) => {return (<div className="Messages-selector" onClick={() => updateCurrentChat(chatId)}>{chatList[chatId]}</div>)})}
        </div>
      </div>
      <div className="Messages-chats">
        {userId?
        (<Chat userId={userId} currentChatUser={currentChatUser} chats={currentChats} postChat={postChat}/>)
        :(<div className="u-name">Login to See Messages</div>)}
      </div>
    </div>

  );
};

export default Messages;


//