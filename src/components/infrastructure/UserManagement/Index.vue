<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
      <div class="flex_sb">
        <div class="flex_1">
        </div>
        <div class="flex_r">

          <div class="margin_r_10">
            <div>
              用户姓名
            </div>
            <el-input v-model="searchName" placeholder="请输入姓名">
            </el-input>
          </div>

          <div class="margin_r_10">
            <div>
              用户手机号
            </div>
            <el-input v-model="searchPhone" placeholder="请输入手机号">
            </el-input>
          </div>
          <div class="margin_r_10">
            <div>
              所属组织
            </div>
            <el-select v-model="organization_id" clearable placeholder="请选择">
              <el-option
                v-for="item in organization"
                :key="item.id"
                :label="item.storeName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="margin_r_10">
            <div>
              用户组
            </div>
            <el-select v-model="organization_id" clearable placeholder="请选择">
              <el-option
                v-for="item in organization"
                :key="item.id"
                :label="item.storeName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>

          <div class="margin_r_10 flex_ec">
            <el-button @click="search()">搜索</el-button>
          </div>


        </div>
      </div>

    </div>
    <el-table :data="storeData" border :height="tableHeight" @select-all="handleSelectionChange" ref="multipleTable">
      <el-table-column
        header-align="center" align="center"
        type="selection"
        label-class-name="mySelect"
        width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
        </template>
      </el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="用户账号"
                       width="100"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                       label="用户姓名"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="is_use"
                       label="所属角色"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="is_use"
                       label="所属品牌"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="is_use"
                       label="所属用户组"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="is_use"
                       label="用户状态"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="320">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="config(scope.row)">修改</el-button>
          <el-button size="small" @click="password()">修改密码</el-button>
          <el-button size="small" @click="editRole('修改',scope.row)">关联门店</el-button>
          <el-button size="small" type="danger" @click="del()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--弹窗新增角色/修改角色-->
    <el-dialog
      :title="name"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
      @close="dialogClose"
      width="30%">
      <el-form ref="formRules" :model="form" label-width="100px">

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="角色类型:" prop="typeId"
                      :rules="{type:'number',required: true, message: '请选择角色类型', trigger: 'change'}">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="item in roleType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:">

          <el-switch
            v-model="form.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
        <div class="margin_t_10">
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--修改密码-->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible2"
      @close="roleClose"
      @open="roleOpen"
      width="100%" size="tiny">
      <div>

        <el-form ref="formRules1" :model="formPassWord" label-width="100px">
          <el-form-item label="原密码:" prop="oldPassWord" :rules="{required: true, message: '请输入原密码', trigger: 'blur'}">
            <el-input type="password" v-model="formPassWord.oldPassWord" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="原密码:" prop="newPassWord" :rules="{required: true, validator: validatePass, trigger: 'blur'}">
            <el-input type="password" v-model="formPassWord.newPassWord" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" prop="confirmPassWord" :rules="{required: true, validator: validatePass2, trigger: 'blur'}">
            <el-input type="password" v-model="formPassWord.confirmPassWord" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="vCode" :rules="{required: true, message: '请确认验证码', trigger: 'blur'}">

            <div class="flex_r">
              <el-input v-model="formPassWord.vCode" placeholder="请输入内容"></el-input>
              <img src="../../../assets/home/yunzang-logo.png" alt="">
            </div>

          </el-form-item>
        </el-form>

        <el-button type="primary" @click="submit1('formRules1')">确定</el-button>
        <el-button @click="dialogVisible2 = false">取消</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './userManagement.service'
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
        searchPhone: '',
        searchName: '',
        organization_id: '',
        organization: [{id: 1, name: "全部"}, {id: 2, name: "款易"}, {id: 3, name: "大商户"}, {id: 1, name: "企业"}],
        roleList: [],
        form: {
          name: '',
          status: true,
          typeId: '',

        },
        formPassWord: {

        },
        dialogVisible: false,
        dialogVisible2: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "用户管理", url: ''}],
        name: '',
        selectedAll: false,
        roleType: [],
        storeData: [],
        p: {page: 1, size: 20, total: 0},
        roleId: '',
        multipleSelection: []
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setTreeArr']),
      handleChecked(data) {
        let count = 0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });
        let list = this.storeData.filter((item) => {
          return item.select === true
        });
        let list1 = [];
        list.forEach((item) => {
          list1.push(item.id)
        });
        this.multipleSelection = list1;
        if (count === this.storeData.length) {
          list.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        let list = [];
        val.forEach((item) => {
          list.push(item.id)
        });
        this.multipleSelection = list;
        if (val.length === this.storeData.length) {
          this.storeData.forEach((map) => {
            this.$set(map, 'select', true)
          });
        } else {
          this.storeData.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },
      search() {
        if (this.searchName === '') {
          this.showRoleList(this.p = {page: 1, size: 20, total: 0})
        } else {
          this.showRoleList(this.p = {page: 1, size: 20, total: 0}, this.searchName)
        }
      },
      password() {
        this.dialogVisible2 = true
      },
      submit1(submit1) {
        this.$refs[submit1].validate((valid) => {
          if (valid) {

            this.dialogVisible2 = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getPage(page) {
        this.p.page = page;
        this.showRoleList(this.p, this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showRoleList(this.p, this.searchName);
      },
      roleOpen() {
        this.formPassWord = {
          oldPassWord: '',
          newPassWord: '',
          confirmPassWord: '',
          vCode: ''
        }
      },
      roleClose() {
        this.roleList = []

      },

      dialogOpen() {


      },
      dialogClose() {
        this.$refs['formRules'].resetFields();
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      handle() {


      },


      config(row) {
        this.roleId = row.id;
        this.dialogVisible = true;
        getApi.rolePower(row.id).then((res) => {
          if (res.data.errcode === 0) {

            this.roleList = res.data.data;
          }
        })
      },
      editRole(name, row) {
        this.name = name;
        getApi.roleInfo(row.id).then((res) => {
          if (res.data.errcode === 0) {
            if (res.data.data.status === 1) {
              res.data.data.status = true
            } else {
              res.data.data.status = false
            }


            this.form = res.data.data
          }
        });

        this.dialogVisible = true
      },
      del() {
        this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // getApi.delRole(this.multipleSelection.join(",")).then((res) => {
          //   if(res.data.errcode === 0){
          //     this.$message({
          //       type: 'info',
          //       message: '删除成功'
          //     });
          //     this.showRoleList(this.p = {page: 1, size: 20, total: 0});
          //   }
          //
          // })

        }).catch(() => {
          //
        });
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
            this.p.total = res.data.data.count;
            this.multipleSelection = [];
          } else {

          }
        })
      },
      validatePass(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formPassWord.confirmPassWord !== '') {
            this.$refs.formRules1.validateField('confirmPassWord');
          }
          callback();
        }
      },
      validatePass2(rule, value, callback){
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formPassWord.newPassWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    },
    created() {

      this.showRoleList(this.p)

    },
    mounted() {
      Hub.$on('arr', (e) => {
        this.setTreeArr({obj: getArr(e)})
      });
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed() {
      Hub.$off("arr")
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
