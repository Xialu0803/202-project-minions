import React from 'react'
import Grid from '@mui/material/Grid';
import {Box, Container, Paper, FormControl, InputLabel, MenuItem, Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import axios from 'axios';
import {useEffect} from 'react';
import Select from '@mui/material/Select';
import AssignmentIcon from '@mui/icons-material/AssignmentTwoTone';
import Typography from "@mui/material/Typography";
import api from '../../../axiosConfig';

const Assignment = () => {
    const [flights, setFlights] = React.useState('');
    const [flightData, setFlightData] = React.useState([]);
    const [gates, setGates] = React.useState('');
    const [gateData, setGateData] = React.useState([]);
    const baseURL = api ||"http://localhost:5000";
    const getFlights = () => {
        axios.get(baseURL+'/flights')
            .then((response) => {
                setFlightData(response.data);
                console.log(flightData)
                console.log('get flights info')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const getGates = () => {
        axios.get(baseURL+'/gates')
            .then((response) => {
                setGateData(response.data);
                console.log(gateData)
                console.log('get available gates')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const assignFlight = () => {
        axios.patch(baseURL+'/gates/flightID=' + {flights}, {
            "flightID": flights,
            "gate": gates
        })
            .then(
                console.log("Assign gate successfully")
            )
            .catch(err => {
                console.log(err)
            })
    }

    const handleChangeFlight = (event) => {
        setFlights(event.target.value);
    };
    const handleChangeGate = (event) => {
        setGates(event.target.value);
    };

    useEffect(() => getFlights(), [flights]);//eslint-disable-line
    useEffect(() => getGates(), [gates]);//eslint-disable-line
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
                            <AssignmentIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Gate Assignment
                            </Typography>
                            <FormControl sx={{mt: 3, mb: 4, width: 300}}>
                                <InputLabel id="flight">Select the Flight</InputLabel>
                                <Select
                                    labelId="flights"
                                    id="flights"
                                    value={flights}
                                    label="Flights"
                                    onChange={handleChangeFlight}
                                >
                                    {flightData.map((list, index) => (
                                        <MenuItem value={list.flightID}>{list.flightID}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{mb: 4, width: 300}}>
                                <InputLabel id="gate">Select the Gate</InputLabel>
                                <Select
                                    labelId="gates"
                                    id="gates"
                                    value={gates}
                                    label="Gate"
                                    onChange={handleChangeGate}
                                >
                                    {gateData.map((list, index) => (
                                        <MenuItem value={list.gate}>{list.gate}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={() => {
                                assignFlight();
                                alert('Assign Gate Successfully');
                            }}
                                    sx={{mb: 2}}
                            >
                                Submit Change
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Assignment
