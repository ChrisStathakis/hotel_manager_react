import { Button, Card, CardActions, CardContent, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React from 'react';
import { RESERVATION_UPDATE_ENDPOINT } from '../../helpers/endpoints'
import axiosInstance from '../../helpers/axiosInstance'

export function ReservationCard(props){
    const endpoint = RESERVATION_UPDATE_ENDPOINT + props.reservation.id + '/';

    function doneReservation(){
        const data = {...props.reservation, checkIn: false, inCancel: false, isDone: true}
        axiosInstance.put(endpoint, data).then(respData =>{props.closeWindow()})
    }

    function checkOut(){
        const data = {...props.reservation, checkIn: false, isCancel: false, isDone: true };
        axiosInstance.put(endpoint, data).then(respdata=>{props.closeWindow()})
    }

    function checkIn(){
        const data = {...props.reservation, checkIn: true, isCancel: false, isDone: false };
        axiosInstance.put(endpoint, data).then(respData => {props.closeWindow()})
    }

    function cancelReservation(){
        const data = {...props.reservation, checkIn: false, isCancel: true, isDone: false };
        axiosInstance.put(endpoint, data).then(respData => {props.closeWindow()})
    }

    function deleteReservation(){
        axiosInstance.delete(endpoint)
    }

    function closeWindow(){
        props.closeWindow()
    }

    return (
        
        <Card>
            <CardContent>
                <Button onClick={closeWindow}>Close</Button>
                <Typography gutterBottom variant="h5" component="div">{props.reservation.title} | {props.reservation.str_customer}</Typography>
                <Typography>Check in: {props.reservation.start}</Typography>
                <Typography>Check Out: {props.reservation.end}</Typography>
            </CardContent>
            <CardContent>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>{props.reservation.final_value}</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>{props.reservation.str_status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Capacity</TableCell>
                            <TableCell>{props.reservation.capacity}</TableCell>
                            <TableCell>days</TableCell>
                            <TableCell>{props.reservation.days}</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
            </CardContent>
            <CardActions>
                <Button onClick={checkIn} size="small">CheckIn</Button>
                <Button onClick={checkOut} size="small">CheckOut</Button>
            </CardActions>
            <CardActions>
                <Button onClick={cancelReservation} size="small">Cancel</Button>
            </CardActions>
        </Card>

    )

}