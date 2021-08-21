import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAghCeRTTiHBMeJVMUJEV-f7InZX5uExMg",
    authDomain: "netflix-clone-8741d.firebaseapp.com",
    projectId: "netflix-clone-8741d",
    storageBucket: "netflix-clone-8741d.appspot.com",
    messagingSenderId: "938067075623",
    appId: "1:938067075623:web:84e49ee7f950ee419ce402",
    measurementId: "G-XRH86PQH05"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };