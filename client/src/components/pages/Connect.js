import React, { Component,useState,useEffect} from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Connect.css";



const Connect = ({userId}) => { 
    const [newUser,setNewUser] = useState({name:undefined});
    const [changeUser,setChangeUser] = useState(0);
    const [outOfUsers,setOutOfUsers] = useState(false);
    
    const getRandomUser = (update_user) => { //Returns user data for random user
        //Make API call to get random userId, not you or anyone youve messaged
        get("/api/randuser",{id:userId, update:update_user}).then((data) => {
          if (Object.keys(data).length == 0) setOutOfUsers(true);
          else setNewUser(data);
        });
        return({});
    }

    /* const updateConnections = () => {
        //API call that updates the list of matches
        console.log(newUser.name);
        console.log(newUser.userId);
        if(newUser && newUser.name) {
          post("/api/addconnection",[userId,newUser.userId]);
          console.log("adding user");
        }
    } */
    useEffect(() => {
      if(userId){
        getRandomUser(false);
      }
    },[changeUser]);

    useEffect((() => setChangeUser(changeUser+1)),[userId]);

  return (
    <div className="Connect-container">
        {
        outOfUsers?
          (<div>No More Users to See! </div>)
          :newUser.name?
            (<div> {newUser.name}
              <div>
                <button onClick={() => getRandomUser(true)} ><div>Next User</div> </button>
              </div>
            </div>)
            : (<div> Login to Access Content </div>)
        }
    </div>

  );
};

export default Connect;