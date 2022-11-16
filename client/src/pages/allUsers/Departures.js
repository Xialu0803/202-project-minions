import React from 'react'
import Grid from '@mui/material/Grid';
import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Select,
    MenuItem,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import axios from 'axios';
import {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import Typography from "@mui/material/Typography";
import api from '../../../axiosConfig';

const Departures = () => {
    const [timeDuration, setTimeDuration] = useState(28800000);
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setTimeDuration(event.target.value);
    };
    const baseURL = api ||"http://localhost:5000";

    useEffect(() => {
        axios.get(baseURL+'/flights/departures/' + timeDuration)
            .then((response) => {
                setData(response.data);
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [timeDuration]);//eslint-disable-line

    const convertTime = (list) => {
        const date = new Date(list.departureTime)
        const hour = date.getHours().toString()
        const minute = date.getMinutes().toString()
        const minutes = minute.length === 1 ? '0' + minute : minute
        return hour + ':' + minutes
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
                            <FlightTakeoffTwoToneIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Departure Information
                            </Typography>
                            <FormControl sx={{mt: 3, mb: 4, width: 300}}>
                                <InputLabel id="timeDuration">Time Duration</InputLabel>
                                <Select
                                    labelId="timeDuration"
                                    id="timeDuration"
                                    value={timeDuration}
                                    label="Time Duration"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={3600000}>Next Hour</MenuItem>
                                    <MenuItem value={7200000}>Next Two Hour</MenuItem>
                                    <MenuItem value={14400000}>Next Four Hour</MenuItem>
                                </Select>
                            </FormControl>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Destination</TableCell>
                                        <TableCell>Flight NO</TableCell>
                                        <TableCell>Terminal</TableCell>
                                        <TableCell align="right">Gate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.sort((a, b) => a.departureTime - b.departureTime).map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{convertTime(list)}</TableCell>
                                            <TableCell>{list.destination}</TableCell>
                                            <TableCell>{list.flightNo}</TableCell>
                                            <TableCell>{list.terminal}</TableCell>
                                            <TableCell align="right">{list.gate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Departures
