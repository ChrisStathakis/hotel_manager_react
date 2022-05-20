import React from "react";
import { connect } from "react-redux";
import {fetchRoom} from'../redux/actions/roomsAction';


class RoomView extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            room: {},
            extra_prices: {},
            extra: {}
        }
    }


    componentDidMount(){

        const room_id = this.props.room_id;
        this.props.fetchRoom(room_id);
    }

    render(){
        const room = this.props.room;

        return(
            <p>{room}</p>
        )
    }

}


const mapStateToProps = state =>({
    room: state.roomReducers.room
});


export default connect(mapStateToProps, {fetchRoom})(RoomView);

