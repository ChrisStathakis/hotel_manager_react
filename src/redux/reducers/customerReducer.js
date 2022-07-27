import { UPDATE_COSTUMER, FETCH_COSTUMERS, FETCH_COSTUMER, DELETE_COSTUMER, CREATE, CREATE_CUSTOMER } from "../actionTypes";


const initialState = {
    list: [],
    costumer: {},
    created: {}

}


export default function customerReducer(state=initialState, action){

    switch(action.type){
        case CREATE_CUSTOMER:
            return {
                ...state,
                list: [...state.list, action.payload.data],
                created: action.payload.data
            }
        case FETCH_COSTUMERS:
            console.log('action', action.payload.results)
            return {
                ...state,
                list: action.payload.results
            };
        case FETCH_COSTUMER:
            
            return {
                ...state,
                costumer: action.payload
            }
        case UPDATE_COSTUMER:
            return {
                ...state,
                costumer: action.payload
            }
        case DELETE_COSTUMER:
            return {
                ...state,
                costumer: {}
            }
        default:
            return state
    }
}