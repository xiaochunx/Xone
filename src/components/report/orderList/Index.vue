<style scoped>

  .bodyTop {
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of">
    <div class="bodyTop">
      <div class="">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div class="flex_a f_f">

          <div class=" margin_r_10 margin_t_10">
            <span>下单日期</span>
            <el-date-picker
              size="small"
              v-model="time_start"
              @change="timeStart"
              type="datetime"
              placeholder="选择开始日期时间">
            </el-date-picker>
          </div>

          <div class=" margin_r_10 margin_t_10">
            <span>至</span>
            <el-date-picker
              size="small"
              v-model="time_end"
              @change="timeEnd"
              type="datetime"
              placeholder="选择结束日期时间">
            </el-date-picker>
          </div>

          <div class=" margin_r_10 margin_t_10">
            <span>订单状态</span>
            <el-select v-model="account" clearable placeholder="请选择订单状态" size="small">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10 margin_t_10">
            <span>选择门店</span>
            <el-select v-model="store_id" clearable placeholder="请选择" size="small">
              <el-option
                v-for="item in storeData"
                :key="item.id"
                :label="item.storeName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class=" margin_r_10 margin_t_10">
            <span>选择来源</span>
            <el-select v-model="souces_id" clearable placeholder="请选择订单状态" size="small">
              <el-option
                v-for="item in souces"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

        </div>

      </div>

      <div class="margin_t_10">
        <el-button @click="search()">查询</el-button>
        <!--<el-button type="primary" @click="out()">导出</el-button>-->
        <!--<el-button type="primary" @click="">切换到原始数据</el-button>-->
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
      <el-table-column header-align="center" align="center" prop="order_no" label="来源"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="out_order_no" label="平台单号"
                       width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="store_name" label="门店"
                       width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="ichannel" label="订单状态"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="receive_money" label="实收金额"
                       width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="down_time" label="下单时间"
                       ></el-table-column>
      <el-table-column header-align="center" align="center" prop="finish_time" label="完成时间"
                       ></el-table-column>

      <el-table-column header-align="center" align="center" prop="pay_status" label="用户"
                       ></el-table-column>
      <el-table-column header-align="center" align="center" prop="pay_status" label="操作"
                       width="80">
        <template slot-scope="scope">
          <el-button size="small" @click="info()">详情</el-button>
        </template>
      </el-table-column>


    </el-table>
    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%" size="tiny">

    </el-dialog>

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
        dialogVisible:false,
        width: 0,
        tableHeight: 0,
        navList: [{name: "统计报表", url: ''}, {name: "订单列表", url: ''}],
        time_start: '',
        time_end: '',
        start_stamp: '',
        end_stamp: '',
        pay_status: '',
        tableData: [{}],
        dateSelected: [],
        storeData: [],
        store_id: '',
        accountList: [{id:1,name:'全部'},{id:2,name:'待接单'},{id:3,name:'已接单'},{id:4,name:'取消/退款'},{id:5,name:'已完成'}],
        souces:[{id:1,name:'全部'},{id:2,name:'饿了么'},{id:3,name:'美团外卖'},{id:4,name:'百度外卖'}],
        souces_id:'',
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
      info() {
        this.dialogVisible =true
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
      getStoreListAll().then((res)=>{
        // let list = [];
        // res.data.data.forEach((item)=>{
        //   list.push(item.id)
        // });
        // this.store_id_list = list;

        // this.orderCount(this.dateSelected[0] ,this.dateSelected[1],this.store_id_list.join(','),this.store_name,this.p);

        this.storeData = res.data.data
      });
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
