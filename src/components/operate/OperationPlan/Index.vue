<template>
  <div>
    <div class="padding_b_10 flex_sb bodyTop">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div>
      <el-table :data="tableData" border :height="tableHeight" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="65">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="账户" prop="account">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="支付方式" prop="payment">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="支付通道" prop="payChannel">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="时间" prop="time" width="200">
      </el-table-column>
        <el-table-column header-align="center" align="center" label="门店" prop="store">
      </el-table-column>
        <el-table-column header-align="center" align="center" label="操作员" prop="operation" >
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" >
          <template scope="scope">
            <el-switch
              v-model="scope.row.value2"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>

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
        navList: [{name: "运营方案", url: ''}],
        tableData: [{
          account: '炳胜（马场店',
          payment: '支付宝',
          payChannel: '易极付',
          time: '2017-7-12  12:34:56',
          store: '炳胜（马场店）',
          operation: 'aaa',
          value2:true
        }],

      }
    },
    methods: {


    },

    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    created(){


    }
  }
</script>

<style scoped lang="less">
  .m-rank {
    width: 40px;
  .m-rank-child {
    height: 18px;
    border-bottom: 1px solid #000;
  }
  }


  .m-storeCode {
    font-size: 30px;
  }
</style>
