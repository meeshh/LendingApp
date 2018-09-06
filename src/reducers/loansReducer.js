import initialState from './initialState';
import {RECEIVE_LOANS, ADD_LOAN, DELETE_LOAN, EXTEND_LOAN} from '../actions/actionTypes';

export default function loans(state = initialState.loans, action) {
	let newState;
	switch (action.type) {
		case ADD_LOAN:
			console.log('ADD_LOAN Action');
			return;
		case DELETE_LOAN:
			console.log('DELETE_LOAN Action');
			return;
		case EXTEND_LOAN:
			console.log('EXTEND_LOAN Action');
			return;
		case RECEIVE_LOANS:
			newState = action.loans;
			console.log('RECEIVE_LOANS Action');
			return newState;
		default:
			return state;
	}
}
