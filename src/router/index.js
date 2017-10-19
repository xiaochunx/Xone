import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import IPayment from '../components/iPayment/accountList/Index.vue'
import Login from '../components/login/Login.vue'
import Users from '../components/user/Users.vue'
import Account from '../components/iPayment/accountList/account/Index.vue'
import Record from '../components/iPayment/issuedRecord/Index.vue'
import NewIssued from '../components/iPayment/issuedRecord/newIssued/Index.vue'

import TransactionList from '../components/report/transactionList/Index.vue'
import TransactionCount from '../components/report/transactionCount/Index.vue'
import SettlementRecord from '../components/report/settlementRecord/Index.vue'
import BillQuery from '../components/report/billQuery/Index.vue'
import AccountStatement from '../components/report/accountStatement/Index.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      name: '首页',
      component: Main,
      children:[
        {
          // 支付管理/账户列表
          path: '/iPayment/accountList',
          name: '支付管理/账户列表',
          component: IPayment,
        },
        {
          path: '/iPayment/accountList/account',
          name: '支付管理/账户列表/新增账户',
          component: Account
        },
        {
          // 支付管理/下发记录
          path: '/iPayment/issuedRecord',
          name: '支付管理/下发记录',
          component: Record,
        },
        {
          // 支付管理/新增下发
          path: '/iPayment/issuedRecord/newIssued',
          name: '支付管理/下发记录/新增下发',
          component: NewIssued,
        },

        {
          // 交易列表
          path: '/report/transactionList',
          name: '统计报表/交易列表',
          component: TransactionList,
        },
        {
          // 交易统计
          path: '/report/transactionCount',
          name: '统计报表/交易统计',
          component: TransactionCount,
        },
        {
          // 结算记录
          path: '/report/settlementRecord',
          name: '统计报表/结算记录',
          component: SettlementRecord,
        },
        {
          // 差异账单查询
          path: '/report/billQuery',
          name: '统计报表/差异账单查询',
          component: BillQuery,
        },
        {
          // 对账单
          path: '/report/accountStatement',
          name: '统计报表/对账单',
          component: AccountStatement,
        },



        {
          path: '/login',
          name: '登陆页',
          component: Login
        },
        {
          path: '/users',
          name: '登陆页',
          component: Users
        },
      ]
    },
    {
      path: '/', redirect: '/users'
    },
    {
      path: '*', redirect: '/login'
    }
  ]
})
