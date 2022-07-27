import { combineReducers } from "redux";
import tickerReducer from './tickerReducers';
import  roomReducers from './roomReducers';
import authReducer from "./authReducers";
import genericReducer from './genericReducer';
import customerReducer from "./customerReducer";
import reservationReducer from "./reservationReducer";


export default combineReducers({
    tickerReducer,
    roomReducers,
    authReducer,
    customerReducer,
    genericReducer,
    reservationReducer
})