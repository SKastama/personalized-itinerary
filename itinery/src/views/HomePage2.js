import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
//Joseph's Material UI additions (Pleaase see .json for which dependencies you might need to download for your system!!!):
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
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// Joseph's Material UI additions end here


const UserList2 = (props) => {
    const [person, setPerson] = useState(null);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/users/loggedin", {
            withCredentials: true,
        })
        .then((res) => {
            setPerson(res.data);
            console.log(res.data);
        })
        .catch(console.log);
    }, []);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:8000/api/itinerays/" + delId, {
                withCredentials: true,
            })
            .then((res) => {
                const filteredItinerays = person.filter((itin) => {
                    return itin._id !== delId;
                });
        
                setPerson(filteredItinerays);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {

            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {

            fontSize: 14,
        },
        }));

    if (person === null) {
        return "Loading...";
    }
    return (
        <TableContainer component={Paper}>
            <h1 style={{fontFamily: "Roboto"}}>{person.uFirstName}'s Itineraries:</h1>
            <Link to="/Departments/Contacts/new">New Contact</Link>
            <br/><br /><br/>
            
            <Table style={{fontWeight: "bold"}} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <tbody style={{ border: "solid"}}>
                <TableRow style={{ backgroundColor: "black", color: "white"}}>
                    <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Username</StyledTableCell>
                    <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Email</StyledTableCell>
                    <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Created On</StyledTableCell>
                    <StyledTableCell style={{fontSize: "large", fontFamily: "Arial" }}>Other Actions</StyledTableCell>
                    <StyledTableCell/>
                </TableRow>
                {person.itinerays.map((itineray) => (
                    <tr key={itineray._id}>
                    <TableCell>{itineray.firstName}</TableCell>
                    <TableCell>{itineray.email}</TableCell>
                    <TableCell>{itineray.createdAt}</TableCell>
                    <TableCell className="row mt-3 justify-content-center">
                        <button
                        onClick={(e) => {
                            handleDelete(itineray._id);
                        }}
                        className="btn btn-sm btn-outline-danger mx-1"
                        >
                        Delete
                        </button>
                        <button style={{marginLeft: "5px"}}>
                            Edit
                        </button>
                        <button style={{marginLeft: "5px"}}>
                            View
                        </button>
                    </TableCell>
                    </tr>
                ))}
                
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default UserList2;