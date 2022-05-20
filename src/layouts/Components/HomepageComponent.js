import React from 'react';
import {
    Grid,
  

} from '@mui/material'
import RoomCard from '../../components/RoomCard';


export default function HomepageComponent(props) {

    return (
        <Container maxWidth="lg" xs={6} md={8}>
            <Grid container spacing={4}>
              {props.rooms ? props.rooms.map((room)=>(
                <Grid item key={room} sx={12} sm={6} md={4}>
                  <RoomCard room={room} />
                </Grid> 
              )): null}
            </Grid>
           
        </Container>
    )
}