import * as types from './actionTypes';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

export function setAuthError(error) {
	return {type: types.ERROR, error: error};
}

export function doSignIn(email, password, history){
	return dispatch => {
		auth.doSignInWithEmailAndPassword(email, password)
		.then( () => {
			history.push(routes.HOME);
			dispatch(setAuthError(null)); //reset the error
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}

export function doCreateUser(email, password, username, history){
	return dispatch => {
		auth.doCreateUserWithEmailAndPassword(email, password)
		.then(authUser => {
			dispatch(setAuthError(null));
			dispatch(createUser(authUser.uid, username, email, history));
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}

export function createUser(uid, username, email, history){
	return dispatch => {
		db.doCreateUser(uid, username, email)
		.then(() => {
			history.push(routes.HOME);
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}

export function doSignOut(history){
	return dispatch => {
		auth.doSignOut()
		.then(authUser => {
			history.push(routes.LANDING);
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}

export function doPasswordUpdate(password, history){
	return dispatch => {
		auth.doPasswordUpdate(password)
		.then(() => {
			history.push(routes.HOME);
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}

export function doPasswordReset(email, history){
	return dispatch => {
		auth.doPasswordReset(email)
		.then(() => {
			history.push(routes.SIGN_IN);
		})
		.catch(error => {
			dispatch(setAuthError(error));
		});
	}
}
