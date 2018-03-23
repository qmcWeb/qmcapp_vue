import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import { Validator } from 'vee-validate';
import VueI18n from 'vue-i18n';


Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  },
  locale: 'zh_CN',
});

// const config = {
//   errorBagName: 'errors', 
//   fieldsBagName: 'fields',
//   delay: 0,   
//   locale: 'en', 
//   messages: null,
//   strict: true
// };
Validator.extend('required', {
  getMessage:  (field) => '必填项目',
  validate: value => {
    return value
  }
});
// 手机号
Validator.extend('mobile', {
  getMessage:  (field) => '必须是11位手机号码',
  validate: value => {
    return value.length == 11 && /^1[3|4|5|8][0-9]\d{4,8}$/.test(value)
  }
});
// 姓名
Validator.extend('zhName', {
  getMessage:  (field) => '姓名不正确',
  validate: value => {
    return /^([\u4e00-\u9fa5\·]{1,10})$/.test(value)
  }
});
// 身份证号
Validator.extend('IDCard', {
  getMessage:  (field) => '身份证号码不正确',
  validate: value => {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
  }
});
// 银行卡号
Validator.extend('bankId', {
  getMessage:  (field) => '银行卡号码不正确',
  validate: value => {
    return /([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(value)
  }
});