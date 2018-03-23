<template>
  <div class="detail">

      <div class="contetnt">
          <scroller :on-refresh="refresh"
                :on-infinite="infinite" :noDataText="null"
                ref="my_scroller">
            <div class="item_box">
                <div class="item" v-for="item in items" :key="item.id" v-show="item.grow_info">
                    <div class="item_content">
                        <div class="left">
                            <div class="top">{{ item.grow_info }}</div>
                            <div class="bottom">{{  moment(item.change_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                        </div>
                        <div :class="{right: true,active: /-/g.test(item.change_value)}">{{ item.change_value | getAns }}</div>
                    </div>
                </div>
            </div>


            <div class="footer" v-if="noData">
                <span></span>
                <span class="line"></span>
                <span class="text">没有更多了</span>
                <span class="line"></span>
                <span></span>
            </div>
          </scroller>


      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          items: [],
           noData: false,
           pageNum:0
      }
  },
  created () {
    // this.createData()
  },
  filters: {
    getAns: function(num) {
        if(num == 0){
            return 0
        }
        const pattern = /(?=((?!\b)\d{3})+$)/g
        num += ''
        let left = num.split('.')[0];
        left = /-/g.test(left)?left:('+' + left)
        const right = num.split('.')[1]?('.' + num.split('.')[1]) : ''
        return left.replace(pattern, ',') + right
    },

  },
  methods: {

      createData () {
        console.log('ceshi youmeiyou tishangqu ')
        this.$http.get(this.api + '/appdo/money/getCdValueList.do', {
            params: {
            pageNo: ++this.pageNum,
            user_id: this.user_id,
              token: this.token
            }
        }).then(res =>{
            console.log(res.body.list,22222)
            if(res.body.list.length<10){
            this.noData=true
            }else{
            this.noData=false
            }
            this.items = this.items.concat(res.body.list);
            console.log(res.body.list)
            this.$refs.my_scroller.resize()
        })
      },
      refresh: function (done) {
        this.$refs.my_scroller.finishInfinite(false);
        this.pageNum=1
        this.$http.get(this.api + '/appdo/money/getCdValueList.do', {
          params: {
            pageNo: this.pageNum,
            user_id: this.user_id,
            token: this.token,
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
          console.log('infiniete',1111)
        if(this.noData) {
          setTimeout(()=>{
            this.$refs.my_scroller.finishInfinite(true);
          })
          return;
        }
        this.$http.get(this.api + '/appdo/money/getCdValueList.do', {
          params: {
            pageNo: ++this.pageNum,
            user_id: this.user_id,
            token: this.token
          }
        }).then(res =>{
          if(res.body.list.length<10){
            this.noData=true
          }else{
            this.noData=false
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import 'detail.styl';
</style>
