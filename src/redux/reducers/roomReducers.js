import { FETCH_ROOMS, FETCH_ROOM } from "../actionTypes";


const initialState = {
    rooms: [],
    room: {},
    room_prices: []
}


export default function roomReducers(state=initialState, action){
    switch(action.type){
        case FETCH_ROOMS:
            return{
                ...state,
                rooms: action.payload
            }
        case FETCH_ROOM:
            return {
                ...state,
                room: action.payload
            }
        default:
            return state;
    }
}