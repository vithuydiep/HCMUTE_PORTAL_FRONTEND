import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDpT0_5Yx2SaF_0IqUynDxOTDk7Hdk5M9I',
  authDomain: 'psychic-expanse-332504.firebaseapp.com',
  projectId: 'psychic-expanse-332504',
  storageBucket: 'psychic-expanse-332504.appspot.com',
  messagingSenderId: '27184190514',
  appId: '1:27184190514:web:671ce1e1c2c0a2423d582b',
  measurementId: 'G-LPYS2SMG3S',
}
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage
