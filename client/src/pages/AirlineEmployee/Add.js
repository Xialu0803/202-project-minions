import React from 'react'
import Grid from '@mui/material/Grid';
import {Box, Button, Container, Paper, Stack} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import LibraryAddTwoToneIcon from '@mui/icons-material/LibraryAddTwoTone';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useState} from 'react';
import axios from 'axios';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';


const Add = () => {
    const [flightNo, setFlightNo] = useState('')
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [airline, setAirline] = useState('')
    const baseURL = process.env.BASE_URL ||"http://localhost:5000";
    const flight_config = {
        "flightNo": flightNo,
        "departure": departure,
        "destination": destination,
        "departureTime": departureTime,
        "arrivalTime": arrivalTime,
        "airline": airline
    }
    const createFlight = () => {
        axios.post(baseURL+'/flights', flight_config)
            .then(
                console.log("Create Flight!")
            )
            .catch(err => {
                console.log(err)
            })
    }
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
                            <LibraryAddTwoToneIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Add Flight
                            </Typography>
                            <Box sx={{mt: 3, mb: 4, width: 300}}>
                                <Stack spacing={2}>
                                    <TextField id="flight-no" label="Flight No." variant="outlined" value={flightNo}
                                               onChange={(newValue) => setFlightNo(newValue.target.value)}/>
                                    <TextField id="departure" label="Departure" variant="outlined" value={departure}
                                               onChange={(newValue) => setDeparture(newValue.target.value)}/>
                                    <TextField id="destination" label="Destination" variant="outlined"
                                               value={destination}
                                               onChange={(newValue) => setDestination(newValue.target.value)}/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Departure Time"
                                            value={departureTime}
                                            outputFormat="MM/dd/yyyy"
                                            onChange={(newValue) => {
                                                setDepartureTime(newValue);
                                            }}/>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Arrival Time"
                                            value={arrivalTime}
                                            onChange={(newValue) => {
                                                setArrivalTime(newValue);
                                            }}/>
                                    </LocalizationProvider>
                                    <TextField id="airline" label="Airline" variant="outlined" value={airline}
                                               onChange={(newValue) => setAirline(newValue.target.value)}/>

                                </Stack>
                            </Box>
                            <Button variant="contained" onClick={() => {
                                createFlight();
                                alert('Assign Carousel Successfully!');
                            }}
                                    sx={{mb: 2, width: 300}}

                            >
                                Add Flight
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Add
