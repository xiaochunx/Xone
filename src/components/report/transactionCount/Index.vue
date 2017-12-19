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

          </div>

          <div class="flex_ec">
            <el-button @click="search()">查询</el-button>
            <el-button type="primary" @click="out()">导出</el-button>
          </div>
        </div>
    </div>

      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="no" label="序号" width="70">
          <template slot-scope="scope">
            <div>
              {{scope.$index +1}}
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="time" label="日期" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="store_name" label="门店" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="total_money" label="总支付金额" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="total_num" label="总支付笔数" width="120"></el-table-column>
        <el-table-column header-align="center" align="center" prop="ali_money" label="支付宝" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="ali_num" label="支付宝笔数" width="120"></el-table-column>

        <el-table-column header-align="center" align="center" prop="wx_money" label="微信支付" width="100"></el-table-column>

        <el-table-column header-align="center" align="center" prop="wx_num" label="微信支付笔数" width="140"></el-table-column>
        <!--<el-table-column header-align="center" align="center" prop="qq" label="QQ钱包" width="100"></el-table-column>-->
        <!--<el-table-column header-align="center" align="center" prop="qqCount" label="QQ钱包笔数" width="140"></el-table-column>-->
        <el-table-column header-align="center" align="center" prop="refund_money" label="退款金额" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="refund_num" label="退款笔数" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="receive_money" label="实收金额（总）" width="100"></el-table-column>
      </el-table>

    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>
  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './transactionCount.service';
  import {getWayInfo,getChannelInfo,getList} from '../../utility/communApi'

  export default {
    components:{

    },
    data() {
      return {
        width:0,
        tableHeight:0,
        navList:[{name:"统计报表",url:''},{name:"交易统计",url:''}],

        storeData: [],
        value: '',
        tableData: [],
        store_id_list:[],
        store_id:'',
        p: {page: 1, size: 20, total: 0},
        dateSelected:[]
      }
    },
    computed:{

    },
    methods: {
      out(){
        let store = this.store();
        getApi.orderCount(this.dateSelected[0] ,this.dateSelected[1],store,this.p,1).then((res)=>{
          if(res.data.errcode === 0){
            console.log(res)

            window.location.href = "http://laowang.com/kybase/uploads/x0read.xlsx"

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


            this.orderCount(this.dateSelected[0] ,this.dateSelected[1],store,this.p)


          }
        }

      },
      store(){
        let store;
        if(this.store_id === ''){
          store = this.store_id_list.join(',')
        }else {
          store = this.store_id

        }
        return store
      },
      getPage(page) {
        this.p.page = page;
        let store = this.store();
        this.orderCount(this.dateSelected[0] ,this.dateSelected[1],store,this.p)

      },
      getPageSize(size) {
        this.p.size = size;
        let store = this.store();

        this.orderCount(this.dateSelected[0] ,this.dateSelected[1],store,this.p)

      },
      getRadioDate(d){
        this.dateSelected = d
      },
      orderCount(start_time,end_time,store_id,p,export1 = ''){
        getApi.orderCount(start_time,end_time,store_id,p,export1).then((res)=>{
          if(res.data.errcode === 0){
            console.log(res)
            this.tableData = res.data.data.list;
            this.p.total = res.data.data.count

          }
        })
      }
    },
    created(){

    },
    mounted() {
      getList().then((res)=>{
        let list = [];
        res.data.data.list.forEach((item)=>{
          list.push(item.id)
        });
        this.store_id_list = list;

        this.orderCount(this.dateSelected[0] ,this.dateSelected[1],this.store_id_list.join(','),this.p);

        this.storeData = res.data.data.list
      });

    },
    updated(){
      getScrollHeight().then((h)=>{
        this.tableHeight = h;
      })
    },

  }
</script>
