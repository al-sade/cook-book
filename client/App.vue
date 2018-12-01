<template>
  <div id="app">
      <app-header></app-header>
      <router-view/>
  </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import appHeader from './components/partials/Header.vue'

    export default {
      name: 'App',
        components: {
          appHeader
        }
    }
</script>

<style>
    @import './assets/css/style.css';

    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
</style>
