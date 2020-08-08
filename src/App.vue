<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  button, button:active, button:focus, button:hover,
  input, input:active, input:focus, input:hover,
  .card, .card:hover, .card:focus, .card:active {
    outline:0px !important;
    -webkit-appearance:none;
    box-shadow: none !important;
  }

  .btn-primary {
    background-color: #ffffff;
    border: 1px solid rgb(50,50,50);
    color:rgb(50,50,50);

    &.active, &:hover, &:focus {
      background-color:rgb(50,50,50);
      border: 1px solid rgb(50,50,50);
      color:#ffffff;
    }
  }
}
</style>
