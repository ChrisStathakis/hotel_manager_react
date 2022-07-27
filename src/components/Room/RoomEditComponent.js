import React from 'react';
import {connect} from 'react-redux';
import {
    Grid, Typography,
    Table, TableCell, TableContainer, TableRow, TableHead, TableBody,
    Paper,
    TextField,
    FormControlLabel,
    Button, Checkbox,
    Box,
} from '@mui/material';

import DeleteIcon from  '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../helpers/axiosInstance';
import { ROOM_DETAIL_ENDPOINT, ROOM_PRICE_LIST_ENDPOINT } from '../../helpers/endpoints';
import { updateRoom, deleteRoom, fetchRooms} from '../../redux/actions/roomsAction';



class RoomEditComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            room: {
                title: '',
                value: 0,
                capacity:0,
                extra_value_per_person:0

            },
            room_prices: [],

        }
    }


    componentDidMount(){
        const room_id = this.props.room_id;
        const myThis = this;
        const endpoint = ROOM_DETAIL_ENDPOINT + room_id + '/';
        const prices_endpoint = ROOM_PRICE_LIST_ENDPOINT + '?room=' + room_id;
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    myThis.setState({
                        room: respData.data
                    })
                }
            )
        axiosInstance.get(prices_endpoint)
            .then(
                respData=>{
                    console.log('room_prices', respData.data)
                    myThis.setState({
                        room_prices: respData.data
                    })
                }
            )

    }

    handleSubmit = () => {
        const data = this.state.room;
        this.props.updateRoom(data)
    }



    handleDeleteRoom = () => {
        const room_id = this.props.room_id;
        this.props.deleteRoom(room_id);
        this.props.closeWindow()
    }

    handleClose = () => { this.props.closeWindow()}

    render(){
        const { room, room_prices } = this.state;
       
        return (
            <Grid container >
                <Grid child xs={12}>
                    <Typography>{room.title}</Typography>
                    <Button onClick={this.handleDeleteRoom} justify='space-between' spacing={24} startIcon={<DeleteIcon />} color='error' variant='contained'>DELETE</Button>
                    <Button onClick={this.handleClose} justify='space-between' spacing={24} startIcon={<CloseIcon />} color='warning' variant='contained'>Close</Button>
                </Grid>
                <Grid child xs={6} component={Paper}>
                    <Typography>Edit room</Typography>
                    <Box component="form" noValidate>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label='Active'
                        />
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            name='title'
                            label='Title'
                            type='text'
                            id='title'
                            value={room.title}
                        />
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            name='capacity'
                            label='capacity'
                            type='number'
                            id='capacity'
                            value={room.capacity}
                        />
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            name='value'
                            label='Room Price'
                            type='number'
                            id='value'
                            value={room.value}
                        />
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            name='extra_value_per_person'
                            label='Extra cost Per Person'
                            type='number'
                            id='extra_value_per_person'
                            value={room.extra_value_per_person}
                        />
                        <Button onClick={this.handleSubmit} type="submit" variant='contained'>Save</Button>
                    </Box>
                </Grid>
                <Grid child xs={6}>
                    <TableContainer component={Paper}>
                        <Table arial table='simply table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Price | P/p</TableCell>
                                    <TableCell>Minimum Days</TableCell>
                                    <TableCell>Minimum Days</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {room_prices.count > 0 ? room_prices.results.map((price_room)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{price_room.date_range_}</TableCell>
                                            <TableCell>{price_room.title}</TableCell>
                                            <TableCell>{price_room.value} | {price_room.extra_value_per_person}</TableCell>
                                            <TableCell>{price_room.minimum_days}</TableCell>
                                        </TableRow>
                                    )
                                }): null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {updateRoom, deleteRoom, fetchRooms})(RoomEditComponent);