import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

const GOOGLE_CLIENT_ID = "464613667189-a7ctghm1fc6nb7ano80pa2j4ivp7rq6h.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="Navbar-container">
        <span className="Navbar-title">WeLift</span>
        
        <span className="Navbar-linkcontainer">
            <Link to="/profile" className="Navbar-link u-link">
                Profile
            </Link>
        </span>

        <span className="Navbar-linkcontainer">
            <Link to="/connect" className="Navbar-link u-link">
                Connect
            </Link>
        </span>

        <span className="Navbar-linkcontainer">
            <Link to="/messages" className="Navbar-link u-link">
                Messages
            </Link>
        </span>

      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
          className="Navbar-login"
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          className="Navbar-login"
        />
      )}
    </nav>
  );
};

export default NavBar;
