import axiosInstance  from "../../helpers/axiosInstance";
import {
    ROOMS_ENDPOINT_LIST
} from '../../helpers/endpoints';
import { FETCH_ROOMS } from "../actionTypes";


export const fetchRooms = (endpoint=ROOMS_ENDPOINT_LIST) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                const rooms = respData.data;
                return dispatch({
                    type: FETCH_ROOMS,
                    payload: rooms
                })
            }
        )
}