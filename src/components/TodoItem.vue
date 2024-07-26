<template>
    <div class="card">
        <div>
            <svg class="complete" :fill="item.completed ? '#1dab01' : ''" @click="completeTodo"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"></path>
            </svg>
        </div>
        <div v-show="!isEditing" class="item-description" >
            <span :style="{'text-decoration': item.completed ? 'line-through' : ''}">
                {{ item.description }}
            </span>
        </div>
        <div v-show="isEditing" class="item-description">
            <input ref="inputEdit" :onBlur="dontSaveEditTodo" v-model="textEditing" class="edit-input" @keypress.enter="saveEditedTodo" type="text" />
        </div>
        <div class="tools">
            <svg @click="editTodo" class="update" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"></path>
            </svg>
            <svg @click="deleteItem" class="delete" xmlns="http://www.w3.org/2000/svg">
                <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            isEditing: false,
            textEditing: this.item.description,
        }
    },

    updated() {
        if (this.isEditing) {
            this.$refs.inputEdit.focus()
        }
    },

    methods: {
        deleteItem() {
            this.$emit('deleteTodo', this.item)
        },
        completeTodo() {
            this.$store.commit('updateCompleteTodo', this.item)
        },
        editTodo() {
            this.isEditing = !this.isEditing
        },
        dontSaveEditTodo() {
            this.textEditing = this.item.description
            this.isEditing = false
        },
        saveEditedTodo() {
            this.$store.commit('updateDescriptionTodo', {
                id: this.item.id,
                description: this.textEditing
            })

            this.textEditing = this.item.description
            this.isEditing = false

            console.log(this.$store.state.todos)
        }
    }
}
</script>

<style scoped>
.card {
    background-color: rgb(250, 250, 250);
    margin-bottom: 5px;
    color: black;
    display: flex;
    justify-content: space-between;
}

.item-description {
    padding: 0px 10px;
    width: 100%;
    margin: auto;
}

.edit-input {
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    font-size: 1em;
    padding: 10px 10px;
    margin-left: -10px;
}

.edit-input:focus {
    outline: none;
}

svg {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
}

.tools {
    display: flex;
    height: 50px;
    cursor: pointer;
}

.update {
    padding: 10px;
    background-color: rgb(171, 244, 171);
}

.delete {
    padding: 10px;
    background-color: rgb(255, 103, 103);
}

.complete {
    padding: 10px;
    color: red;
    cursor: pointer;
}
</style>