import axiosInstance  from "../../helpers/axiosInstance";
import {
    ROOMS_ENDPOINT_LIST, ROOM_DETAIL_ENDPOINT
} from '../../helpers/endpoints';
import { FETCH_ROOMS, FETCH_ROOM, FETCH_ROOM_PRICES } from "../actionTypes";


export const fetchRooms = (endpoint=ROOMS_ENDPOINT_LIST) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const rooms = respData.data;
                return dispatch({
                    type: FETCH_ROOMS,
                    payload: rooms.results
                })
            }
        )
}

export const fetchRoom = (id) => dispatch => {
    const endpoint = `{ROOM_DETAIL_ENDPOINT}{id}/`;
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_ROOM,
                    payload: respData.data
                })
            }
        )
}

export const fetchRoomPrices = (id) => dispatch=>{
    axiosInstance.get(ROOM_DETAIL_ENDPOINT + id  +'/')
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_ROOM,
                    payload: respData.data
                })
            }
        )
}