import React, { useEffect,useState,Component } from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Messages.css";

const Messages = ({userId}) => {
  const [chatList,setChatList] = useState([])

  const getUserConnections = () => {
    // Returns list of userId's that have mutual connections
    get("/api/messageList",{id:userId}).then((cList) => {
        console.log(cList);
        setChatList(cList);
    });
  }

  useEffect(() => {
    getUserConnections();
  },[userId]);

  return (
    <div className="Messages-test">
        {chatList.map((chatId) => (<div> {chatId}</div>))}
    </div>

  );
};

export default Messages;