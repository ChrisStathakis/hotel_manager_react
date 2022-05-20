import * as React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { menuItems} from "../components/menu";

import { fetchRooms } from '../redux/actions/roomsAction';
import RoomCard from '../components/RoomCard';
import RoomView from '../views/RoomView';
import HomepageComponent from './Components/HomepageComponent';







const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


class Homepage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tickers: {},
            rooms: [],
            open: true,
            showRoomPage: false
        }
    }

    componentDidMount(){
      const isAuthenticated  = this.props.isAuthenticated;
      console.log('isAuth', isAuthenticated)
      if(isAuthenticated === false){
            console.log('is not')
            this.props.history.push('/login/');
      }

      this.props.fetchRooms()
    }

    toggleDrawer = () => {
      this.setState({open: !this.state.open})
    }

    render(){
        const rooms = this.props.rooms;
        const showRoomPage = this.state;
        
        return(
          <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
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
          {showRoomPage ? <RoomView /> : <HomepageComponent rooms={rooms} />}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Grid container spacing={4}>
              {rooms ? rooms.map((room)=>(
                <Grid item key={room} sx={12} sm={6} md={4}>
                  <RoomCard room={room} />
                </Grid> 
              )): null}
            </Grid>
           
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
          

        )
    }
};

const mapStateToProps = state => ({
  rooms: state.roomReducers.rooms,
  isAuthenticated: state.authReducer.isAuthenticated
});



export default compose(withRouter, connect(mapStateToProps, {fetchRooms}))(Homepage);