<template>
  <div id="app">
    <VueTask1/>
  </div>
</template>

<script>
import VueTask1 from './components/VueTask1'

export default {
  name: 'App',
  components: {
    VueTask1
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
