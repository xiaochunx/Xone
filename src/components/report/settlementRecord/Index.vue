<style scoped>
  .time {
    margin-left: 100px;
  }

  .bodyTop{
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of">
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
      <xo-datePicker @getRadioDate="getRadioDate" @getStartTime="getStartTime" @getEndTime="getEndTime"></xo-datePicker>
      <div class="padding_t_10">
        <div class="flex_r">
          <div class="flex_1 margin_r_10">
            <div>账户</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex_1 flex_ec margin_r_10">
            <el-button>查询</el-button>
            <el-button type="primary">导出</el-button>
          </div>
          <div class="flex_1 flex_ec margin_r_10">
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;">
      <el-table :data="tableData" border :height="tableHeight" style="width: 100%;">
        <el-table-column header-align="center" align="center" prop="no" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="settlementLot" label="结算批次" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="account" label="账户" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="accountTime" label="划账时间" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="transactionTime" label="交易起止时间" width="140"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payMoney" label="交易金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payCount" label="交易笔数" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="refundAmount" label="退款金额" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="refundCount" label="退款笔数" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="netPayment" label="支付净额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="serviceCharge" label="手续费" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="amountOfAccount" label="划账金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="amountTime" label="划账金额到账时间" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="issuingBank" label="发卡行" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="cardNumber" label="卡号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="cardholder" label="持卡人" width="100"></el-table-column>
      </el-table>


    </div>
    <!--<xo-footer :pageData=pageState @childEvent="getPage" @childEventPageSize="getPageSize"></xo-footer>-->
    <footer>
      <xo-pagination></xo-pagination>
    </footer>
  </div>
</template>

<script>
  import xoNavPath from '../NavPath.vue'
  import {getScrollHeight} from '../reportComponents/getScrollHeight'
  export default {
    components:{
      xoNavPath
    },
    data() {
      return {
        width:0,
        tableHeight:0,
        navList:[{name:"统计报表",url:''},{name:"结算记录",url:''}],
        input1:'',
        input2:'',
        options: [{
          value: '选项1',
          label: '11'
        }, {
          value: '选项2',
          label: '22'
        }],
        value: '',
        tableData: [{
          no: '1',
          settlementLot: '2',
          account: '3'
        },{
          no: '1',
          settlementLot: '2',
          account: '3'
        }]
      }
    },
    computed:{
      pageState(){
        return {page:1}
      }
    },
    methods: {
      getPage(){},
      getPageSize(){},
      getRadioDate(d){
        console.log(d)
      },
      getStartTime(d){
        console.log(d)
      },
      getEndTime(d){
        console.log(d)
      },
    },
    created(){

    },
    updated(){
      getScrollHeight().then((h)=>{
        this.tableHeight = h;
      })
    },

  }
</script>
