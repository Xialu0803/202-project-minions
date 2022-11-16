import React from 'react'
import Grid from '@mui/material/Grid';
import {Box, Container, Paper, FormControl, InputLabel, MenuItem} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import axios from 'axios';
import {useEffect} from 'react';
import Select from '@mui/material/Select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import LuggageIcon from '@mui/icons-material/LuggageTwoTone';


const Baggage = () => {
    const [terminal, setTerminal] = React.useState('');
    const [data, setData] = React.useState([]);
    const baseURL = process.env.baseURL ||"http://localhost:5000";

    const getBaggage = () => {
        const bag_config = {
            headers: {'terminal': terminal}
        }
        axios.get(baseURL+'/baggages/', bag_config)
            .then((response) => {
                setData(response.data);
                console.log(data)
                console.log('get Baggage data')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleChange = (event) => {
        setTerminal(event.target.value);
    };
    useEffect(() => getBaggage(), [terminal]);//eslint-disable-line
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
                            <LuggageIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Baggage Claim
                            </Typography>
                            <FormControl sx={{mt: 3, mb: 4, width: 300}}>
                                <InputLabel id="terminal">Terminal</InputLabel>
                                <Select
                                    labelId="terminal"
                                    id="terminal"
                                    value={terminal}
                                    label="Terminal"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Terminal 1</MenuItem>
                                    <MenuItem value={2}>Terminal 2</MenuItem>
                                    <MenuItem value={3}>Terminal 3</MenuItem>
                                </Select>
                            </FormControl>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FlightNo</TableCell>
                                        <TableCell>Terminal</TableCell>
                                        <TableCell>Carousel</TableCell>
                                        <TableCell align="right">Airline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.flightNo}</TableCell>
                                            <TableCell>{list.terminal}</TableCell>
                                            <TableCell>{list.carouselNo}</TableCell>
                                            <TableCell align="right">{list.airline}</TableCell>
                                            {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
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

export default Baggage
