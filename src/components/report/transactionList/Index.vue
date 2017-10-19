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

          <div class="flex_1 margin_r_10">
            <div>支付通道</div>
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

          <div class="flex_1 margin_r_10">
            <div>交易状态
            </div>
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
            <div>支付单号</div>
            <el-input v-model="input1" placeholder="请输入内容"></el-input>

          </div>

          <div class="flex_1 margin_r_10">
            <div>商家单号</div>
            <el-input v-model="input2" placeholder="请输入内容"></el-input>

          </div>

          <div class="flex_1 flex_ec margin_r_10">
            <el-button>查询</el-button>
            <el-button type="primary">导出</el-button>
          </div>

        </div>


      </div>
    </div>




    <div style="width: 100%;">

      <el-table :data="tableData" border :height="tableHeight" style="width: 100%;">
        <el-table-column header-align="center" align="center" prop="no" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payNo" label="支付单号（款易）" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopNo" label="商家单号（pos）" width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopAddr" label="门店" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="pay" label="支付方式" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payType" label="支付通道" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="user" label="帐户" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payMoney" label="支付金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund" label="退款金额" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="receipts" label="实收金额" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="tranTime" label="交易时间" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="tranType" label="交易状态" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundtime" label="退款时间" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundMan" label="退款人" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" fixed="right" width="70">
          <template scope="scope">
            <el-button
              size="small">编辑</el-button>
          </template>
        </el-table-column>



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
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },{
          no: '1',
          payNo: '2',
          shopNo: '3'
        },]
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
