import {combineReducers} from 'redux';
import loans from './loansReducer';
import sessionReducer from './sessionReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	loans,
	sessionState: sessionReducer,
	userState: userReducer
});

export default rootReducer;
