import React, { Component,useState,useEffect} from "react";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Connect.css";



const Connect = ({userId}) => { 
    const [newUser,setNewUser] = useState({name:undefined});
    const [changeUser,setChangeUser] = useState(0);
    
    const getRandomUser = (update_user) => { //Returns user data for random user
        //Make API call to get random userId, not you or anyone youve messaged
        get("/api/randuser",{id:userId, update:update_user}).then((data) => setNewUser(data));
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
        {newUser.name?
        (<div> {newUser.name}
          <button onClick={() => getRandomUser(true)} /> 
        </div>)
        : (<div> Login to Access Content </div>)
        }
    </div>

  );
};

export default Connect;