import React from "react";

import SignIn from "../views/SignIn";
import { Link } from "react-router-dom";

// import SignUp from "../views/SignUp";

const LogReg = ({ setLoggedIn }) => {
    return (
        <div className="container-flex">
            <SignIn setLoggedIn={setLoggedIn} />
            <p>No account yet? Please sign up.</p>
            <Link to="/Departments/admin/signup">Sign up</Link>
        </div>
    );
};

export default LogReg;