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
    <div className="Connect-container">
        {
        outOfUsers?
          (<div>No More Users to See! </div>)
          :newUser.name?
            (<div> 
              <div> 
                <div>{newUser.name} </div>
                <div>{newUser.location} </div>
                <div>{newUser.schedule} </div>
                <div>{newUser.favorite} </div>
              </div>
              <div>
                <span>
                  <button onClick={() => getRandomUser(true,false)} >
                    <div>Next User</div> 
                  </button>
                </span>
                <span>
                  <button onClick={() => getRandomUser(true,true)}>
                    <div>Connect</div>
                  </button>
                </span>
              </div>
            </div>)
            : (<div> Login to Access Content </div>)
        }
    </div>

  );
};

export default Connect;