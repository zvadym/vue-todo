import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAzU-B-2KGjnCeGIgX9dviHS_7LHjjWB38',
  authDomain: 'zvadym-vue-todo.firebaseapp.com',
  databaseURL: 'https://zvadym-vue-todo.firebaseio.com',
  projectId: 'zvadym-vue-todo',
  storageBucket: 'zvadym-vue-todo.appspot.com',
  messagingSenderId: '182871802931',
  appId: '1:182871802931:web:6fd2a5f4058a1d28b1cf46'
}

firebase.initializeApp(firebaseConfig)

export default firebase
export const db = firebase.firestore()
