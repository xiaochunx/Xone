<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_a">
          <div class="margin_r_10">状态</div>
          <el-select v-model="bank" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="flex_r">
          <el-input size="small" v-model="searchName" icon="search" placeholder="请输入内容">
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
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="type"
                       label="下发时间"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service"
                       label="操作员"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="状态"></el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="small" @click="show()">查看</el-button>
        </template>
      </el-table-column>
    </el-table>


    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--查看门店-->
    <el-dialog title="查看门店" :visible.sync="dialogFormVisible" size="tiny">



      <el-form  :model="clientForm" label-width="80px">

        <el-form-item label="操作员:">
          <div>张三</div>
        </el-form-item>
        <el-form-item label="添加时间:">
          <div>2018-2-3 12:08:56</div>
        </el-form-item>
        <el-form-item label="执行时间:">
          <div>2018-2-3 12:08:56</div>
        </el-form-item>
        <el-form-item label="状态:">
          <div>成功</div>
        </el-form-item>
        <el-form-item label="下发方案:">
          <el-button size="small" @click="">方案1</el-button>
        </el-form-item>

        <el-form-item label="下发门店:">
          <el-table :data="storeData" border style="width: 300px">
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="序号" width="80">
              <template slot-scope="scope">
                <div>
                  {{scope.$index + 1}}
                </div>
              </template>
            </el-table-column>

            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="门店编码">
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
  import getApi from './invoiceScheme.service'
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
        clientForm:{

        },

        dialogFormVisible: false,
        dialogFormVisible1: false,
        invoiceList: [{
          code: '11',
          name: '22',
          type: '33',
          service: '44',
          status: '已启用',

        }],
        options: [{
          id: 1,
          name: '黄金糕'
        }, {
          id: 2,
          name: '双皮奶'
        }],
        bank:'',
        tableHeight: 0,
        navList: [{name: "发票方案", url: ''}],
        name: '',

        roleType: [],
        storeData: [{code: '11', name: '22'}],
        p: {page: 1, size: 20, total: 0},

        searchName: '',
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setTreeArr']),

      show() {
        this.dialogFormVisible = true
      },
      search() {
        if (this.searchName === '') {
          this.showRoleList(this.p = {page: 1, size: 20, total: 0})
        } else {
          this.showRoleList(this.p = {page: 1, size: 20, total: 0}, this.searchName)
        }
      },


      getPage(page) {
        this.p.page = page;
        this.showRoleList(this.p, this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showRoleList(this.p, this.searchName);
      },


      add() {
        this.dialogFormVisible1 = true
      },




      showRoleList(p, name = "") {
        getApi.getRoleList(p, name).then((res) => {
          if (res.data.errcode === 0) {
            res.data.data.list.forEach((data) => {
              data.select = false;

              if (data.is_use === 1) {
                data.is_use = "启用"
              } else {
                data.is_use = "关闭"

              }

            });
            this.storeData = res.data.data.list;
            this.p.total = res.data.data.count
          } else {
            // this.$alert('请重新登录', '超时', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     this.$router.push('/login')
            //   }
            // })
          }
        })
      }
    },
    created() {

      // this.showRoleList(this.p)

    },
    mounted() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed() {

    }
  }
</script>

<style scoped lang="less">
  .m-rank {
    width: 40px;
    .m-rank-child {
      height: 18px;
      border-bottom: 1px solid #000;
    }
  }

  .m-storeCode {
    font-size: 30px;
  }

  .m-storeList {
    height: 50px;
    line-height: 50px;
  }

  .m-newStore {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 99px;
  }

  .m-t {
    text-align: center;
  }

  .m-store {
    padding: 20px 0;
  }

  .m-store table tr td {
    padding: 10px 0;
    border-bottom: 1px dashed #000;
  }

  .m-store table tr:nth-child(1) {
    height: 50px;
  }

  .m-store table tr:nth-child(1) td {
    border-bottom: 1px solid #000;
  }


</style>
