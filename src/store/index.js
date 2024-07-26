import { createStore } from 'vuex'
import { v4 } from 'uuid'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    createNewTodo(state, data) {
        state.todos.push({
          id: v4(),
          description: data,
          completed: false
        })
    },

    updateCompleteTodo(state, item) {
      const index = state.todos.findIndex(todo => todo.id === item.id)

      if (index >= 0) {
        state.todos[index].completed = !item.completed
      }
    },

    updateDescriptionTodo(state, value) {
      const index = state.todos.findIndex(todo => todo.id === value.id)

      if (index >= 0) {
        state.todos[index].description = value.description
      }
    },

    deleteTodo(state, item) {
      state.todos = state.todos.filter(todo => todo.id != item.id)
    }
  },
  actions: {

  },
  modules: {
  }
})
