import { get } from "../../utilities";
import React, { useEffect,useState } from "react";
import Profile from "../pages/Profile.js"

import "../../utilities.css";
import "./Chat.css";

const Chat = (props) => {
    const [message,setMessage] = useState("");
    const [seeProfile,setSeeProfile] = useState(false);
    const [userProfile,setUserProfile] = useState({});

    useEffect(() => {
        var myDiv = document.getElementById("Chat-messageDiv");
        if(myDiv) myDiv.scrollTop = myDiv.scrollHeight;
    },[props.currentChatUser, props.chats]);

    let hasLength = (obj) => {
        if (typeof obj == "object") return Object.keys(obj).length > 0;
        return obj.length >0;
    }
    let updateMessage = (event) => {
        setMessage(event.target.value);
    }

    let viewProfile = () => {
        setSeeProfile(true);
        get("/api/userdata",{id:props.currentChatUser.id}).then((data) => setUserProfile(data));
    }

  return (
    <div>
        {seeProfile? 
        (<div>
            <Profile userId={props.userId} data={userProfile} myProfile={false}/> 
            <div>
                <button onClick={() => setSeeProfile(false)} className="Chat-return"><div>Return to messages</div></button>
            </div>
        </div>)
        :(<div>
            <div className="Chat-header">
                {hasLength(props.currentChatUser)? 
                (<span className="u-name Chat-name" onClick={viewProfile}>{props.currentChatUser.name}</span>)
                :(<span className="u-name">Select a User to See Messages</span>)}
            </div>
            <div className="Chat-messages" id="Chat-messageDiv">
                {hasLength(props.chats)?
                props.chats.map((chat) => 
                    chat.sender == props.userId?
                    (<div className="Chat-messageUnit-me">
                        <span className="Chat-messageBody-me">{chat.content}</span>
                        <span className="Chat-messageSender-me">Me, {chat.date}</span>
                    </div>)
                :(<div className="Chat-messageUnit-other">
                    <span className="Chat-messageBody-other">{chat.content}</span>
                    <span className="Chat-messageSender-other">{props.currentChatUser.name}, {chat.date}</span>
                </div>))
                :hasLength(props.currentChatUser)? 
                    (<span className="Chat-noMessages">No Messages with {props.currentChatUser.name}</span>) 
                    :(<span></span>)
                }
            </div>
        
            {hasLength(props.currentChatUser)?
            (<div className="Chat-sendBody">
                <input className="Chat-input" type="text" onChange={updateMessage} value={message}/> 
                <button className="Chat-submit" onClick={() => {if(message != "") {props.postChat(message);setMessage("")}}}><div>Send</div></button>
            </div>)
            :(<span></span>)}
        </div>)
        }
    </div>

  );
};

export default Chat;