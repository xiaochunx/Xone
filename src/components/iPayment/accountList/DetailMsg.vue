<template>
  <div id="detailMsg">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" :label-position="'top'">

      <el-form-item label="支付方式">
        <el-select v-model="formInline.value1" placeholder="全部">
          <el-option
            v-for="item in formInline.option1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付通道">
        <el-select v-model="formInline.value2" placeholder="全部">
          <el-option
            v-for="item in formInline.option2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账号名称">
        <el-input v-model="formInline.user" placeholder=""></el-input>
      </el-form-item>

      <el-form-item style="vertical-align: bottom">
        <el-button @click="search">搜索</el-button>
      </el-form-item>

      <el-form-item style="vertical-align: bottom">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>

      <el-form-item style="vertical-align: bottom">
        <router-link to="/iPayment/accountList/account">
          <el-button type="primary" icon="edit">新增账号</el-button>
        </router-link>
      </el-form-item>

    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        width="65">
        <template scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户编号"
      >
        <template scope="scope">
          <span>{{ scope.row.accountNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户名称"
        width="180"
      >
        <template scope="scope">
          <el-row>
            <el-col :span="18">
              <el-input v-model="scope.row.account" placeholder=""></el-input>
            </el-col>
            <el-col :span="5" :offset="1" style="line-height: 36px">
              <el-button
                size="small"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)">保存
              </el-button>
            </el-col>

          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="支付通道">
        <template scope="scope">
          <span>{{ scope.row.payment }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="查看">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
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
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          value1: '', // 支付方式
          option1: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
          ],  // 支付方式

          value2: '', // 支付通道
          option2: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
          ],  // 支付通道

          region: '',
          user: ''
        },
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
      onSubmit() {
        console.log('submit!');
      },
      search() {
        console.log('search');
      },
      save() {
        console.log('save');
      }
    }
  }
</script>
<style scoped>
  div.cell {
    text-align: center;
  }
</style>

