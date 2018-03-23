<template>
  <div class="growthValue-wrap">
    <div class="growthValue-tab">
      <p class="left" @click="showTab2()">
        <a :class="{'active':!classShow}" href="javascript:;" >成长值解读</a>
      </p>
      <p class="right" @click="showTab1()">
        <a :class="{'active':classShow}" href="javascript:;">成长值明细</a>
      </p>
    </div>
    <div :class="['growthValue-tab1',!lowest?'lowest':'']">
      <div class="questionName">什么是成长值？</div>
      <div class="questionDesc1">
        成长值是钱满仓根据会员的不同操作，投资等行为，予以奖励不同的经验分值，累积的成长值总额决定会员级别。
      </div>
      <div class="questionName">会员等级对照表</div>
      <div class="questionDesc2">
        <ul>
          <li>会员等级</li>
          <li>成长值</li>
          <li>V1</li>
          <li>0-149成长值</li>
          <li>V2</li>
          <li>150-499成长值</li>
          <li>V3</li>
          <li>500-1499成长值</li>
          <li>V4</li>
          <li>1500-3999成长值</li>
          <li>V5</li>
          <li>4000-6999成长值</li>
          <li>V6</li>
          <li>7000-17999成长值</li>
          <li>V7</li>
          <li>18000-47999成长值</li>
          <li>V8</li>
          <li>48000 以上</li>
        </ul>
      </div>
      <div class="questionName">如何获得成长值？</div>
      <div class="questionDesc3">
        <p>通过完成不同的成长任务获得成长值。</p>
        <ul class="title-desc3">
          <li class="des3-li1">任务类型</li>
          <li class="des3-li2">任务</li>
          <li class="des3-li3">成长值</li>
        </ul>
        <ul class="test-desc3">
          <li class="des3-li1">新手任务</li>
          <li class="des3-li2">
            <span>实名认证</span>
            <span>首次充值</span>
            <span>完成风险测评</span>
          </li>
          <li class="des3-li3">
            <span>100</span>
            <span>30</span>
            <span>20</span>
          </li>
        </ul>
        <ul class="test2-desc3">
          <li class="des3-li1">投资任务</li>
          <li class="des3-li2">
            <span>首次投资额外增加</span>
            <span>投资项目</span>
          </li>
          <li class="des3-li3">
            <span>50</span>
            <span class="sFont">投资金额*投资时间*0.4%</span>
          </li>
        </ul>
        <ul class="test2-desc3">
          <li class="des3-li1">邀请任务</li>
          <li class="des3-li2">
            <span>邀请好友注册且实名</span>
            <span>好友首次投资</span>
          </li>
          <li class="des3-li3">
            <span>50</span>
            <span class="sFont">投资金额*投资时间*0.1%</span>
          </li>
        </ul>
        <ul class="test2-desc3">
          <li class="des3-li1 one">互动任务</li>
          <li class="des3-li2 one">
            <span>APP签到</span>
          </li>
          <li class="des3-li3 one">
            <span>2</span>
          </li>
        </ul>
      </div>
      <div class="questionName">扣减规则</div>
      <div class="questionDesc4">
        <p>每年3月31日、6月30日、9月30日和12月31日将会根据会员的投资情况对成长值进行重新核算，并根据剩余成长值计算级别。</p>
        <p>如果投资的债权发生债权转让，则成长值保持不变。</p>
      </div>
    </div>
    <div :class="['growthValue-tab2',lowest?'lowest':'']">
      <scroller :on-refresh="refresh"
                :on-infinite="infinite"
                ref="my_scroller">
        <ul>
          <li v-for="item in items" :key="item">
            <div class="left">
              {{item.grow_info}}
            <span>{{item.grow_time}}</span>
            </div>
            <div class="right">＋{{item.grow_value}}</div>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
  //import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        show: true,
        classShow: true,
        items: [],
        pageNum: 0,
        scrollMode: "", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        topStatus: '',
        noData: false,
        lowest:false
      }
    },
    created(){

    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
        console.log(status)
      },
      showTab1(){
        this.show = this.classShow = true;
        this.lowest=false;
      },
      showTab2(){
        this.show = this.classShow = false;
        this.lowest=true;
      },
      refresh: function (done) {
        this.$refs.my_scroller.finishInfinite(false);
        this.pageNum=1
        this.$http.get(this.api + '/Associator_center/getGrowthValueList.do', {
          params: {
            pageNo: this.pageNum,
            user_id: this.user_id,
            token: this.token
          }
        }).then(res =>{
          if(res.body.list.length<10){
            this.noData=true;
            this.$refs.my_scroller.finishInfinite(true);
          }else{
            this.noData=false;
            this.$refs.my_scroller.finishInfinite(false);
          }
          this.items = res.body.list
          this.$refs.my_scroller.resize()
          done();
        })
      },
      infinite: function (done) {
        if(this.noData) {
          setTimeout(()=>{
            this.$refs.my_scroller.finishInfinite(true);
          })
          return;
        }
        this.$http.get(this.api + '/Associator_center/getGrowthValueList.do', {
          params: {
            pageNo: ++this.pageNum,
            user_id: this.user_id,
            token: this.token
          }
        }).then(res =>{
          console.log(res.body.list.length)
          if(res.body.list.length<10){
            this.noData=true;
          }else{
            this.noData=false;
            //cuiwei
          }
          this.items = this.items.concat(res.body.list);
          this.$refs.my_scroller.resize()
          done();
        })
      }
    },
    computed: {
      user_id(){
        return this.$route.query.userId
      },
      token(){
        return this.$route.query.token
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "growthVal.styl"
</style>


