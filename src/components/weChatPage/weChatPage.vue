<template>
  <div class="newUser-wrap">
    <div class="history-wrap">
      <div class="days">{{days}}<span>天</span></div>
      <div class="money">{{money}}<span>万元</span></div>
      <a href="https://www.qianmancang.com/mobile/weChat_kaihu" class="kai-btn btn"></a>
      <a href="https://www.qianmancang.com/mobile/" class="index-btn btn"></a>
    </div>

 </div>
</template>

<script>
  export default{
    data(){
      return {
        money:'',
      }
    },
    created(){
      this.$http.get(this.api + '/app/growth/investTotal.do').then(res =>{
        this.money=res.body
      })
    },
    computed:{
      days(){
        var nowDate = new Date();
        var oldDate = new Date('2015/02/02');
        var sumDate = parseInt((nowDate - oldDate)/(1000*60*60*24));
        return sumDate
      },

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "weChatPage.styl"
</style>


