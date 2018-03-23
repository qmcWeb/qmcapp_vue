<template>
  <div class="open_account">
      <div class="container">
          <div class="real_name common_input_box">
              <label for="realName">
                  真实姓名: <input type="text" v-validate="'required|zhName'" name='zhName' id="realName" class="common_input" v-model="pageInfo.realName">
              </label>
              <span class='error_message' v-show="errors.has('zhName')">{{ errors.first('zhName')}}</span>
          </div>
          <div class="id_card common_input_box">
              <label for="idCard">
                  身份证号: <input type="text" v-validate="'required|IDCard'" name='IDCard' id="idCard" class="common_input" v-model="pageInfo.idNo">
              </label>
              <span class='error_message' v-show="errors.has('IDCard')">{{ errors.first('IDCard')}}</span>
          </div>
          <div class="bank_card common_input_box">
              <label for="bankCard">
                  银行卡号: <input type="text" v-validate="'required|bankId'" name='bankId' id="bankCard" class="common_input" v-model="pageInfo.cardNo" >
              </label>
              <span class='error_message' v-show="errors.has('bankId')">{{ errors.first('bankId')}}</span>
          </div>
          <div class="bank_name common_input_box">
              <label for="bankName">
                  绑定银行: <input type="text" id="bankName" class="common_input" value="招商银行" >
              </label>
          </div>
          <div class="telphone common_input_box">
              <label for="telphoneNum">
                  手机号码: <input type="text" v-validate="'required|mobile'" name='mobile' id="telphoneNum" class="common_input" v-model="pageInfo.mobile" >
              </label>
              <span class='error_message' v-show="errors.has('mobile')">{{ errors.first('mobile')}}</span>
          </div>
          <div class="telphone_check">
              <label for="telphoneCheck">
                  <input type="num" id="telphoneCheck" class="common_input" v-model="smsCode" >
              </label>
              <span @click="getCheckNum" class="get_check">{{ timeCheck }}</span>
              <span class='error_message' v-show="checkNumShow">{{ checkNumMessage }}</span>
          </div>
          <div class="btn">
              <span @click="submitInfo">立即开户</span>
          </div>
          <div class="footer">
              <span :class='{
                  icon: true,
                  active: activeCheck
              }' @click="activeCheck=!activeCheck"></span>
              <span class="text">
                  <a href="">《服务协议》</a>
                  和<a href="">《借款人注册协议》</a>及<a href="">《江西银行资金账户服务第三方协议》</a>
              </span>
              <span v-show="errorSubmit" class="error_submit">开户失败</span>
          </div>
      </div>
      <div class="success" v-show="successChec">
          <div class="box">
              <div class="close">
                  <span @click="closeSuccess"></span>
                  <!-- <img src="./x.png" alt=""> -->
              </div>
              <div class="main">
                  <div class="text"><img src="./rightAfter.png" alt=""> 恭喜开户成功！</div>
                  <div class="tip">登录密码已短信发送给您，请您及时到钱满仓平台修改登录密码！</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          activeCheck: true,
          successChec: false,
          timeCheck: '获取验证码',
          eveObj: {
              accessMode: '',
              systemMode: '',
              explorerMode: ''
          },
          pageInfo: {
              cardNo: '',
              idNo: '',
              mobile: '',
              realName: ''
          },
          checkNumMessage: '',
          checkNumShow: false,
          errorSubmit: false,
          srvAuthCode: '',
          smsCode: ''
      }
  },
  methods: {
      closeSuccess (){
          this.successChec = false
          this.errorSubmit = false
      },
      getInitSys (){
        // 获取浏览器相关信息
        if (!!navigator.userAgent.match(/Mobile/)) {
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                //如果是微信
                this.eveObj.accessMode = 'WX'
            }else{
                //如果是移动
                this.eveObj.accessMode = 'MO'
            }
        }else{
            //如果是pc
            this.eveObj.accessMode = 'PC'
        }
        //系统环境
        this.eveObj.systemMode = navigator.appVersion
        //浏览器
        this.eveObj.explorerMode = navigator.userAgent

      },
      submitInfo (){
          this.getInitSys()
          const promise = new Promise((resolve, reject) => {
              this.$http.get(this.api + '/borrower/createaccount', {
                  params: {
                      id: this.$route.query.id,
                      srvAuthCode: this.srvAuthCode,
                      smsCode: this.smsCode
                  }
              }).then(res => {
                  resolve(res)
              }, err => {
                  reject(err)
              })
              
          })            
          promise.then((res) => {
              // 处理立即开户返回的结果
              if(res.body && res.body.reStatus && res.body.reStatus === 'success'){
                  this.successChec = true
              }else{
                  this.errorSubmit = true
              }
              
          }, (err) => {
              this.errorSubmit = true
          })
      },
      getInitInfo (){
          // 获取页面信息
          this.$http.get(this.api + '/borrower', {
              params: {
                  id: this.$route.query.id
              }
          }).then((res) => {
              this.pageInfo = {
                  cardNo: res.body.cardNo || '',
                  idNo: res.body.idNo || '',
                  mobile: res.body.mobile || '',
                  realName: res.body.name || ''
              }
          })
      },
      getCheckTime (){
          let allTime = 59
          
            const interval = setInterval(() => {
                if(allTime > 0){
                    this.timeCheck = allTime--
                }else{
                    this.timeCheck = '重新获取验证码'
                    clearInterval(interval)
                }
                
            }, 1000)
         
      },
      getCheckNum (){
          // 获取验证码
          this.getCheckTime()
          this.$http.get(this.api + '/borrower/sendsms', {
              params: {
                  id: this.$route.query.id
              }
          }).then(res => {
              // reStatus 后台返回数据，判断调用是否成功
              if(res.body && res.body.reStatus === 'success'){
                  this.checkNumMessage = '验证码发送成功,请在手机查看'
                  this.srvAuthCode = res.body.srvAuthCode
                  this.checkNumShow = true
              }else{
                  this.checkNumMessage = '验证码发送失败,稍后请重新发送'
                  this.checkNumShow = true
              }
          })
      }
  },
  created () {
      this.getInitInfo()
  }
}
</script>
<style lang="stylus" scoped>
@import 'openAccount.styl';

</style>

