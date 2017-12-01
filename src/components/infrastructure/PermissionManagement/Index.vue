<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          {{name}}
          <div v-if="name != ''">
            <el-button size="small" @click="addAccount()">新增账号</el-button>
            <el-button size="small" @click="del()">删除</el-button>
            <el-button size="small">查看拥有权限</el-button>
            <el-button size="small" @click="">禁用</el-button>
            <el-button size="small" @click="">启用</el-button>

          </div>
        </div>
        <div class="flex_a">
          <el-input size="small" v-model="storeName" icon="search" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;">

        <roleTree :data="data5" :count=0 @sendName="getName"></roleTree>

      </div>

      <div :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="70">
            <template slot-scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="account"
                           label="账号"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                           label="姓名"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态"
                           width="80"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="role" label="关联角色"
          ></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="">查看</el-button>
              <el-button size="small" @click="edit()">编辑</el-button>
              <el-button size="small" type="danger" @click="del()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <!--<xo-pagination></xo-pagination>-->
        </footer>

      </div>
    </div>


    <el-dialog
      title="新增账号"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="编码:">
          <el-input v-model="form.code" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="name" :rules="{required: true, message: '请输入手机', trigger: 'blur'}">
          <el-input v-model="form.tel" placeholder="请输入内容"></el-input>
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

        <el-form-item label="所属部门:" v-if="isEdit">

          <el-button @click="showAside = !showAside"> {{department}} </el-button>

            <div v-if="showAside">
              <roleTree1 :data="data5" :count=0 @sendName1="getName1"></roleTree1>
            </div>



        </el-form-item>

        <el-form-item label="状态:">

          <el-switch
            v-model="form.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <!--<el-button>取消</el-button>-->
          <el-button type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  export default {
    components: {

      roleTree: {
        name: 'roleTrees',
        props: ['data', 'count'],
        template: `
          <div>
                <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
                  <i  v-if='item.children && item.children.length != 0' class="el-icon-caret-right pointer heightTran "></i>
      <span @click="test(item)" class="pointer">{{item.label}}</span>
                  <roleTrees :data='item.children'  :count='count' class="heightTran" @sendName="getName"></roleTrees>
              </div>
          </div>
        `,
        data() {
          return {}
        },
        methods: {
          test(item) {
            this.$emit('sendName', item.label)
          },
          getName(name) {
            this.$emit('sendName', name)
          }

        }
      },
      roleTree1: {
        name: 'roleTrees',
        props: ['data', 'count'],
        template: `
          <div>
                <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
                  <i  v-if='item.children && item.children.length != 0' class="el-icon-caret-right pointer heightTran "></i>
      <span @click="test(item)" class="pointer">{{item.label}}</span>
                  <roleTrees :data='item.children'  :count='count' class="heightTran" @sendName1="getName1"></roleTrees>
              </div>
          </div>
        `,
        data() {
          return {}
        },
        methods: {
          test(item) {
            this.$emit('sendName1', item.label)
          },
          getName1(name) {
            this.$emit('sendName1', name)
          }

        }
      }
    },
    data() {
      return {
        showAside: false,
        dialogVisible: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "基础设置", url: ''}, {name: "权限管理", url: ''}],

        name: '',
        department:'部门',
        payValue: 2,
        storeName: '',
        storeData: [{
          NO: true,
          account: '83789',
          name: '炳胜（马场店）',
          status: '开启',
          role: '系统管理人员、产品'
        }, {
          NO: false,
          account: '837892',
          name: '炳胜（马场店）',
          status: '开启',
          role: '系统管理人员、产品'
        }, {
          NO: false,
          account: '837893',
          name: '炳胜（马场店）',
          status: '开启',
          role: '系统管理人员、产品'
        }],

        data5: [{
          label: '款易',
          children: [{
            label: '大商户',
            children: [{
              label: '集团',
              children: [{
                label: '品牌', children: [{
                  label: '门店1',
                }, {
                  label: '门店2',
                }]
              }]
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {
          name: '',
          code: '',
          tel: '',
          status: '',
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
      getName(name) {
        this.name = name
      },
      getName1(name){
        this.department = name;
        this.showAside = false
      },
      addAccount() {
        this.dialogVisible = true
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

  /*不能有相同的class名*/
  .myStore-enter-active, .myStore-leave-active {
    transition: all .5s;
  }

  .myStore-enter, .myStore-leave-to {
    right: -280px;
  }
</style>
