import LuggageIcon from '@mui/icons-material/Luggage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <FlightTakeoffIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Departures',
        route: 'departures',
    },
    {
        id: 1,
        icon: <FlightLandIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Arrivals',
        route: 'arrivals',
    },
    {
        id: 2,
        icon: <LuggageIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Baggage Claim',
        route: 'baggage',
    },
]

export const airportNavbarItems = [
    {
        id: 0,
        icon: <AssignmentIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Gate Assignment',
        route: 'gate_assignment',
    },
    {
        id: 1,
        icon: <RoomPreferencesIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Gate Management',
        route: 'gate_management',
    },
    {
        id: 2,
        icon: <ViewCarouselIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Carousel Assignment',
        route: 'carousel',
    },
]

export const airlineNavberItems = [
    {
        id: 0,
        icon: <LibraryAddIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Add Flight',
        route: 'add_flight',
    },
    {
        id: 1,
        icon: <EditIcon sx={{color: 'rgba(98,97,97,0.7)'}}/>,
        label: 'Change Information',
        route: 'change_information',
    },
]