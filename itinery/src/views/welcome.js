import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = (props) => {
    console.log("Welcome to Modern Software Co.")
    // const [department, setDepartment] = useState("");
    // const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", textAlign: "left" }}>
            <form>
                <label> Email: </label>
                <input type="text" />
                <br />
                <label>Password: </label>
                <input type="text" />
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            <Link to = "/Departments/admin/signup">
                Dont have an account? Sign up here!
            </Link>
        </div >
    )
}
export default Welcome;