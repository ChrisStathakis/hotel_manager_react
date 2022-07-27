
import { SHOW_ROOM } from "../actionTypes";

const initialState = {
    showRoom: false
}

export default function genericReducer(state=initialState, action) {

    switch(action.type){
        case SHOW_ROOM:
            console.log('changr', action.payload)
            return {
                ...state,
                showRoom:action.payload
            }
        default:
            return state
    }
}