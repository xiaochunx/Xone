<template>
  <div id="paymentWay">
    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
            <router-link to="/infrastructure/PayChannels/NewPayChannels"><el-button icon="plus" size="small" type="primary">新增支付通道</el-button></router-link>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="count"
            label="序号">
          </el-table-column>

          <el-table-column
            prop="payCode"
            label="支付方式编码"
          ></el-table-column>

          <el-table-column
            prop="payChannels"
            label="支付通道">
          </el-table-column>

          <!--<el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <el-col :span="24" style="padding: 25px 0 25px 0">
          <xo-pagination></xo-pagination>
        </el-col>
      </el-card>
    </div>
  </div>
</template>
<script>
  import xoNavPath from './NavPath.vue'
  export default {
    data(){
      return{
        tableData: [{
          count: '1',
          payCode: '83789',
          payChannels: '通联支付',
        },{
          count: '1',
          payCode: '83789',
          payChannels: '通联支付',
        },{
          count: '1',
          payCode: '83789',
          payChannels: '通联支付',
        },{
          count: '1',
          payCode: '83789',
          payChannels: '通联支付',
        }]
      }
    },
    components: {
      xoNavPath
    },
    methods: {
      /*handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }*/
    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }
</style>
