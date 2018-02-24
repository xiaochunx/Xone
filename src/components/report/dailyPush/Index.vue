<template>
  <div class="scroll_of" >
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

        <div class="flex_ce">
          <el-input size="small" class="margin_r_10" v-model="searchName" style="width: 200px" placeholder="请输入接收人邮箱搜索">
          </el-input>
          <el-button size="small" @click="search()">搜索</el-button>
          <el-button size="small" @click="operate('add')" type="primary" icon="plus">新增推送</el-button>
        </div>

    </div>
      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" prop="user_name" label="序号" width="80">
          <template slot-scope="scope">
            <div>{{scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="power_attr" label="接收人邮箱" >
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="power_name" label="接收门店">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="add_time_formated" label="接收时间" >
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="remark" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" @click="operate('edit')" >修改</el-button>
            <el-button type="text" @click="del(scope.row.id)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>
  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'

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
        width:0,
        tableHeight:0,
        navList:[{name:"基础设置",url:''},{name:"日报推送",url:''}],
        tableData: [{}],
        p: {page: 1, size: 20, total: 0},
        searchName:'',
      }
    },

    methods: {
      ...mapActions(['setTreeArr']),
      operate(name){
        if(name === 'add'){
          this.$router.push({path: `/report/dailyPush/operateDaily/${name}`})
        }else {

        }

      },
      search() {


      },
      getPage(page) {
        this.p.page = page;
        //this.getAdminLogList(this.dateSelected[0] ,this.dateSelected[1],this.user_name,this.power_attr,this.name,this.p)
      },
      getPageSize(size) {
        this.p.size = size;
        //this.getAdminLogList(this.dateSelected[0] ,this.dateSelected[1],this.user_name,this.power_attr,this.name,this.p)
      },
      del(id){
        this.$confirm(
          '确认删除吗？删除后，该邮箱则不在接收日报推送', '删除', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

          //this.delTemplate(id)

        }).catch(() => {
          //
        });
      },

    },
    created(){

    },
    updated(){
      getScrollHeight().then((h)=>{
        this.tableHeight = h;
      })
    },
    mounted() {

      Hub.$emit('mountedOk','mountedOk');
    },
    destroyed(){

    }
  }
</script>
<style scoped>

  .bodyTop{
    padding-bottom: 10px;
  }
</style>
