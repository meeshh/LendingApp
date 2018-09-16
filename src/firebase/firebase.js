import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const auth = firebase.auth();
const db = firebase.database();

export {
	auth,
	db,
};
