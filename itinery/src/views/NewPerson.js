import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

const NewPerson = (props) => {
    const [department, setDepartment] = useState("Development");
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const handleNewSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            department,
            title,
            firstName,
            lastName,
            phone,
            email
        }
        axios
            .post("http://localhost:8000/api/itinerays", 
            newPerson, 
            { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                history.push("/Departments/Contacts");
            })
            .catch((err) => {
                console.log(err.response)
            });
    }
    return (
        <div>
            <form onSubmit={(e) => {
                handleNewSubmit(e);
            }}>
                <select onChange={(e) => {
                    setDepartment(e.target.value)
                }}
                    type="text">
                    <option value="Development">Development</option>
                    <option value="Business Development">Business Development</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Test Team">Test Team</option>
                    <option value="Operations">Operations</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Architecture">Architecture</option>
                </select>
                <label>Title: </label>
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} type="text" value={title} />
                <label>First Name: </label>
                <input onChange={(e) => {
                    setFirstName(e.target.value);
                }} type="text" value={firstName} />
                <label>Last Name: </label>
                <input onChange={(e) => {
                    setLastName(e.target.value);
                }}
                    type="text" value={lastName} />
                <label>Phone: </label>
                <input onChange={(e) => {
                    setPhone(e.target.value);
                }}
                    type="number" value={phone} />
                <label>Email: </label>
                <input onChange={(e) => {
                    setEmail(e.target.value);
                }}
                    type="text" value={email} />
                <button type="Submit">Submit</button>
            </form>
        </div>
    )
};


export default NewPerson;