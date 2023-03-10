import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'

const config = ({
    apiKey: "AIzaSyCXD22Yx-IaI6KJjcWyDlhMv4V-TGNl148",
    authDomain: "innovative-unveil-your-ideas.firebaseapp.com",
    projectId: "innovative-unveil-your-ideas",
    storageBucket: "innovative-unveil-your-ideas.appspot.com",
    messagingSenderId: "372700654711",
    appId: "1:372700654711:web:87b5f306b76c60960b2a72",
    measurementId: "G-NG7RC6N9BD"
});

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);