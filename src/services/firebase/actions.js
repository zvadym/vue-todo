import { firestoreAction } from 'vuexfire'
import { CardModel, TaskModel } from '@/store/modules/todo/models'
import { cardsRef } from './index'

export default {
  firebaseUpdateCard: firestoreAction((context, { card }) => {
    return cardsRef.doc(card.id).set(card)
  }),
  firebaseDeleteCard: firestoreAction((context, { card }) => {
    return cardsRef.doc(card.id).delete()
  }),
  firebaseBindCards: firestoreAction(({ bindFirestoreRef, rootGetters }) => {
    return bindFirestoreRef(
      'cards',
      // Get only user's cards
      cardsRef.where('owner', '==', rootGetters['users/user'].uid),
      {
        serialize: snapshot => {
          // Wrap data into CardModel to set all required fields
          const data = snapshot.data()
          return {
            ...new CardModel({
              ...data,
              id: snapshot.id,
              tasks: data.tasks.map(task => {
                return { ...new TaskModel({ ...task }) }
              })
            })
          }
        },
        reset: false
      }
    )
  })
}
