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
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FlightLandTwoToneIcon from '@mui/icons-material/FlightLandTwoTone';
import Typography from "@mui/material/Typography";
import Api from '../../axiosConfig';

const Arrivals = () => {
    const [timeDuration, setTimeDuration] = useState(28800000);
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setTimeDuration(event.target.value);
    };
    const baseURL = Api || "http://localhost:5000";

    useEffect(() => {
        axios.get(baseURL + '/flights/arrivals/' + timeDuration)
            .then((response) => {
                setData(response.data);
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [timeDuration]);//eslint-disable-line

    const convertTime = (list) => {
        const date = new Date(list.arrivalTime)
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
            <Toolbar />
            <MuiDrawer />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FlightLandTwoToneIcon sx={{ fontSize: 40 }} />
                            <Typography component="h1" variant="h5">
                                Arrival Information
                            </Typography>
                            <FormControl sx={{ mt: 3, mb: 4, width: 300 }}>
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
                                        <TableCell>From</TableCell>
                                        <TableCell>Flight NO</TableCell>
                                        <TableCell>Terminal</TableCell>
                                        <TableCell>Gate</TableCell>
                                        <TableCell align="right">Claim</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.sort((a, b) => a.arrivalTime - b.arrivalTime).map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{convertTime(list)}</TableCell>
                                            <TableCell>{list.departure}</TableCell>
                                            <TableCell>{list.flightNo}</TableCell>
                                            <TableCell>{list.terminal}</TableCell>
                                            <TableCell>{list.gate}</TableCell>
                                            <TableCell align="right">{list.carouselNo}</TableCell>
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

export default Arrivals
