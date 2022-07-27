import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import  {
    Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { connect } from 'react-redux';
import { Drawer, mdTheme, AppBar} from "../helpers/basicTemplate";


import {menuItems} from "../components/menu";
import { RoomTableComponent, RoomFormComponent } from '../components/Room/RoomTableComponent';

import { createRoom } from '../redux/actions/roomsAction';
import RoomEditComponent from '../components/Room/RoomEditComponent';
 

class RoomLayoutView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            showRoomDetail: false,
            room_id: null
        }
    }



    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleCreateRoom = (data) => {
        console.log('data', data)
        this.props.createRoom(data);
        this.setState({
            showForm: false
        })
        
    }
    selectRoom = (id) =>{
        this.setState({
            room_id: id,
            showRoomDetail: true
        })
    }

    handleCloseDetailWindow = ()=> {
        this.setState({
            showRoomDetail: false
        })
    }

    render(){
        const { rooms } = this.props;
        const { showForm, showRoomDetail, room_id } = this.state;
        console.log('rooms', rooms)

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
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button onClick={this.handleShowForm} variant='contained'>Add Room </Button>
                                </Grid>
                                <Grid item xs={12} >
                                    {showRoomDetail ? <RoomEditComponent room_id={room_id} closeWindow={this.handleCloseDetailWindow} /> : null}
                                    {showForm ? <RoomFormComponent createRoom={this.handleCreateRoom} /> : 
                                    <RoomTableComponent selectRoom={this.selectRoom}  rooms={rooms}  />}
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </Box>


            </ThemeProvider>
        )

    }


}




const mapStateToProps = state => ({
    rooms: state.roomReducers.rooms
});


export default connect(mapStateToProps, {createRoom})(RoomLayoutView)