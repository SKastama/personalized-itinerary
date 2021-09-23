// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const Persons = (props) => {

//     const [person, ] = useState([]);
//     const tableStyle = {
//         "border": "1px solid black",
//         "box-boder": "1px solid black",
//         "text-align": "center",
//         "margin-left": "auto",
//         "margin-right": "auto",
//         "width": "2000px",
//         "justify-content": "space-between",
//     };

//     useEffect(() => {
//         axios
//             .get("http://localhost:8000/api/itinerays/all")
//             .then((res) => {
//                 (res.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);

//     const handleDelete = (delId) => {
//         axios
//             .delete("http://localhost:8000/api/itinerays/" + delId)
//             .then((res) => {
//                 // It has successfully been deleted from the DATABASE
//                 // It is still IN our state, we need to remove it from state.
//                 const filteredsetPersons = person.filter((per) => {
//                     return per._id !== delId;
//                 });

//                 (filteredsetPersons);
//             })
//             .catch((err) => {
//                 console.log(err.response);
//             });
//     };


//     return (
//         <div>
//             <Link to="/Departments/Contacts/new">New Contact</Link>
//             <h2>Department Contacts</h2>
//             <div>
//                 <table style={tableStyle}>
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Department:</th>
//                             <th>Title:</th>
//                             <th>Name:</th>
//                             <th>Action:</th>
//                             <th>Schedules:</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {person.map((per) => {
//                             return (
//                                 <tr>
//                                     <td>
//                                         <input type="checkbox" onClick="" />
//                                     </td>
//                                     <td>{per.department}</td>
//                                     <td>{per.title}</td>
//                                     <td>{per.lastName}, {per.firstName}</td>
//                                     <td>
//                                         <Link to={`/Departments/Contacts/${per._id}`}>Details</ Link>
//                                         <Link to={`/Departments/Contacts/${per._id}/edit`}>
//                                             <h4>Edit</h4>
//                                         </Link>
//                                         <button onClick={(e) => {
//                                             handleDelete(per._id)
//                                         }}>Delete</button>
//                                     </td>
//                                     <td>
//                                         <button onClick="">Join Meeting</button>
//                                         <button onClick="">Meeting Reminder</button>
//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//         </div >
//     )
// }

// export default Persons;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = (props) => {
    const [person, setPerson] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(false);

    // const getLoggedInUser = () => {
    //     axios
    //     .get("http://localhost:8000/api/users/loggedin", {
    //         withCredentials: true,
    //     })
    //     .then((res) => console.log("loggin"))
    //     .catch(console.log);
    // };

    useEffect(() => {
        if (needsUpdate == true) {
            setNeedsUpdate(false);
        };
        axios
            .get("http://localhost:8000/api/users/loggedin", {
                withCredentials: true,
            })
            .then((res) => {
                setPerson(res.data);
                console.log(res.data);
            })
            .catch(console.log);
    }, [needsUpdate]);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:8000/api/itinerays/" + delId, {
                withCredentials: true,
            })
            .then((res) => {
                // const filteredItinerays = person.Itinerays.filter((itin) => {
                //     return itin._id !== delId;
                // });
                // console.log(filteredItinerays)
                // setPerson(filteredItinerays);
                setNeedsUpdate(true);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    if (person === null) {
        return "Loading...";
    }
    return (
        <div className="container">
            <h3>{person.uFirstName}'s itineraries:</h3>
            <Link to="/Departments/Contacts/new">New Contact</Link>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Created On</th>
                        <th />
                    </tr>
                    {person.itinerays.map((itineray) => (
                        <tr key={itineray._id}>
                            <td>{itineray.firstName}</td>
                            <td>{itineray.email}</td>
                            <td>{itineray.createdAt}</td>
                            <td className="row mt-3 justify-content-center">
                                <button
                                    onClick={(e) => {
                                        handleDelete(itineray._id);
                                    }}
                                    className="btn btn-sm btn-outline-danger mx-1"
                                >
                                    Delete
                                </button>
                            </td>
                            <td><Link to={`/Departments/Contacts/${itineray._id}`}>View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default UserList;