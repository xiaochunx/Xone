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
        <el-table-column header-align="center" align="center" prop="day" label="日期" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopAddr" label="门店" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalPay" label="总支付金额" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalPayCount" label="总支付笔数" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="zfb" label="支付宝" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="zfbCount" label="支付宝笔数" width="120"></el-table-column>

        <el-table-column header-align="center" align="center" prop="weixin" label="微信支付" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="weixinCount" label="微信支付笔数" width="140"></el-table-column>
        <el-table-column header-align="center" align="center" prop="qq" label="QQ钱包" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="qqCount" label="QQ钱包笔数" width="140"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundMoney" label="退款金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundCount" label="退款笔数" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="totalMoney" label="实收金额（总）" width="100"></el-table-column>
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
