import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import axios from "axios"

//Additional notes made by Joseph:
// Had to comment out line 42 {{ setLoggedIn() }} for now, will ask the group more about this later
// In the return function, <Container> is what Joseph replaced <Form> with


const SignIn = () => {
    const history = useHistory();
    const [uEmail, setUEmail] = useState("");
    const [uPassword, setUPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const theme = createTheme();

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/login",
                { uEmail, uPassword },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                // setLoggedIn(); []
                history.push("/Departments/Contacts");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
            });
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={login} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    name="uEmail"
                                    onChange={(e) => setUEmail(e.target.value)}
                                    value={uEmail}
                                    label="Email Address"
                                    autoComplete="uEmail"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    name="uPassword"
                                    onChange={(e) => setUPassword(e.target.value)}
                                    value={uPassword}
                                    label="Password"
                                    autoComplete="new-uPassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <p className="error-message">{errorMessage ? errorMessage : ""}</p>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;

// import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
// import axios from "axios";

// const SignIn = ({ setLoggedIn }) => {
//     const [uEmail, setUEmail] = useState("");
//     const [uPassword, setUPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const history = useHistory();

//     const login = (event) => {
//         event.preventDefault();
//         axios
//             .post(
//                 "http://localhost:8000/api/login",
//                 { uEmail, uPassword },
//                 {
//                     withCredentials: true,
//                 }
//             )
//             .then((res) => {
//                 console.log(res);
//                 setLoggedIn();
//                 history.push("/Departments/Contacts");
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setErrorMessage(err);
//             });
//     };

//     return (
//         <fieldset>
//             <legend>Sign In</legend>
//             <form onSubmit={login}>
//                 <p className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="text"
//                         name="uEmail"
//                         onChange={(e) => setUEmail(e.target.value)}
//                         value={uEmail}
//                     />
//                 </p>
//                 <p className="form-group">
//                     <label>Password:</label>
//                     <input
//                         type="uPassword"
//                         name="uPassword"
//                         onChange={(e) => setUPassword(e.target.value)}
//                         value={uPassword}
//                     />
//                 </p>
//                 <input type="submit" value="Sign In" className="btn" />
//                 <p className="error-message">{errorMessage ? errorMessage : ""}</p>
//             </form>
//         </fieldset>
//     );
// };

// export default SignIn;
