import { combineReducers } from "redux";
import tickerReducer from './tickerReducers';
import  roomReducer from './roomReducers';
import authReducer from "./authReducers";

export default combineReducers({
    tickerReducer,
    roomReducer,
    authReducer,
})