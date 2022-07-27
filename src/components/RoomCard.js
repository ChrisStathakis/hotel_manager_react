import React from 'react';
import { fetchRoom } from '../redux/actions/roomsAction';
import { showRoomAction } from '../redux/actions/genericActions';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@mui/material';
import { connect } from 'react-redux';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


class RoomCard extends React.Component{

  constructor(props){
    super(props);

  }

  handleClick = () =>{
    this.props.fetchRoom(this.props.room.id)
    this.props.showRoomAction(true)
  }

  render(){
    const {room} = this.props;
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           Status {room.used  ? 'Close' : 'Open'}
          </Typography>
          <Typography variant="h5" component="div">
            {room.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Price {room.used}
          </Typography>
          <Typography variant="body2">
            Capacity: {room.capacity} | Extra Cost {room.extra_value_per_person}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.handleClick} size="small">Details</Button>
        </CardActions>
      </Card>
    );
  }
}



const mapStateToProps = state =>({

})


export default connect(mapStateToProps, {fetchRoom, showRoomAction})(RoomCard);