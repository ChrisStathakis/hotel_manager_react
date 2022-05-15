import { accordionActionsClasses } from "@mui/material";
import { UPDATE_COSTUMER, FETCH_COSTUMERS, FETCH_COSTUMER, DELETE_COSTUMER } from "../actionTypes";


const initialState = {
    costumers: [],
    costumer: {},

}


export default function costumerReducer(state=initialState, action){

    switch(action.type){
        case FETCH_COSTUMERS:
            return {
                ...state,
                costumers: action.payload
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

    }
}