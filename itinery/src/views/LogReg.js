import React from "react";

import Login from "../views/Login";
import { Link } from "react-router-dom";

// import SignUp from "../views/SignUp";

const LogReg = ({ setLoggedIn }) => {
    return (
        <div className="container-flex">
            <Login setLoggedIn={setLoggedIn} />
            <p>No account yet? Please sign up.</p>
            <Link to="/Departments/admin/signup">Sign up</Link>
        </div>
    );
};

export default LogReg;