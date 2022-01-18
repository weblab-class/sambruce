import React, { Component } from "react";
import { Redirect } from "@reach/router";

const HomePage = () => {
    return(
        <Redirect to="/profile" />
    )
}

export default HomePage;