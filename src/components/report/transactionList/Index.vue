<style scoped>
  .time {
    margin-left: 100px;
  }

  .bodyTop {
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of" v-show="getTreeArr['列表']">
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
      <xo-datePicker @getRadioDate="getRadioDate"></xo-datePicker>

        <div class="padding_t_10 flex_es">
          <div class="flex_a">
            <div class=" margin_r_10">
              <div>门店</div>
              <el-select v-model="store_id" clearable placeholder="请选择">
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
              <el-select v-model="iway" clearable placeholder="请选择支付方式">
                <el-option
                  v-for="item in getWayInfo"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>

            </div>

            <div class=" margin_r_10">
              <div>支付通道</div>
              <el-select v-model="ichannel" clearable placeholder="请选择通道列表">
                <el-option
                  v-for="item in getChannelInfo"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>

            </div>
            <div class=" margin_r_10">
              <div>账户</div>
              <el-select v-model="account" clearable placeholder="请选择账户">
                <el-option
                  v-for="item in accountList"
                  :key="item.id"
                  :label="item.accountName"
                  :value="item.id">
                </el-option>
              </el-select>

            </div>

            <div class=" margin_r_10">
              <div>交易状态
              </div>
              <el-select v-model="pay_status" clearable placeholder="请选择">
                <el-option
                  v-for="item in transactionStatus"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>

            </div>

            <div class=" margin_r_10">
              <div>支付单号</div>
              <el-input v-model="order_no" placeholder="请输入内容"></el-input>

            </div>

            <div class=" margin_r_10">
              <div>商家单号</div>
              <el-input v-model="out_order_no" placeholder="请输入内容"></el-input>
            </div>
          </div>

          <div class="flex_ec">
            <el-button @click="search()">查询</el-button>
            <el-button type="primary" @click="out()" v-show="getTreeArr['导出']">导出</el-button>
          </div>
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
        <el-table-column header-align="center" align="center" prop="order_no" label="支付单号（款易）"
                         width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="out_order_no" label="商家单号（pos）"
                         width="150"></el-table-column>
        <el-table-column header-align="center" align="center" prop="store_name" label="门店"
                         width="270"></el-table-column>
        <el-table-column header-align="center" align="center" prop="iway" label="支付方式"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="ichannel" label="支付通道"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="account" label="帐户" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="pay_money" label="支付金额"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund_money" label="退款金额"
                         width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="receive_money" label="实收金额"
                         width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="add_time" label="交易时间"
                         width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="pay_status" label="交易状态"
                         width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund_time" label="退款时间"
                         width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund_user" label="退款人" width="100"></el-table-column>
        <!--<el-table-column header-align="center" align="center" label="操作" fixed="right" width="70">-->
          <!--<template slot-scope="scope">-->
            <!--<div class="flex">-->
              <!--<el-button size="small">退款</el-button>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>


    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './transactionList.service';
  import {getWayInfo,getChannelInfo,getList,getArr} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {

    },
    data() {
      return {
        width: 0,
        tableHeight: 0,
        navList: [{name: "统计报表", url: ''}, {name: "交易列表", url: ''}],
        order_no: '',
        out_order_no: '',

        pay_status: '',
        transactionStatus: [],

        tableData: [],
        dateSelected: [],
        getWayInfo:[],
        iway:'',
        getChannelInfo:[],
        ichannel:'',
        storeData: [],
        store_id: '',
        accountList:[],
        account:'',
        p: {page: 1, size: 20, total: 0},
        store_id_list:[]
      }
    },

    methods: {
      ...mapActions(['setTreeArr']),
      store(){
        let store;
        if(this.store_id === ''){
          store = this.store_id_list.join(',')
        }else {
          store = this.store_id
        }
        return store
      },
      out(){
       let store = this.store();
        getApi.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.p,1).then((res)=>{
          if(res.data.errcode === 0){
            window.location.href = res.data.data
          }
        })
      },
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
              console.log(this.dateSelected[0] ,this.dateSelected[1])
              let store = this.store();
              this.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.p)
            }
        }

      },
      getPage(page) {
        this.p.page = page;
        let store = this.store();
        this.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.p)

      },
      getPageSize(size) {
        this.p.size = size;
        let store = this.store();
        this.orderList(this.dateSelected[0] ,this.dateSelected[1],store,this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.p)

      },

      getRadioDate(d) {
        this.dateSelected = d
      },
      orderList(start_time,end_time,store_id,iway,ichannel,account,pay_status,order_no,out_order_no,p,export1 = ''){
        getApi.orderList(start_time,end_time,store_id,iway,ichannel,account,pay_status,order_no,out_order_no,p,export1).then((res)=>{
          if(res.data.errcode === 0){
            res.data.data.list.forEach((item)=>{
              item.add_time = new Date(item.add_time).format("yyyy-MM-dd hh:mm:ss");
              if(item.refund_time){
                item.refund_time = new Date(item.refund_time).format("yyyy-MM-dd hh:mm:ss")
              }
            });
            this.tableData = res.data.data.list;
            this.p.total = res.data.data.count
          }
        })
      }

    },
    created() {



      getWayInfo().then((res) => {
        this.getWayInfo = res.data.data
      });

      getChannelInfo().then((res) => {
        this.getChannelInfo = res.data.data
      });

      getApi.getAccountList().then((res)=> {
        this.accountList = res.data.data.list
      });

      getApi.putOrderStatus().then((res)=>{
        if(res.data.errcode === 0){
          this.transactionStatus = res.data.data
        }
      });


    },
    mounted() {
      getList().then((res)=>{
        let list = [];
        res.data.data.list.forEach((item)=>{
          list.push(item.id)
        });
        this.store_id_list = list;

        this.orderList(this.dateSelected[0] ,this.dateSelected[1],this.store_id_list.join(','),this.iway,this.ichannel,this.account,this.pay_status,this.order_no,this.out_order_no,this.p)

        this.storeData = res.data.data.list
      });
      Hub.$on('arr', (e) => {
        this.setTreeArr({obj:getArr(e)})
      });
    },
    destroyed(){
      Hub.$off("arr")
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>
