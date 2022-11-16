import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from '../axiosConfig';

export default function SignIn() {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const baseURL = api||"http://localhost:5000";

    const getUserID = (event) => {
        setUserID(event.target.value)
        //console.log({useID: event.target.value});
    }
    const getPassword = (event) => {
        setPassword(event.target.value)
        //console.log({password: event.target.value});
    }

    const navigate = useNavigate();

    //const [data, setData] = useState([]);
    const handleSubmit = () => {
        axios.get(baseURL+'/users/' + userID)
            .then((response) => {
                const data = response.data
                //setData(data)
                if (data.length !== 0 && data[0].userId === userID && data[0].password === password) {
                    console.log("Login as " + data[0].role)
                    localStorage.setItem("role", data[0].role)
                    navigate("/");
                } else {
                    console.log("no user")
                    alert('User not exists or incorrect password!');
                }
            })
            .catch(err => {
                console.log(err)
            })
        /*
        console.log({
            userID_value: userID,
            password_value: password,
        });
        */
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
            <Toolbar />
            <MuiDrawer />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <LockTwoToneIcon sx={{ fontSize: 40 }} />
                            <Typography component="h1" variant="h5">
                                Admin Login
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userId"
                                label="Employee ID"
                                name="userId"
                                autoComplete="userID"
                                autoFocus
                                sx={{ mt: 3, mb: 2, width: 300 }}
                                value={userID}
                                onChange={getUserID}
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
                                sx={{ mb: 4, width: 300 }}
                                value={password}
                                onChange={getPassword}
                            />
                            <Button
                                variant="contained"
                                sx={{ mb: 2 }}
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