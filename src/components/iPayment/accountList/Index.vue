<template>
  <div class="rightContent">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <el-card style="height: calc(100% - 38px)">
      <div class="contentMsg">
        <div id="detailMsg">
          <el-form :inline="true" :model="ruleForm" class="demo-form-inline" :label-position="'top'">

            <el-form-item label="支付方式">
              <el-select v-model="ruleForm.payMethod" placeholder="全部" clearable>
                <el-option
                  v-for="item in ruleForm.payOptions"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="支付通道">
              <el-select v-model="ruleForm.Payment" placeholder="全部" clearable>
                <el-option
                  v-for="item in ruleForm.paymentOptions"
                  :key="item.id"
                  :label="item.memo"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="账号名称">
              <el-input v-model="ruleForm.userName" placeholder=""></el-input>
            </el-form-item>

            <el-form-item style="vertical-align: bottom">
              <el-button @click="search">搜索</el-button>
            </el-form-item>

           <!-- <el-form-item style="vertical-align: bottom">
              <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>-->

            <el-form-item style="vertical-align: bottom">
              <router-link to="/iPayment/accountList/account">
                <el-button type="primary" icon="edit">新增账号</el-button>
              </router-link>
            </el-form-item>

          </el-form>

          <el-table
            :data="tableData"
            :height="height"
            v-loading="loading"
            border
            style="width: 100%">


            <el-table-column
              type="index"
              label="序号"
              width="65">
            </el-table-column>

            <el-table-column
              label="账户编码"
            >
              <template scope="scope">
                <span>{{ scope.row.acountCode }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="账户名称"
              width="180"
            >
              <template scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input v-model="scope.row.accountName" placeholder=""></el-input>
                  </el-col>
                  <!--<el-col :span="5" :offset="1" style="line-height: 36px">
                    <el-button
                      size="small"
                      type="primary"
                      @click="handleSave(scope.$index, scope.row)">保存
                    </el-button>
                  </el-col>-->

                </el-row>
              </template>
            </el-table-column>

            <el-table-column
              label="支付方式">
              <template scope="scope">
                <div v-for="item in scope.row.paymentName">{{ item }}</div>
              </template>
            </el-table-column>


            <el-table-column
              label="支付通道">
              <template scope="scope">
                <div>{{ scope.row.paymentChannel }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="查看">
              <template scope="scope">
                <el-popover trigger="click" placement="top" width="200">
                  <p v-if="checkoutData.acountCode">账号编号: {{ checkoutData.acountCode }}</p>
                  <div v-if="checkoutData.thirdCode" >第三方编码:
                    <span v-for="item in checkoutData.thirdCode">{{item.code1}} - {{item.code2}}</span>
                  </div>
                  <p v-if="checkoutData.accountName">账号名称: {{ checkoutData.accountName }}</p>
                  <div v-if="checkoutData.paymentName" >支付方式:
                    <span v-for="item in checkoutData.paymentName">{{item}}&nbsp;</span>
                  </div>
                  <p v-if="checkoutData.paymentChannel">支付通道: {{ checkoutData.paymentChannel }}</p>
                  <p v-if="checkoutData.token">商户号: {{ checkoutData.token }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag @click.native="handleCheck(scope.row.acountCode)">查看</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="删除">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row.acountCode)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <footer>
        <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
      </footer>
    </el-card>
  </div>
</template>
<script>

  import xoDetailMsg from './DetailMsg.vue'
  import xoNavPath from './NavPath.vue'
  import {mapGetters, mapActions} from 'vuex'
  import {oneTwoApi, payMethods, payMent} from '@/api/api.js'


  export default{
    data(){
      return {
        p: {page:1, size:10, total:0},
        ruleForm: {
          payMethod: '', // 支付方式
          payOptions: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
          ],  // 支付方式
          Payment: '', // 支付通道
          paymentOptions: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
          ],  // 支付通道
          userName: ''  // 用户名
        },
        tableData: [],
        height: 0,
        loading: true,
        checkoutData: {}
      }
    },
    components: {
      xoDetailMsg,
      xoNavPath
    },
    methods: {
      getPage(value){
        console.log(1);
        this.p.page = value;
        this.api();
      },
      getPageSize(value){
        this.p.size = value;
        this.api();
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: "此操作将永久删除该文件, 是否继续?",
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              var params = {
                redirect: 'x1.accountmanage.delAccount',
                id: row
              };

              oneTwoApi(params).then((res) => {
                if (res.errcode == 0){
                  done();
                  instance.confirmButtonLoading = false;
                  this.api();
                }
              }).catch((err) => {
                instance.confirmButtonLoading = false;
                console.log(err);
              })

            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: "删除成功"
          });
        });
      },
      handleSave(index,row){
        var param = {
          redirect: 'x1.accountmanage.accountSaveData',
          id: row.accountCode,
          paymentMethod: this.ruleForm.payMethod,
          paymentChannel: this.ruleForm.Payment,
          accountName: this.ruleForm.userName,
          page: this.p.page,
          pagesize: this.p.size
        };

        console.log(index);
        console.log(row);
      },
      handleCheck(value){
        var param = {
          redirect: 'x1.accountmanage.accountInfo',
          id: value
        };

        // 账户列表初始化 -> 获取表格数据
        oneTwoApi(param).then((res) => {
          if (res.errcode == 0){
            this.checkoutData = res.data;
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      onSubmit() {
        console.log('submit!');
      },
      search() {
        this.p.page = 1;
        this.api();
      },
      save() {
        console.log('save');
      },
      api(){
        this.loading = true;

        var param = {
          redirect: 'x1.accountmanage.accountList',
          paymentMethod: this.ruleForm.payMethod,
          paymentChannel: this.ruleForm.Payment,
          accountName: this.ruleForm.userName,
          page: this.p.page,
          pagesize: this.p.size
        };

        // 账户列表初始化 -> 获取表格数据
        oneTwoApi(param).then((res) => {
          this.loading = false;
          if (res.errcode == 0){
            this.tableData = res.data.list;
            this.p.total = res.data.count;
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    deleteApi(value){
      var params = {
        redirect: 'x1.accountmanage.delAccount',
        id: value
      };

      oneTwoApi(params).then((res) => {
        if (res.errcode == 0){
          this.api();
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    computed: {
      ...mapGetters([
        'getTopHeight',
        'getLoadingStatus'
      ]),
    },
    mounted(){
      // 高度调整
      var topH = document.querySelector('.el-form--label-top').clientHeight;
      var pageH = document.querySelector('.el-pagination').clientHeight;
      this.height = window.innerHeight - this.getTopHeight - topH - pageH - 145;

      var params = {};

      // 支付方式初始化
      payMethods(params).then((res) => {
        if (res.errcode == 0) {
          this.ruleForm.payOptions = res.data;
        } else {
          this.$confirm(res.errormsg, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err);
      });

      // 支付通道初始化
      payMent(params).then((res) => {
        if (res.errcode == 0) {
          this.ruleForm.paymentOptions = res.data;
        } else {
          this.$confirm(res.errormsg, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err);
      });

      this.api();
    }
  }
</script>

<style scoped lang="less">
  .rightContent{
    height: 100%;
  }

  .content {
    padding: 25px;
  }

  .contentMsg {
    padding: 0 0 25px 0;
  }
</style>
