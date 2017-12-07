<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="add()">新增</el-button>
          <el-button size="small" type="danger" @click="del()">删除</el-button>
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
        <template slot-scope="scope">
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
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="config(scope.row)">配置权限</el-button>
          <el-button size="small" @click="edit()">修改</el-button>


        </template>
      </el-table-column>
    </el-table>


    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--弹窗新增角色-->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      @close="dialogClose"
      width="30%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <!--<el-form-item label="编码:" prop="code">-->
        <!--<el-input v-model="form.code" placeholder="请输入内容" disabled></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="角色类型:" prop="type"
                      :rules="{type:'number',required: true, message: '请选择角色类型', trigger: 'change'}">


          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <div v-for="(domain, index) in form.thirdPartyCoding" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value" placeholder="请输入名称"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value1" placeholder="请输入编码"></el-input>
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
      width="50%" size="large">
      <div>
        <roleTree :data="roleList" :count=0></roleTree>
        <el-button @click="test()">test</el-button>
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

    <!--<div v-if="item.children.length === 0" class="margin_r_10">-->
    <!--<el-checkbox v-model="item.add" @change="()=>cell(item)">新增</el-checkbox>-->
    <!--</div>-->
    <!--<div v-if="item.children.length === 0" class="margin_r_10">-->
    <!--<el-checkbox v-model="item.del" @change="()=>cell(item)">删除</el-checkbox>-->
    <!--</div>-->
    <!--<div v-if="item.children.length === 0" class="margin_r_10">-->
    <!--<el-checkbox v-model="item.edit" @change="()=>cell(item)">修改</el-checkbox>-->
    <!--</div>-->
    <!--<div v-if="item.children.length === 0" class="margin_r_10">-->
    <!--<el-checkbox v-model="item.find" @change="()=>cell(item)">查询</el-checkbox>-->
    <!--</div>-->


  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './roleManagement.service'
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {
      ElButton,
      roleTree: {
        name: 'roleTrees',
        props: ['data', 'count'],
        template: `
            <div>
                  <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
                    <div class="flex_a">
                      <el-checkbox v-model="item.checked" @change="()=>changeTree(item)">{{item.name}} {{item.checked}}</el-checkbox>
                      <div class="flex_a" style="margin-left: 50px">

                      <div class="margin_r_10" v-for="(item1,index) in item.arr">
                        <el-checkbox v-model="item1.checked" @change="()=>cell(item1)">{{item1.name}}</el-checkbox>

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
              // this.$set(data, "add", true);
              // this.$set(data, "del", true);
              // this.$set(data, "edit", true);
              // this.$set(data, "find", true);
            } else {
              // this.$set(data, "add", false);
              // this.$set(data, "del", false);
              // this.$set(data, "edit", false);
              // this.$set(data, "find", false);
            }

            console.log(data)

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
        roleList: [],
        form: {
          name: '',
          status: false,
          type: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
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
        storeData: [{}],
        p: {page: 1, size: 20, total: 0},
      }
    },
    watch: {},
    methods: {
      test() {
        console.log(this)
      },
      getPage(page) {
        this.p.page = page;
        this.showRoleList(this.p);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showRoleList(this.p);
      },
      roleOpen() {

      },
      roleClose() {
        this.roleList = []

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
      dialogClose() {
        this.form = {
          name: '',
          status: false,
          type: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        };
        this.$refs['formRules'].resetFields();
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            getApi.saveRole(this.form).then((res) => {
              console.log(res)
              if (res.data.errcode === 0) {

                this.dialogVisible = false
              }
            })
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

      recurRole(list) {


        console.log(list)
        list.forEach((item) => {
          if (item.is_select === 0) {
            item.selected = false
          } else {
            item.selected = true
          }

          item.arr.forEach((item1) => {
            if (item1.is_select === 0) {
              item1.selected = false
            } else {
              item1.selected = true
            }
          })
        })
        this.recurRole(item.children)

        // data.children.forEach((map) => {
        //   if (map.children) {
        //     this.$set(map, "checked",);
        //     this.recurRole(map, )
        //   }
        // })
      },

      config(row) {
        this.dialogVisible2 = true
        getApi.rolePower(row.id).then((res) => {
          //console.log(res)
          if (res.data.errcode === 0) {


            this.recurRole(res.data.data)


            //this.roleList = res.data.data
          }
        })
      },
      edit() {
        this.dialogVisible = true
      },
      del() {

        let list = [];
        this.storeData.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });
        if (list.length === 0) {
          this.$message('请勾选角色');
        } else {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getApi.delRole(list.join(",")).then((res) => {
              console.log(res)
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.showRoleList(this.p = {page: 1, size: 20, total: 0});
            })


          }).catch(() => {
            //
          });
        }

      },

      showRoleList(p) {
        getApi.getRoleList(p = {page: 1, size: 20, total: 0}).then((res) => {
          console.log(res)
          if (res.data.errcode === 0) {
            res.data.data.list.forEach((data) => {
              data.select = false;

              if (data.status === 1) {
                data.status = true
              } else {
                data.status = false

              }

            });
            // this.storeData = res.data.data.list;
            // this.p.total = res.data.data.count
          }


        })
      }
    },
    created() {
      this.storeData.forEach((map) => {
        this.$set(map, 'select', false)
      })
      this.showRoleList(this.p)
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
