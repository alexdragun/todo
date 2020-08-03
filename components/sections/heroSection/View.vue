<template>
  <section class="wrapper">
    <div class="container">
      <div class="container__inner">
        <h1 class="title">{{ title }}<span> {{ titleExtend }}</span></h1>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Welcome to my',
        titleExtend: 'todo list'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    position: relative;
    padding: 20px 0;
    height: calc(100vh - 104px);
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
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      @include fullscreen(absolute, 0, 0, 0, 0);
      @media only screen and (max-width: 500px) {
        padding: 0 25px;
      }
      &__inner {
        h1 {
          text-align: center;
          &.title {
            text-transform: uppercase;
            color: $primary_light;
          }
          span {
            white-space: nowrap;
            color: $secondary_color;
          }
        }
      }
    }
  }
</style>
