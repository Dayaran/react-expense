import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDNyBBwzatb-CJUriBeFwMmX7YE12kVueI",
    authDomain: "expensetracker-app123.firebaseapp.com",
    projectId: "expensetracker-app123",
    storageBucket: "expensetracker-app123.appspot.com",
    messagingSenderId: "853790456612",
    appId: "1:853790456612:web:1420680a36a7587e14d1b1"
};

const firetest = firebase.initializeApp(config);
export default firetest; 