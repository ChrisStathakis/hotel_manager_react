import { COSTUMER_LIST_ENDPOINT, COSTUMER_UPDATE_ENDPOINT } from "../../helpers/endpoints";
import { DELETE_COSTUMER, FETCH_COSTUMER, FETCH_COSTUMERS, UPDATE_COSTUMER, CREATE_CUSTOMER } from "../actionTypes";
import axiosInstance from "../../helpers/axiosInstance";


export const fetchCostumers = (endpoint=COSTUMER_LIST_ENDPOINT) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                
                return dispatch({
                    type: FETCH_COSTUMERS,
                    payload: respData.data
                })
            }
        )
}


export const fetch_costumer = (endpoint) => dispatch =>{
    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_COSTUMER,
                    payload: respData.data
                })
            }
        )
}

export const update_costumer = (data) => dispatch =>{
    const endpoint = COSTUMER_UPDATE_ENDPOINT + data.id + '/';
    axiosInstance.put(endpoint, data)
        .then(
            repsData=>{
                return dispatch({
                    type: UPDATE_COSTUMER,
                    payload: respData.data
                })
            }
        )
};


export const delete_costumer = endpoint =>dispatch => {
    axiosInstance.delete(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: DELETE_COSTUMER,
                    payload: respData.data
                })
            }
        )
}


export const createCustomer = data => dispatch => {
    axiosInstance.post(COSTUMER_LIST_ENDPOINT, data)
        .then(
            respData=>{
                return dispatch({
                    type: CREATE_CUSTOMER,
                    payload: respData
                })
            }
        )
}