// import Hello from '@/components/Hello'
import fSchoolDetail from './components/fSchoolDetail/fSchoolDetail';
import newUser from './components/newUser/newUser';
import growthVal from './components/growthVal/growthVal';
import growthVal2 from './components/growthVal2/growthVal2';
import levelThat from './components/levelThat/levelThat';
import weChatPage from './components/weChatPage/weChatPage';
import Detail from './components/detail/detail.vue'
import OpenAccount from './components/openAccount/openAccount.vue'
export default [
  {
    path: '/fSchoolDetail',
    component: fSchoolDetail,
    meta: {
      title: '仓粉学院'
    }
  },
  {
    path: '/newUser',
    component: newUser,
    meta: {
      title: '新手指引'
    }
  },
  {
    path: '/weChatPage',
    component: weChatPage,
    meta: {
      title: '新手指引'
    }
  },
  {
    path: '/growthVal',
    component: growthVal,
    meta: {
      title: '成长明细'
    }
  },
  {
    path: '/growthVal2',
    component: growthVal2,
    meta: {
      title: '成长明细'
    }
  },
  {
    path: '/levelThat',
    component: levelThat,
    meta: {
      title: '等级说明'
    }
  },
  {
    path: '/beansDetail',
    component: Detail,
    meta: {
      title: '仓豆明细'
    }
  },
  {
    path: '/openAccount',
    component: OpenAccount,
    meta: {
      title: '钱满仓'
    }
  }
]
