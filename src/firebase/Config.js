import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBq8Ru1WN0nsJ0x_XcHjjncH1C3NFqNjdY",
    authDomain: "musicify-53e24.firebaseapp.com",
    projectId: "musicify-53e24",
    storageBucket: "musicify-53e24.appspot.com",
    messagingSenderId: "1034247795791",
    appId: "1:1034247795791:web:840327f52d38d48928a63a"
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const Auth = firebase.auth();
const fbStorage = firebase.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

export {fireStore, Auth, fbStorage, timeStamp};