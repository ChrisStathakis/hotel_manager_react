
import { SHOW_ROOM } from "../actionTypes";


export const showRoomAction = (bol_) => dispatch => {

    return dispatch({
        type: SHOW_ROOM,
        payload: bol_
    })
}