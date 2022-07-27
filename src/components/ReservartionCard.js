import React from 'react';
import { 
    Card, 
    Grid,
    ListItem,
    ListItemText,
    List,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Divider

 } from '@mui/material';

import { 
    Typography,
    Button
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/system';
import { connect } from 'react-redux';



class ReservationCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            form:{
                room: null,
                customer: null,
                clean_value:0,
                extra_cost_per_person:0,
                source: "a"
            }
        }
    }

    handleRoom = (event) => {
        this.setState({
            form:{
                ...this.state.form,
                room: event.target.value
            }
        })
    }

    handleClose = (event) => {
        this.props.handleClose();
    }

    

    
    render(){
        const {form} = this.state;
        const {reservation} = this.props;
        const {rooms, customers } = this.props;
        console.log('data', customers)

        return (
            
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                        {reservation ? <Typography align='center' container='h1' center>Room {reservation.str_room} | Csutomer {reservation.str_customer}</Typography> 
                        :
                         <Typography align='center' container='h1' center>New Reservation</Typography>}
                        <Divider />
                         </Grid>
                    <Grid item xs={6}>
                        <Typography  container='h4' align='center'>Details</Typography>
                        <Button>Close</Button>
                        <Button>Check In </Button>
                        <Button>Cancel</Button>
                        {reservation ?
                        <List>
                            <ListItem>
                                <ListItemText>Date: {reservation.date_range}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Room: {reservation.str_room}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Customer: {reservation.str_customer}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Days: {reservation.days}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>People: {reservation.capacity}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Room Value: {reservation.clean_value} Extra value per person  {reservation.extra_cost_per_person}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Extras: {reservation.charges_value}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText><Typography container='h1' color='red'>Total: {reservation.final_value}</Typography>   </ListItemText>
                            </ListItem>
                                
                        </List>
                        : null }

                    </Grid>
                    <Grid item xs={6}>
                        <Typography container='h1'>Edit Reservation</Typography>
                        <Box component="form" noValidate sx={{ mt:1 }}>
                            <TextField
                                required
                                fullWidth
                                id='check_in'
                                label='Check In'
                                name='check_in'
                                autoComplete='date'
                                autofocus
                                type='date'
                            />
                            <TextField
                                required
                                fullWidth
                                id='check_out'
                                label='Check Out'
                                name='check_out'
                                autoComplete='date'
                                type='date'
                            />
                            <FormControl fullWidth>
                                <InputLabel id='room'>Room</InputLabel>
                                <Select
                                    labelId='room'
                                    id='room'
                                    value={form.room}
                                    label='Room'
                                    onChange={this.handleRoom}
                                >
                                {rooms.map((room)=>{
                                    return <MenuItem value={room.id}>{room.title}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id='customer'>Customer</InputLabel>
                                <Select
                                    labelId='customer'
                                    id='customer'
                                    value={form.customer}
                                    label='customer'
                                    onChange={this.handleRoom}
                                >
                                {customers.map((room)=>{
                                    return <MenuItem value={room.id}>{room.title}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                            <TextField
                                type='number'
                                label='Room Value'
                                name='clean_value'

                            />
                            <TextField
                                type='number'
                                label='Extra Cost Person'
                            />
                            <TextField
                                type='number'
                                label='People'
                                name='capacity'
                            />

                            
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}


const mapStateToProps = state =>({
    rooms: state.roomReducers.rooms,
    customers: state.customerReducer.list
    
})



export default connect(mapStateToProps, {})(ReservationCard);