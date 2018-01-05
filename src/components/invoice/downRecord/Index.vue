<template>
  <div v-show="getTreeArr['列表']">

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_a">
          <div class="margin_r_10">状态</div>
          <el-select v-model="status" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="flex_r">
          <el-input size="small" v-model="searchName" icon="search" placeholder="请输入发票方案">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="margin_l_10" size="small" @click="search()">搜索</el-button>
        </div>
      </div>

    </div>
    <el-table :data="invoiceList" border :height="tableHeight">
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="序号"
                       width="100">
        <template slot-scope="scope">
          <div>
            {{scope.$index + 1}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                       label="发票方案"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="edit_time"
                       label="下发时间"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="user_name"
                       label="操作员"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="状态"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="small" @click="show(scope.row)" v-show="getTreeArr['详情']">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--查看门店-->
    <el-dialog title="查看门店" :visible.sync="dialogFormVisible" >
      <el-form label-width="80px">

        <el-form-item label="操作员:">
          <div>{{clientForm.user_name}}</div>
        </el-form-item>
        <el-form-item label="添加时间:">
          <div>{{clientForm.add_time}}</div>
        </el-form-item>
        <el-form-item label="执行时间:">
          <div>{{clientForm.edit_time}}</div>
        </el-form-item>
        <el-form-item label="状态:">
          <div>{{clientForm.status}}</div>
        </el-form-item>
        <el-form-item label="下发方案:">
          <div>{{clientForm.invoice_name}}</div>
        </el-form-item>

        <el-form-item label="下发门店:">
          <el-table :data="clientForm.store_list" border style="width: 100%">
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="序号" width="80">
              <template slot-scope="scope">
                <div>
                  {{scope.$index + 1}}
                </div>
              </template>
            </el-table-column>

            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="门店编码">
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="门店名称">
            </el-table-column>
          </el-table>

        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './downRecord.service'
  import {getArr} from '../../utility/communApi'
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
        clientForm:{},
        dialogFormVisible: false,
        invoiceList: [],
        options: [],
        status:'',
        tableHeight: 0,
        navList: [{name: "下发记录", url: ''}],
        roleType: [],
        p: {page: 1, size: 20, total: 0},
        searchName: '',
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setTreeArr']),

      show(row) {
        this.dialogFormVisible = true;
        getApi.issuedDataInfo(row.id).then((res)=>{
          if(res.data.errcode === 0){
            this.clientForm = res.data.data
          }
        })
      },
      search() {
        if (this.searchName === '' && this.status === '') {
          this.issuedData(this.p = {page: 1, size: 20, total: 0})
        } else {
          this.issuedData(this.p = {page: 1, size: 20, total: 0}, this.searchName,this.status)
        }
      },


      getPage(page) {
        this.p.page = page;
        this.issuedData(this.p, this.searchName,this.status);
      },
      getPageSize(size) {
        this.p.size = size;
        this.issuedData(this.p, this.searchName,this.status);
      },

      issuedData(p, name = "",status = "") {
        getApi.issuedData(p, name,status).then((res) => {
          if (res.data.errcode === 0) {
            this.invoiceList = res.data.data.list;
            this.p.total = res.data.data.count
          } else {
          }
        })
      }
    },
    created() {
      this.issuedData(this.p);
      getApi.getStatusList().then((res)=>{
        this.options = res.data.data
      })
    },
    mounted() {
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
    }
  }
</script>

<style scoped lang="less">



</style>
