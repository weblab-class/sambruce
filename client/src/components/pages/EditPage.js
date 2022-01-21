import React, { useState,Component } from "react";
import { Link } from "@reach/router";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./EditPage.css";




const EditPage = ({userId,data,name}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const loggedIn = (name) => {
        if(name) {
            if(!isLoggedIn) setIsLoggedIn(true);
            return(name);
        }
        else{
            if(isLoggedIn) setIsLoggedIn(false);
            return("Please Login to Edit Profile")
        }
    }


    const [loc, setLoc] = useState("");
    const [sch, setSch] = useState("");
    const [fav, setFav] = useState("");
    const submitForm = () => {
        if(loc && sch && fav){
            post("/api/updateuserdata",[name,loc,sch,fav,userId]);
        }

    }

    const updateLoc = (event) => {
        setLoc(event.target.value);
    }
    const updateSch = (event) => {
        setSch(event.target.value);
    }
    const updateFav = (event) => {
        setFav(event.target.value);
    }
  return (
    <div >
        <div className="u-header  u-textCenter"><div className="u-title">Edit Profile</div></div>
        <div className="u-name">
        {loggedIn(name)}
        </div>
            {isLoggedIn? (
                <div className="u-container">
                    <form action="/profile">
                        <div className="EditPage-field">Location: <input className="EditPage-input" type="text" onChange={updateLoc} value={loc}></input></div>
                        <div className="EditPage-field">Schedule: <input className="EditPage-input" type="text"onChange={updateSch} value={sch}></input></div>
                        <div className="EditPage-field">Favorite Workout: <input className="EditPage-input" type="text" onChange={updateFav} value={fav}></input></div>
                        <button type="submit" value="Update" onClick={submitForm} className="EditPage-button">
                            <div>Update</div>
                        </button>
                    </form>
            </div>)
            
            :(<div></div>)}

    </div>


  );
};

export default EditPage;
