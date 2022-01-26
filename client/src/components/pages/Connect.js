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
                  {newUser.location?(<div className="Connect-line"> I'm living in {newUser.location} </div>):(<div></div>)}
                    {newUser.schedule?(<div className="Connect-line"> My workout schedule is {newUser.schedule} </div>):(<div></div>)}
                    {newUser.tod?(<div className="Connect-line"> I workout {newUser.tod} </div>):(<div></div>)}
                    {newUser.split?(<div className="Connect-line"> My workout routine is {newUser.split} </div>):(<div></div>)}
                    {newUser.favoriteWorkout?(<div className="Connect-line"> My favorite workout is {newUser.favoriteWorkout} </div>):(<div></div>)}
                    {newUser.favoriteSport?(<div className="Connect-line"> My favorite sport(s): {newUser.favoriteSport} </div>):(<div></div>)}
                    {newUser.other?(<div className="Connect-line"> More about me: {newUser.other} </div>):(<div></div>)}
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