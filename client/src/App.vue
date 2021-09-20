<template>
  <div id="app">
    <h1>Countdown Timer</h1>
    
    <div v-if="isConnected">
      <h4>Server: Connected</h4>
      <Home></Home>
    </div>
    <div v-else>
      <h4>Server: Not Connected</h4>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Home,
  },
  data() {
    return {
      isConnected: false,
    }
  },
  mounted() {
    this.sockets.subscribe('timer-conn-status', (data) =>{
      data ? this.isConnected = true : this.isConnected = false;
    });
  },
  beforeUnmount() {
    this.$socket.disconnect();
    this.isConnected = false;
  }
}
</script>

<style>
  html {
    box-sizing:border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  #app {
    text-align: center;
  }

  body {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
  }
  #app {
    padding: 10px;
    margin: 0 auto;
    max-width: 1000px;
  }

  input[type=number] {
    padding: 10px;
    font-size: inherit;
    width:100%;
  }

  button {
    padding:10px;
  }

  [v-cloak] {
    opacity:0;
  }

  label {
    width:20%;
    padding:10px 0;
    display:inline-block;
  }

  .timer {
    font-size: 2em;
    margin: 20px;
  }

</style>
