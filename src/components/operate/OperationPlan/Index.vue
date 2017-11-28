<template>
  <div>
    <div class="padding_b_10 flex_sb bodyTop">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div>
      <el-table :data="tableData" border :height="tableHeight" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="65">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="账户 -- 支付方式 -- 支付通道">
          <template scope="scope">
            <div v-for="(item,index) in scope.row.account">
              <div>{{item.name}} -- {{item.paymentMethod}} -- {{item.paymentChannel}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column header-align="center" align="center" label="时间" prop="time" width="200">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="门店" prop="store">
          <template scope="scope">
            <div v-for="(item,index) in scope.row.store">
              <div>{{item}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作员" prop="operator"  width="150">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="100">
          <template scope="scope">
            <el-switch
              v-model="scope.row.value2"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>
  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './operationPlan.service'

  export default {
    components: {},
    data() {
      return {
        tableHeight: 0,
        navList: [{name: "运营方案", url: ''}],
        tableData: [],
        p: {page: 1, size: 20, total: 0},
      }
    },
    methods: {
      getPage(page) {
        this.p.page = page;
        this.showResouce();
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce();
      },
      showResouce() {
        getApi.getProject(this.token).then((res) => {
          this.tableData = res.data.data.list
          this.p.total = res.data.data.count
        })
      }
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    created() {
      this.token = this.$localStorage.get("token");
      this.showResouce()
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
</style>
