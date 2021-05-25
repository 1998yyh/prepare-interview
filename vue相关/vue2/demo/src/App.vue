<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-for="(obj,index) in list" :key="index">{{obj}}</div>
    <button @click="changelist">click</button>
  </div>
</template>

<script>

export default {
  name: 'App',

  mounted(){
    console.log(this.$store.state);
  },
  data(){
    return{
      list:[
        {
          id:1
        },
        {
          id:2
        }
      ]
    }
  },
  methods:{
    changelist(){
      // this.list = [
      //   {
      //     id:2
      //   },
      //   {
      //     id:1
      //   }
      // ]
      // this.list.splice()
      // [this.list[0],this.list[1]] = [this.list[1],this.list[0]]
      // this.list[1] = {id:1}
      // this.list[0] = {id:2}
      const list = this.list.splice(0,1)
      this.list[0] = list[0]
      // this.list.push(list[0])

    }
  }
}
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
