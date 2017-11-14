<style scoped>
  .time {
    margin-left: 100px;
  }

  .bodyTop {
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of">
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
      <xo-datePicker @getRadioDate="getRadioDate"></xo-datePicker>

        <div class="padding_t_10 flex_es">
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

            <div class=" margin_r_10">
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

            <div class=" margin_r_10">
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
            <div class=" margin_r_10">
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

            <div class=" margin_r_10">
              <div>交易状态
              </div>
              <el-select v-model="statusValue" placeholder="请选择">
                <el-option
                  v-for="item in transactionStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </div>

            <div class=" margin_r_10">
              <div>支付单号</div>
              <el-input v-model="input1" placeholder="请输入内容"></el-input>

            </div>

            <div class=" margin_r_10">
              <div>商家单号</div>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </div>
          </div>

          <div class="flex_ec">
            <el-button @click="search()">查询</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </div>
    </div>

    <div style="width: 100%;">

      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="no" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payNo" label="支付单号（款易）"
                         width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopNo" label="商家单号（pos）"
                         width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shopAddress" label="门店"
                         width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="paymentMethod" label="支付方式"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="paymentChannel" label="支付通道"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="account" label="帐户" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="payMoney" label="支付金额"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundAmount" label="退款金额"
                         width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="receipts" label="实收金额"
                         width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="transactionTime" label="交易时间"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="transactionType" label="交易状态"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refundTime" label="退款时间"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund" label="退款人" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" fixed="right" width="70">
          <template scope="scope">
            <div class="flex">
              <el-button size="small">退款</el-button>
            </div>
          </template>
        </el-table-column>


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
  import getApi from './transactionList.service';

  export default {
    components: {
      xoNavPath
    },
    data() {
      return {
        width: 0,
        tableHeight: 0,
        navList: [{name: "统计报表", url: ''}, {name: "交易列表", url: ''}],
        input1: '',
        input2: '',
        options: [{
          value: '选项1',
          label: '11'
        }, {
          value: '选项2',
          label: '22'
        }],
        statusValue: 1,
        transactionStatus: [
          {
            value: 1,
            label: '全部'
          }, {
            value: 2,
            label: '支付成功'
          }, {
            value: 3,
            label: '支付失败'
          }, {
            value: 4,
            label: '待支付'
          }, {
            value: 5,
            label: '退款中'
          }, {
            value: 6,
            label: '部分退款成功'
          }
        ],
        value: '',
        tableData: [{
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }, {
          no: '1',
          payNo: '2',
          shopNo: '3'
        }],
        dateSelected: []
      }
    },
    computed: {
      pageState() {
        return {page: 1}
      }
    },
    methods: {
      search() {
        if (this.dateSelected[0] === '' && this.dateSelected[1] ==='') {
          this.$message({
            message: '请选择时间',
            type: 'warning'
          });
        } else {
            if (this.dateSelected[0] === '') {
              this.$message({
                message: '开始时间不能为空',
                type: 'warning'
              });
            } else if (this.dateSelected[1] === '') {
              this.$message({
                message: '结束时间不能为空',
                type: 'warning'
              });
            } else if (this.dateSelected[0] > this.dateSelected[1]) {
              this.$message({
                message: '开始时间不能大于结束时间',
                type: 'warning'
              });
            } else {
              //ok
              console.log(new Date(this.dateSelected[0]), new Date(this.dateSelected[1]))
            }
        }

      },
      getPage() {
      },
      getPageSize() {
      },

      getRadioDate(d) {
        this.dateSelected = d
      },

    },
   async created() {

      await getApi.getList({ 'action': 'store', 'controller': 'store', 'storeid': 1245, 'btype': 1 })
        .then((res) => {
        console.log(res)
        })

    },
    mounted() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>
