import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./pages/NavBar.js";
import HomePage from "./HomePage.js";
import Profile from "./pages/Profile.js";
import Connect from "./pages/Connect.js";
import Messages from "./pages/Messages.js";
import EditPage from "./pages/EditPage.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [user,setUser] = useState(undefined);
  const [name,setName] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setName(user.name);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    setName(res.profileObj.name);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUser(undefined);
    setName(undefined);
    post("/api/logout");
  };

  useEffect( () => {
    if (userId) {
      get("/api/userdata",{id:userId}).then((user) => {
        setUser(user);
      } 
      );
    }}
    , [userId]);
  

  return (
    <div className="u-websiteBackground">
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Router>
        <HomePage path="/" />
        <Profile path="/profile" userId={userId} data={user} myProfile={true}/>
        <Connect path="/connect" userId={userId} />
        <Messages path="/messages" userId={userId} />
        <EditPage path="/editProfile" userId = {userId} data={user} name = {name}/>
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
