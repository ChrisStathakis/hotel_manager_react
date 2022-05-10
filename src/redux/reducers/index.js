import { combineReducers } from "redux";
import tickerReducer from './tickerReducers';
import  roomReducer from './roomReducers';

export default combineReducers({
    tickerReducer,
    roomReducer,
})