import { FETCH_ROOMS } from "../actionTypes";


const initialState = {
    tickers:{
        count: 0,
        result: [],
        next: null,
        previous: null
    },
}


export default function roomReducer(state=initialState, action){
    switch(action.type){
        case FETCH_ROOMS:
            return{
                ...state,
                rooms: action.payload
            }
        default:
            return state;
    }
}