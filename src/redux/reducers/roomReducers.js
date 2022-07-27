import { FETCH_ROOMS, FETCH_ROOM, REFRESH_ROOM, FETCH_ROOM_PRICES, CREATE_ROOM, DELETE_ROOM } from "../actionTypes";


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
        case REFRESH_ROOM:
            const room = action.payload;
            const new_state = state.rooms.map((obj, index)=>{
                return obj.id === room.id ? room : obj
            })
            return {
                ...state,
                room: action.payload,
                rooms: new_state
            }
        case FETCH_ROOM_PRICES:
            return {
                ...state,
                room_prices: action.payload
            }
        case CREATE_ROOM:
            const new_room = action.payload
            const rooms = [...state.rooms, new_room]
            return {
                ...state,
                rooms: rooms
            }
        case DELETE_ROOM:
            console.log('before filter', state.rooms)
            const new_array = state.rooms.filter((room)=>{return room.id !== action.payload})
            console.log('after filter', new_array)
            return {
                ...state,
                room: new_array
            }
        default:
            return state;
    }
}