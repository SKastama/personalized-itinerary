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
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';




const SignUp = () => {
    const theme = createTheme();
    console.log("Welcome to Modern Software Co.")
    // const [department, setDepartment] = useState("");
    // const [title, setTitle] = useState("");
    const [uFirstName, setUFirstName] = useState("");
    const [uLastName, setULastName] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uPassword, setUPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const history = useHistory();


    const register = (event) => {
        event.preventDefault();

        const newUser = { uFirstName, uLastName, uPhone, uEmail, uPassword, confirmPassword };

        axios
            .post("http://localhost:8000/api/register", newUser, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);

                setUFirstName("");
                setULastName("");
                setUPhone("");
                setUEmail("");
                setUPassword("");
                setConfirmPassword("");
                alert("Signed up successfully!")
                history.push("");
            })
            .catch((err) => {
                console.log(err);

                setErrors(err.response.data.errors);
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="uFirstName"
                                    required
                                    fullWidth
                                    id="uFirstName"
                                    label="First Name"
                                    onChange={(e) => setUFirstName(e.target.value)}
                                    value={uFirstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="uLastName"
                                    label="Last Name"
                                    name="uLastName"
                                    onChange={(e) => setULastName(e.target.value)}
                                    value={uLastName}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="uPhone"
                                    label="Phone Number"
                                    name="uPhone"
                                    onChange={(e) => setUPhone(e.target.value)}
                                    value={uPhone}
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="uEmail"
                                    label="Email Address"
                                    name="uEmail"
                                    onChange={(e) => setUEmail(e.target.value)}
                                    value={uEmail}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="uPassword"
                                    onChange={(e) => setUPassword(e.target.value)}
                                    value={uPassword}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;