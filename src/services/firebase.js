import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestoreAction } from 'vuexfire'
import { CardModel, ItemModel } from '@/store/models'

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
export const cardsRef = db.collection('cards')

export const firebaseActions = {
  firebaseUpdateCard: firestoreAction((context, { card }) => {
    return cardsRef.doc(card.id).set(card)
  }),
  firebaseDeleteCard: firestoreAction((context, { cardId }) => {
    return cardsRef.doc(cardId).delete()
  }),
  firebaseBindCards: firestoreAction(({ bindFirestoreRef, getters }) => {
    return bindFirestoreRef(
      'cards',
      // Get only user's cards
      cardsRef.where('owner', '==', getters.user.uid),
      {
        serialize: snapshot => {
          // Wrap data into CardModel to set all required fields
          const data = snapshot.data()
          return {
            ...new CardModel({
              ...data,
              id: snapshot.id,
              items: data.items.map(item => {
                return { ...new ItemModel({ ...item }) }
              })
            })
          }
        },
        reset: false
      }
    )
  })
}
