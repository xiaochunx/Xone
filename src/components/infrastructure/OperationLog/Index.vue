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
      <xo-datePicker @getRadioDate="getRadioDate" @getStartTime="getStartTime" @getEndTime="getEndTime"></xo-datePicker>

        <div class="flex_es padding_t_10">
          <div class="flex_a">
            <div class=" margin_r_10">
              <div>操作人</div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div >
              <div>操作类型</div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="flex_ec">
            <el-input class="margin_r_10" v-model="input"></el-input>
            <el-button>查询</el-button>
          </div>

        </div>

    </div>
      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="operation" label="操作人" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="operationType" label="操作类型" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="operationAction" label="操作动作"></el-table-column>
        <el-table-column header-align="center" align="center" prop="operationTime" label="操作时间" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="ip" label="IP" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="remarks" label="备注" ></el-table-column>
      </el-table>

    <!--<xo-footer :pageData=pageState @childEvent="getPage" @childEventPageSize="getPageSize"></xo-footer>-->
    <footer>
      <xo-pagination></xo-pagination>
    </footer>
  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  export default {
    components:{
    },
    data() {
      return {
        width:0,
        tableHeight:0,
        navList:[{name:"基础设置",url:''},{name:"操作日志",url:''}],
        input:'',
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
          operation: '1',
          operationType: '2',
          operationAction: '3',
          operationTime:'',
          ip:'',
          remarks:''
        },{
          operation: '1',
          operationType: '2',
          operationAction: '3',
          operationTime:'',
          ip:'',
          remarks:''
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
      getRadioDate(d){
        console.log(d)
      },
      getStartTime(d){
        console.log(d)
      },
      getEndTime(d){
        console.log(d)
      },
    },
    created(){

    },
    updated(){
      getScrollHeight().then((h)=>{
        this.tableHeight = h;
      })
    },

  }
</script>
