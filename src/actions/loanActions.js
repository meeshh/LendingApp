import * as types from './actionTypes';

import loansRef from '../config/firebase.js';

export function fetchingLoans() {
	return {type: types.RECEIVE_LOANS, loans: {}};
}

export function receiveLoans(json) {
	return {type: types.RECEIVE_LOANS, loans: json};
}

export function fetchLoans() {
	return dispatch => {
		// dispatch(fetchingLoans());
		loansRef.on('value', snapshot => {
			if(snapshot.val() !== null){
				dispatch(receiveLoans(snapshot.val()))
			} else{
				dispatch(receiveLoans({}))
			}
		});
	};
}

export function addLoan(newLoan){
	return dispatch => {
		loansRef.push().set(newLoan);
	}
}

export function deleteLoan(loanId){
	return dispatch => {
		loansRef.child(loanId).remove();
	}
}

export function extendLoan(extObj){
	return dispatch => {
		let extensionUpdateObj = {};
		extensionUpdateObj['/id'] = extObj.id;
		extensionUpdateObj['/extension'] = extObj.obj;

		loansRef.child(extObj.id).update(extensionUpdateObj);
	}
}
