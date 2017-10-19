<style scoped>
  .time {
    margin-left: 100px;
  }
  .body{
    padding:0 10px;
  }
  .bodyTop{
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of body">

    <div class="bodyTop">
      <div>
        <el-radio-group @change="myChange" v-model="radio">
          <el-radio-button v-for="(item,index) in radioList" :key="item.id" :label="item.name"></el-radio-button>
        </el-radio-group>
        <span class="time">时间：</span>
        <el-date-picker
          v-model="time_start"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>

        <span>至</span>
        <el-date-picker
          v-model="time_end"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
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
        <el-table-column header-align="center" align="center" prop="amount" label="划账金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="amountTime" label="划账金额到账时间" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="issuingBank" label="发卡行" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="cardNumber" label="卡号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="cardholder" label="持卡人" width="100"></el-table-column>
      </el-table>


    </div>
    <!--<xo-footer :pageData=pageState @childEvent="getPage" @childEventPageSize="getPageSize"></xo-footer>-->
    <xo-pagination></xo-pagination>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        width:0,
        tableHeight:0,
        radio: '今天',
        time_start: '',
        time_end: '',
        radioList: [{id: 1, name: "今天"}, {id: 2, name: "昨天"}, {id: 3, name: "近7天"}, {id: 4, name: "近30天"}],
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
      myChange(d) {
        console.log(d)
      }
    },
    created(){

    },
    updated(){
      let bodyHeight = document.querySelector('.content-body').clientHeight;
      let bodyTopHeight = document.querySelector('.bodyTop').clientHeight;
      let footHeight = document.querySelector('footer').clientHeight;
      let tableHeight = bodyHeight - bodyTopHeight - footHeight;
      this.tableHeight = tableHeight;
      console.log(tableHeight)
    },

  }
</script>
