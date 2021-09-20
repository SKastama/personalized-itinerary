import React, { useState } from 'react';

const Welcome = (props) => {
    console.log("Welcome to Modern Software Co.")
    const [department, setDepartment] = useState("");
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
            <form>
                <label>Department: </label>
                <select onChange={(e) => {
                    setDepartment(e.target.value)
                }}
                    type="text"
                    value={department}
                >
                    <option >Development</option>
                    <option>Business Development</option>
                    <option>Sales & Marketing</option>
                    <option>Test Team</option>
                    <option>Operations</option>
                    <option>Customer Support</option>
                    <option>Architecture</option>
                </select>
                <br />
                <label> First Name: </label>
                <input onChange={(e) => {
                    setFirstName(e.target.value);
                }}
                    type="text"
                    value={firstName} />
                <br />
                <label> Last Name: </label>
                <input onChange={(e) => {
                    setLastName(e.target.value);
                }}
                    type="text"
                    value={lastName} />
                <br />
                <label> Phone: </label>
                <input onChange={(e) => {
                    setPhone(e.target.value);
                }}
                    type="number"
                    value={phone} />
                <br />
                <label> Email: </label>
                <input onChange={(e) => {
                    setEmail(e.target.value);
                }}
                    type="text"
                    value={email} />
                <br />
                <label>Password: </label>
                <input onChange={(e) => {
                    setPassword(e.target.value);
                }}
                    type="text"
                    value={password} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div >
    )
}
export default Welcome;