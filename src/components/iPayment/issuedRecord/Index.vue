<template>
  <div id="issuedRecord">
    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
            <router-link to="/iPayment/issuedRecord/newIssued">
              <el-button size="small" type="primary" icon="plus">新增下发</el-button>
            </router-link>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-card style="height: calc(100% - 38px)">
      <div>
        <el-form :inline="true" :model="form" :label-position="'top'">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择" clearable>
              <el-option
                v-for="item in form.options"
                :key="item.id"
                :label="item.memo"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="vertical-align: bottom">
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          :height="height"
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="65">
          </el-table-column>

          <el-table-column
            label="支付方式"
            width="103"
          >
            <template scope="scope">
              <div style="margin-left: 10px" v-for="item in scope.row.paymentMethod">{{ item }}</div>
            </template>
          </el-table-column>


          <el-table-column
            label="支付通道"
            width="103">
            <template scope="scope">
              <div style="margin-left: 10px" v-for="item in scope.row.payment">{{ item }}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="账户"
            width="144">
            label="支付通道">
            <template scope="scope">
              <div style="margin-left: 10px" v-for="item in scope.row.account">{{ item }}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            label="时间"
            width="170">
          </el-table-column>

          <el-table-column
            prop="lastEdit"
            label="操作员">
          </el-table-column>


          <el-table-column
            prop="lastEdit"
            label="操作员"
            width="220"
          >
            <template scope="scope">
              <div>
                <el-tag
                  :type="scope.row.state === '成功' ? 'primary' : 'danger'"
                  close-transition>{{scope.row.state}}
                </el-tag>

                <span style="color: red"> &nbsp;{{scope.row.executionTime}}</span>
              </div>
            </template>
          </el-table-column>


          <el-table-column
            prop="lastEdit"
            label="操作">
            <template scope="scope">
              <el-button size="small" @click="examine(scope)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="下发记录详情"
          :visible.sync="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <p>操作员: {{ tableData[index].lastEdit }}</p>
          <p>添加时间: {{ tableData[index].date }}</p>
          <p>执行时间: {{ tableData[index].executionTime}}</p>
          <p>状态: {{ tableData[index].state}}</p>
          <p>下发账户: {{ tableData[index].account}}</p>
          <p>下发门店: {{ tableData[index].account}}</p>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
      </div>

      <div style="margin-top: 25px;">
        <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import xoScreenForm from './ScreenForm.vue'
  import xoNavPath from './NavPath.vue'
  import {mapGetters, mapActions} from 'vuex'
  import {oneTwoApi} from '@/api/api.js'

  export default {
    data() {
      return {
        p: {page: 1, size: 10, total: 0},
        form: {
          options: [],
          status: ''
        },
        tableData: [
          [
            {
              "id": 10,
              "account": [
                {
                  "paymentMethod": "微信",
                  "paymentChannel": "民生银行",
                  "name": "第二个"
                }
              ],
              "time": "2017-05-11 05:38:58",
              "store": null,
              "operator": "测试",
              "isOpen": 1,
              "status": "执行成功"
            }
          ]
        ],
        dialogVisible: false,
        index: 0,
        height: 0,
        loading: false,
      }
    },
    methods: {
      getPage(value) {
        console.log(1);
        this.p.page = value;
        this.api();
      },
      getPageSize(value) {
        this.p.size = value;
        this.api();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.state === value;
      },
      handleClose(done) {
        done();
      },
      examine(scope) {
        this.index = scope.$index;
        this.dialogVisible = true;
      },
      api() {
        this.loading = true;

        var param = {
          redirect: 'x1.accountmanage.accountUseLog',
          status: this.form.status,
          page: this.p.page,
          pagesize: this.p.size
        };

        // 账户列表初始化 -> 获取表格数据
        oneTwoApi(param).then((res) => {
          console.log(res);
          this.loading = false;
          if (res.errcode == 0) {

            this.p.total = res.data.count;
          }
        }).catch((err) => {
          console.log(err);
        });

      }
    },
    computed: {
      ...mapGetters([
        'getTopHeight',
        'getLoadingStatus'
      ]),
    },
    components: {
      xoScreenForm,
      xoNavPath
    },
    mounted() {
      // 高度调整
      var topH = document.querySelector('.el-form--label-top').clientHeight;
      var pageH = document.querySelector('.el-pagination').clientHeight;
      this.height = window.innerHeight - this.getTopHeight - topH - pageH - 150;

      // 下发状态接口
      var params = {
        redirect: 'x1.accountmanage.projectStatus',
      };

      oneTwoApi(params).then((res) => {
        console.log(res);
        if (res.errcode == 0) {
          this.form.options = res.data;
        }
      }).catch((err) => {
        console.log(err);
      });


      this.api();
    }
  }
</script>
<style scoped>
  div.cell {
    text-align: center;
  }

  .contentMsg {
    padding: 0 25px 0 0;
  }
</style>
