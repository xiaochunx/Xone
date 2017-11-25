<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <el-button size="small" @click="addStore()">新增门店</el-button>
          <el-button size="small" @click="delSelected()">批量删除</el-button>
          <el-button size="small" @click="isSwitch()">批量开启/关闭</el-button>
          <el-button size="small" @click="setUrl()">批量设置url</el-button>
        </div>

        <div class="flex_a">
          <div class="margin_r_10">
            <el-input size="small" v-model="storeName" placeholder="请输入门店名称"></el-input>
          </div>
          <el-button size="small">搜索</el-button>

        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;">

        <el-tree
          :data="dataLeft"
          :props="defaultProps"
          @node-click="nodeClick"
          node-key="id"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
        >
        </el-tree>
      </div>

      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="70">
            <template scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                           width="150"
                           label="门店"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center"
                           width="250" label="账户 -- 支付方式 -- 支付通道">
            <template scope="scope">
              <div v-for="(item,index) in scope.row.account">
                <div>
                  {{item.accountName}} -- {{item.paymentMethod}} -- {{item.paymentChannel}}
                </div>

              </div>
            </template>

          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" label="支付" width="80">
            <template scope="scope">
              <div v-if="scope.row.isOpenPay === 1">
                √
              </div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="发票" width="80">
            <template scope="scope">
              <div v-if="scope.row.isOpenInvoice === 1">
                √
              </div>
            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="payJumpUrl"
                           label="支付后跳转url"
                           width="320">
            <template scope="scope">
              <div class="flex_a">
                <el-input class="margin_r_10" v-model="scope.row.payJumpUrl" :disabled="scope.row.inputChecked"></el-input>
                <el-button type="primary" :disabled="scope.row.inputChecked" @click="setOneUrl(scope.row)">确定</el-button>
              </div>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态"
                           width="100">
            <template scope="scope">
              <el-switch @change="()=>{
                return changeStatus(scope.row)
              }"
                         v-model="scope.row.status"
                         on-color="#13ce66"
                         off-color="#ff4949">
              </el-switch>
            </template>

          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
            <template scope="scope">
              <el-button size="small" type="primary" @click.stop="getOneList(scope.row.id)">查看</el-button>
              <el-button size="small" @click.stop="edit(scope.row.id)">编辑</el-button>
              <el-button size="small" type="danger" @click.stop="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>

      </div>
    </div>
    <!--弹窗-->

    <el-dialog
      title="新建／修改组"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="编码:" prop="code" :rules="{required: true, message: '请输入编码', trigger: 'blur'}">
          <el-input v-model="form.code" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <div v-for="(domain, index) in form.thirdPartyCoding" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value1'"
                        :rules="{required: true, message: '第三方编码不能为空!', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value1"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(form.thirdPartyCoding.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="上级组:" v-if="isEdit">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="margin_t_10">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!--批量开启/关闭-->
    <el-dialog
      title="开启/关闭"
      :visible.sync="dialogVisible1"
      width="50%" size="tiny">
      <el-switch
        v-model="storeStatusValue"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
      <div class="margin_t_10">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="changeStoresStatus()">确认</el-button>
      </div>
    </el-dialog>
    <!--新增门店-->
    <el-dialog
      title="新增门店"
      :visible.sync="dialogVisible2"
      width="50%" size="tiny">
      <div class="margin_b_10" v-for="(item,index) in baseStore">
        <div>
          {{index}}
          <div class="padding_l_10" v-for="(item1,index1) in item">
           <el-checkbox v-model="item1.OK">{{item1.storename}}</el-checkbox>
          </div>
        </div>
      </div>
      <div class="margin_t_10">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="add()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../../utility/getScrollHeight'
  import getApi from './storeList.service';
  import ElCheckbox from "../../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton,
      ElCheckbox},
    data() {
      return {
        storeStatusValue: false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: ''}],
        storeGroupData: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '支付宝'
        }, {
          value: 3,
          label: '微信支付'
        }, {
          value: 4,
          label: 'QQ钱包'
        }],
        storeGroup: 1,
        payValue: 2,
        payValueData: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '开启'
        }, {
          value: 3,
          label: '关闭'
        }],
        storeName: '',
        storeData: [],
        dataLeft: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },

        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },

        isEdit: true,
        value: "",
        options: [{
          value: 1,
          label: '民生银行'
        }, {
          value: 2,
          label: '易极付'
        }],
        token: '',
        p: {page: 1, size: 20, total: 0},
        baseStore: {},//点击新增时的门店
        levelId:''//左边树ID
      }
    },
    watch: {},
    methods: {
      //设置url
      setOneUrl(row){
        getApi.urlStatus(this.token,row.id,row.payJumpUrl).then((res)=>{
          console.log(res)
        })

      },
      add(){
        let list = [];
        for(let map in this.baseStore){
          this.baseStore[map].forEach((item)=>{
            if(item.OK){
              list.push(item.id)
            }
          })
        }
        if(list.length === 0){
          this.$message('请选择门店');
        }else {
          getApi.addStore(this.token,list.join(',')).then((res)=>{
            console.log(res)
            this.dialogVisible2 = false
            this.showResouce();
          })
        }

      },
      addStore() {
        if(this.levelId === ""){
          this.$message('请选择门店库');
        }else {
          this.dialogVisible2 = true;
          getApi.getBaseStore(this.token,this.levelId).then((res)=>{
            console.log(res.data.data)
            this.baseStore = res.data.data
          })
        }
      },

      isSwitch() {
        let list = [];

        this.storeData.forEach((item)=>{
          if(item.NO){
            list.push(item.id)
          }
        });
        if(list.length === 0){
          this.$message('请勾选门店');
        } else {
          this.dialogVisible1 = true
        }


      },
      //状态设置
      changeStatus(data) {
        let storeStatusValue;
        if (data.status) {
          storeStatusValue = 1
        } else {
          storeStatusValue = 0
        }
        getApi.storesStatus(this.token, data.id, storeStatusValue).then((res) => {
          console.log(res)
          this.showResouce();
        })
      },
      //批量状态设置
      changeStoresStatus() {
        let list = [];

        this.storeData.forEach((item)=>{
          if(item.NO){
            list.push(item.id)
          }
        });

        let storeStatusValue;
        if (this.storeStatusValue) {
          storeStatusValue = 1
        } else {
          storeStatusValue = 0
        }

          getApi.storesStatus(this.token, list.join(','), storeStatusValue).then((res) => {
            console.log(res)
            this.showResouce();
            this.dialogVisible1 = false
          })



      },
      getPage(page) {
        this.p.page = page;
        this.showResouce();
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce();
      },

      nodeClick(data, data1, data2) {
        console.log(data.levelname)
        this.levelId = data.id;
        this.showResouce(data.levelname, data.id)

      },
      setChecked(data, checked, deep) {
        console.log(data)
      },
      delSelected() {
        let list = [];
        this.storeData.forEach((item)=>{
          if(item.NO){
            list.push(item.id)
          }
        });
        if(list.length === 0){
          this.$message('请勾选门店');
        }else {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getApi.del(this.token,list.join(",")).then((res)=>{
              console.log(res)
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.showResouce();
            })


          }).catch(() => {
            //
          });
        }


      },

      setUrl() {
        this.storeData.forEach((data) => {
          data.inputChecked = false
        })
      },

      batchAdd() {
        this.$router.push('/storeManage/storeList/newAddStore')
      },
      removeDomain(item) {
        var index = this.form.thirdPartyCoding.indexOf(item)
        if (index !== -1) {
          this.form.thirdPartyCoding.splice(index, 1)
        }
      },
      addDomain() {
        this.form.thirdPartyCoding.push({
          value: '',
          key: Date.now()
        });
      },

      getOneList(id) {
        this.$router.push({path: `/storeManage/storeList/seeTheStore/${id}`})
      },
      edit(id) {
        this.$router.push({path: `/storeManage/storeList/editStoreAccount/${id}`})
      },
      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del(id) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.del(this.token, id).then((res) => {
            console.log(res)
            if (res) {

            }
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            this.showResouce()

          })

        }).catch(() => {
          //
        });

      },
      showResouce(storeName = "", levelId = "") {
        getApi.getList(this.token, this.p, storeName, levelId).then((res) => {
          console.log(res.data.data)
          if (res.data.errcode === 0) {
            res.data.data.list.forEach((data) => {
              data.inputChecked = true
              data.NO = false
            });
            this.storeData = res.data.data.list;
            this.p.total = res.data.data.count
          } else {
            this.$alert('请重新登录', '超时', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
          }
        })
      }
    },
    created() {
      this.token = this.$localStorage.get('token');


      getApi.getLeft(this.token).then((res) => {
        this.dataLeft = res.data.data
      });

      this.showResouce();

    },
    mounted() {

    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
  }
</script>

<style lang="less" scoped>
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

  .myStore {
    position: absolute;
    top: 40%;
    right: 0;
    background: white;
    z-index: 100;
    border-radius: 10px;
    border: 1px solid #E5EBF4
  }
</style>
