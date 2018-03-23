<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/css/reset.css";
   body,html,#app{
    height 100%;
  }
</style>

