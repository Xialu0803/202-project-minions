import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import axios from "axios";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getEmail = (event) => {
        setEmail(event.target.value)
        //console.log({email: event.target.value});
    }
    const getPassword = (event) => {
        setPassword(event.target.value)
        //console.log({password: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post()
            .then(
                console.log("Login as ")
            )
            .catch(err => {
                console.log(err)
            })

        console.log({
            email_value: email,
            password_value: password,
        });
    };

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar/>
            <MuiDrawer/>
            <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <LockTwoToneIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Admin Login
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{mt: 3, mb: 2, width: 300}}
                                value={email}
                                onChange={getEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={{mb: 4, width: 300}}
                                value={password}
                                onChange={getPassword}
                            />
                            <Button
                                variant="contained"
                                sx={{mb: 2}}
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}