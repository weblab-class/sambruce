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
    const [tod, setTod] = useState("");
    const [split,setSplit] = useState("");
    const [favSport, setFavSport] = useState("");
    const [favWorkout, setFavWorkout] = useState("");
    const [otherInfo, setOtherInfo] = useState("");
    const submitForm = () => {
        post("/api/updateuserdata",[name,userId,loc,sch,tod,split,favSport,favWorkout,otherInfo]);
    }

    const updateLoc = (event) => {
        setLoc(event.target.value);
    }
    const updateSch = (event) => {
        setSch(event.target.value);
    }
    const updateFavSport = (event) => {
        setFavSport(event.target.value);
    }
    const updateTod = (event) => {
        setTod(event.target.value);
    }
    const updateSplit = (event) => {
        setSplit(event.target.value);
    }
    const updateFavWorkout = (event) => {
        setFavWorkout(event.target.value);
    }
    const updateOther = (event) => {
        setOtherInfo(event.target.value);
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
                        <div className="EditPage-field">Workout Schedule: <input className="EditPage-input" type="text"onChange={updateSch} value={sch}></input></div>
                        <div className="EditPage-field">Workout Time: <input className="EditPage-input" type="text"onChange={updateTod} value={tod}></input></div>
                        <div className="EditPage-field">Typical Workout Split: <input className="EditPage-input" type="text"onChange={updateSplit} value={split}></input></div>
                        <div className="EditPage-field">Favorite Workout: <input className="EditPage-input" type="text" onChange={updateFavWorkout} value={favWorkout}></input></div>
                        <div className="EditPage-field">Favorite Sports: <input className="EditPage-input" type="text"onChange={updateFavSport} value={favSport}></input></div>
                        <div className="EditPage-field">Other Info: <input className="EditPage-input" type="text"onChange={updateOther} value={otherInfo}></input></div>
                        <button type="submit" value="Update" onClick={submitForm} className="EditPage-button">
                            <div>Update</div>
                        </button>
                        <div className="EditPage-note">Fill out as many fields as you want, then press update!</div>
                    </form>
            </div>)
            
            :(<div></div>)}

    </div>


  );
};

export default EditPage;
