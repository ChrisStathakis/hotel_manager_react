import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Drawer, mdTheme, AppBar} from "../helpers/basicTemplate";
import { menuItems } from "../components/menu";


import ReservationTable from '../components/Reservations/ReservationTable';
import { Button } from '@mui/material';
import ReservationForm from '../components/Reservations/ReservationForm';


export default class ReservationLayoutView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectReservation: null,
            screens: {
                showReservations: true,
                showCreateForm: false
            }
            
        }
    }

    resetScreens(){
        this.setState({
            ...this.state,
            screens: {
                showReservations: false,
                showCreateForm: false
            }
        })
    }

    showScreen = (screen) =>{
        this.resetScreens();
        
        this.setState({
            ...this.state,
            screens:{
                [screen]: true
            }  
        })
    }

    handleReservation = (res) => {
        this.resetScreens();
        this.setState({
            selectReservation: res,
            screens:{
                showCreateForm: true
            }
        })
        
    }

    

    
    render(){
        const { showReservations, showCreateForm} = this.state.screens;
        const { selectReservation} = this.state;
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
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            {showCreateForm ? <Button variant='contained' color='warning' onClick={() =>this.showScreen('showReservations')}><CloseIcon /> Close</Button> 
                            :<Button variant='contained' color='success' onClick={() =>this.showScreen('showCreateForm')}>Create</Button> }
                            
                            {showCreateForm ? <ReservationForm reservation={selectReservation} closeWindow={() =>this.showScreen('showReservations')} />: null}
                            {showReservations ? <ReservationTable handleReservation={this.handleReservation} /> : null}
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        )
    }
}

