import React, { Component,useState,useEffect} from "react";
import user from "../../../../server/models/user";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Connect.css";



const Connect = ({userId}) => { 
    const [newUser,setNewUser] = useState({name:undefined});
    const getRandomUser = () => { //Returns user data for random user
        //Make API call to get random userId, not you or anyone youve messaged
        get("/api/randuser",{id:userId}).then((data) => setNewUser(data));
            
        //Make API call to get that users data
    }

    const updateConnections = (matchId) => {
        //API call that updates the list of matches
    }

    useEffect(() => getRandomUser(),[userId]);

  return (
    <div className="Connect-container">
        {newUser.name?
        (<div> {newUser.name}</div>)
        : (<div> Login to Access Content </div>)
        }
    </div>

  );
};

export default Connect;