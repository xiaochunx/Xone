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
            <el-input size="small" v-model="storeName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small">搜索</el-button>
          <el-button size="small" type="primary">+新增</el-button>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;">



        <el-tree
          :data="data5"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="true"
        >
        </el-tree>
      </div>

      <div :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="70">
            <template scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                           width="150"
                           label="门店"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="account"
                           width="150"
                           label="账户"></el-table-column>
          <el-table-column header-align="center" align="center" prop="payType" width="140" label="支付方式">
            <template scope="scope">
              <div class="flex_a" v-for="(item,index) in scope.row.payType">
                <div>
                  <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="payChannel" width="140" label="支付通道">
            <template scope="scope">
              <div class="flex_a" v-for="(item,index) in scope.row.payChannel">
                <div>
                  <el-checkbox v-model="item.checked">{{item.label}}</el-checkbox>
                </div>
              </div>
            </template>

          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="pay" label="支付"
                           width="80"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="invoice" label="发票"
                           width="80"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="url"
                           label="支付后跳转url"
                           width="280">
            <template scope="scope">
              <el-input v-model="scope.row.url.input" :disabled="scope.row.url.checked"></el-input>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="statistics" label="状态"
                           width="100">
            <template scope="scope">
              <el-switch
                v-model="scope.row.statistics"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </template>

          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
            <template scope="scope">
              <el-button size="small" type="primary" @click.stop="getOneList()">查看</el-button>
              <el-button size="small" @click.stop="edit()">编辑</el-button>
              <el-button size="small" type="danger" @click.stop="del()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination></xo-pagination>
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

    <el-dialog
      title="开启/关闭"
      :visible.sync="dialogVisible1"
      width="50%" size="tiny">
      <el-switch
        v-model="value2"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
      <div class="margin_t_10">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="新增门店"
      :visible.sync="dialogVisible2"
      width="50%" size="tiny">

      <el-tree
        :data="data5"
        show-checkbox
        node-key="id"
        default-expand-all
        @setChecked="setChecked"
        :props="defaultProps">
      </el-tree>
      <div class="margin_t_10">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../../utility/getScrollHeight'

  export default {
    components: {

    },
    data() {
      return {
        value2:false,
        dialogVisible: false,
        dialogVisible1:false,
        dialogVisible2:false,
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
        storeData: [{
          NO: true,
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          account:"天河北店的账户",
          payType: [{label: '支付宝', checked: false}, {label: '微信支付', checked: false}],
          payChannel: [{label: '易极付', checked: false}, {label: '通联支付', checked: false}],
          pay: '√',
          invoice: '√',
          statistics: false,
          url: {input: "", checked: true}

        }, {
          NO: false,
          storeCode: '837892',
          storeName: '炳胜（马场店）',
          account:"天河北店的账户",
          payType: [{label: '支付宝', checked: false}, {label: '微信支付', checked: false}],
          payChannel: [{label: '易极付', checked: false}, {label: '通联支付', checked: false}],
          pay: '√',
          invoice: '√',
          statistics: false,
          url: {input: "", checked: true}

        }, {
          NO: false,
          storeCode: '837893',
          storeName: '炳胜（马场店）',
          account:"天河北店的账户",
          payType: [{label: '支付宝', checked: false}, {label: '微信支付', checked: false}],
          payChannel: [{label: '易极付', checked: false}, {label: '通联支付', checked: false}],
          pay: '√',
          invoice: '√',
          statistics: false,
          url: {input: "http://", checked: true}

        }],

        data5: [{
          id: 1,
          label: '民生银行',
          children: [{
            id: 4,
            label: '狮子牌',
            children: [{
              id: 9,
              label: '狮子牌33'
            }, {
              id: 10,
              label: '易极付4444'
            }]
          }]
        }, {
          id: 2,
          label: '民生银行1',
          children: [{
            id: 5,
            label: '九毛九'
          }, {
            id: 6,
            label: '太二酸菜鱼'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
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
      }
    },
    watch: {},
    methods: {
      setChecked(data, checked, deep){
        console.log(data)
      },
      delSelected(){
        this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '删除成功'
          });
        }).catch(() => {
          //
        });
      },
      isSwitch(){
        this.dialogVisible1 = true
      },
      setUrl() {
        this.storeData.forEach((data) => {
          data.url.checked = false
        })
      },
      addStore(){
        this.dialogVisible2 = true
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

      getOneList() {
        this.$router.push('/storeManage/storeList/seeTheStore')
      },
      edit() {
        this.$router.push('/storeManage/storeList/seeTheStore/editStoreAccount')

      },
      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },


    },
    created() {


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
