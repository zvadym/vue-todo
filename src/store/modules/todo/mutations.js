import Vue from 'vue'

export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'

export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const DELETE_CARD = 'DELETE_CARD'

// eslint-disable-next-line
const cardMutations = {
  [ADD_CARD](state, card) {
    state.cards.push(card)
  },
  [UPDATE_CARD](state, card) {
    Vue.set(state.cards, state.cards.findIndex(x => x.id == card.id), card)
  },
  [DELETE_CARD](state, id) {
    state.cards = state.cards.filter(task => task.id !== id)
  }
}

// eslint-disable-next-line
const taskMutations = {
  [ADD_TASK](state, { card, task }) {
    card.tasks.push(task)
  },
  [UPDATE_TASK](state, { card, task }) {
    Vue.set(card.tasks, card.tasks.findIndex(x => x.id == task.id), task)
  },
  [DELETE_TASK](state, { card, task }) {
    card.tasks = card.tasks.filter(o => o.id !== task.id)
  }
}

export default {
  // All card/task mutations are switched off.
  // Vuexfire used instead
  // ...cardMutations,
  // ...taskMutations,
}
