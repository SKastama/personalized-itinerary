import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditPerson = (props) => {
    const { id } = useParams();
    const [department, setDepartment] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");

    const [errors, setErrors] = useState(null);
    const history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/itinerays/" + id, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setDepartment(res.data.department);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [id]);

    const handleEditPersonSubmit = (e) => {
        e.preventDefault();

        const NewPerson = {
            title,
            firstName,
            lastName,
            phone,
            department,
            email
        };

        axios
            .put("http://localhost:8000/api/itinerays/" + id, NewPerson, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("updatedItineray", res.data);
                history.push("/Departments/Contacts", "section1");
            })
            .catch((err) => {
                console.log("errorupdateItineray", err.response)
                setErrors(err.response.data.errors);
            });
    };

    return (<div>
        <h2>Edit Person: {firstName} </h2>
        <form onSubmit={(e) => {
            handleEditPersonSubmit(e);
        }}
        >
            <label>Departments</label>
            <select onChange={(e) => {
                setDepartment(e.target.value)
            }}
                type="text" value={department}>
                <option>Development</option>
                <option>Business Development</option>
                <option>Sales & Marketing</option>
                <option>Test Team</option>
                <option>Operations</option>
                <option>Customer Support</option>
                <option>Architecture</option>
            </select>
            <div>
                <label>Title: </label>
                {errors?.title && (
                    <span style={{ color: "red" }}> {errors?.title?.message}</span>
                )}
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} type="text" value={title} />
            </div>

            <div>
                <label>First Name</label>
                {errors?.firstName && (
                    <span style={{ color: "red" }}> {errors?.firstName?.message}</span>
                )}
                <input onChange={(e) => {
                    setFirstName(e.target.value);
                }} type="text" value={firstName} />
            </div>
            <div>
                <label>Last Name</label>
                {errors?.lastName && (
                    <span style={{ color: "red" }}> {errors?.lastName?.message}</span>
                )}
                <input onChange={(e) => {
                    setLastName(e.target.value);
                }} type="text" value={lastName} />
            </div>
            <div>
                <label>Phone</label>
                {errors?.phone && (
                    <span style={{ color: "red" }}> {errors?.phone?.message}</span>
                )}
                <input onChange={(e) => {
                    setPhone(e.target.value);
                }} type="text" value={phone} />
            </div>
            <div>
                <label>Email</label>
                {errors?.email && (
                    <span style={{ color: "red" }}> {errors?.email?.message}</span>
                )}
                <input onChange={(e) => {
                    setEmail(e.target.value);
                }} type="text" value={email} />
            </div>
            <button>Update</button>
        </form>
    </div>
    );
};
export default EditPerson;
