import {FETCH_TICKERS, FETCH_TICKER, UPDATE_TICKER} from "../actionTypes";

const initialState = {
    tickers:{
        count: 0,
        result: [],
        next: null,
        previous: null
    },
    ticker: {}
}

export default function tickerReducer(state=initialState, action) {
    switch (action.type){
        case FETCH_TICKERS:
            return {
                ...state,
                tickers: action.payload
            };
        case FETCH_TICKER:
            return {
                ...state,
                ticker: action.payload
            };
        case UPDATE_TICKER:
            return state;
        default:
            return state;
    }
}