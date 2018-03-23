<template>
  <div class="newUser-wrap">
    <div class="history-wrap">
      <img src="./history.png" alt="" class="bg">

      <!-- <a href="javascript:;" class="btn top-btn" @click="register"></a> -->
    </div>

    <div class="step-wrap">
      <swiper :options="swiperOption"  :not-next-tick="notNextTick" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }" :key="str.id"></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-button-prev" slot="button-prev">
          <img src="./arrow-left.png" alt="" >
        </div>
        <div class="swiper-button-next" slot="button-next">
          <img src="./arrow-right.png" alt="" >
        </div>
      </swiper>
    </div>
    <div class="comment-wrap">
      <img src="./comment.png" alt="" class="bg">
      <div class="days">{{days}}<span>天</span></div>
      <div class="money">{{money}}<span>万元</span></div>
      <!-- <a href="javascript:;" class="btn" @click="register"></a> -->
    </div>
 </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default{
    data(){
      return {
        money:'',
        notNextTick: true,
        listImg: [{
          url: './static/img/imgUserNew/step1_new.png'
        }, {
          url: './static/img/imgUserNew/step2_new_ti.png'
        }, {
          url: './static/img/imgUserNew/step3_new.png'
        }, {
          url: './static/img/imgUserNew/step4_new.png'
        }, {
          url: './static/img/imgUserNew/step5_new.png'
        }],
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
        }
      }
    },
    created(){
      this.$http.get(this.api + '/app/growth/investTotal.do').then(res =>{
        this.money=res.body
      })
    },
    methods: {
      selectProvince(value) {
        console.log(value)
      },
      selectCity(value) {
        console.log(value)
      },
      selectArea(value) {
        console.log(value)
      },
      register(){
        if(this.parseUA.android){
          AndroidFunction.signUp();
        }else{
          signUp()
        }
      }
    },
    computed:{
      days(){
        // 测试是否有权限long
        var nowDate = new Date();
        var oldDate = new Date('2015/02/02');
        var sumDate = parseInt((nowDate - oldDate)/(1000*60*60*24));
        return sumDate
      },
      parseUA() {
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        return { //移动终端浏览器版本信息
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          presto: u.indexOf('Presto') > -1, //opera内核
          android: u.indexOf('Android') > -1,
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          weixin: u2.match(/MicroMessenger/i) == "micromessenger",
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        };
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
  @import "../../common/css/swiper-3.4.2.min.css"
  @import "newUser.styl"
</style>


