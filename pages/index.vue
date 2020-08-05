<template>
  <div class="wrapper">
    <div class="container" v-if="!loading">
      <div class="container-inner">
        <input class="task-input"
               type="text"
               v-model="newTodo"
               @keyup.enter="addTodo"
               placeholder="What needs to be done?">
        <h4>My todo list</h4>
        <div class="filter-container">
          <ul>
            <li @click.prevent="visibility='all'"
                :class="{ selected: visibility === 'all' }">
              <a>All</a>
            </li>
            <li @click.prevent="visibility='active'"
                :class="{ selected: visibility === 'active' }">
              <a>Active</a>
            </li>
            <li @click.prevent="visibility='completed'"
                :class="{ selected: visibility === 'completed' }">
              <a>Completed</a>
            </li>
          </ul>
        </div>
        <div class="todo-box">
          <ul v-if="filteredTodos.length">
            <li v-for="(todo, index) in filteredTodos"
                :key="`todoItem_${index}`"
                :class="{completed: todo.completed, editing: todo === editedTodo}">
              <div style="width: 100%; display: flex; align-items: center;">
                <div class="container-checkbox">
                  <input class="checkbox"
                         type="checkbox"
                         @click="completedTodo(todo)">
                  <span class="checkmark">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                <h5>{{ todo.title }}</h5>
                <h5>{{ todo.newDesc }}</h5>
                <input class="edit task-input"
                       type="text"
                       v-model="todo.title"
                       @blur="doneEdit(todo)"
                       @keyup.enter="doneEdit(todo)">
              </div>
              <div class="flex-icons">
                <i class="fas fa-trash-alt"
                   @click="removeTodo(todo)"></i>
                <i class="fas fa-pen"
                   @click="editTodo(todo)"></i>
              </div>
            </li>
          </ul>
          <template v-else>
            <div v-if="visibility === 'completed'"
                 class="flex">
              <i class="fas fa-info-circle"></i>
              <p class="info-text">You don't have any completed tasks.</p>
            </div>
            <div v-else-if="visibility === 'active'"
                 class="flex">
              <i class="fas fa-info-circle"></i>
              <p class="info-text">You don't have any task that you can complete.</p>
            </div>
            <div v-else
                 class="flex">
              <i class="fas fa-info-circle"></i>
              <p class="info-text">Please add a task to your list.</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div class="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  const STORAGE_KEY = 'todo-storage'
  export default {
    data() {
      return {
        newTodo: '',
        todos: [],
        loading: true,
        editedTodo: null,
        visibility: 'all',
        completed: false
      }
    },
    mounted() {
      this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    computed: {
      filteredTodos() {
        //all
        //completed
        //active
        if (this.visibility === 'completed') {
          return this.todos.filter(obj => obj.completed)
        } else if (this.visibility === 'active') {
          return this.todos.filter(obj => !obj.completed)
        }
        return this.todos
      },
    },
    methods: {
      addTodo() {
        if (this.newTodo === '') {
          alert('Fill')
        } else {
          this.todos.push({title: this.newTodo, completed: false})
          this.newTodo = ''
          this.newDesc = ''
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
        }
      },
      removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
      },
      editTodo(todo) {
        this.editedTodo = todo
      },
      doneEdit(todo) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null;
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.removeTodo(todo)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
      },
      completedTodo(todo) {
        todo.completed = !todo.completed
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrapper {
  .container {
    padding: 0 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &-inner {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      .task-input {
        width: calc(100% - 22px);
        padding: 10px;
        outline: none;
        border: 1px solid $secondary_color;
        @include border-radius(5px);
        &:focus {
          border-color: $primary_color;
        }
      }
      h4 {
        margin: 25px 0;
      }
      .filter-container {
        ul {
          width: fit-content;
          padding: 0;
          margin: 0;
          list-style: none;
          display: flex;
          align-items: center;
          border: 1px solid $secondary_color;
          border-bottom: none;
          @include border-radius(5px 5px 0 0);
          li {
            cursor: pointer;
            padding: 10px 20px;
            border-right: 1px solid $secondary_color;
            @include transition(0.3s);
            &:last-child {
              border: none;
            }
            &:hover {
              background-color: $primary_color;
              color: $primary_light;
            }
            &.selected {
              background-color: $primary_color;
              color: $primary_light;
            }
            a {}
          }
        }
      }
      .todo-box {
        border: 1px solid $secondary_color;
        @include border-radius(0 5px 5px 5px);
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid $secondary_color;
            &:last-child {
              border-bottom: none;
            }
            .container-checkbox {
              margin-right: 10px;
              position: relative;
              height: 30px;
              &:hover {
                .checkmark {
                  background-color: #e0e0e0;
                }
              }
              .checkbox {
                cursor: pointer;
                margin: 0;
                width: 30px;
                height: 30px;
                -webkit-appearance: none;
                outline: none;
                @include border-radius(30px);
              }
              .checkmark {
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                border: 1px solid $secondary_color;
                @include border-radius(30px);
                @include fullscreen(absolute, 0, 0, 0, 0);
                i {
                  display: none;
                  color: $primary_light;
                }
              }
            }
            &.completed {
              .container-checkbox {
                &:hover {
                  .checkmark {
                    background: $green;
                    border-color: $green;
                  }
                }
              }
              .checkmark {
                background: $green;
                border-color: $green;
                i {
                  display: block;
                }
              }
              h5 {
                opacity: 0.5;
                text-decoration: line-through;
              }
            }
            &.editing {
              .container-checkbox {
                display: none;
              }
              h5 {
                display: none;
              }
              .edit {
                display: block;
              }
            }
            .edit {
              display: none;
            }
            .flex-icons {
              display: flex;
              align-items: center;
              margin-left: 20px;
              i {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                width: 30px;
                height: 30px;
                @include border-radius(30px);
                @include transition(0.3s);
                &:last-child {
                  margin-right: 0;
                }
                &.fa-check {
                  background-color: $green;
                  color: $primary_light;
                  &:hover {
                    background-color: $green_hover;
                  }
                }
                &.fa-trash-alt {
                  background-color: $red;
                  color: $primary_light;
                  &:hover {
                    background-color: $red_hover;
                  }
                }
                &.fa-pen {
                  background-color: $primary_color;
                  color: $primary_light;
                  &:hover {
                    background-color: $primary_color_hover;
                  }
                }
              }
            }
          }
        }
        .flex {
          display: flex;
          align-items: center;
          padding: 15px 10px;
          .info-text {
            margin: 0;
            font-size: 14px;
          }
          .fa-info-circle {
            color: $primary_color;
            margin-right: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
  .loading {
    display: flex;
    justify-content: center;

    div {
      width: 1rem;
      height: 1rem;
      margin: 2rem 0.3rem;
      background: $primary_color;
      border-radius: 50%;
      animation: 0.9s bounce infinite alternate;

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.6s;
      }
    }
    @keyframes bounce {
      to {
        opacity: 0.3;
        transform: translate3d(0, -1rem, 0);
      }
    }
  }
}
</style>
