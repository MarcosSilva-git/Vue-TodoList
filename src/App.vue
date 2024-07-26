<template>
    <TodoList />
</template>

<script>
  import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
body {
  background-color: rgb(39, 39, 39);
}
#app {
  font-family:  sans-serif;
  margin: 60px;
  color: rgba(255, 255, 255, 0.741)
}
</style>
