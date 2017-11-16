<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <!--<xo-nav-path :navList="navList"></xo-nav-path>-->
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="add()">新增</el-button>
          <!--<el-button size="small">删除</el-button>-->
        </div>
        <div>
          <el-input size="small" v-model="storeName" icon="search" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>

    </div>
    <el-table :data="storeData" border :height="tableHeight">
      <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                       width="100">
        <template scope="scope">
          <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>

        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                       label="角色编码"
                       width="100"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                       label="角色名称"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="是否启用"
      ></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
        <template scope="scope">
          <el-button size="small" @click="edit()">配置权限</el-button>
          <el-button size="small" type="danger" @click="del()">删除</el-button>

        </template>
      </el-table-column>
    </el-table>


    <footer>
      <xo-pagination></xo-pagination>
    </footer>

    <!--弹窗-->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      @close="dialogClose"
      width="30%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="编码:" prop="code" :rules="{required: true, message: '请输入编码', trigger: 'blur'}">
          <el-input v-model="form.code" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
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
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--配置权限弹窗-->
    <el-dialog
      title="配置权限"
      :visible.sync="dialogVisible2"
      @close="roleClose"
      @open="roleOpen"
      width="50%">
      <div>
        <roleTree :data="roleList" :count=0></roleTree>
        <div class="flex_a" style="margin-top: 30px">
          <div class="margin_r_10">
            <el-checkbox v-model="add1">接单</el-checkbox>
          </div>
          <div class="margin_r_10">
            <el-checkbox v-model="del1">删除</el-checkbox>
          </div>
          <div class="margin_r_10">
            <el-checkbox v-model="edit1">修改</el-checkbox>
          </div>
          <div class="margin_r_10">
            <el-checkbox v-model="find1">查询</el-checkbox>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  //import xoNavPath from '../NavPath.vue'
  import {getScrollHeight} from '../../utility/getScrollHeight'

  export default {
    components: {
      // xoNavPath
      roleTree: {
        name: 'roleTrees',
        props: ['data', 'count'],
        template: `
<div>
      <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
        <div class="flex_a">
          <el-checkbox v-model="item.checked" @change="()=>changeTree(item)">{{item.name}}</el-checkbox>
          <div class="flex_a" style="margin-left: 50px">
                    <div v-if="item.children.length === 0" class="margin_r_10">
          <el-checkbox v-model="item.add" @change="()=>cell(item)">新增</el-checkbox>
          </div>
          <div v-if="item.children.length === 0" class="margin_r_10">
             <el-checkbox v-model="item.del" @change="()=>cell(item)">删除</el-checkbox>
          </div>
          <div v-if="item.children.length === 0" class="margin_r_10">
             <el-checkbox v-model="item.edit" @change="()=>cell(item)">修改</el-checkbox>
          </div>
          <div v-if="item.children.length === 0" class="margin_r_10">
            <el-checkbox v-model="item.find" @change="()=>cell(item)"">查询</el-checkbox>
          </div>
          </div>

        </div>
        <roleTrees :data='item.children'  :count='count' class="heightTran"></roleTrees>
    </div>
</div>
        `,
        data() {
          return {}
        },
        methods: {
          cell(item) {
            if (item.add === true && item.del === true && item.edit === true && item.find === true) {
              this.$set(item, "checked", true);
            } else {
              this.$set(item, "checked", false);
            }
          },

          changeTree(data) {
            if (data.checked === true) {
              this.recur(data, true)
            } else {
              this.recur(data, false)
            }
          },
          recur(data, bool) {
            if (data.children.length === 0 && bool === true) {
              this.$set(data, "add", true);
              this.$set(data, "del", true);
              this.$set(data, "edit", true);
              this.$set(data, "find", true);
            } else {
              this.$set(data, "add", false);
              this.$set(data, "del", false);
              this.$set(data, "edit", false);
              this.$set(data, "find", false);
            }
            data.children.forEach((map) => {
              if (map.children) {
                this.$set(map, "checked", bool);
                this.recur(map, bool)
              }
            })
          },

        }
      }
    },
    data() {
      return {
        add1: '',
        del1: '',
        edit1: '',
        find1: '',
        roleList: [
          {
            name: '全部', checked: false, children: [
            {
              name: '基础设置', checked: false, children: [
              {name: '支付方式', checked: false, add: true, del: true, edit: true, find: true, children: []},
              {name: '支付通道', checked: false, add: false, del: false, edit: false, find: false, children: []},
              {name: '权限管理', checked: false, add: false, del: false, edit: false, find: false, children: []},
              {name: '门店管理', checked: false, add: false, del: false, edit: false, find: false, children: []}]
            },
            {
              name: '系统工具', checked: false, children: [
              {name: '操作日志', checked: false, add: false, del: false, edit: false, find: false, children: []}]
            }
          ]
          }
        ],
        form: {
          code: '',
          name: '',
          status: ''
        },
        dialogVisible: false,
        dialogVisible2: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "角色管理", url: ''}],
        value: '',
        selectedAll: false,
        selectedList: [],//选择了的数组
        options: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: 'store1'
        }],

        storeName: '',
        storeData: [{
          select: false,
          code: '837893',
          name: 'aaa',
          status: '启用'
        }, {
          select: false,
          code: '837894',
          name: 'bbb',
          status: '启用'
        }],

      }
    },
    watch: {},
    methods: {
      roleOpen() {
        this.roleList = [{
          name: '全部', checked: false, children: [
            {
              name: '基础设置', checked: false, children: [
              {name: '支付方式', checked: false, add: true, del: true, edit: true, find: true, children: []},
              {name: '支付通道', checked: false, add: false, del: false, edit: false, find: false, children: []},
              {name: '权限管理', checked: false, add: false, del: false, edit: false, find: false, children: []},
              {name: '门店管理', checked: false, add: false, del: false, edit: false, find: false, children: []}]
            },
            {
              name: '系统工具', checked: false, children: [
              {name: '操作日志', checked: false, add: false, del: false, edit: false, find: false, children: []}]
            }
          ]
        }]
      },
      roleClose() {
        console.log(22)

      },
      dialogClose() {
        console.log(444)
        this.$refs['formRules'].resetFields();
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {

            this.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      add() {
        this.dialogVisible = true
      },
      handle() {
        console.log(this)

      },
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.storeData.forEach((data) => {
            data.select = true
          })
        } else {
          this.storeData.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.storeData.length) {
          this.selectedAll = true;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        } else {
          this.selectedAll = false;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.remove('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = false
          })
        }

      },
      selectAll(h) {
        return h(
          'div',
          {},
          [
            h('el-checkbox', {
                attrs: {id: "all"},
                'class': {},
                on: {
                  change: this.handleCheckAll,
                  input: (event) => {
                  }
                }
              }, ['全选']
            )
          ]
        );
      },

      edit() {
        this.dialogVisible2 = true
      },
      del() {

      },
      append(store, data) {
        console.log(store)
        console.log(data)

        store.append({id: id++, label: 'testtest' + id, children: []}, data);
      },
    },
    created() {
      this.storeData.forEach((map) => {
        this.$set(map, 'select', false)
      })
    },
    mounted() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>

<style scoped lang="less">
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
