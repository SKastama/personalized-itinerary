import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
// #comment food


//Joseph's styling imports start here:
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//Joseph's styling imports end here.


const UserList = (props) => {
    const [person, setPerson] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [topic, setTopic] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(60);
    const [scheduleFor, setScheduleFor] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [timezone, setTimezone] = useState("America/Los_Angeles");
    const [hostVideo, setHostVideo] = useState(true);
    const [participantVideo, setParticipantVideo] = useState(true);
    const [muteUponEntry, setMuteUponEntry] = useState(true);
    const [watermark, setWatermark] = useState(true);
    const [autoRecording, setAutoRecording] = useState("local");
    const [audio, setAudio] = useState("both");
    const history = useHistory();
    const [contactArray, setContactArray] = useState([]);
    const [checked, setChecked] = useState([false]);
    
    const [mailerState, setMailerState] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleStateChange(e) {
        setMailerState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    


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

    const handleClick = () => setChecked(!checked);

    const handleTest = (email) => {
        if (checked) {
            setContactArray([...contactArray, email]);
        }
        console.log(contactArray);

    }



    const zoomPost = (e) => {
        e.preventDefault();
        const newMeeting = {
            topic: topic,
            start_time: startTime,
            duration,
            schedule_for:scheduleFor,
            contact_email: contactEmail,
            timezone,
            host_video: hostVideo,
            participant_video: participantVideo,
            mute_upon_entry: muteUponEntry,
            watermark,
            auto_recording: autoRecording,
            audio
        }
        let zoomMeetinId = "";
        console.log("new Meeting:", newMeeting);
        axios
            .post("http://localhost:8000/api/zoom/new", newMeeting, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Zoom create meeting response", res.data);
                zoomMeetinId = `${res.data.join_url}`;
                console.log(zoomMeetinId);
                submitEmail(zoomMeetinId, e);
            })
            .catch((err) => {
                console.log("error with zoom API")
            });
    }

    const LogOut = () =>{
        axios
            .post("http://localhost:8000/api/logout")
            .then((res)=>{
                console.log(res);
                history.push("/Departments/admin");
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const submitEmail = async (zoomMeetinId, e) => {
        
        console.log({ mailerState });
        const response = await fetch("http://localhost:8000/send", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ mailerState }),
            })
            .then((res) => res.json())
            .then(async (res) => {
                const resData = await res;
                console.log(resData);
                if (resData.status === "success") {
                alert("Message Sent");
                } else if (resData.status === "fail") {
                alert("Message failed to send");
                }
            })
            .then(() => {
                contactArray.map((contact) => {
                    console.log(contact);
                    setMailerState({
                        email: contact,
                        name: contact,
                        message: zoomMeetinId,
                })
                    
            });
        });
    };

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:8000/api/itinerays/" + delId, {
                withCredentials: true,
            })
            .then((res) => {
                setNeedsUpdate(true);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    if (person === null) {
        return "Loading...";
    }


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {

            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {

            fontSize: 14,
        },
        }));

    return (
        <TableContainer component={Paper} id="section1">
            <h1 style={{fontFamily: "Roboto"}}>{person.uFirstName}'s Itineraries:</h1>
            <Link to="/Departments/Contacts/new">New Contact</Link>
            <br/>
            <button onClick = {LogOut}>LogOut</button>
            <form onSubmit={zoomPost}>
            <br/><br /><br/>

                <Table style={{fontWeight: "bold"}} sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <tbody style={{ border: "solid"}}>
                  <TableRow style={{ backgroundColor: "black", color: "white"}}>
                      <StyledTableCell/>
                      <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Username</StyledTableCell>
                      <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Email</StyledTableCell>
                      <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Created On</StyledTableCell>
                      <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Other Actions</StyledTableCell>
                      <StyledTableCell/>
                  </TableRow>

                        {person.itinerays.map((itineray) => (
                            <tr key={itineray._id}>
                                <input type="checkbox" style={{margin: "20px 5px 5px 5px"}} OnCLick={handleClick} onChange={(e) => { 
                                    handleTest(itineray.email);
                                }}
                                />
                                <TableCell>{itineray.firstName}</TableCell>
                                <TableCell>{itineray.email}</TableCell>
                                <TableCell>{itineray.createdAt}</TableCell>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            handleDelete(itineray._id);
                                        }}
                                        className="btn btn-sm btn-outline-danger mx-1"
                                    >
                                        Delete
                                    </button>
                                <Link style={{ marginLeft: "10px"}} to={`/Departments/Contacts/${itineray._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <br/>
                <br/>
                <label>Topic: </label>
                <input onChange={(e) => {setTopic(e.target.value)}} type="text" value={topic} />
                <br/>
                <label>Start Time: </label>
                <input onChange={(e) => {setStartTime(e.target.value)}} type="date" value={startTime} />
                <br/>
                <label>Duration: </label>
                <input onChange={(e) => { setDuration(e.target.value) }} type="number" value={duration} />
                <br/>
                <label>Schedule For: </label>
                <input onChange={(e) => {setScheduleFor(e.target.value)}} type="text" value={scheduleFor} />
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
                <br/>
                <button type="Submit">Submit</button>
            </form>
        </TableContainer>

    );
};

export default UserList;