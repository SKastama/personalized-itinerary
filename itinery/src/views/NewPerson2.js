import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { FormControl } from '@mui/material';




const NewPerson2 = (props) => {
    const theme = createTheme();
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

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Create New Contact:
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleNewSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid style={{paddingLeft: "130px", paddingTop: "10px"}}>
                            <select onChange={(e) => {
                                setDepartment(e.target.value)
                            }}
                                type="text"
                                style={{ textAlign: "center"}}
                                >
                                <option value="#">Select a Department:</option>
                                <option value="Development">Development</option>
                                <option value="Business Development">Business Development</option>
                                <option value="Sales & Marketing">Sales & Marketing</option>
                                <option value="Test Team">Test Team</option>
                                <option value="Operations">Operations</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Architecture">Architecture</option>
                            </select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
                                    name="firstName"
                                    required
                                    fullWidth
                                    type="text"
                                    id="firstName"
                                    label="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    id="title"
                                    label="Title"
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    type="number"
                                    label="Phone Number"
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    autoComplete="email"
                                />
                            </Grid>
                            {/* <Grid style={{paddingLeft: "130px", paddingTop: "10px"}}>
                            <select onChange={(e) => {
                                setDepartment(e.target.value)
                            }}
                                type="text"
                                style={{paddingLeft: 10, textAlign: "center"}}
                                >
                                <option value="#">Select a Department:</option>
                                <option value="Development">Development</option>
                                <option value="Business Development">Business Development</option>
                                <option value="Sales & Marketing">Sales & Marketing</option>
                                <option value="Test Team">Test Team</option>
                                <option value="Operations">Operations</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Architecture">Architecture</option>
                            </select>
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default NewPerson2;