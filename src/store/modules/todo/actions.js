import Vue from 'vue'
import { CardModel, TaskModel } from './models'
import firebaseActions from '@/services/firebase/actions'

const cardActions = {
  createCard({ rootGetters, dispatch }) {
    const card = {
      ...new CardModel({
        owner: rootGetters['users/user'].uid
      })
    }
    dispatch('firebaseUpdateCard', { card })
  },
  updateCard({ dispatch }, card) {
    dispatch('firebaseUpdateCard', { card })
  },
  removeCard({ dispatch }, card) {
    dispatch('firebaseDeleteCard', { card })
  }
}

const taskActions = {
  addTask({ dispatch }, { card, taskData }) {
    card.tasks.push({
      ...new TaskModel({
        ...taskData,
        order: card.tasks.length + 1
      })
    })
    dispatch('firebaseUpdateCard', { card })
  },
  updateTask({ dispatch }, { card, task }) {
    Vue.set(card.tasks, card.tasks.findIndex(x => x.id == task.id), task)
    dispatch('firebaseUpdateCard', { card })
  },
  updateTasksOrder({ dispatch }, { card, orderedIds }) {
    card.tasks = card.tasks.map(task => {
      return {
        ...task,
        order: orderedIds.indexOf(task.id)
      }
    })
    dispatch('firebaseUpdateCard', { card })
  },
  deleteTask({ dispatch }, { card, deleteTaskId }) {
    card.tasks = card.tasks.filter(o => o.id !== deleteTaskId)
    dispatch('firebaseUpdateCard', { card })
  }
}

export default {
  ...firebaseActions,
  ...cardActions,
  ...taskActions
}
