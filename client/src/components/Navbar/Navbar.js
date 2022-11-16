import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AirlinesIcon from '@mui/icons-material/Airlines';
import DomainIcon from '@mui/icons-material/Domain';
import LogoutIcon from '@mui/icons-material/Logout';
import {airlineNavberItems, airportNavbarItems, mainNavbarItems} from './consts/navbarItems';
import {useNavigate} from "react-router-dom";
import {Button, createTheme, Divider, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#7189a9',
            contrastText: '#fff',
        },
    },
});


const drawerWidth = 260;

function Navbar(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;

    const navigate = useNavigate();
    const draw = (
        <List>
            <Toolbar sx={{mb: 1}}>
                <ThemeProvider theme={theme}>
                    <Button
                        color="neutral"
                        variant="contained"
                        startIcon={<DomainIcon/>}
                        sx={{mr: 1}}
                        href="/login"
                    >
                        Airport
                    </Button>
                    <Button
                        color="neutral"
                        variant="contained"
                        startIcon={<AirlinesIcon/>}
                        href="/login"
                    >
                        AirLine
                    </Button>
                </ThemeProvider>
            </Toolbar>
            {mainNavbarItems.map((item, index) => (
                <ListItem
                    button
                    key={item.id}
                    onClick={() => navigate(item.route)}
                >
                    <ListItemIcon
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                    />
                </ListItem>
            ))}
            <Divider/>
            {airportNavbarItems.map((item, index) => (
                <ListItem
                    button
                    key={item.id}
                    onClick={() => navigate(item.route)}
                >
                    <ListItemIcon
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                    />
                </ListItem>
            ))}
            <Divider/>
            {airlineNavberItems.map((item, index) => (
                <ListItem
                    button
                    key={item.id}
                    onClick={() => navigate(item.route)}
                >
                    <ListItemIcon
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{display: {sm: 'none'}, mr: 1}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Flight and Baggage Center
                    </Typography>

                    <IconButton color="inherit"
                                sx={{mr: 1}}
                                href="/"
                    >
                        <HomeIcon/>
                    </IconButton>

                    <IconButton color="inherit"
                                href="/"
                    >
                        <LogoutIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="nav fold"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {draw}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {draw}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Navbar