<template>
  <div id="xoMenu" :style="{height:ListHeight+'px'}">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" :width="300">

     <!-- <el-submenu index="1">
        <template slot="title">支付管理</template>
        <router-link to="/iPayment/accountList">
          <el-menu-item index="1-1">账户列表</el-menu-item>
        </router-link>
        <router-link to="/iPayment/issuedRecord"><el-menu-item index="1-2-1">新增下发</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">门店管理</template>
        <el-submenu index="2-1">
          <template slot="title">门店列表</template>
          <el-menu-item index="2-1-1">新增门店</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">查看门店</template>
          <el-menu-item index="2-2-1">编辑</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-3">门店组</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">统计报表</template>
        <el-menu-item index="3-1">交易列表</el-menu-item>
        <el-menu-item index="3-2">交易统计</el-menu-item>
        <el-menu-item index="3-3">结算记录(x1 pro)</el-menu-item>
        <el-menu-item index="3-4">差异账单查询(x1 pro)</el-menu-item>
        <el-menu-item index="3-5">对账单(x1 pro)</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">营销管理(x1 pro)</template>
        <el-menu-item index="4-1">运行中的方案</el-menu-item>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">基础设置</template>
        <el-menu-item index="5-1">商家信息</el-menu-item>
        <el-menu-item index="5-2">备用账户切换配置</el-menu-item>
        <el-menu-item index="5-3">客户端批量设置</el-menu-item>
        <el-menu-item index="5-4">支付方式</el-menu-item>
        <el-submenu index="5-5">
          <template slot="title">支付通道(x1 pro)</template>
          <el-submenu index="5-5-1">
            <template slot="title">权限管理</template>
            <el-menu-item index="5-5-1-1">用户组</el-menu-item>
            <el-menu-item index="5-5-1-2">用户管理</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">其他</template>
        <el-menu-item index="6-1">操作日志</el-menu-item>
        <el-submenu index="6-2">
          <template slot="title">帮助中心</template>
          <el-menu-item index="6-3">产品升级</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">文件夹</template>
        <el-menu-item index="7-1">业务流程</el-menu-item>
        <el-menu-item index="7-2">业务流程(满减满赠)</el-menu-item>
        <el-submenu index="7-3">
          <template slot="title">产品下载安装流程</template>
          <el-menu-item index="7-4">UI</el-menu-item>
        </el-submenu>
        <el-menu-item index="7-5">产品安装流程(min)</el-menu-item>
      </el-submenu>

      <el-submenu index="8">
        <template slot="title">客户端气泡</template>
        <el-menu-item index="8-1">气泡</el-menu-item>
      </el-submenu>

      <el-submenu index="9">
        <template slot="title">款易服务号</template>
      </el-submenu>

      <el-submenu index="10">
        <template slot="title">移动端</template>
        <el-menu-item index="10-1">开户(移动端)</el-menu-item>
      </el-submenu>-->

      <!--后期加上-->
      <el-submenu v-for="(value,index1) in leftList" :index=index1.toString() :key="index1">
        <template slot="title">{{value.name}}</template>
        <router-link v-for="(item,index2) in value.children" :to=item.route><el-menu-item :index=formatNum(index1,index2) :key="index2">{{item.name}}</el-menu-item></router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {

    },
    data() {
      return {
        leftList: [
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
                name: '门店组',
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
              {
                name: '结算记录',
                route: '/report/settlementRecord'
              },
              {
                name: '差异账单查询',
                route: '/report/billQuery'
              },
              {
                name: '对账单',
                route: '/report/accountStatement'
              }
            ]
          },
          {
            name: '基础设置',
            children: [
              {
                name: '商家信息',
                route: '/infrastructure/BusinessInfo'
              },
              {
                name: '备用账户切换配置',
                route: '/infrastructure/BackupAcc'
              },
              {
                name: '客户端批量设置',
                route: '/infrastructure/VolumeSet'
              },
              {
                name: '支付方式',
                route: '/infrastructure/PaymentWay'
              },
              {
                name: '支付通道',
                route: '/infrastructure/PayChannels'
              },
              {
                name: '权限管理',
                route: '/'
              },
            ]
          }
        ],
        ListHeight: 0
      }
    },
    methods: {
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
    mounted(){
      this.ListHeight = window.innerHeight - this.getTopHeight;
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
