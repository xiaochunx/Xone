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

      <div class="flex_es padding_t_10">
        <div class="flex_a">

        </div>

        <div class="flex_ec">
          <el-input class="margin_r_10" v-model="input"></el-input>
          <el-button>查询</el-button>
        </div>

      </div>

    </div>
    <el-table :data="tableData" border :height="tableHeight">
      <el-table-column header-align="center" align="center" prop="code" label="编码" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="name" label="名称" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="invoiceType" label="发票类型"></el-table-column>
      <el-table-column header-align="center" align="center" prop="invoiceService" label="发票服务商" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="状态" ></el-table-column>
      <el-table-column header-align="center" align="center"  label="在售门店" >
        <template slot-scope="scope">
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="">修改</el-button>
          <el-button size="small"  @click="">查看</el-button>
          <el-button size="small" type="danger" @click="">删除</el-button>
        </template>
      </el-table-column>
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
        tableHeight:0,
        navList:[{idname:"发票配置",url:''}],
        input:'',

        value:'',
        options: [{
          value: '选项1',
          label: '11'
        }, {
          value: '选项2',
          label: '22'
        }],
        tableData: [{
          code: '1',
          name: '2',
          invoiceType: '3',
          invoiceService:'',
          status:'',
          remarks:''
        },{
          code: '1',
          name: '2',
          invoiceType: '3',
          invoiceService:'',
          status:'',
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
