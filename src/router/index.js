import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'

import Login from '../components/login/Login.vue'
import Users from '../components/user/Users.vue'
import NotFound from '@/components/404/NotFound.vue'

/************************** home-logo ***************************/
import HomeLogo from '@/components/Home.vue'

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
import addGroup from '../components/storeManage/storesGroup/optionGroup/Index.vue'


/************************** 统计报表 ***************************/
import TransactionList from '../components/report/transactionList/Index.vue'
import TransactionCount from '../components/report/transactionCount/Index.vue'
import SettlementRecord from '../components/report/settlementRecord/Index.vue'
import BillQuery from '../components/report/billQuery/Index.vue'
import Invoice from '../components/report/invoice/Index.vue'

/************************** 基础设置 ***************************/
import BusinessInfo from '@/components/infrastructure/BusinessInfo/Index.vue'
import BackupAcc from '@/components/infrastructure/BackupAcc/Index.vue'
import VolumeSet from '@/components/infrastructure/VolumeSet/Index.vue'
import NewAdd from '@/components/infrastructure/VolumeSet/NewAdd/Index.vue'
import PaymentManagement from '@/components/infrastructure/PaymentManagement/Index.vue'
import PaymentWay from '@/components/infrastructure/PaymentWay/Index.vue'
import PayChannels from '@/components/infrastructure/PayChannels/Index.vue'
import DishesLibrary from '@/components/infrastructure/DishesLibrary/Index.vue'

import AddDishes from '@/components/infrastructure/DishesLibrary/addDishes/Index.vue'
import StoreLibrary from '@/components/infrastructure/StoreLibrary/Index.vue'
import RoleManagement from '@/components/infrastructure/RoleManagement/Index.vue'
import UserManagement from '@/components/infrastructure/UserManagement/Index.vue'
import PermissionManagement from '@/components/infrastructure/PermissionManagement/Index.vue'
import PermissionUserManagement from '@/components/infrastructure/PermissionManagement/user/Index.vue'
import OperationLog from '@/components/infrastructure/OperationLog/Index.vue'

/************************** 运营 ***************************/
import RunningState from '../components/operate/RunningState/Index.vue'
import InvoiceAllocation from '../components/operate/InvoiceAllocation/Index.vue'
import SchemeDown from '../components/operate/SchemeDown/Index.vue'
import OperationPlan from '../components/operate/OperationPlan/Index.vue'

/************************** 公众号管理 ***************************/
import PublicManagement from '@/components/infrastructure/PublicManagement/Index.vue'


/************************** 菜品管理 ***************************/
import storeDishesManage from '@/components/dishesManagement/storeDishesManage/Index.vue'

import editDishes from '@/components/dishesManagement/storeDishesManage/editDishes/Index.vue'

import dishesGroup from '@/components/dishesManagement/dishesGroup/Index.vue'
import addDishesGroup from '@/components/dishesManagement/dishesGroup/addDishesGroup/Index.vue'
import dishesCategory from '@/components/dishesManagement/dishesCategory/Index.vue'
import addCategory from '@/components/dishesManagement/dishesCategory/addCategory/Index.vue'

/************************** 发票方案 ***************************/


import invoiceScheme from '@/components/invoice/invoiceScheme/Index.vue'
import downRecord from '@/components/invoice/downRecord/Index.vue'
import pageDesign from '@/components/invoice/pageDesign/Index.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      meta: { auth: true },
      name: '首页',
      component: Main,
      children:[
        /********************* logo  *************************/
        {
          // 支付管理/账户列表
          path: '/home',
          meta: { auth: true },
          name: 'home-logo',
          component: HomeLogo,
        },
        /**********************支付管理**************************/
        {
          // 支付管理/账户列表
          path: '/iPayment/accountList',
          meta: { auth: true },
          name: '支付管理/账户列表',
          component: IPayment,
        },
        {
          path: '/iPayment/accountList/account',
          meta: { auth: true },
          name: '支付管理/账户列表/新增账户',
          component: Account
        },
        {
          // 支付管理/下发记录
          path: '/iPayment/issuedRecord',
          meta: { auth: true },
          name: '支付管理/下发记录',
          component: Record,
        },
        {
          // 支付管理/下发记录/新增下发
          path: '/iPayment/issuedRecord/newIssued',
          meta: { auth: true },
          name: '支付管理/下发记录/新增下发',
          component: NewIssued,
        },
        {
          // 支付管理/下发记录/新增下发/新增门店
          path: '/iPayment/issuedRecord/newIssued/newAdd',
          meta: { auth: true },
          name: '支付管理/下发记录/新增下发/新增门店',
          component: IssuedAdd,
        },


        /************************** 门店管理 ***************************/
        {
          // 门店管理
          path: '/storeManage/storeList',
          meta: { auth: true },
          name: '门店管理/门店列表',
          component: StoreList,
        },
        {
          // 新增门店
          path: '/storeManage/storeList/newAddStore/:number/:levelid/:type',
          meta: { auth: true },
          name: '门店管理/门店列表/新增门店',
          component: NewAddStore,
        },
        {
          // 查看门店
          path: '/storeManage/storeList/seeTheStore/:id',
          meta: { auth: true },
          name: '门店管理/门店列表/查看门店',
          component: SeeTheStore,
        },
        {
          // 收款账户编辑
          path: '/storeManage/storeList/editStoreAccount/:id',
          meta: { auth: true },
          name: '门店管理/门店列表/查看门店/收款账户编辑',
          component: EditStoreAccount,
        },

        {
          // 门店组
          path: '/storeManage/storeGroup',
          meta: { auth: true },
          name: '门店管理/门店组',
          component: StoreGroup,
        },
        {
          // 新增门店组
          path: '/storeManage/storeGroup/addGroup',
          meta: { auth: true },
          name: '门店管理/门店组/新增门店组',
          component: addGroup,
        },


        /************************** 统计报表 ***************************/
        {
          // 交易列表
          path: '/report/transactionList',
          meta: { auth: true },
          name: '统计报表/交易列表',
          component: TransactionList,
        },
        {
          // 交易统计
          path: '/report/transactionCount',
          meta: { auth: true },
          name: '统计报表/交易统计',
          component: TransactionCount,
        },
        {
          // 结算记录
          path: '/report/settlementRecord',
          meta: { auth: true },
          name: '统计报表/结算记录',
          component: SettlementRecord,
        },
        {
          // 差异账单查询
          path: '/report/billQuery',
          meta: { auth: true },
          name: '统计报表/差异账单查询',
          component: BillQuery,
        },
        {
          // 发票
          path: '/report/invoice',
          meta: { auth: true },
          name: '统计报表/发票',
          component: Invoice,
        },

        /**********************基础设置***************************/
        // 基础设置/商家信息
        {
          path: '/infrastructure/BusinessInfo',
          meta: { auth: true },
          name: '基础设置/商家信息',
          component: BusinessInfo
        },
        // 基础设置/备用账户切换
        {
          path: '/infrastructure/BackupAcc',
          meta: { auth: true },
          name: '基础设置/备用账户切换',
          component: BackupAcc
        },
        // 基础设置/客户端批量设置
        {
          path: '/infrastructure/VolumeSet',
          meta: { auth: true },
          name: '基础设置/客户端批量设置',
          component: VolumeSet
        },
        // 基础设置/客户端批量设置/新增门店
        {
          path: '/infrastructure/VolumeSet/newAdd',
          meta: { auth: true },
          name: '基础设置/客户端批量设置/新增门店',
          component: NewAdd
        },
        // 基础设置/支付管理
        {
          path: '/infrastructure/PaymentManagement',
          meta: { auth: true },
          name: '基础设置/支付管理',
          component: PaymentManagement
        },
        // 基础设置/支付配置
        {
          path: '/infrastructure/PaymentWay',
          meta: { auth: true },
          name: '基础设置/支付配置',
          component: PaymentWay
        },
        // 基础设置/支付通道
        {
          path: '/infrastructure/PayChannels',
          meta: { auth: true },
          name: '基础设置/支付通道',
          component: PayChannels
        },

        //基础设置/菜品库
        {
          path: '/infrastructure/DishesLibrary',
          meta: { auth: true },
          name: '基础设置/菜品库',
          component: DishesLibrary
        },
        //基础设置/菜品库/新增菜品
        {
          path: '/infrastructure/DishesLibrary/addDishes/:number/:levelid',
          meta: { auth: true },
          name: '基础设置/菜品库/新增菜品',
          component: AddDishes
        },
        //门店库
        {
          path: '/infrastructure/StoreLibrary',
          meta: { auth: true },
          name: '基础设置/门店库',
          component: StoreLibrary
        },
        //角色管理
        {
          path: '/infrastructure/RoleManagement',
          meta: { auth: true },
          name: '基础设置/角色管理',
          component: RoleManagement
        },
        //权限管理
        {
          path: '/infrastructure/PermissionManagement',
          meta: { auth: true },
          name: '基础设置/权限管理',
          component: PermissionManagement
        },
        //权限管理/查看用户
        {
          path: '/infrastructure/PermissionManagement/User/:id/:levelId',
          meta: { auth: true },
          name: '基础设置/权限管理/查看用户',
          component: PermissionUserManagement
        },
        //用户管理
        {
          path: '/infrastructure/UserManagement',
          meta: { auth: true },
          name: '用户管理',
          component: UserManagement
        },

        //操作日志
        {
          path: '/infrastructure/OperationLog',
          meta: { auth: true },
          name: '操作日志',
          component: OperationLog
        },
        //公众号管理
        {
          path: '/infrastructure/PublicManagement',
          meta: { auth: true },
          name: '公众号管理',
          component: PublicManagement
        },

        /**********************运营***************************/
        //运行状态
        {
          path: '/operate/runningState',
          meta: { auth: true },
          name: '运行状态',
          component: RunningState
        },
        //发票配置
        {
          path: '/operate/invoiceAllocation',
          meta: { auth: true },
          name: '发票配置',
          component: InvoiceAllocation
        },
        //方案下发
        {
          path: '/operate/schemeDown',
          meta: { auth: true },
          name: '方案下发',
          component: SchemeDown
        },
        //运营方案
        {
          path: '/operate/OperationPlan',
          meta: { auth: true },
          name: '运营方案',
          component: OperationPlan
        },

        /**********************菜品管理***************************/

        //门店菜品管理
        {
          path: '/dishesManagement/storeDishesManage',
          meta: { auth: true },
          name: '菜品管理/门店菜品管理',
          component: storeDishesManage
        },
        //门店菜品管理/编辑
        {
          path: '/dishesManagement/storeDishesManage/editDishes',
          meta: { auth: true },
          name: '菜品管理/编辑菜品',
          component: editDishes
        },
        //菜品品类
        {
          path: '/dishesManagement/dishesCategory',
          meta: { auth: false },
          name: '菜品管理/菜品品类',
          component: dishesCategory
        },
        //新增品类
        {
          path: '/dishesManagement/dishesCategory/addCategory/:number',
          meta: { auth: false },
          name: '菜品管理/新增品类',
          component: addCategory
        },
        //菜品组
        {
          path: '/dishesManagement/dishesGroup',
          meta: { auth: false },
          name: '菜品管理/菜品组',
          component: dishesGroup
        },
        //新增菜品组
        {
          path: '/dishesManagement/dishesGroup/addDishesGroup',
          meta: { auth: false },
          name: '菜品管理/菜品组/新增菜品组',
          component: addDishesGroup
        },

        /**********************发票***************************/

        //发票方案
        {
          path: '/invoice/invoiceScheme',
          meta: { auth: false },
          name: '发票方案',
          component: invoiceScheme
        },
        //下发记录
        {
          path: '/invoice/downRecord',
          meta: { auth: false },
          name: '下发记录',
          component: downRecord
        },
        //页面设计
        {
          path: '/invoice/pageDesign',
          meta: { auth: false },
          name: '页面设计',
          component: pageDesign
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
      meta: { auth: false },
      component: Login,
      name: '登陆页',
      hidden: true
    },
    {
      path: '/404',
      meta: { auth: false },
      component: NotFound,
      name: '',
      hidden: true
    },
  ]
})
