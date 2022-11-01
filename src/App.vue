
<template> 

  <div class="text-center">
    <img class="mx-auto" alt="Vue logo" src="./assets/logo.png"/>
  </div>

  <MainPage/>
  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainPage from './components/MainPage.vue';

@Options({
  components: {
    MainPage,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
