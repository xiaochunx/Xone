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
      <xo-datePicker @getRadioDate="getRadioDate"></xo-datePicker>

        <div class="flex_es padding_t_10">
          <div  class="flex_a">
            <div class="margin_r_10">
              <div>门店</div>
              <el-select v-model="store_id" clearable filterable placeholder="请选择" size="small">
                <el-option
                  v-for="item in storeData"
                  :key="item.id"
                  :label="item.storeName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class=" margin_r_10">
              <div>支付方式</div>
              <el-select v-model="iway" clearable filterable placeholder="请选择支付方式" size="small">
                <el-option
                  v-for="item in getWayInfo"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="flex_ec">
            <el-button size="small" @click="search()">查询</el-button>
            <el-button type="primary" size="small" @click="out()">导出</el-button>
          </div>
        </div>

    </div>

      <el-table :data="tableData" border :height="tableHeight">
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

    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  import {getStoreListAll} from '../../utility/communApi'
  import getApi1 from '../transactionList/transactionList.service';
  export default {
    components:{

    },
    computed: {
      ...mapGetters([
        'getTreeArr','getBodyHeight'
      ]),
    },
    data() {
      return {
        width:0,
        tableHeight:0,
        navList:[{name:"统计报表",url:''},{name:"差异账单查询",url:''}],
        store_id:'',
        iway:'',
        storeData:[],
        getWayInfo:[],
        p: {page: 1, size: 20, total: 0},
        tableData: [],
        dateSelected: [],
      }
    },

    methods: {
      search(){

      },
      out(){

      },
      getPage(page) {
        this.p.page = page;

        //this.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.scavengingForm,this.receive_terminal,this.p)

      },
      getPageSize(size) {
        this.p.size = size;

       // this.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.scavengingForm,this.receive_terminal,this.p)

      },
      getRadioDate(d) {
        this.dateSelected = d
      },

    },
    created(){
      getApi1.getWayInfo().then((res) => {
        this.getWayInfo = res.data.data
      });
      getStoreListAll().then((res)=>{


        //this.orderList(this.dateSelected[0] ,this.dateSelected[1],this.store_id_list.join(','),this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.scavengingForm,this.receive_terminal,this.p)

        this.storeData = res.data.data
      });
    },
    mounted() {
      Hub.$emit('mountedOk','mountedOk');
      this.$nextTick(()=>{
        getScrollHeight(this.getBodyHeight).then((h) => {
          this.tableHeight = h;
        })
      })
    },
    updated(){

    },

  }
</script>
