<style scoped>

  .bodyTop{
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="scroll_of" >
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>


        <div class="flex_es">
          <div class="flex_a">
            <div class=" margin_r_10">
              <div>门店</div>
              <el-select size="small" v-model="storeId" clearable filterable placeholder="请选择" @change="handleStoreId">
                <el-option
                  v-for="item in storeData"
                  :key="item.base_store_id"
                  :label="item.storename"
                  :value="item.base_store_id">
                </el-option>
              </el-select>
            </div>

            <div class=" margin_r_10">
              <div>请选择时间</div>

              <div class="flex_a">
                <div class=" margin_r_10 ">

                  <el-date-picker
                    size="small"
                    v-model="time_start"
                    @change="timeStart"
                    type="datetime"
                    placeholder="选择开始日期时间">
                  </el-date-picker>
                </div>

                <div >
                  <span>至</span>
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

            <div class=" margin_r_10">
              <div>请选择平台</div>
              <el-select size="small" v-model="planId" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in planData"
                  :key="item.base_store_id"
                  :label="item.storename"
                  :value="item.base_store_id">
                </el-option>
              </el-select>
            </div>

            <div class=" margin_r_10">
              <div>导出分类选择</div>
              <el-checkbox-group v-model="checkList" style="height: 30px" class="flex_a">
                <el-checkbox label="1">规格</el-checkbox>
                <el-checkbox label="2">属性</el-checkbox>

              </el-checkbox-group>
            </div>

          </div>

          <div class="flex_ec">
            <el-button @click="search()" size="small">查询</el-button>
            <el-button type="primary" @click="out()" size="small">导出</el-button>
          </div>
        </div>
    </div>

      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="time" label="日期" width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="store_name" label="品类" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="total_money" label="菜品" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="total_num" label="规格" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="ali_money" label="数量" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="ali_num" label="小计" ></el-table-column>

      </el-table>

    <footer>
      <!--<xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>-->
    </footer>
  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {oneTwoApi} from '@/api/api.js';
  import { mapActions,mapGetters } from 'vuex';
  import Hub from '../../utility/commun'
  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components:{

    },
    data() {
      return {

        tableHeight:0,
        navList:[{name:"统计报表",url:''},{name:"菜品销售排行",url:''}],
        storeData: [],
        tableData: [],
        storeId:'',
        planData:[],
        planId:'',
        p: {page: 1, size: 20, total: 0},
        time_start: '',
        time_end: '',
        start_stamp: '',
        end_stamp: '',
        checkList:[]
      }
    },

    methods: {
      ...mapActions(['setTreeArr']),
      handleStoreId(){
        //this.orderList(this.start_stamp,this.end_stamp,this.p)
      },
      timeStart(d) {
        if (d === undefined) {
          this.start_stamp = ""
        } else {
          this.start_stamp = (new Date(this.time_start) * 1 +'').substr(0,10);
        }
        this.orderList(this.start_stamp,this.end_stamp,this.p)
      },
      timeEnd(d) {
        if (d === undefined) {
          this.end_stamp = ""
        } else {
          this.end_stamp = (new Date(this.time_end) * 1 + '').substr(0,10);
        }
        this.orderList(this.start_stamp,this.end_stamp,this.p)
      },
      out(){
        let params = {
          //redirect: "x1.order.orderCount",

        };
        oneTwoApi(params).then((res) => {
          if(res.errcode === 0){
            window.location.href = res.data
          }
        })


      },
      search() {
        let params = {
          // redirect: "x2.order.index",
          // begTime: begDate,
          // endTime:endDate,
          // status:this.status,
          // storeId:this.storeId,
          // source:this.source,
          // page:p.page,
          // pagesize:p.size,
        };
        oneTwoApi(params).then((res) => {
          if(res.errcode === 0){
            this.tableData = res.data.list;
            this.p.total = res.data.count;
          }
        })

      },

      getPage(page) {
        this.p.page = page;

      },
      getPageSize(size) {
        this.p.size = size;


      },

    },
    created(){

    },
    mounted() {
      let params = {
        redirect: "x2.store.index",
        noPage:1
      };
      oneTwoApi(params).then((res) => {
        if(res.errcode === 0){
          this.storeData = res.data.list;
        }
      });
      Hub.$emit('mountedOk','mountedOk');
    },
    destroyed(){

    },
    updated(){
      getScrollHeight().then((h)=>{
        this.tableHeight = h;
      })
    },

  }
</script>
