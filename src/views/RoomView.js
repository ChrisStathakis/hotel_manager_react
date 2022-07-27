import React from "react";
import { connect } from "react-redux";
import {fetchRoom, updateRoom, fetchRoomPrices} from'../redux/actions/roomsAction';
import axiosInstance from "../helpers/axiosInstance";
import { showRoomAction} from '../redux/actions/genericActions';
import { Container, Box, Typography, Stack, Button,
    Grid, Card, CardContent, TextField, Checkbox, FormControl,
    FormControlLabel, FormGroup, TableContainer, Table, TableHead, TableCell,
    TableBody, TableRow, CardHeader } 
       from "@mui/material";

import { Check, CheckBox, RestorePageRounded } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import { RESERVATION_LIST_ENDPOINT, ROOM_PRICE_LIST_ENDPOINT } from "../helpers/endpoints";
import ReservationCard from "../components/ReservartionCard";


class ReservationTable extends React.Component {


    handleButton = (reservation) => {
        this.props.handleClick(reservation);
    }

    render(){
        const {reservations} = this.props;

        return (
            <div>
                <Typography>Reservations</Typography>
                    <Table aria-label="simply table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Costumer</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                             
                            {reservations.results.map((reservation)=>(
                                    <TableRow>
                                        <TableCell>{reservation.date_range}</TableCell>
                                        <TableCell>{reservation.str_customer}</TableCell>
                                        <TableCell>{reservation.final_value}</TableCell>
                                         <TableCell>{reservation.str_status}</TableCell>
                                        <TableCell><Button onClick={()=>this.handleButton(reservation)}>Edit</Button></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                        
                    </Table>
            </div>
        )
    }
}

class RoomView extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            room: {},
            extra_prices: [],
            extra: {},
            room_id: 0,
            showReservation: false,
            editReservation: {},
            reservations: {
                results: []
            }
        }
    }


    componentDidMount(){
        const room_id = this.props.room_id;
        const myThis = this;
        this.setState({
            room: this.props.room,
            room_id: room_id
        })
        
    }

    componentDidUpdate(prevProps, prevState){
        const thisInc = this;
        if (prevProps.room !== this.props.room){
        const room = this.props.room;
        const price_endpoint = ROOM_PRICE_LIST_ENDPOINT + '?room='+ room.id;
        axiosInstance.get(price_endpoint)
            .then(
                respData => {
                    console.log('here', respData )
                    thisInc.setState({
                        extra_prices: respData.data.results
                    })
                }
            )
        this.setState({
            room: this.props.room
        })
        const endpoint = RESERVATION_LIST_ENDPOINT + '?room=' + room.id;
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    thisInc.setState({
                        ...thisInc.state,
                        reservations: respData.data
                    })
                    
                }
            )
    }
    }

   

    _handleText = (event) => {
        const value = event.target.value

        this.setState({
            room:{
                ...this.state.room,
                title: value
            }
        })
       
    }

    _handleValue = (event) => {
        const value = event.target.value
        this.setState({
            room:{
                ...this.state.room,
                value: value
            }
        })
    }

    handleShowReservation = (reservation) => {
        this.setState({
            showReservation: true,
            editReservation: reservation
        })
    }

    handleCloseReservation = () => {
        this.setState({
            showReservation:false
        })
    }

    _handleSubmit = e =>{
        
        const data = this.state.room;
        this.props.updateRoom(this.props.room.id, data)
    }

    render(){
        const {room, extra_prices, reservations, showReservation, editReservation} = this.state;
        
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6
                    }}
                >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant='h2'
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {room.title}
                    </Typography>
                    <Stack
                        sx={{ pt:4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button variant="contained">Reservation</Button>
                        <Button variant="outlined">Secondary action</Button>
                    </Stack>
                </Container>
                </Box>
                </Grid>
                
                <Grid item xs={6}>
                <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1}}>
                                    <Typography gutterBottom variant="h5" component="h2">Edit</Typography>
                                    <Box component="form" onSubmit={this._handleSubmit} noValidate sx={{ mt:1}}>
                                        <FormControlLabel
                                            control={<CheckBox value={room.active} color="primary" />}
                                            name='active'
                                            label='Active'
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="title"
                                            label='Title'
                                            name='title'
                                            autoComplete="text"
                                            onChange={this._handleText}
                                            value={room.title}
                                            
                                           
                                        />
                                       
                                        <TextField
                                            required
                                            fullWidth
                                            id='value'
                                            label='Value'
                                            name='value'
                                            type='number'
                                            value={room.value}
                                            onChange={this._handleValue}
                                        />
                                        <Button onClick={this._handleSubmit}>Save</Button>
                                    </Box>

                                </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    {showReservation ? 
                    <ReservationCard reservation={editReservation} handleClose={this.handleCloseReservation}  /> : 
                    <ReservationTable reservations={reservations} handleClick={this.handleShowReservation} handleClose={this.handleCloseReservation} />
                    } 
                </Grid>
               
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                           
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <TableContainer component={Paper}>
                            <Button>Add Price</Button>
                            <Table sx={{ minWidth: 650 }} aria-label="simply table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Extra Person</TableCell>
                                        <TableCell>-</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {extra_prices.map((price)=>(
                                        <TableRow>
                                            <TableCell>{price.date_range_}</TableCell>
                                            <TableCell>{price.title}</TableCell>
                                            <TableCell>{price.value}</TableCell>
                                            <TableCell>{price.extra_value_per_person}</TableCell>
                                            <TableCell><Button>Edit</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Container>
                
                <Container sx={{ py: 2 }} maxWidth="md">
                    <Typography>Hello</Typography>
                </Container>
            </Grid>
        )
    }

}


const mapStateToProps = state =>({
    room: state.roomReducers.room,
    room_prices: state.roomReducers.room_prices
});


export default connect(mapStateToProps, {fetchRoom, updateRoom, fetchRoomPrices})(RoomView);

