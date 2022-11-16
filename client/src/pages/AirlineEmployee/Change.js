import React from 'react'
import Grid from '@mui/material/Grid';
import {Box, Button, Container, Paper, Stack,FormControl} from "@mui/material";
import {InputLabel,MenuItem} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import EditIcon from '@mui/icons-material/EditTwoTone';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect} from 'react';
import Select from '@mui/material/Select';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Change = () => {
    const [flights, setFlights] = React.useState('')
    const [flightData,setFlightData] =React.useState([]);
    const[departureTime,setDepartureTime] = React.useState('')
    const[arrivalTime,setArrivalTime] = React.useState('')

    const change_config = {
        "flightID":flights,
        "departureTime":departureTime,
        "arrivalTime":arrivalTime
    }
    
    const getFlights = () => {
        axios.get('http://localhost:5000/flights')
            .then((response) => {
                setFlightData(response.data);
                console.log (flightData)
                console.log('get flights info')
            })
            .catch(err =>  { 
                console.log(err)
            })
    }
    const changeFlight = () => {
        axios.patch('http://localhost:5000/flights/flightID='+{flights},change_config)
            .then(
                console.log("Updated Flight Info!")
            )
            .catch(err =>  { 
                console.log(err)
            })
    }
    const handleChangeFlight = (event) => {
        setFlights(event.target.value);
    };
    useEffect (() => getFlights(),[flights]);
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
                            <EditIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Information Edit
                            </Typography>
                            <Box sx={{mt: 3, mb: 4, width: 300}}>
                                <Stack spacing={2}>
                                <FormControl sx={{ mt: 3, width: 300 }}>
                                <InputLabel id="flight">Select the Flight</InputLabel>
                                    <Select
                                    labelId="flights"
                                    id="flights"
                                    value={flights}
                                    label="Flights"
                                    onChange={handleChangeFlight}
                                    >
                                    {flightData.map((list,index) =>(
                                        <MenuItem value={list.flightID}>{list.flightID}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="DateTimePicker"
                                    value={departureTime}
                                    outputFormat="MM/dd/yyyy"
                                    onChange={(newValue) => {
                                    setDepartureTime(newValue);}}/>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="DateTimePicker"
                                    value={arrivalTime}
                                    onChange={(newValue) => {
                                    setArrivalTime(newValue);}}/>
                                </LocalizationProvider>
                                </Stack>
                            </Box>
                            <Button variant="contained" onClick={() => {
                                changeFlight ();
                                alert('Change Flight Info Successfully!');}}
                                sx={{ mb: 2, width: 300 }}>
                                     Change Flight Info
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Change
