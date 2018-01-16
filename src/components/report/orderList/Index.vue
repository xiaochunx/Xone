<style scoped>

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

      <div class="padding_t_10 flex_es">
        <div class="flex_a f_f">
          <div class=" margin_r_10">
            <div>订单ID</div>
            <el-input v-model="order_id" placeholder="请输入查询订单ID" size="small"></el-input>
          </div>

          <div class=" margin_r_10">
            <div>订单类型</div>
            <el-select v-model="iway" clearable placeholder="请选择订单类型" size="small">
              <el-option
                v-for="item in getWayInfo"
                :key="item.id"
                :label="item.memo"
                :value="item.id">
              </el-option>
            </el-select>

          </div>

          <div class=" margin_r_10">
            <div>订单来源</div>
            <el-select v-model="ichannel" clearable placeholder="请选择订单来源" size="small">
              <el-option
                v-for="item in getChannelInfo"
                :key="item.id"
                :label="item.memo"
                :value="item.id">
              </el-option>
            </el-select>

          </div>
          <div class=" margin_r_10">
            <div>订单状态</div>
            <el-select v-model="account" clearable placeholder="请选择订单状态" size="small">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.accountName"
                :value="item.id">
              </el-option>
            </el-select>

          </div>

          <div class=" margin_r_10">
            <div>支付状态</div>
            <el-select v-model="pay_status" clearable placeholder="请选择支付状态" size="small">
              <el-option
                v-for="item in transactionStatus"
                :key="item.id"
                :label="item.memo"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10">
            <div>支付类型</div>
            <el-select v-model="pay_status" clearable placeholder="请选择支付类型" size="small">
              <el-option
                v-for="item in transactionStatus"
                :key="item.id"
                :label="item.memo"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10">
            <div>选择店铺</div>
            <el-select v-model="pay_status" clearable placeholder="请选择店铺" size="small">
              <el-option
                v-for="item in transactionStatus"
                :key="item.id"
                :label="item.memo"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10">
            <div>数据年份</div>
            <el-select v-model="pay_status" clearable placeholder="请选择年份" size="small">
              <el-option
                v-for="item in transactionStatus"
                :key="item.id"
                :label="item.memo"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10">
            <div>时间类型</div>
            <el-select v-model="pay_status" clearable placeholder="请选择时间类型" size="small">
              <el-option
                v-for="item in transactionStatus"
                :key="item.id"
                :label="item.memo"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10">
            <div>起始时间</div>
            <el-date-picker
              size="small"
              v-model="time_start"
              @change="timeStart"
              type="datetime"
              placeholder="选择开始日期时间">
            </el-date-picker>

          </div>

          <div class=" margin_r_10">
            <div>结束时间</div>
            <el-date-picker
              size="small"
              v-model="time_end"
              @change="timeEnd"
              type="datetime"
              placeholder="选择结束日期时间">
            </el-date-picker>
          </div>
        </div>

      </div>

      <div class="margin_t_10">
        <el-button @click="search()">查询</el-button>
        <el-button type="primary" @click="out()">导出</el-button>
        <el-button type="primary" @click="">切换到原始数据</el-button>
      </div>
    </div>

    <el-table :data="tableData" border :height="tableHeight">
      <el-table-column header-align="center" align="center" prop="no" label="序号" width="70">
        <template slot-scope="scope">
          <div>
            {{scope.$index + 1}}
          </div>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="order_no" label="订单ID"
                       width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="store_name" label="门店"
                       width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="out_order_no" label="桌号"
                       width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="iway" label="订单类型"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="ichannel" label="订单状态"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="iway" label="支付类型"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="iway" label="支付状态"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="account" label="订单金额" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="pay_money" label="支付金额"
                       width="100"></el-table-column>

      <el-table-column header-align="center" align="center" prop="receive_money" label="实收金额"
                       width="100"></el-table-column>

      <el-table-column header-align="center" align="center" prop="add_time" label="退款"
                       width="100"></el-table-column>

      <el-table-column header-align="center" align="center" prop="refund_time" label="时间"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="pay_status" label="用户"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="pay_status" label="详情"
                       width="100"></el-table-column>

    </el-table>
    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'

  import {getStoreListAll, getArr} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import {mapActions, mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {},
    data() {
      return {
        width: 0,
        tableHeight: 0,
        navList: [{name: "统计报表", url: ''}, {name: "交易列表", url: ''}],
        order_id: '',
        out_order_no: '',
        time_start: '',
        time_end: '',
        start_stamp: '',
        end_stamp: '',
        pay_status: '',
        transactionStatus: [],

        tableData: [],
        dateSelected: [],
        getWayInfo: [],
        iway: '',
        getChannelInfo: [],
        ichannel: '',
        storeData: [],
        store_id: '',
        accountList: [],
        account: '',
        p: {page: 1, size: 20, total: 0},
        store_id_list: []
      }
    },

    methods: {
      ...mapActions(['setTreeArr']),
      timeStart(d) {
        if (d === undefined) {
          this.start_stamp = ""
        } else {
          this.start_stamp = new Date(this.time_start) * 1;
        }
      },
      timeEnd(d) {
        if (d === undefined) {
          this.end_stamp = ""
        } else {
          this.end_stamp = new Date(this.time_end) * 1;
        }

      },
      out() {

      },
      search() {

        if (this.start_stamp > this.end_stamp) {
          this.$message({
            message: '开始时间不能大于结束时间',
            type: 'warning'
          });
        } else {
          //ok
          console.log(this.start_stamp, this.end_stamp)

        }


      },
      getPage(page) {
        this.p.page = page;


      },
      getPageSize(size) {
        this.p.size = size;


      },

      getRadioDate(d) {
        this.dateSelected = d
      },


    },
    created() {

    },
    mounted() {

    },
    destroyed() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>
