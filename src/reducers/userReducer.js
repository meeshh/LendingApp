import initialState from './initialState';
import {USERS_SET} from '../actions/actionTypes';

const applySetUsers = (state, action) => ({
	...state,
	users: action.users
});

function userReducer(state = initialState.users, action) {
	switch(action.type) {
		case USERS_SET : {
			return applySetUsers(state, action);
		}
		default : return state;
	}
}

export default userReducer;
