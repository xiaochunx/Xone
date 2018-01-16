<template>
  <div id="xoMenu" :style="{height:ListHeight+'px'}">
    <!--<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :width="300">-->

      <!--&lt;!&ndash;后期加上&ndash;&gt;-->
      <!--<el-submenu v-for="(value,index1) in leftList" :index=index1.toString() :key="index1">-->
        <!--<template slot="title">{{value.name}}</template>-->
        <!--<router-link v-for="(item,index2) in value.children" :key="item.route" :to=item.route><el-menu-item :index=formatNum(index1,index2) :key="index2">{{item.name}}</el-menu-item></router-link>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->

      <tree :data='leftData' :count=0></tree>

  </div>
</template>
<script>
  import tree from './utility/tree'
  import Hub from './utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  import {getArr} from './utility/communApi'
  export default {
    props: {

    },
    components: {
      tree,
    },
    data() {
      return {
        leftList: [
          {
            name:'运营',
            children: [
              {
                name: '运营方案',
                route: '/operate/OperationPlan',
              },
              {
                name: '运行状态',
                route: '/operate/runningState',
              },
//              {
//                name: '发票配置',
//                route: '/operate/invoiceAllocation',
//              },
//              {
//                name: '方案下发',
//                route: '/operate/schemeDown',
//              },
            ]
          },

          {
            name: '支付管理',
            children: [
              {
                name: '账户列表',
                route: '/iPayment/accountList',
              },
              {
                name: '下发记录',
                route: '/iPayment/issuedRecord',
              }
            ]
          },
          {
            name: '门店管理',
            children: [
              {
                name: '门店列表',
                route: '/storeManage/storeList'
              },
              {
                name: '门店标签',
                route: '/storeManage/storeGroup'
              }
            ]
          },
         {
           name: '统计报表',
           children: [
             {
               name: '交易列表',
               route: '/report/transactionList'
             },
             {
               name: '交易统计',
               route: '/report/transactionCount'
             },
             // {
             //   name: '结算记录',
             //   route: '/report/settlementRecord'
             // },
             // {
             //   name: '差异账单查询',
             //   route: '/report/billQuery'
             // },
             // {
             //   name: '发票',
             //   route: '/report/invoice'
             // }
           ]
         },
          {
            name: '基础设置',
            children: [
//              {
//                name: '商家信息',
//                route: '/infrastructure/BusinessInfo'
//              },
//              {
//                name: '备用账户切换配置',
//                route: '/infrastructure/BackupAcc'
//              },
//              {
//                name: '客户端批量设置',
//                route: '/infrastructure/VolumeSet'
//              },
//               {
//                 name: '支付管理',
//                 route: '/infrastructure/PaymentManagement'
//               },
//              {
//                name: '支付配置',
//                route: '/infrastructure/PaymentWay'
//              },
//              {
//                name: '支付通道',
//                route: '/infrastructure/PayChannels'
//              },
//               {
//                 name: '门店库',
//                 route: '/infrastructure/StoreLibrary'
//               },
//              {
//                name: '菜品库',
//                route: '/infrastructure/DishesLibrary'
//              },
//               {
//                 name: '角色管理',
//                 route: '/infrastructure/RoleManagement'
//               },
//               {
//                 name: '权限管理',
//                 route: '/infrastructure/PermissionManagement'
//               },
              {
                name: '用户管理',
                route: '/infrastructure/UserManagement'
              },
             // {
             //   name: '操作日志',
             //   route: '/infrastructure/OperationLog'
             // },
             //  {
             //    name: '公众号管理',
             //    route: '/infrastructure/PublicManagement'
             //  },
//              {
//                name: '根',
//                route: '/'
//              },
            ]
          },
          // {
          //   name: '发票方案',
          //   children: [
          //     {
          //       name: '发票方案',
          //       route: '/invoice/invoiceScheme'
          //     },
          //     {
          //       name: '下发记录',
          //       route: '/invoice/downRecord'
          //     },
          //
          //   ]
          // },
          // {
          //   name: '菜品管理',
          //   children: [
          //     {
          //       name: '菜品管理',
          //       route: '/dishesManagement/storeDishesManage'
          //     },
          //     {
          //       name: '菜品品类',
          //       route: '/dishesManagement/dishesCategory'
          //     },
          //     {
          //       name: '菜品组',
          //       route: '/dishesManagement/dishesGroup'
          //     },
          //     {
          //       name: '菜品规格',
          //       route: '/dishesManagement/dishesSpec'
          //     },
          //     {
          //       name: '菜品属性',
          //       route: '/dishesManagement/dishesAttr'
          //     },
          //     {
          //       name: '餐盒设置',
          //       route: '/dishesManagement/boxSetting'
          //     },
          //     {
          //       name: '套餐管理',
          //       route: '/dishesManagement/mealManage'
          //     },
          //   ]
          // }
          {
            name: 'x2统计报表',
            children: [
              {
                name: '订单列表',
                route: '/report/orderList'
              },
              {
                name: '订单统计',
                route: '/report/orderCount'
              },

            ]
          },
        ],
        ListHeight: 0,
        leftData:[]
      }
    },
    methods: {
      ...mapActions(['setTreeArr']),
      ...mapGetters(['getTreeArr']),
      recur(data,path) {
        data.forEach((map) => {
          if (map.children) {
            this.$set(map, "show", true);
            if(map.router === path){
              this.setTreeArr({obj:getArr(map.arr)});
              this.$set(map, "selected", true);
            }else {
              this.$set(map, "selected", false);
            }
            this.recur(map.children,path)
          }
        })
      },

      recurSelected(data, levelId) {
        data.forEach((map) => {
          if (map.id === levelId) {
            this.$set(map, "selected", true);
          } else {
            this.$set(map, "selected", false);
          }
          if (map.children) {
            this.recurSelected(map.children, levelId)
          }
        })
      },


      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      formatNum(num1,num2){
        var str1 = num1.toString();
        var str2 = num2.toString();
        return str1 + '-' + str2;
      }
    },
    created(){
      let token = this.$localStorage.get('token');
      this.$http.get(`index.php?controller=user&action=getMenu&token=${token}`).then((res) => {
        if (res.data.errcode === 0) {
          this.leftData = res.data.data;
          this.recur(this.leftData,this.$route.path)
        }
      });

    },
    mounted(){
      this.ListHeight = window.innerHeight - this.getTopHeight;
      Hub.$on('showLeftTree', (e) => {
        this.recurSelected(this.leftData, e.levelid)
      });

    },
    updated(){

    },

    destroyed(){

    },
    computed: {
      ...mapGetters([
          'getTopHeight'
      ]),
    }
  }
</script>
<style>
  #xoMenu{
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #2A3642;
  }
</style>
