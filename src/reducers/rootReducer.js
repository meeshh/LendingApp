import {combineReducers} from 'redux';
import loans from './loansReducer';

const rootReducer = combineReducers({
	loans
});

export default rootReducer;
