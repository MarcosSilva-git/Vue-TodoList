<template>
    <form @click.prevent>
        <input type="text" v-model="newTodo" /> 

        <button @click="createNewTodo" :disabled="newTodo.trim() === ''">
            Adicionar
        </button>
    </form>

    <TodoItem v-for="todo in $store.state.todos" 
            @deleteTodo="onDeleteItem"
            :key="todo.id"
            :item="todo" />
</template>

<script>
    import TodoItem from '@/components/TodoItem.vue';

    export default {
        components: { 
            TodoItem
        },
        data() {
            return {
                newTodo: '',
            }
        },
        
        methods: {
            createNewTodo() {
                this.$store.commit('createNewTodo', this.newTodo)
                this.newTodo = ''
            },

            onDeleteItem(item) {
                this.$store.commit('deleteTodo', item)
            }
        }
    }
</script>

<style scoped>
form {
    height: 40px;
    display: flex;
    margin-bottom: 20px;
}

input {
    width: 100%;
    border: none;
    padding-left: 10px;
    font-size: 1em;
}

button {
    background-color: rgb(164, 92, 219);
    color: inherit;
    border: none;
    margin-left: 5px;
    padding: 0px 20px;
    cursor: pointer;
    font-size: 1em;
}
</style>