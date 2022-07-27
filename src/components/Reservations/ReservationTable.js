import React from 'react';
import {
    Grid, TableContainer, Typography, Paper, TableHead, 
    Table, TableRow, TableCell, TableBody, TextField,
    Box, Button,
    FormGroup,
    FormControlLabel, Checkbox
} from '@mui/material';
import { connect } from 'react-redux';
import { fetchRooms } from '../../redux/actions/roomsAction';
import { fetchReservations } from '../../redux/actions/reservationActions'

class ReservationTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showRoom: false,
            filters: {
                q: '',
                room: '',

            }
        }

    }

    componentDidMount(){
        this.props.fetchRooms();
        this.props.fetchReservations();
    }

    handleRoom = (res)=>{
        this.props.handleReservation(res)
    }

    render(){
        const { reservations, rooms } = this.props;
        const { filters } = this.state;
        console.log('rese', reservations,'rooms', rooms )
        return (
            <Grid container>
                <Grid item xs={8}>
                    <Typography>Reservations</Typography>
                    <TableContainer component={Paper}>
                        <Table arial-label="simply table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>-</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reservations.count > 0 ? reservations.results.map((res)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{res.date_range}</TableCell>
                                            <TableCell>{res.str_room}</TableCell>
                                            <TableCell>{res.str_customer}</TableCell>
                                            <TableCell>{res.final_value}</TableCell>
                                            <TableCell><Button onClick={()=>this.handleRoom(res)}> Edit </Button></TableCell>
                                        </TableRow>
                                    )
                                }): null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={4} component={Paper}>
                    <Typography >Filters</Typography>
                    <Box component='form'>
                        <TextField
                            fullWidth
                            name='q'
                            value={filters.q}
                            id='q'
                            label='Search'
                            type='text'
                        />
                        <Box>
                            <Typography>Rooms</Typography>
                            {rooms.count > 0 ? rooms.map((room)=>(
                                <FormGroup>
                                    <FormControlLabel name='room' value={room.id} control={<Checkbox defaultChecked />} label={room.title} />
                                </FormGroup>
                                ))
                            :<Typography>-</Typography>
                            }
                        </Box>
                        
                    </Box>
                </Grid>
            </Grid>
        )
    }
}


const mapStateToProps = state =>({
    reservations: state.reservationReducer.reservations,
    rooms: state.roomReducers.rooms
})


export default connect(mapStateToProps, {fetchRooms, fetchReservations})(ReservationTable);