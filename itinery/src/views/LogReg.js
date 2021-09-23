import React from "react";

import Login from "../views/Login";
import SignUp from "../views/SignUp";

const LogReg = ({ setLoggedIn }) => {
    return (
        <div className="container-flex">
            <Login setLoggedIn={setLoggedIn} />
        </div>
    );
};

export default LogReg;