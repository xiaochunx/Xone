import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'

import Login from '../components/login/Login.vue'
import Users from '../components/user/Users.vue'
import NotFound from '@/components/404/NotFound.vue'


/************************** 支付管理 ***************************/
import Account from '../components/iPayment/accountList/account/Index.vue'
import Record from '../components/iPayment/issuedRecord/Index.vue'
import IssuedAdd from '../components/iPayment/issuedRecord/newIssued/NewAdd/Index.vue'
import NewIssued from '../components/iPayment/issuedRecord/newIssued/Index.vue'
import IPayment from '../components/iPayment/accountList/Index.vue'

/************************** 门店管理 ***************************/
import StoreList from '../components/storeManage/storeList/storeList/Index.vue'
import NewAddStore from '../components/storeManage/storeList/newAddStore/Index.vue'
import SeeTheStore from '../components/storeManage/storeList/seeTheStore/Index.vue'
import StoreGroup from '../components/storeManage/storesGroup/Index.vue'
import EditStoreAccount from '../components/storeManage/storeList/seeTheStore/editStoreAccount/Index.vue'
import EditStoreBase from '../components/storeManage/storeList/seeTheStore/redact/Index.vue'
import addGroup from '../components/storeManage/storesGroup/optionGroup/Index.vue'


/************************** 统计报表 ***************************/
import TransactionList from '../components/report/transactionList/Index.vue'
import TransactionCount from '../components/report/transactionCount/Index.vue'
import SettlementRecord from '../components/report/settlementRecord/Index.vue'
import BillQuery from '../components/report/billQuery/Index.vue'
import AccountStatement from '../components/report/accountStatement/Index.vue'
import Invoice from '../components/report/invoice/Index.vue'

/************************** 基础设置 ***************************/
import BusinessInfo from '@/components/infrastructure/BusinessInfo/Index.vue'
import BackupAcc from '@/components/infrastructure/BackupAcc/Index.vue'
import VolumeSet from '@/components/infrastructure/VolumeSet/Index.vue'
import NewAdd from '@/components/infrastructure/VolumeSet/NewAdd/Index.vue'
import PaymentWay from '@/components/infrastructure/PaymentWay/Index.vue'
import NewPayment from '@/components/infrastructure/PaymentWay/NewPayment/Index.vue'
import NewPayChannels from '@/components/infrastructure/PayChannels/NewPayChannels/Index.vue'
import PayChannels from '@/components/infrastructure/PayChannels/Index.vue'
import DishesLibrary from '@/components/infrastructure/DishesLibrary/Index.vue'
import StoreLibrary from '@/components/infrastructure/StoreLibrary/Index.vue'




import RunningState from '../components/runningState/Index.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      name: '首页',
      component: Main,
      children:[
        /**********************支付管理**************************/
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
          // 支付管理/下发记录/新增下发
          path: '/iPayment/issuedRecord/newIssued',
          name: '支付管理/下发记录/新增下发',
          component: NewIssued,
        },
        {
          // 支付管理/下发记录/新增下发/新增门店
          path: '/iPayment/issuedRecord/newIssued/newAdd',
          name: '支付管理/下发记录/新增下发/新增门店',
          component: IssuedAdd,
        },


        /************************** 门店管理 ***************************/
        {
          // 门店管理
          path: '/storeManage/storeList',
          name: '门店管理/门店列表',
          component: StoreList,
        },
        {
          // 新增门店
          path: '/storeManage/storeList/newAddStore',
          name: '门店管理/门店列表/新增门店',
          component: NewAddStore,
        },
        {
          // 查看门店
          path: '/storeManage/storeList/seeTheStore',
          name: '门店管理/门店列表/查看门店',
          component: SeeTheStore,
        },
        {
          // 账户基础编辑
          path: '/storeManage/storeList/seeTheStore/editStoreBase',
          name: '门店管理/门店列表/查看门店/收款账户编辑',
          component: EditStoreBase,
        },
        {
          // 收款账户编辑
          path: '/storeManage/storeList/seeTheStore/editStoreAccount',
          name: '门店管理/门店列表/查看门店/收款账户编辑',
          component: EditStoreAccount,
        },

        {
          // 门店组
          path: '/storeManage/storeGroup',
          name: '门店管理/门店组',
          component: StoreGroup,
        },
        {
          // 新增门店组
          path: '/storeManage/storeGroup/addGroup',
          name: '门店管理/门店组',
          component: addGroup,
        },


        /************************** 统计报表 ***************************/
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
          // 发票
          path: '/report/invoice',
          name: '统计报表/发票',
          component: Invoice,
        },

        /**********************基础设置***************************/
        // 基础设置/商家信息
        {
          path: '/infrastructure/BusinessInfo',
          name: '基础设置/商家信息',
          component: BusinessInfo
        },
        // 基础设置/备用账户切换
        {
          path: '/infrastructure/BackupAcc',
          name: '基础设置/备用账户切换',
          component: BackupAcc
        },
        // 基础设置/客户端批量设置
        {
          path: '/infrastructure/VolumeSet',
          name: '基础设置/客户端批量设置',
          component: VolumeSet
        },
        // 基础设置/客户端批量设置/新增门店
        {
          path: '/infrastructure/VolumeSet/newAdd',
          name: '基础设置/客户端批量设置/新增门店',
          component: NewAdd
        },
        // 基础设置/支付方式
        {
          path: '/infrastructure/PaymentWay',
          name: '基础设置/支付方式',
          component: PaymentWay
        },
        // 基础设置/支付方式/新增支付方式
        {
          path: '/infrastructure/PaymentWay/NewPayment',
          name: '基础设置/支付方式/新增支付方式',
          component: NewPayment
        },
        // 基础设置/支付通道
        {
          path: '/infrastructure/PayChannels',
          name: '基础设置/支付通道',
          component: PayChannels
        },
        // 基础设置/支付通道/新增支付通道
        {
          path: '/infrastructure/PayChannels/NewPayChannels',
          name: '基础设置/支付通道/新增支付通道',
          component: NewPayChannels
        },
        //基础设置/菜品库
        {
          path: '/infrastructure/DishesLibrary',
          name: '基础设置/菜品库',
          component: DishesLibrary
        },
        //门店库
        {
          path: '/infrastructure/StoreLibrary',
          name: '基础设置/门店库',
          component: StoreLibrary
        },
        //运行状态
        {
          path: '/runningState',
          name: '运行状态',
          component: RunningState
        },
      ]
    },
    {
      path: '/', redirect: '/users'
    },
    {
      path: '*', redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      name: '登陆页',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
  ]
})
