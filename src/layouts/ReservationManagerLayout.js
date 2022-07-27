import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Drawer, mdTheme, AppBar} from "../helpers/basicTemplate";
import { menuItems } from "../components/menu";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { RESERVATION_LIST_ENDPOINT } from '../helpers/endpoints';
import { ReservationCard } from '../components/ReservationManager/ReservationCard';
import  ReservationForm  from '../components/Reservations/ReservationForm';

import axiosInstance from '../helpers/axiosInstance';






function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}



class ReservationManagerLayout extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            reservations:{},
            loadData: false,
            showCard: false,
            reservation:{},
            createView: false
        }
    }

    loadData(){
        const endpoint = 'http://127.0.0.1:8000/api/reservations/list/?customer=&room=&isDone=false&isCancel=false';
        const myThis = this;
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    const new_array = respData.data.results.map((ele=>{
                        const new_data = {
                            ...ele,
                            title: ele.str_room,
                            start: ele.check_in,
                            end: ele.check_out,
                            id: ele.id,
                            color: ele.str_color,

                        }
                        delete new_data.url
                        return new_data
                    }))
                    myThis.setState({
                        reservations: new_array,
                        loadData: true
                    })
                }
            )
    }

    componentDidMount(){
        this.loadData();
    }
    
    handleReservation = (evt) => {
        const id = evt.event.id ;
        const reservation = this.state.reservations.filter((ele)=> ele.id === Number(id))[0]
        this.setState({
            showCard: true,
            reservation: reservation
        })
    }

    closeWindow = () => {
        this.setState({
            showCard: false,
            showCreate: false
        })
        this.loadData();
    }

    showCreateView = () => {
        this.setState({
            showCreate: true,
            showCard: false
        })
    }

    render(){
        const { loadData, reservations, reservation, showCard, showCreate} = this.state;
        console.log('resr', reservations)
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex'}}>
                    <CssBaseline />
                     <AppBar position="absolute" open={open}>
                         <Toolbar
                             sx={{
                                 pr: '24px', // keep right padding when drawer closed
                                }}
                         >
                             <IconButton
                                 edge="start"
                                 color="inherit"
                                 aria-label="open drawer"
                                 onClick={this.toggleDrawer}
                                 sx={{
                                     marginRight: '36px',
                                     ...(open && { display: 'none' }),
                                 }}
                             >
                                 <MenuIcon />
                             </IconButton>
                             <Typography
                                 component="h1"
                                 variant="h6"
                                 color="inherit"
                                 noWrap
                                 sx={{ flexGrow: 1 }}
                             >

                             </Typography>
                             <IconButton color="inherit">
                                 <Badge badgeContent={4} color="secondary">
                                     <NotificationsIcon />
                                 </Badge>
                             </IconButton>
                         </Toolbar>
                     </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={this.toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {menuItems}
                            <Divider sx={{ my: 1 }} />
                        </List>
                    </Drawer>
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
                        <Grid
                            container
                            
                            >
                            <Grid item xs={12}>
                                <Typography variant="h3" component="h2" >Reservations</Typography>
                            </Grid>
                            {isIterable(reservations)?
                            <Grid item xs={8}>
                                <FullCalendar
                                    initialView="dayGridMonth"
                                    plugins={[ dayGridPlugin ]}
                                    events={reservations}
                                    eventClick={this.handleReservation}
                                    />
                            </Grid> : null}
                            <Grid item xs={4}>
                                {showCard ? <ReservationCard reservation={reservation} closeWindow={this.closeWindow} />: null }
                                {showCreate ? <ReservationForm closeWindow={this.closeWindow} /> : <Button onClick={this.showCreateView}> Create </Button>}
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
            </ThemeProvider>

            
        )
    }


}



const mapStateToProps = state =>({
    reservations: ''
})


export default ReservationManagerLayout;