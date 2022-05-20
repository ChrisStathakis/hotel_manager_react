import { combineReducers } from "redux";
import tickerReducer from './tickerReducers';
import  roomReducers from './roomReducers';
import authReducer from "./authReducers";

export default combineReducers({
    tickerReducer,
    roomReducers,
    authReducer,
})