import React, { useEffect,useState,Component } from "react";

import "../../utilities.css";
import "./Chat.css";

const Chat = (props) => {
    const [message,setMessage] = useState("");

    let hasLength = (obj) => {
        if (typeof obj == "object") return Object.keys(obj).length > 0;
        return obj.length >0;
    }
    let updateMessage = (event) => {
        setMessage(event.target.value);
    }

  return (
    <div className="Chat-container">
        <div className="">
            {hasLength(props.currentChatUser)? 
            (<span>Currently Chatting With: {props.currentChatUser.name}</span>)
            :(<span>No Chat Open, Select a User to See Messages</span>)}
        </div>
        <div>
            {hasLength(props.chats)?
            props.chats.map((chat) => (
                <div className="Chat-messageUnit">
                    <span className="Chat-messageBody">{chat.content}</span>
                    <span>Sender: {chat.sender == props.userId?
                                    (<span>Me</span>)
                                    :(<span>{props.currentChatUser.name}</span>)}
                    </span>
                </div>))
            :hasLength(props.currentChatUser)? (<span>No Messages with {props.currentChatUser.name}</span>) :(<span></span>)
            }
        </div>
        <div>
            {hasLength(props.currentChatUser)?
            (<div className="Chat-sendBody">
                <input className="Chat-input" type="text" onChange={updateMessage} value={message}/> 
                <button className="Chat-submit" onClick={() => {if(message != "") {props.postChat(message);setMessage("")}}}><div>Send</div></button>
            </div>)
            :(<span></span>)
            }
        </div>
    </div>

  );
};

export default Chat;