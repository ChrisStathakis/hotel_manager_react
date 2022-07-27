import * as React from 'react';
import {Link} from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const menuItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <Link to="/"> <ListItemText primary='Dashboard'/> </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <Link to="/rooms/"> <ListItemText primary='Rooms'/> </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <Link to="/reservations/"> <ListItemText primary='Reservations'/> </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <Link to="/calendar/"> <ListItemText primary='Calendar'/> </Link>
        </ListItemButton>
    </React.Fragment>
);