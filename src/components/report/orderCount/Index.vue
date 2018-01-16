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
            <div>请选择门店</div>
            <el-select v-model="order_id" clearable placeholder="请选择门店" size="small">
              <el-option
                v-for="item in getWayInfo"
                :key="item.id"
                :label="item.memo"
                :value="item.id">
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
          <div class=" margin_r_10">
            <div>平台</div>
            <el-radio v-model="radio" :label="1">全部</el-radio>
            <el-radio v-model="radio" :label="2">款易</el-radio>
            <el-radio v-model="radio" :label="3">美团外卖</el-radio>
            <el-radio v-model="radio" :label="4">饿了么外卖</el-radio>
            <el-radio v-model="radio" :label="5">百度外卖</el-radio>
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

      <el-table-column header-align="center" align="center" prop="order_no" label="日期" ></el-table-column>

      <el-table-column header-align="center" align="center" prop="account" label="订单金额"></el-table-column>
      <el-table-column header-align="center" align="center" prop="pay_money" label="支付单数" ></el-table-column>

      <el-table-column header-align="center" align="center" prop="receive_money" label="支付金额" ></el-table-column>

      <el-table-column header-align="center" align="center" prop="add_time" label="实收金额"></el-table-column>

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
        radio:1,
        getWayInfo:[],
        tableData: [],
        time_start: '',
        time_end: '',
        start_stamp: '',
        end_stamp: '',

        p: {page: 1, size: 20, total: 0},

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
