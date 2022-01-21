import React, { Component,useState,useEffect} from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Connect.css";



const Connect = ({userId}) => { 
    const [newUser,setNewUser] = useState({name:undefined});
    const [changeUser,setChangeUser] = useState(0);
    const [outOfUsers,setOutOfUsers] = useState(false);
    
    const getRandomUser = (update_user,connect_toUser) => { //Returns user data for random user
        //Make API call to get random userId, not you or anyone youve messaged
        get("/api/randuser",{id:userId, update:update_user, connect:connect_toUser}).then((data) => {
          if (Object.keys(data).length == 0) setOutOfUsers(true);
          else setNewUser(data);
        });
        return({});
    }

    useEffect(() => {
      if(userId){
        getRandomUser(false,false);
      }
    },[changeUser]);

    useEffect((() => setChangeUser(changeUser+1)),[userId]);

  return (
    <div>
      <div className="u-header"><div className="u-title u-textCenter">Connect</div></div>
      {userId?
        outOfUsers?
          (<div className="u-name">No More Users to See! </div>)
          :(<div>
            <div className="u-name">{newUser.name}</div>
            <div className="u-container"> 
                <div className="Connect-body u-textCenter">
                  <div className="Connect-line">Living in {newUser.location} </div>
                  <div className="Connect-line">Works out {newUser.schedule} </div>
                  <div className="Connect-line">Favorite workout is {newUser.favorite} </div>
                </div>
                <div className="u-flex Connect-center">
                  <span>
                    <button className="Connect-button" onClick={() => getRandomUser(true,false)}>
                      <div>Next User</div> 
                    </button>
                  </span>
                  <span>
                    <button className="Connect-button" onClick={() => getRandomUser(true,true)}>
                      <div>Connect</div>
                    </button>
                  </span>
                </div>
            </div> 
            </div>)
        :(<div className="u-name"> Login to Connect </div>)}
    </div>

  );
};

export default Connect;