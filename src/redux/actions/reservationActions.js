import axiosInstance from "../../helpers/axiosInstance"
import { RESERVATION_LIST_ENDPOINT, RESERVATION_UPDATE_ENDPOINT } from "../../helpers/endpoints"
import { FETCH_RESERVATIONS, FETCH_RESERVATION, UPDATE_RESERVATION, DELETE_RESERVATION, CREATE_RESERVATION } from "../actionTypes"


const CHECKIN = 'CHECKIN';

export const fetchReservations = (endpoint=RESERVATION_LIST_ENDPOINT) => dispatch => {

    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_RESERVATIONS,
                    payload: respData.data
                })
            }
        )
}


export const fetchResevation = (res_id) => dispatch => {
    const endpoint = `RESERVATION_UPDATE_ENDPOINT${res_id}/`;
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_RESERVATION,
                    payload: respData.data
                })
            }
        )
}


export const updateReservation = (res_id, data) => dispatch => {
    const endpoint = `${RESERVATION_UPDATE_ENDPOINT}${res_id}/`;
    axiosInstance.put(endpoint, data)
        .then(
            respData=>{
                return dispatch({
                    type: UPDATE_RESERVATION,
                    payload: respData.data
                })
            }
        )
}


export const deleteReservation = (res_id) => dispatch =>{
    const endpoint = `RESERVATION_UPDATE_ENDPOINT${res_id}/`;

    axiosInstance.delete(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: DELETE_RESERVATION,
                    payload: res_id
                })
            }
        )
}


export const createReservation = (data) => dispatch => {
    const endpoint = RESERVATION_LIST_ENDPOINT;
    axiosInstance.post(endpoint, data)
        .then(
            respData=>{
                return dispatch({
                    type: CREATE_RESERVATION,
                    payload: respData.data
                })
            }
        )
}


