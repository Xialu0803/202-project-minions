import React from 'react'
import Grid from '@mui/material/Grid';
import { Box, Container, Paper, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import ViewCarouselIcon from '@mui/icons-material/ViewCarouselTwoTone';
import Typography from "@mui/material/Typography";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';

const Carousel = () => {
    const [flight, setFlight] = useState('');
    const [flightData, setFlightData] = React.useState([]);
    const [carouselsData, setCarouselsData] = useState([]);
    const [carousel, setCarousel] = useState('');
    const baseURL = process.env.PORT ||"http://localhost:5000";
    const getFlights = () => {
        axios.get(baseURL+'/flights//noCarousel')
            .then((response) => {
                setFlightData(response.data);
                console.log(flightData)
                console.log('get flights info')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const getCarousels = () => {
        const carousel_config = {
            headers: { 'flight_id': flight }
        }
        axios.get(baseURL+'/baggages/byFlight', carousel_config)
            .then((response) => {
                setCarouselsData(response.data);
                console.log(response.data);
                console.log('get available corresponding carousels')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const updateCarousel = () => {
        axios.patch(baseURL+'/baggages/flightID=' + { flight }, {
            "flightID": flight,
            "carousel": carousel
        })
            .then(
                console.log("Assign Carousel!")
            )
            .catch(err => {
                console.log(err)
            })
    }
    const handleChangeCarousel = event => {
        setCarousel(event.target.value);
    };
    const handleChangeFlight = (event) => {
        setFlight(event.target.value);
    };
    useEffect(() => getFlights(), [flight]);//eslint-disable-line
    useEffect(() => getCarousels(), [flight]);//eslint-disable-line
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
                            <ViewCarouselIcon sx={{ fontSize: 40 }} />
                            <Typography component="h1" variant="h5">
                                Carousel Assignment
                            </Typography>
                            <FormControl sx={{ mt: 3, mb: 4, width: 300 }}>
                                <InputLabel id="flight">Select the Flight</InputLabel>
                                <Select
                                    labelId="flights"
                                    id="flights"
                                    value={flight}
                                    label="Flights"
                                    onChange={handleChangeFlight}
                                >
                                    {flightData.map((list, index) => (
                                        <MenuItem value={list.flightID}>{list.flightID}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ mb: 4, width: 300 }}>
                                <InputLabel id="carouselList">Carousels</InputLabel>
                                <Select
                                    labelId="carousels"
                                    id="carousels"
                                    value={carousel}
                                    label="Carousel"
                                    onChange={handleChangeCarousel}
                                >
                                    {carouselsData.map((list, index) => (
                                        <MenuItem value={list.baggageCarouselID}>{list.baggageCarouselID}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={() => {
                                updateCarousel();
                                alert('Assign Carousel Successfully!');
                            }}
                                sx={{ mb: 2 }}
                            >
                                Submit Assignment
                            </Button>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Carousel
