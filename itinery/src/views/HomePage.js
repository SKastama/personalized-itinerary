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
import { Link, useHistory } from "react-router-dom";
import SignOut from "./SignOut";

const UserList = (props) => {
    const [person, setPerson] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [topic, setTopic] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(60);
    // const [scheduleFor, setScheduleFor] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [timezone, setTimezone] = useState("America/Los_Angeles");
    const [hostVideo, setHostVideo] = useState(true);
    const [participantVideo, setParticipantVideo] = useState(true);
    const [muteUponEntry, setMuteUponEntry] = useState(true);
    const [watermark, setWatermark] = useState(true);
    const [autoRecording, setAutoRecording] = useState("local");
    const [audio, setAudio] = useState("both");
    const [registrantsEmailNotification, setRegistrantsEmailNotification] = useState(false);
    const [registrantsConfirmationEmail, setRegistrantsConfirmationEmail] = useState(true);
    const history = useHistory();
    

    useEffect(() => {
//         axios
//         .get("http://localhost:8000/api/zoom", {
//             withCredentials: true,
//         })
//         .then((res) => {
//             console.log(res.data);
//         })
//         .catch((err) =>{
//             console.log("error with zoom API")
//         });
        
//         if (needsUpdate == true) {
//             setNeedsUpdate(false);
//         };
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

    const zoomPost = (e) => {
        e.preventDefault();
        const newMeeting = {
            topic: topic,
            start_time: startTime,
            duration,
            // schedule_for:scheduleFor,
            contact_email: contactEmail,
            timezone,
            host_video: hostVideo,
            participant_video: participantVideo,
            mute_upon_entry: muteUponEntry,
            watermark,
            auto_recording: autoRecording,
            audio,
            registrants_email_notification: registrantsEmailNotification,
            registrants_confirmation_email: registrantsConfirmationEmail
        }
        console.log("new Meeting:", newMeeting);
        axios
            .post("http://localhost:8000/api/zoom/new", newMeeting, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Zoom create meetinf response", res.data);
            })
            .catch((err) => {
                console.log("error with zoom API")
            });
    }

    const LogOut = ({setLoggedOut}) =>{
        return (
            <div className="container-flex">
                <SignOut setLoggedOut={setLoggedOut} />
            </div>
        )
    }

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
        <div className="container" id="section1">
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
            <br/>
            <br/>
            <form onSubmit={zoomPost}>
                <label>Topic: </label>
                <input onChange={(e) => {setTopic(e.target.value)}} type="text" value={topic} />
                <br/>
                <label>Start Time: </label>
                <input onChange={(e) => {setStartTime(e.target.value)}} type="date" value={startTime} />
                <br/>
                <label>Duration: </label>
                <input onChange={(e) => { setDuration(e.target.value) }} type="number" value={duration} />
                {/* <label>Schedule For: </label>
                <input onChange={(e) => {setScheduleFor(e.target.value)}} type="text" value={scheduleFor} /> */}
                <br/>
                <label>Email contact: </label>
                <input onChange={(e) => {setContactEmail(e.target.value)}} type="text" value={contactEmail} />
                <br/>
                <label>Timezone: </label>
                <input onChange={(e) => {setTimezone(e.target.value)}} type="text" value={timezone} />
                <br/>
                <label>Host Video: </label>
                <select type="text" onChange={(e) => { setHostVideo(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <label>Participant Video: </label>
                <select type="text" onChange={(e) => { setParticipantVideo(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <label>Mute Upon Entry: </label>
                <select type="text" onChange={(e) => { setMuteUponEntry(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <label>Watermark: </label>
                <select type="" onChange={(e) => { setWatermark(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <label>Auto Recording: </label>
                <select type="text" onChange={(e) => { setAutoRecording(e.target.value) }}>
                    <option value="local">Local</option>
                    <option value="cloud">Cloud</option>
                    <option value="none">None</option>
                </select>
                <br/>
                <label>Audio: </label>
                <select type="text" onChange={(e) => { setAudio(e.target.value) }}>
                    <option value="both">Both</option>
                    <option value="telephony">Telephony</option>
                    <option value="voip">Viop</option>
                </select>
                <br/>
                <label>Registrants Email Notification: </label>
                <select type="boolean" onChange={(e) => { setRegistrantsEmailNotification(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <label>Registrants Confirmation Email: </label>
                <select type="boolean" onChange={(e) => { setRegistrantsConfirmationEmail(e.target.value) }}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                <br/>
                <button type="Submit">Submit</button>
            </form>
        </div>

    );
};

export default UserList;