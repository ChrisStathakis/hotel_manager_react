import { FETCH_RESERVATIONS, FETCH_RESERVATION, CREATE_RESERVATION, UPDATE_RESERVATION, DELETE_RESERVATION } from "../actionTypes";


const initialState = {
    reservations: [],
    activeReservations:[],
    reservation:{},
    activeReservations: []
}


export default function reservationReducer(state=initialState, action){

    switch(action.type){
        case FETCH_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload
            }

        case CREATE_RESERVATION:

            return {
                ...state,
                reservations: [...state.reservations, action.payload]
            }
            
        case UPDATE_RESERVATION:

            return {
                ...state,
                reservation: action.payload,
                reservations: state.reservations.map((obj, index)=>{
                    return obj.id === action.payload.id ? action.payload.id : obj
                })
            }

        case DELETE_RESERVATION:
            return {
                ...state,
                reservation: {},
                reservations: state.reservations.filter((obj)=> {return obj.id !== action.payload})
            }

        default:
            return state
    }

       
}