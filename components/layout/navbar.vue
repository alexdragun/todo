<template>
  <nav>
    <div class="nav-left">
      <nuxt-link to="/">todo</nuxt-link>
    </div>
    <div class="nav-right">
      <ul>
        <li>
          <nuxt-link to="/projects">Projects</nuxt-link>
        </li>
        <template>
          <li>
            <nuxt-link to="/">Login</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">Register</nuxt-link>
          </li>
        </template>
        <template v-if="false">
          <li>
            <a>Logout</a>
          </li>
        </template>
      </ul>
    </div>
    <div class="hamburger" @click="openSideMenu" :class="{ 'hamburger-active': openMenu }">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <transition name="slide-fade">
      <div v-if="openMenu && isMobile" class="responsive-nav">
        <div class="responsive-nav__inner">
          <ul>
            <li>
              <nuxt-link to="/projects">Projects</nuxt-link>
            </li>
            <template>
              <li>
                <nuxt-link to="/">Login</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Register</nuxt-link>
              </li>
            </template>
            <template v-if="false">
              <li>
                <a>Logout</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        openMenu: false,
        isMobile: false
      }
    },
    watch: {
      openMenu: {
        handler(val) {
          if (process.browser) {
            if (val && this.isMobile) {
              document.body.classList.add('modal-open')
            } else {
              document.body.classList.remove('modal-open')
            }
          }
        }
      }
    },
    mounted () {
      this.$nextTick(function() {
        if (window.removeEventListener) {
          window.addEventListener('resize', this.resizeEvent)
        }
        this.resizeEvent()
      })
    },
    beforeDestroy() {
      if (window.removeEventListener) {
        window.removeEventListener('resize', this.resizeEvent)
      }
    },
    methods: {
      resizeEvent() {
        const clientWidth = window.innerWidth
        this.isMobile = clientWidth <= 767
        if (!this.isMobile) {
          this.openMenu = false
        }
      },
      openSideMenu() {
        this.openMenu = !this.openMenu
      }
    }
  }
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(250px);
  opacity: 0;
}
nav {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $primary_color;
  @media only screen and (max-width: 767px) {
    padding: 20px;
  }
  .nav {
    &-left {
      a {
        cursor: pointer;
        text-transform: uppercase;
        text-decoration: none;
        color: $primary_light;
        font-size: 20px;
        letter-spacing: 2px;
        @include transition(0.3s);
        &:hover {
          color: $secondary_color;
        }
      }
    }
    &-right {
      @media only screen and (max-width: 767px) {
        display: none;
      }
      ul {
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        list-style: none;
        li {
          margin: 0 10px;
          a {
            cursor: pointer;
            position: relative;
            text-decoration: none;
            color: $primary_light;
            font-size: 16px;
            @include transition(0.2s ease-in-out);
            &:hover {
              color: $secondary_color;
            }
          }
        }
      }
    }
  }
  .hamburger {
    cursor: pointer;
    display: none;
    @media only screen and (max-width: 767px) {
      display: flex;
      flex-direction: column;
    }
    &-active {
      span {
        background-color: $secondary_color !important;
        &:nth-child(1) {
          margin: 0;
          @include transform(rotate(45deg));
        }
        &:nth-child(2) {
          opacity: 0;
          @include transform(translateX(-40px));
        }
        &:nth-child(3) {
          margin-top: -10px;
          @include transform(rotate(-45deg));
        }
      }
    }
    &:hover {
      span {
        background-color: $secondary_color;
      }
    }
    span {
      display: block;
      width: 30px;
      height: 3px;
      background-color: $primary_light;
      margin-bottom: 5px;
      opacity: 1;
      @include transition(0.3s ease);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .responsive-nav {
    background-color: $primary_color;
    width: 100%;
    max-width: 250px;
    height: calc(100% - 64px);
    z-index: $z-index_fixed;
    @include fullscreen(fixed, 64px, 0, 0, initial);
    @media only screen and (max-width: 450px) {
      max-width: 100%;
    }
    &__inner {
      padding: 20px;
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
          margin: 10px 0;
          &:first-child {
            margin-top: 0;
          }
          a {
            cursor: pointer;
            position: relative;
            text-decoration: none;
            color: $primary_light;
            font-size: 18px;
            @include transition(0.2s ease-in-out);
            &:hover {
              color: $secondary_color;
            }
          }
        }
      }
    }
  }
}
</style>
