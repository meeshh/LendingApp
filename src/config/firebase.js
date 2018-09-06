import * as firebase from 'firebase';
import { firebaseConfig } from "../CONFIGMASTER";
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
const loansRef = databaseRef.child("loans");

export default loansRef;
