<template>
  <div class="detail-wrap" v-show="articleData">
  <!--  <input type="hidden" v-model="shareTitle" id="shareTitle">
    <input type="hidden" v-model="shareDesc" id="shareDesc">
    <input type="hidden" v-model="urlLink" id="urlLink">
    <input type="hidden" v-model="imgUrl" id="imgUrl">-->
    <div class="title-wrap">
      <h3 class="title">
        {{articleData.title}}
        </h3>
    </div>
    <!--<div class="info-wrap flex">
      <img src="./icon-time.png" alt="">
      <span class="time">{{articleData.time}}</span>
      <span class="FG"></span>
      <img src="./icon-watch.png" alt="">
      <span class="count">{{articleData.persons}}</span>
    </div>-->
    <div class="content" v-html="articleData.body">
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        articleData:''
      }
    },
    created(){
      this.$http.get(this.api+'/app/notice/activityInfo.do',{params: {
        articleId: this.articleId
      }}).then(response => {
        response.body.body=response.body.body.replace(/\/upload/,'https://www.qianmancang.com/upload')
        this.articleData=response.body
      });
    },
    computed: {
      articleId(){
        return this.$route.query.articleId
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "fSchoolDetail.styl"
  img
    width:100%
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    img
      width:100%!important
      height:auto!important
</style>
