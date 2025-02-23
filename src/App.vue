<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './components/index.vue';

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
