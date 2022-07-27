import axios from "axios";
import axiosInstance  from "../../helpers/axiosInstance";
import {
    ROOMS_ENDPOINT_LIST, ROOM_DETAIL_ENDPOINT, ROOM_PRICE_LIST_ENDPOINT
} from '../../helpers/endpoints';
import { FETCH_ROOMS, FETCH_ROOM, FETCH_ROOM_PRICES, REFRESH_ROOM, CREATE_ROOM, DELETE_ROOM } from "../actionTypes";


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
    const endpoint = `${ROOM_DETAIL_ENDPOINT}${id}/`;
    console.log(endpoint)
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

export const updateRoom = (id, data) => dispatch => {
    const endpoint = `${ROOM_DETAIL_ENDPOINT}${id}/`;
    axiosInstance.put(endpoint, data)
        .then(
            respData=>{

                return dispatch({
                    type: REFRESH_ROOM,
                    payload: respData.data
                })
            }
        )
}

export const fetchRoomPrices = (id) => dispatch=>{
    const endpoint = ROOM_PRICE_LIST_ENDPOINT + '?room=' + id;
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_ROOM_PRICES,
                    payload: respData.data
                })
            }
        )
}

export const createRoom = (data) => dispatch => {
    const endpoint = ROOMS_ENDPOINT_LIST;
    axiosInstance.post(endpoint, data)
        .then(
            respData=>{

                return dispatch({
                    type: CREATE_ROOM,
                    payload: respData.data
                })
            }
        )
}


export const deleteRoom = (id) => dispatch => {
    const endpoint = ROOM_DETAIL_ENDPOINT + id + '/';
    axiosInstance.delete(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: DELETE_ROOM,
                    payload: id
                })
            }
            
        )
}