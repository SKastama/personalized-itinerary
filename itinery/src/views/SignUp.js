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
import { useHistory } from 'react-router-dom';
import { useState } from 'react';



const SignUp = () => {
    const theme = createTheme ();
    console.log("Welcome to Modern Software Co.")
    // const [department, setDepartment] = useState("");
    // const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        };

// return(
//     <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", textAlign: "left" }}>
//     <form>
//     <label>Department: </label>
//     <select onChange={(e) => {
//         setDepartment(e.target.value)
//     }}
//         type="text"
//         value={department}
//     >
//         <option>Development</option>
//         <option>Business Development</option>
//         <option>Sales & Marketing</option>
//         <option>Test Team</option>
//         <option>Operations</option>
//         <option>Customer Support</option>
//         <option>Architecture</option>
//     </select>
//     <br />
//     <label> Title: </label>
//     <input onChange={(e) => {
//         setTitle(e.target.value);
//     }}
//         type="text"
//         value={title} />
//     <br />
//     <label> First Name: </label>
//     <input onChange={(e) => {
//         setFirstName(e.target.value);
//     }}
//         type="text"
//         value={firstName} />
//     <br />
//     <label> Last Name: </label>
//     <input onChange={(e) => {
//         setLastName(e.target.value);
//     }}
//         type="text"
//         value={lastName} />
//     <br />
//     <label> Phone: </label>
//     <input onChange={(e) => {
//         setPhone(e.target.value);
//     }}
//         type="number"
//         value={phone} />
//     <br />
//     <label> Email: </label>
//     <input onChange={(e) => {
//         setEmail(e.target.value);
//     }}
//         type="text"
//         value={email} />
//     <br />
//     <label>Password: </label>
//     <input onChange={(e) => {
//         setPassword(e.target.value);
//     }}
//         type="text"
//         value={password} />
//     <br />
//     <button type="submit">Register</button>
// </form>
// </div>
// )}

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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
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
                    autoComplete="lname"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
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
                    id="password"
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