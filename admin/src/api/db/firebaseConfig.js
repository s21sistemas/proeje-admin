// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDA3Vlj5YM0gIR40eH-JDMAd28DPFtxcm4',
  authDomain: 'proeje-bbc0c.firebaseapp.com',
  projectId: 'proeje-bbc0c',
  storageBucket: 'proeje-bbc0c.firebasestorage.app',
  messagingSenderId: '23539267147',
  appId: '1:23539267147:web:a394968f418c6614d97fce'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Inicializa Firestore y Auth
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, auth, db, storage }
