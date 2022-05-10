import axiosInstance from "../../helpers/axiosInstance";
import {
    TICKER_LIST_ENDPOINT, TICKER_UPDATE_ENDPOINT,

} from "../../helpers/endpoints";

import {
    FETCH_TICKERS, UPDATE_TICKER
} from "../actionTypes";


export const fetchTickers = (endpoint=TICKER_LIST_ENDPOINT) => dispatch => {
    axiosInstance.get(endpoint)
        .then(
            respData=> {
                const tickers = {
                    count: respData.data.count,
                    next: respData.data.next,
                    previous: respData.data.previous,
                    results: respData.data.results
                };
                return dispatch({
                    type: FETCH_TICKERS,
                    payload: tickers
                })
            }
            )
}

export const fetchTicker = (endpoint) => dispatch => {

    axiosInstance.get(endpoint)
        .then(
            respData=>{
                return dispatch({
                    type: FETCH_TICKER,
                    payload: respData.data
                })
            }
        )
};


export const updateTicker = data => dispatch=>{
    const endpoint = TICKER_UPDATE_ENDPOINT + data.id;
    axiosInstance.put(endpoint, data)
        .then(
            respData=>{
                return dispatch({
                    type: UPDATE_TICKER,
                    payload: respData.data
            })
            }

        )
}