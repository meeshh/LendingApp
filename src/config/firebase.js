import * as firebase from 'firebase';
import { firebaseConfig } from "../CONFIGMASTER";
import 'firebase/auth';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const databaseRef = firebase.database().ref();
const loansRef = databaseRef.child("loans");

const auth = firebase.auth();

export default loansRef;
export {
	auth,
};
