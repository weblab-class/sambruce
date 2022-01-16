import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";

const userCall = (data,userId) => {
    if(data) {
        return(data.name);
    }
    else{
        if(userId){
            return("Need to edit Profile!")
        }
        else{
            return("Login to access Profile")
        }
    }
}


const Profile = ({userId,data}) => {
  return (
    <div className="Profile-container">
        <div className="Profile-header">
            <div className="Profile-title u-textCenter"> Profile </div>
        </div>
        
        <div className="Profile-name">
            {userCall(data,userId)}
        </div>
            {data?
            (<div className="Profile-aboutContainer">
                <div className="Profile-aboutBody u-textCenter">
                    <div className="Profile-line"> I'm living in {data.location} </div>
                    <div className="Profile-line"> My workout schedule is {data.schedule} </div>
                    <div className="Profile-line"> My favorite workout is {data.favorite} </div>
                </div>
            </div>)
            :(<div></div>)
            }
        <div>
            <button>
                <Link to="/editProfile" className="u-link">
                    EDIT Profile
                </Link>
            </button>
        </div>
        
    </div>


  );
};

export default Profile;