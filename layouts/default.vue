<template>
  <div>
    <primaryNavbar />
    <nuxt />
  </div>
</template>

<script>
  import primaryNavbar from '@/components/layout/navbar'

  export default {
    components: {
      primaryNavbar
    }
  }
</script>
