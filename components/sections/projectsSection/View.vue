<template>
  <section class="wrapper">
    <div class="container">
      <div class="container__create-project">
        <label for="project">Create project</label>
        <div class="positionRelative">
          <input id="project"
                 type="text"
                 placeholder="Type your project name.."
                 spellcheck="false">
          <button type="submit">Create</button>
        </div>
      </div>
      <div class="box-container">
        <div class="box-container__header">
          <h3>Projects</h3>
        </div>
        <div class="box-container__content">
          <div class="box-container__content-projects"
               v-for="(n, index) in 5"
               :key="n.id">
            <div class="title-container"
                 :class="{ 'title-container__active': showTasks === index }"
                 @click="expandTasks(index)">
              <h5>{{ index }}. Project</h5>
            </div>
            <template v-if="index === showTasks">
              <div class="box-container__content-projects__tasks"
                   v-for="(n, index) in 3"
                   :key="n.id">
                <p>{{ index }}. Task</p>
                <div class="icons">
                  <i class="fas fa-pen"></i>
                  <i class="fas fa-trash"></i>
                </div>
              </div>
              <div class="positionRelative box-container__content-projects__input">
                <input type="text"
                       placeholder="Type your task.."
                       spellcheck="false">
                <button type="submit">Create</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        showTasks: 0
      }
    },
    methods: {
      expandTasks(i) {
        if (this.showTasks === i) {
          this.showTasks = null
        } else {
          this.showTasks = i
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .wrapper {
    overflow: hidden;
    position: relative;
    padding: 230px 20px;
    min-height: calc(100vh - 524px);
    background-color: $primary_color;
    &:before {
      content: '';
      display: block;
      background-color: $secondary_color;
      height: 400px;
      width: 200%;
      z-index: 1;
      @include fullscreen(absolute, -375px, 0, initial, -200px);
      @include transform(rotate(-7deg));
    }
    &:after {
      content: '';
      display: block;
      background-color: $secondary_color;
      height: 400px;
      width: 200%;
      z-index: 1;
      @include fullscreen(absolute, initial, -200px, -375px, initial);
      @include transform(rotate(-7deg));
    }
    .container {
      margin: 0 auto;
      width: 100%;
      max-width: 1100px;
      label {
        display: block;
        margin-bottom: 5px;
        font-size: 24px;
        color: $primary_light;
        @include fontMedium;
      }
      input {
        width: calc(100% - 107px);
        background-color: $primary_color;
        color: $primary_light;
        border: thin solid $secondary_color;
        padding: 10px 95px 10px 10px;
        font-size: 16px;
        outline: none;
        @include border-radius(5px);
        &::placeholder {
          color: $primary_light;
          opacity: 0.9;
        }
      }
      button {
        cursor: pointer;
        display: block;
        background-color: $secondary_color;
        border: none;
        outline: none;
        padding: 5px 20px;
        color: $primary_light;
        font-size: 18px;
        @include fontMedium;
        @include border-radius(0 5px 5px 0);
        @include fullscreen(absolute, 0, 0, 0, initial);
        @include transition(0.3s);
        &:hover {
          background-color: $primary_light;
          color: $primary_color;
        }
      }
      &__create-project {
        margin-bottom: 20px;
      }
      .box-container {
        border: thin solid $secondary_color;
        @include border-radius(5px);
        &__header {
          background-color: $secondary_color;
          @include border-radius(3px 3px 0 0);
          h3 {
            padding: 5px 10px;
            color: $primary_light;
            @include fontMedium;
          }
        }
        &__content {
          background-color: $primary_color;
          &-projects {
            .title-container {
              cursor: pointer;
              padding: 10px 20px;
              @include transition(0.3s ease);
              &:hover {
                background-color: rgba(255, 133, 27, 1);
              }
              h5 {
                color: $primary_light;
              }
              &__active {
                background-color: rgba(255, 133, 27, 1);
              }
            }
            &__tasks {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 5px 15px 5px 30px;
              p {
                margin: 0;
                color: $primary_light;
              }
              .icons {
                display: flex;
                align-items: center;
                margin-left: 10px;
                i {
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: $primary_light;
                  width: 30px;
                  height: 30px;
                  background-color: $secondary_color;
                  @include border-radius(20px);
                  @include transition(0.3s ease);
                  &:hover {
                    background-color: $primary_light;
                    color: $secondary_color;
                  }
                  &.fa-trash {
                    margin-left: 10px;
                  }
                }
              }
            }
            &__input {
              margin-top: 5px;
              margin-bottom: 15px;
              input {
                border-right: none;
                border-left: none;
                @include border-radius(0);
              }
              button {
                @include border-radius(0);
              }
            }
          }
        }
      }
    }
  }
</style>
