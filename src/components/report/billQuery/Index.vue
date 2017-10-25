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
            <div>门店</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex_1 margin_r_10">
            <div>支付方式</div>
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
        <el-table-column header-align="center" align="center" prop="differenceTime" label="差异日期" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="differenceShop" label="差异门店" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="differenceMoney" label="差异金额" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="posAmount" label="pos金额" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="payAmount" label="支付金额" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="payCount" label="交易笔数" ></el-table-column>

        <el-table-column header-align="center" align="center" prop="differenceBill" label="差异账单号(pos)" ></el-table-column>

        <el-table-column header-align="center" align="center" prop="payment" label="支付单号（款易）" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="payType" label="支付方式" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="payTime" label="支付时间" ></el-table-column>

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
        navList:[{name:"统计报表",url:''},{name:"差异账单查询",url:''}],

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
