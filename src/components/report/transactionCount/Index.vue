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

        <div class="flex_es padding_t_10">
          <div class="flex_a">
            <div class=" margin_r_10">
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

            <div >
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
          </div>

          <div class="flex_ec">
            <el-button>查询</el-button>
            <el-button type="primary">导出</el-button>
          </div>




        </div>



    </div>

    <div style="width: 100%;">
      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="no" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="day" label="日期" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopAddress" label="门店" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalPay" label="总支付金额" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalPayCount" label="总支付笔数" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="aliPay" label="支付宝" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="aliPayCount" label="支付宝笔数" width="120"></el-table-column>

        <el-table-column header-align="center" align="center" prop="weiXin" label="微信支付" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="weiXinCount" label="微信支付笔数" width="140"></el-table-column>
        <el-table-column header-align="center" align="center" prop="qq" label="QQ钱包" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="qqCount" label="QQ钱包笔数" width="140"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundAmount" label="退款金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundCount" label="退款笔数" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalMoney" label="实收金额（总）" width="100"></el-table-column>
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
  import {getScrollHeight} from '../../utility/getScrollHeight'
  export default {
    components:{
      xoNavPath
    },
    data() {
      return {
        width:0,
        tableHeight:0,
        navList:[{name:"统计报表",url:''},{name:"交易统计",url:''}],
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
          day: '2',
          shopAddr: '3'
        },{
          no: '1',
          day: '2',
          shopAddr: '3'
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
