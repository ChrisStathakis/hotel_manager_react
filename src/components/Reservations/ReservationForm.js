import React from 'react';
import { connect } from 'react-redux'

import { Grid, Typography, Box, TextField, Container, MenuItem, Paper, Button, ListItem, 
    ListItemText, List, TableContainer, TableHead, TableCell, TableRow, Table, TableBody
 } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment';

import { fetchRooms } from '../../redux/actions/roomsAction';
import { fetchCostumers } from '../../redux/actions/customersActions';
import { createReservation, updateReservation } from '../../redux/actions/reservationActions';
import { createCustomer  } from '../../redux/actions/customersActions';
import axiosInstance from '../../helpers/axiosInstance';
import { COSTUMER_LIST_ENDPOINT, ROOM_PRICE_LIST_ENDPOINT } from '../../helpers/endpoints';
import CustomerForm from './CustomerForm';
import CustomerTable from './CustomerTable';
import { getValue } from '@testing-library/user-event/dist/utils';


class ReservationForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            info:{
                createMode: false
            },
            room: {},
            extra_prices:{
                results: []
            },
            reservation: {
                "room": 1,
                "customer": 1,
                "source": "a",
                "check_in": moment().format("YYYY-MM-DD"),
                "check_out":  moment().format("YYYY-MM-DD"),
                "checkIn": false,
                "capacity": 1,
                "isCancel": false,
                "isDone": false,
                "clean_value": 0,
                "extra_cost_per_person": "0.00",
                "value": 0,
                "charges_value": "0.00",
                "discount": "0.00",
                "days": 0,
                "final_value": "0",
                "active_status": true,
            },
            filters: {
                'search': ''
            },
            customer: {},
            new_customer: {}
        }
    }

    componentDidMount(){
        this.props.fetchRooms();
        this.props.fetchCostumers();
        if (this.props.reservation === undefined){
            console.log('fd', this.props.reservation,)
            const info = {...this.state.info, createMode: true}
            this.setState({
                info: info
            })
            
        } else {
            console.loh('eht')
            this.setState({
                reservation: this.props.reservation
            })
        }
    }

    /*
    componentDidUpdate(prevProps, prevState){
        if (prevProps.customers !== this.state.customers){
          this.setState({
            customers: this.props.customers,
          })
        }
        if (prevProps.new_customer !== this.state.new_customer && this.prevProps.new_customer !== undefined){
            const reservation = {
                ...this.state.reservation,
                customer: this.props.customer.id
            }
            this.setState({
                ...this.state,
                reservation
            })
        }
      }
      */



    handleChange = (evt) => {
        const reservation = this.state.reservation;
        this.setState({
            ...this.state,
            reservation:{
                ...reservation,
                [evt.target.name]: event.target.value
            }
        })
       
        
    }

    findRoom = (id) => {
        const myThis = this;
        const room = this.props.rooms.find((room)=>{
            return room.id === id
        })
        const endpoint = ROOM_PRICE_LIST_ENDPOINT + '?room=' + id; 
        axiosInstance.get(endpoint)
            .then(respData=>{
               
                myThis.setState({
                    extra_prices: respData.data
                })
            })
        this.setState({
            room: room
        })
    }

    handleRoom = (evt) => {
        const value = evt.target.value;
       
        this.setState({
            reservation:{
                ...this.state.reservation,
                room: value
            }
        })
        this.findRoom(value);
    }


    handleSubmit = () => {
        const { reservation } = this.props;
        const data = this.state.reservation;
        console.log(data)
        if (this.state.info.createMode){
            console.log('cretrwe')
            this.props.createReservation(data);
            this.props.closeWindow();
            
        } else {
            console.log('fdf')
            this.props.updateReservation(reservation.id, data)
        }
    }

    handleCustomerSearch = (q) => {
        const endpoint = COSTUMER_LIST_ENDPOINT + '?search=' + q;
        this.props.fetchCostumers(endpoint)
    };

    handleSelectCustomer = (id) => {
        const reservation = {...this.state.reservation, customer: id}
        this.setState({
            reservation:reservation
        })
    }

    handleCreateCustomer = (data) => {
        this.props.createCustomer(data);

    }

    render(){
        const { rooms, customers } = this.props;
        const { createMode } = this.state.info;
        const { reservation, room, extra_prices, filters, customer } = this.state;
        console.log('cos', createMode)
        
        return (
            <Container>
                <Button onClick={this.props.closeWindow}>Close</Button>
                {createMode?<Typography>New Reservation</Typography>  : <Typography>{reservation.str_room} | {reservation.date_range}</Typography>}
                <Grid container  spacing={2}>
                    <Grid item sx={6}>
                    <Box  noValidate sx={{ mt: 2 }} component={Paper}>
                
                        <Grid item xs={12}>
                            <TextField
                                required
                                autofocus
                                id='check_in'
                                label='Check In'
                                name='check_in'
                                type='date'
                                value={reservation.check_in}
                                onChange={this.handleChange}
                            />
                            <TextField
                                required
                                autofocus
                                id='check_out'
                                label='Check Out'
                                name='check_out'
                                type='date'
                                value={reservation.check_out}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="room"
                                select
                                label='Room'
                                name='room'
                                value={reservation.room}
                                onChange={this.handleRoom}
                            >
                                {rooms.map((room)=>(
                                    <MenuItem key={room.id} value={room.id}>
                                        {room.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                id="customer"
                                name='customer'
                                select
                                label='Customer'
                                value={reservation.customer}
                                onChange={this.handleChange}
                            >
                                {customers.map((room)=>(
                                    <MenuItem key={room.id} value={room.id}>
                                        {room.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                required
                                id='clean_value'
                                label='Value'
                                name='clean_value'
                                type='number'
                                value={reservation.clean_value}
                                onChange={this.handleChange}
                            />
                        <TextField
                                required
                                id='extra_cost_per_person'
                                label='Value Per Person'
                                name='extra_cost_per_person'
                                type='number'
                                value={reservation.extra_cost_per_person}
                                onChange={this.handleChange}
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <Button onClick={this.handleSubmit} variant="contained" color='success'><SaveIcon /> Save</Button>
                        </Grid>
                    
                </Box>

                    </Grid>
                    <Grid item sx={6}>
                        <Box component={Paper}>
                        <Typography>Room Detail {room.title}</Typography>
                        <List>
                            <ListItem>
                                <ListItemText>Price {room.value}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Extra Per Person {room.extra_value_per_person}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Capacity {room.capacity}</ListItemText> 
                            </ListItem>
                        </List>
                        <Typography>Extra Prices</Typography>
                        <TableContainer>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Extra Price</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {extra_prices.results.map((price)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{price.date_range_}</TableCell>
                                            <TableCell>{price.price}</TableCell>
                                            <TableCell>{price.extra_value_per_person}</TableCell>
                                            <TableCell>{price.minimum_days}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item sx={12}>
                        <Box component={Paper}  mt={1}>
                            <Typography variant='h4' component='h2' >Reservation Info</Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>CheckIn</TableCell>
                                            <TableCell>{reservation.check_in}</TableCell>
                                            <TableCell>CheckOut</TableCell>
                                            <TableCell>{reservation.check_out}</TableCell>
                                            <TableCell>People</TableCell>
                                            <TableCell>{reservation.capacity}</TableCell>
                                            <TableCell>Days</TableCell>
                                            <TableCell>{reservation.days}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Room Cost</TableCell>
                                            <TableCell>{reservation.str_room_day_price}</TableCell>
                                            <TableCell>Total Room Cost</TableCell>
                                            <TableCell>{reservation.clean_value}</TableCell>
                                            <TableCell>Cost Per Person</TableCell>
                                            <TableCell>{reservation.str_extra_price_per_day}</TableCell>
                                            <TableCell>Total Extra Bed</TableCell>
                                            <TableCell>{reservation.extra_cost_per_person}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Extra Cost</TableCell>
                                            <TableCell>{reservation.charges_value}</TableCell>
                                            <TableCell>Final Value</TableCell>
                                            <TableCell>{reservation.final_value}</TableCell>
                                        </TableRow>
                                    
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        
                        
                    </Grid>
                   
                </Grid>
                <Grid container spacing={4} >
                    <Grid item xs={8}>
                       {customers ? <CustomerTable customers={customers} searchCustomer={this.handleCustomerSearch} selectCustomer={this.handleSelectCustomer} /> : null}
                    </Grid>
                    <Grid item xs={4}>
                        <CustomerForm handleSubmit={this.handleCreateCustomer} />
                    </Grid>
                </Grid>
                
            </Container> 
        )

    }
}

const mapStateToProps = state =>({
    rooms: state.roomReducers.rooms,
    customers: state.customerReducer.list,
    new_customer: state.customerReducer.created
})

export default connect(mapStateToProps, { fetchRooms, fetchCostumers, createReservation, updateReservation, createCustomer })(ReservationForm);