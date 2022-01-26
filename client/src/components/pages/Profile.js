import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";



const Profile = ({userId,data,myProfile}) => {
    const attributes = ["location","schedule","tod","split","favoriteWorkout","favoriteSport","other"];
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
  return (
    <div>
        {myProfile?
        (<div className="u-header">
            <div className="u-title u-textCenter"> Profile </div>
        </div>)
        :(<div></div>)}
        
        <div className="u-name">
            {userCall(data,userId)}
        </div>
            {data?
            (<div className="u-container">
                <div className="Profile-aboutBody u-textCenter">
                    {data.location?(<div className="Profile-line"> I'm living in {data.location} </div>):(<div></div>)}
                    {data.schedule?(<div className="Profile-line"> My workout schedule is {data.schedule} </div>):(<div></div>)}
                    {data.tod?(<div className="Profile-line"> I workout {data.tod} </div>):(<div></div>)}
                    {data.split?(<div className="Profile-line"> My workout routine is {data.split} </div>):(<div></div>)}
                    {data.favoriteWorkout?(<div className="Profile-line"> My favorite workout is {data.favoriteWorkout} </div>):(<div></div>)}
                    {data.favoriteSport?(<div className="Profile-line"> My favorite sport(s): {data.favoriteSport} </div>):(<div></div>)}
                    {data.other?(<div className="Profile-line"> More about me: {data.other} </div>):(<div></div>)}
                </div>
            </div>)
            :(<div></div>)
            }
        {myProfile? 
        <div>
            <button className="Profile-editButton">
                <Link to="/editProfile" className="u-link">
                    EDIT Profile
                </Link>
            </button>
        </div>
        :<div></div>}
        
    </div>


  );
};

export default Profile;
