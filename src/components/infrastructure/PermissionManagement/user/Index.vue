<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <div>

            <el-button size="small" type="text" @click="$router.go(-1)"> 返回用户组</el-button>
            <el-button size="small" @click="addAccount('添加用户')" v-show="getTreeArr['新增用户']">添加用户</el-button>
            <!--<el-button size="small" @click="showStore()">关联门店</el-button>-->
            <el-button size="small" @click="isSwitch()" v-show="getTreeArr['批量开启、关闭用户']">批量开启/关闭</el-button>

          </div>
        </div>

      </div>
    </div>

    <el-table :data="userList" border :height="tableHeight" v-show="getTreeArr['用户列表']">
      <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                       width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                       label="编码"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="phone"
                       label="用户账号/手机号"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="nickname"
                       label="用户姓名"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="状态"></el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="role_id"
                       label="关联角色">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.role_id">
            <div v-for="(item1,index) in roleList">
              <div v-if="item === item1.id">
                {{item1.name}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showStore(scope.row)" v-show="getTreeArr['关联门店']">关联门店</el-button>
          <el-button size="small" @click="editAccount('查看',scope.row)" v-show="getTreeArr['查看用户详情']">查看</el-button>
          <el-button size="small" @click="editAccount('编辑用户',scope.row)" v-show="getTreeArr['编辑用户']">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)" v-show="getTreeArr['删除用户']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <!--<xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>-->
    </footer>


    <!--新增用户-->

    <el-dialog
      :title="userName"
      @close="dialogClose"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="formUser" label-width="100px">

        <el-form-item label="名称:" prop="nickname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUser.nickname" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" :rules="{validator: checkPhone,required: true,  trigger: 'blur'}">
          <el-input v-model="formUser.phone" :maxlength="11"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <div v-for="(domain, index) in formUser.billHuman" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code1"></el-input>
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
                    <el-input v-model="domain.code2"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain2()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formUser.billHuman.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain2(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="状态:">

          <el-switch
            v-model="formUser.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFromAdd('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--编辑用户-->
    <el-dialog
      :title="userName"

      :visible.sync="dialogVisible3"
      width="50%">
      <el-form ref="formRules3" :model="formUserEdit" label-width="100px">

        <el-form-item label="名称:" prop="nickname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUserEdit.nickname" placeholder="请输入内容" :disabled="showDetail"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" :rules="{validator: checkPhone,required: true, trigger: 'blur'}">
          <el-input v-model="formUserEdit.phone" :maxlength="11"  placeholder="请输入手机号"></el-input>
        </el-form-item>


        <div v-for="(domain, index) in formUserEdit.billHuman" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code1" :disabled="showDetail"></el-input>
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
                    <el-input v-model="domain.code2" :disabled="showDetail"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain3()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formUserEdit.billHuman.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain3(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="角色:">
          <el-select v-model="formUserEdit.role_id" multiple placeholder="请选择" :disabled="showDetail">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="拥有权限:">
          <el-button size="small" type="primary" @click="showPermission(formUserEdit.role_id)">查看</el-button>
        </el-form-item>

        <el-form-item label="状态:">

          <el-switch :disabled="showDetail"
            v-model="formUserEdit.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <el-button @click="dialogVisible3 = false">取消</el-button>
          <el-button type="primary" @click="submitFromEdit('formRules3')" :disabled="showDetail">确认</el-button>
        </div>
      </el-form>
    </el-dialog>


    <!--查看权限-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="50%" size="large">
      <!--<el-table :data="storeData1" border>-->
        <!--<el-table-column label-class-name="table_head" header-align="center" align="center" prop="x" width="120"-->
                         <!--label="模块"></el-table-column>-->
        <!--<el-table-column label-class-name="table_head" header-align="center" align="center" prop="operation"-->
                         <!--label="操作权限">-->
          <!--<template slot-scope="scope">-->
            <!--<el-checkbox v-for="(item,index) in scope.row.operation" v-model="item.is">{{item.name}}</el-checkbox>-->
          <!--</template>-->

        <!--</el-table-column>-->
      <!--</el-table>-->

      <roleTree :data="showRoleList" :count=0></roleTree>

    </el-dialog>

    <!--关联门店-->
    <el-dialog
      title=""
      @open="open2"
      @close="dialogClose2"
      :visible.sync="dialogVisible2"
      width="50%">
      <div class="flex_a margin_b_10">
        <el-cascader
          :props="defaultProps"
          :options="dataLeft"
          v-model="selectedOptions"
          change-on-select
          @change="handleChange">
        </el-cascader>
      </div>

      <div class="flex_a">
        <el-transfer
          class="transfer"
          v-model="storeDataNew"
          :props="{
            key: 'id',
            label: 'storeName'
          }"
          @change="handleChangeTran"
          :render-content="renderFunc"
          :titles="['全部门店', '已选门店']"
          :data="storeDataOld">
        </el-transfer>
      </div>
      <div class="margin_t_10">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="submitFromStroe()" >确认</el-button>
      </div>

    </el-dialog>

    <!--开启/关闭-->
    <el-dialog
      title="开启/关闭"
      :visible.sync="dialogVisible4"
      width="50%" size="tiny">
      <el-switch
        v-model="storeStatusValue"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
      <div class="margin_t_10">
        <el-button @click="dialogVisible4 = false">取消</el-button>
        <el-button type="primary" @click="changeStoresStatus()">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../../utility/getScrollHeight'
  import {getLeft,getList} from '../../../utility/communApi'
  import getApi from './user.service'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {

      roleTree: {
        name: 'roleTrees',
        props: ['data', 'count'],
        template: `
            <div>
              <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
                <div class="flex_a">
                  <el-checkbox v-model="item.selected" disabled>{{item.name}}</el-checkbox>
                  <div class="flex_a" style="margin-left: 50px">

                    <div class="margin_r_10" v-for="(item1,index) in item.arr">
                      <el-checkbox v-model="item1.selected" disabled>{{item1.name}}</el-checkbox>
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
        }
      }
    },
    data() {
      return {
        storeDataOld: [],
        storeDataNew: [],
        storeDataSelected: [],

        renderFunc(h, option) {

          return<div class="equal">
            <div class="row">

            <div class="two">门店名称：{ option.storeName }</div>
            </div>
            </div>;
        },
        storeStatusValue: false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3:false,
        dialogVisible4:false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "权限管理", url: ''}],

        storeName: '',
        storeData1: [
          {x: 'x1', operation: [{name: '列表', is: true}, {name: '删除', is: false}, {name: '编辑', is: false}]},
          {x: 'x2', operation: [{name: '列表', is: true}, {name: '删除', is: true}, {name: '编辑', is: true}]}
        ],
        userList: [],
        roleList: [],
        showRoleList:[],
        levelName: '款易',
        p: {page: 1, size: 20, total: 0},
        formUser: {
          nickname: '',
          phone: '',
          billHuman: [
            {code1: '', code2: ''}
          ],
          status:false
        },
        formUserEdit:{
          nickname: '',
          phone: '',
          role_id:[],
          billHuman: [
            {code1: '', code2: ''}
          ],
          status: false
        },
        userName: '',
        showDetail:true,
        dataLeft:[],
        defaultProps: {
          value:'id',
          children: 'child',
          label: 'levelname'
        },
        storeList:[],
        selectedOptions:[],
        uid:'',
        username:''
      }
    },
    watch: {},
    methods: {
      checkPhone(rule, value, callback){
        let re = /^1[3|5|7|8]\d{9}$/;
        if (value === '') {
          callback(new Error('请输入手机'));
        }else {
          if(re.test(value)){
            callback()
          }else {
            callback(new Error('请输入正确手机号码'));
          }
        }
      },
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.userList.forEach((data) => {
            data.select = true
          })
        } else {
          this.userList.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.userList.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.userList.length) {
          //this.selectedAll = true;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        } else {
          //this.selectedAll = false;
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
                    console.log(event)
                  }
                }
              }, ['序号']
            )
          ]
        );
      },
      isSwitch() {
        this.storeStatusValue = false;
        let list = [];
        this.userList.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });

        if (list.length === 0) {
          this.$message('请勾选门店');
        } else {
          this.dialogVisible4 = true
        }
      },
      //批量状态设置
      changeStoresStatus() {
        let list = [];
        this.userList.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });

        let type;
        if (this.storeStatusValue) {
          type = "on"
        } else {
          type = "off"
        }

        getApi.settingBatch(list.join(','),type).then((res) => {
          console.log(res)
          if (res.data.errcode === 0) {
            this.$message('操作成功');
            this.getUserFromGroup();
            this.dialogVisible4 = false

          }
        })
      },
      submitFromStroe(){
        let data = [];
        this.storeDataOld.forEach((item)=>{
          this.storeDataNew.forEach((item1)=>{
            if(item.id === item1){
              data.push({uid:this.uid,username:this.username,store_id:item.id,storename:item.storeName})
            }
          })
        });

        getApi.userStoreInfo(data).then((res)=>{
          console.log(res)
          if(res.data.errcode === 0){
            this.dialogVisible2 = false
          }
        })

      },
      submitFromEdit(formRules){
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            let group_id = this.$route.params.id;
            getApi.editor(this.formUserEdit,group_id).then((res)=>{
              if(res.data.errcode === 0){
                this.dialogVisible3 = false;
                this.getUserFromGroup();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFromAdd(formRules){
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            let levelId = this.$route.params.levelId;
            let group_id = this.$route.params.id;
              getApi.newlyAddAccount(this.formUser,levelId,group_id).then((res)=>{
                if(res.data.errcode === 0){
                  this.dialogVisible = false;
                  this.getUserFromGroup();
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChange(value) {
        getList(value[value.length -1]).then((res)=>{
          console.log(res)
          // this.storeDataOld = res.data.data.list

          let arr =  res.data.data.list.concat(this.storeDataSelected);
          let list2 = [];
          let listMap = {};
          for (let i = 0, id, storeName, key; i < arr.length; i++) {
            id = arr[i].id;
            storeName = arr[i].storeName;
            key = id + '-' + storeName;
            if (!!listMap[key]) {
              listMap[key]++;
            } else {
              listMap[key] = 1;
            }
          }

          for (let item in listMap) {
            list2.push({
              id: item.split('-')[0] *1,
              storeName: item.split('-')[1],
            })
          }
        this.storeDataOld = list2

        })
      },
      handleChangeTran(value){
        console.log(value);
      },

      showStore(row) {
        this.uid = row.id;
        this.username = row.username;
        getApi.getUserStore(row.id).then((res)=>{
          console.log(res)
          if(res.data.errcode === 0){
            let list = [];
            res.data.data.list.forEach((item)=>{
              list.push(item.id)
            });
            this.storeDataOld = res.data.data.list;
            this.storeDataSelected = res.data.data.list;
            this.storeDataNew = list
          }

        });
        this.dialogVisible2 = true
      },



      recurRole(list) {
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
          this.recurRole(item.children)
        });
      },
      showPermission(role_id) {
        this.dialogVisible1 = true;

        getApi.rolePower(role_id.join(',')).then((res) => {
          if (res.data.errcode === 0) {
            this.recurRole(res.data.data);
            this.showRoleList = res.data.data;
          }
        })

      },
      open2(){

      },
      dialogClose2() {
        this.uid = '';
        this.username = '';
      },
      dialogClose() {
        this.formUser = {
          nickname: '',
          phone: '',
          billHuman: [
            {code1: '', code2: ''}
          ],
          status:false
        };
        this.$refs['formRules'].resetFields();
      },
      addAccount(name) {
        this.userName = name;
        this.dialogVisible = true
      },


      editAccount(name,row) {
        if(name === '查看'){
          this.showDetail = true
        } else {
          this.showDetail = false
        }


        this.userName = name;
        getApi.userInfoById(row.id).then((res)=>{
          console.log(res)
          if(res.data.errcode === 0){
            if(res.data.data[0].status ===1) {
              res.data.data[0].status = true
            }else {
              res.data.data[0].status = false
            }
            this.formUserEdit = res.data.data[0]
          }
        });

        this.dialogVisible3 = true
      },


      removeDomain2(item) {
        let index = this.formUser.billHuman.indexOf(item)
        if (index !== -1) {
          this.formUser.billHuman.splice(index, 1)
        }
      },
      addDomain2() {
        this.formUser.billHuman.push({code1: '', code2: ''});
      },

      removeDomain3(item) {
        let index = this.formUserEdit.billHuman.indexOf(item);
        if (index !== -1) {
          this.formUserEdit.billHuman.splice(index, 1)
        }
      },
      addDomain3() {
        this.formUserEdit.billHuman.push({code1: '', code2: ''});
      },


      del(row) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.delBatch(row.id).then((res) => {
            console.log(res)
            if (res.data.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.getUserFromGroup();
            } else {
              this.$message({
                type: 'info',
                message: res.data.data
              });
            }

          })
        }).catch(() => {
          //
        });
      },

      getPage(page) {
        this.p.page = page;
        //this.getBsList(this.p);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.getBsList(this.p);
      },

      getUserFromGroup(){
        let id = this.$route.params.id;
        getApi.getUserFromGroup(id).then((res)=>{
          console.log(res)
          for(let item of res.data.data.list){
            if(item.status === 1){
              item.status = "开启"
            }else {
              item.status = "关闭"
            }
            item.select = false
          }
          this.userList = res.data.data.list

          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.remove('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = false
          })

        })
      }

    },
    created() {
        getLeft().then((res) => {
          if(res.data.errcode === 0){
            this.dataLeft = res.data.data
          }
        });

        this.getUserFromGroup();

      getApi.getRoleList().then((res)=>{
        if(res.data.errcode === 0){
          this.roleList = res.data.data.list
        }
      })

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

</style>
