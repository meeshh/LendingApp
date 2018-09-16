import initialState from './initialState';
import {AUTH_USER_SET, ERROR} from '../actions/actionTypes';

// const INITIAL_STATE = {
// 	authUser: null,
// };

const applySetAuthUser = (state, action) => ({
	...state,
	authUser: action.authUser
});

const applySetError = (state, action) => ({
	...state,
	error: action.error
});

function sessionReducer(state = initialState.authUser, action) {
	switch(action.type) {
		case AUTH_USER_SET : {
			return applySetAuthUser(state, action);
		}
		case ERROR : {
			return applySetError(state, action)
		}
		default : return state;
	}
}

export default sessionReducer;
