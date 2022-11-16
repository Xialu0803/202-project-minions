import React from 'react'
import Grid from '@mui/material/Grid';
import {Box, Container, Paper, FormControl, InputLabel, MenuItem, Button} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import axios from 'axios';
import {useEffect} from 'react';
import Select from '@mui/material/Select';
import RoomPreferencesTwoToneIcon from '@mui/icons-material/RoomPreferencesTwoTone';
import Typography from "@mui/material/Typography";


const Management = () => {
    const [gate, setGate] = React.useState('');
    const [gate_status, setGateStatus] = React.useState('');
    const [gateData, setGateData] = React.useState([]);

    const getGates = () => {
        axios.get('http://localhost:5000/gates/all')
            .then((response) => {
                setGateData(response.data);
                console.log(gateData)
                console.log('get all gates')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateGate = () => {
        axios.patch('http://localhost:5000/gates/updateGate', {
            "gate": gate,
            "status": gate_status
        })
            .then(
                console.log("update gate status!")
            )
            .catch(err => {
                console.log(err)
            })
    }

    const handleChangeGate = (event) => {
        setGate(event.target.value);
    };
    const handleChangeStatus = (event) => {
        setGateStatus(event.target.value);
    };

    useEffect(() => getGates(), [gate]);
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
                            <RoomPreferencesTwoToneIcon sx={{fontSize: 40}}/>
                            <Typography component="h1" variant="h5">
                                Gate Management
                            </Typography>
                            <FormControl sx={{mt: 3, mb: 4, width: 300}}>
                                <InputLabel id="gate-select-label">Select the Gate</InputLabel>
                                <Select
                                    labelId="gate-select-label"
                                    id="gate-select-label"
                                    value={gate}
                                    label="Gate"
                                    onChange={handleChangeGate}
                                >
                                    {gateData.map((list, index) => (
                                        <MenuItem value={list.gate}>{list.gate}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{mb: 4, width: 300}}>
                                <InputLabel id="status-select-label">Select Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    id="status-select-label"
                                    value={gate_status}
                                    label="gate_status"
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value={"Available"}>Enable</MenuItem>
                                    <MenuItem value={"Not Available"}>Disable</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="contained" onClick={() => {
                                updateGate();
                                alert('update Gate Status');
                            }} sx={{mb: 2}}>
                                Submit Change
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Management