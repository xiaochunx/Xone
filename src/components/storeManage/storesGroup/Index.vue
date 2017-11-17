<template>
  <div>
    <div class="padding_b_10 flex_sb bodyTop">
      <xo-nav-path :navList="navList"></xo-nav-path>
      <el-button size="small" type="primary" @click="addGroup()">新增门店组</el-button>
    </div>
    <div>
      <el-table :data="tableData" border :height="tableHeight" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="65">
          <template scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="门店组编码">
          <template scope="scope">
            <span>{{ scope.row.accountNum }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="门店组名称">
          <template scope="scope">
            <div>
              {{scope.row.account}}
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="200">
          <template scope="scope">
            <div class="flex">
              <el-popover trigger="hover" placement="top" class="margin_r_10">
                <p v-if="scope.row.count">序号: {{ scope.row.count }}</p>
                <p v-if="scope.row.accountNum">账号编号: {{ scope.row.accountNum }}</p>
                <p v-if="scope.row.account">账号名称: {{ scope.row.account }}</p>
                <p v-if="scope.row.payment">支付通道: {{ scope.row.payment }}</p>
                <p v-if="scope.row.status">状态: {{ scope.row.status }}</p>
                <p v-if="scope.row.lastEdit">最后编辑人: {{ scope.row.lastEdit }}</p>
                <p v-if="scope.row.lastDate">最后编辑事件: {{ scope.row.lastDate }}</p>
                <p v-if="scope.row.useStore">使用中的门店: {{ scope.row.useStore }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag>查看</el-tag>
                </div>
              </el-popover>
              <el-button size="small" type="primary" @click="">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>

          </template>
        </el-table-column>

      </el-table>
    </div>
    <footer>
      <xo-pagination></xo-pagination>
    </footer>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  export default {
    components: {

    },
    data() {
      return {
        tableHeight:0,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: ''}],
        tableData: [{
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          thirdPartCode: '美团-89898989',
          lastEdit: '王小虎',
          lastDate: '2016-05-04 04:33:23',
          useStore: '天河一店 天河二店'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      addGroup(){
        this.$router.push('/storeManage/storeGroup/addGroup')
      }
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
  }
</script>

<style>
</style>
