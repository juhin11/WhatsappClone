import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCR_Lfdfh2zb-DJXhpDiwSdrEQIJQe3z5k",
    authDomain: "whatsappclone-karan.firebaseapp.com",
    projectId: "whatsappclone-karan",
    storageBucket: "whatsappclone-karan.appspot.com",
    messagingSenderId: "845684456522",
    appId: "1:845684456522:web:dc5b28036a0a53490b7ab3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};