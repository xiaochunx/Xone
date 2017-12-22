<template>
  <div  v-show="getTreeArr['列表']">
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <div>
            {{levelName}}
            <el-button size="small" @click="addAccountGroup('添加用户组')"  v-show="getTreeArr['新增用户组']">添加用户组</el-button>
            <el-button size="small" @click="isSwitch()" v-show="getTreeArr['批量开启关闭用户组']">批量开启/关闭</el-button>
            <el-button size="small" @click="addAccount()" v-show="getTreeArr['新增用户']">新增用户</el-button>
          </div>
        </div>
        <div class="flex_a">
          <el-input size="small" v-model="storeName" icon="search" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="margin_l_10" size="small" @click="search()">搜索</el-button>
          <el-button class="margin_l_10" size="small" type="primary" @click="dialogVisible2 = true" v-show="getTreeArr['导入用户']">导入用户</el-button>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">

        <permission-tree :data='data5' :count=0 style="width: max-content"></permission-tree>

      </div>

      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">
        <el-table :data="groupList" border :height="tableHeight">
          <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                           width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                           label="用户组编码"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                           label="用户组名称"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态"
                           width="80"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <el-button size="small" @click="editAccount('编辑用户组',scope.row)" v-show="getTreeArr['编辑']">编辑</el-button>
              <el-button size="small" type="danger" @click="del(scope.row)" v-show="getTreeArr['删除']">删除</el-button>
              <el-button size="small" type="primary" @click="goToUser(scope.row)">查看用户</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>
    </div>

    <!--新增/编辑用户组弹窗-->
    <el-dialog
      @close="dialogClose"
      :title="groupName"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="formUserGroup" label-width="100px">

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUserGroup.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <div v-for="(domain, index) in formUserGroup.third_code" class="flex_r">
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
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formUserGroup.third_code.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <div class="margin_t_10">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--开启/关闭-->
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

    <!--新增用户-->

    <el-dialog
      title="新增用户"
      @open="open2"
      @close="dialogClose2"
      :visible.sync="dialogVisible3"
      width="50%">
      <el-form ref="formRules2" :model="formUser" label-width="100px">

        <el-form-item label="名称:" prop="nickname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUser.nickname" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" :rules="{validator: checkPhone,required: true, trigger: 'blur'}">
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

        <el-form-item label="所属用户组:" prop="group_id" :rules="{type:'number',required: true, message: '请选择用户组', trigger: 'change'}">
          <el-select v-model="formUser.group_id"  placeholder="请选择">
            <el-option
              v-for="item in selectGroupList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="状态:">

          <el-switch
            v-model="formUser.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <el-button @click="dialogVisible3 = false">取消</el-button>
          <el-button type="primary" @click="submitFrom2('formRules2')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--导入用户-->
    <el-dialog
      title="导入用户"
      :visible.sync="dialogVisible2"
      @open="open2"
      @close="close2"
      width="50%" size="tiny">
      <div class="flex_f flex">

        <div>
          请按照我们提供的标准模板填写信息
          <a style="color: #52CBF8" :href="$xlsDishesUser">下载标准模板</a>
        </div>

        <div class="margin_t_10">文件中的成员将会被导入至</div>

        <div ref="tree" class="flex">
          <el-form ref="formRules3" :model="formSubmit" label-width="120px">
            <el-form-item label="请选择用户组:" prop="group_id"
                          :rules="{type:'number',required: true, message: '请选择用户组', trigger: 'change'}">
              <el-select v-model="formSubmit.group_id" placeholder="请选择用户组">
                <el-option
                  v-for="item in selectGroupList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>

              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="margin_t_10 width_100">
          <el-upload
            class="upload-demo"
            :action="$updateXlsUrl"
            name="filename"
            :on-change="handleChange"
            :on-success="handleAvatarSuccessXls"
            :before-upload="beforeAvatarUploadXls"
            :file-list="fileList"
            :multiple="false"
          >
            <el-button size="small" type="primary">选取文件上传</el-button>

          </el-upload>
          <div class="margin_t_10">
            <!--<el-checkbox v-model="isOver">手机号相同时，覆盖原有的信息</el-checkbox>-->
          </div>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="submitUploadXls('formRules3')">提交</el-button>

        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import permissionTree from './permissionTree'
  import getApi from './permissionManagement.service'
  import {getArr} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {
      permissionTree,
    },
    data() {

      return {
        formSubmit: {
          group_id: ''
        },
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "基础设置", url: ''}, {name: "权限管理", url: ''}],
        storeStatusValue: false,
        data5: [],
        storeName: '',
        groupList: [],
        dataLeft: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        formUserGroup: {
          name: '',
          third_code: [
            {code1: '', code2: ''}
          ],
        },
        isOver: false,

        levelName: '',
        p: {page: 1, size: 20, total: 0},

        formUser: {
          nickname: '',
          phone: '',
          group_id: '',
          billHuman: [
            {value: '', value1: ''}
          ],
          status: ''
        },
        groupName: '',
        fileList: [],
        fileurl: '',
        selectGroupList:[],

      }
    },
    watch: {},
    methods: {
      ...mapActions(['setPermissionLevelId','setTreeArr']),
      ...mapGetters(['getPermissionLevelId']),
      search(){
        if(this.storeName === ''){
          //this.showRoleList(this.p = {page: 1, size: 20, total: 0})



        }else {
          //this.showRoleList(this.p = {page: 1, size: 20, total: 0},this.storeName)


        }


      },
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.groupList.forEach((data) => {
            data.select = true
          })
        } else {
          this.groupList.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.groupList.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.groupList.length) {
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
      submitFrom2(formRules){
        this.$refs[formRules].validate((valid) => {
          if (valid) {

            getApi.newlyAddAccount(this.formUser,this.getPermissionLevelId()).then((res)=>{
              if(res.data.errcode === 0){
                this.dialogVisible3 = false;
                this.getGroupList(this.p = {page: 1, size: 20, total: 0},this.getPermissionLevelId());
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      open2(){
        getApi.getGroupList({page: 1, size: 1000, total: 0},this.getPermissionLevelId()).then((res)=>{
          this.selectGroupList = res.data.data.list
        })
      },
      dialogClose2() {
        this.formUser = {
          nickname: '',
          phone: '',
          group_id: '',
          billHuman: [
            {value: '', value1: ''}
          ],
          status: ''
        };
        this.selectGroupList =[];
          this.$refs['formRules2'].resetFields();
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            if (this.groupName === '添加用户组') {
              getApi.newLyGroup(this.formUserGroup, this.getPermissionLevelId()).then((res) => {
                if (res.data.errcode === 0) {
                  this.getGroupList(this.p = {page: 1, size: 20, total: 0},this.getPermissionLevelId());
                  this.dialogVisible = false
                }
              })
            } else {
              getApi.editorGroup(this.formUserGroup, this.getPermissionLevelId()).then((res) => {
                if (res.data.errcode === 0) {
                  this.getGroupList(this.p,this.getPermissionLevelId());
                  this.dialogVisible = false
                }
              })

            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      isSwitch() {
        this.storeStatusValue = false;
        let list = [];
        this.groupList.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });

        if (list.length === 0) {
          this.$message('请勾选门店');
        } else {
          this.dialogVisible1 = true
        }
      },
      //批量状态设置
      changeStoresStatus() {
        let list = [];
        this.groupList.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });

        let status;
        if (this.storeStatusValue) {
          status = 1
        } else {
          status = 0
        }

        getApi.settingBatchUserGroup(list.join(','),status).then((res) => {
          console.log(res)
          if (res.data.errcode === 0) {
            this.$message('操作成功');
            this.getGroupList(this.p,this.getPermissionLevelId());
            this.dialogVisible1 = false

          }
        })
      },
      goToUser(row) {
        this.$router.push(`/infrastructure/PermissionManagement/User/${row.id}/${this.getPermissionLevelId()}`)
      },
      dialogClose() {
        this.formUserGroup = {
          name: '',
          third_code: [
            {code1: '', code2: ''}
          ],
        };
        this.$refs['formRules'].resetFields();
      },

      addAccountGroup(name) {
        this.groupName = name;
        this.dialogVisible = true
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      beforeAvatarUploadXls(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      handleAvatarSuccessXls(res, file) {
        this.fileurl = file.response.data.file_url
      },
      nodeClick() {

      },
      submitUploadXls(formRules3) {

        this.$refs[formRules3].validate((valid) => {
          if (valid) {
            if (this.fileurl === '') {
              this.$message('需要上传XLS文件');
              return
            }
            let over = '';
            if (this.isOver === false) {
              over = 0
            } else {
              over = 1
            }
            getApi.updateXlsFile(this.formSubmit.group_id,this.fileurl,this.getPermissionLevelId()).then((res)=>{
              console.log(res)
              if(res.data.errcode === 0){
                this.$message({
                  type: 'info',
                  message: '上传成功'
                });
                this.dialogVisible2 = false
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close2() {
        this.brandid = '';
        this.xlsFile = '';
        this.fileList = [];
        this.$refs['formRules3'].resetFields();
      },
      editAccount(name,row) {
        this.groupName = name;
        getApi.infoByGroupId(row.id).then((res)=>{
          console.log(res)
          this.formUserGroup = res.data.data[0];
        });

        this.dialogVisible = true
      },
      batchAdd() {
        this.$router.push('/storeManage/storeList/newAddStore')
      },
      removeDomain(item) {
        var index = this.formUserGroup.third_code.indexOf(item)
        if (index !== -1) {
          this.formUserGroup.third_code.splice(index, 1)
        }
      },
      addDomain() {
        this.formUserGroup.third_code.push({code1: '', code2: ''});
      },
      removeDomain2(item) {
        let index = this.formUser.billHuman.indexOf(item)
        if (index !== -1) {
          this.formUser.billHuman.splice(index, 1)
        }
      },
      addDomain2() {
        this.formUser.billHuman.push({value: '', value1: ''});
      },


      addAccount() {
        this.dialogVisible3 = true
      },
      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },

      del(row) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.deletGroup(row.id).then((res) => {
            console.log(res)
            if (res.data.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.getGroupList(this.p,this.getPermissionLevelId())
            }
          })
        }).catch(() => {
          //
        });
      },

      recur(data) {
        data.forEach((map) => {
          if(map.id === this.getPermissionLevelId()){
            this.levelName = map.levelname
          }
          if (map.child) {
            this.$set(map, "show", true);
            this.$set(map, "selected", false);
            this.recur(map.child)
          }
        })
      },
      showLevel() {
        getApi.getLevel().then((res) => {
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            if(this.getPermissionLevelId() === ''){
              this.setPermissionLevelId({levelId:res.data.data[0].id});
            }
            this.getGroupList(this.p,this.getPermissionLevelId());

            this.recur(this.data5);
            this.recurSelected(this.data5, this.getPermissionLevelId())
          } else {
            // this.$alert('请重新登录', '超时', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     this.$router.push('/login')
            //   }
            // })
          }
        })
      },
      recurSelected(data, levelId) {
        data.forEach((map) => {
          if (map.id === levelId) {
            this.$set(map, "selected", true);
          } else {
            this.$set(map, "selected", false);
          }
          if (map.child) {
            this.recurSelected(map.child, levelId)
          }
        })
      },

      getGroupList(p, level_id) {
        getApi.getGroupList(p, level_id).then((res) => {

          console.log(res)
          if(res.data.errcode === 0){
            res.data.data.list.forEach((item)=>{
              item.select = false;
              if(item.status === 1){
                item.status = "开启"
              } else {
                item.status = "关闭"

              }
            });
            this.groupList = res.data.data.list;
            this.p.total = res.data.data.count;
            this.$nextTick(() => {
              let all = document.querySelector('#all span');
              all.classList.remove('is-checked');
              let allInput = document.querySelector('#all span input');
              allInput.checked = false
            })
          }
        })
      },


      getPage(page) {
        this.p.page = page;
        this.getGroupList(this.p,this.getPermissionLevelId())
      },
      getPageSize(size) {
        this.p.size = size;
        this.getGroupList(this.p,this.getPermissionLevelId())
      },
    },
    created() {
      this.showLevel()
    },

    mounted() {
      Hub.$on('showAdd', (e) => {
        this.levelName = e.levelName;
        this.setPermissionLevelId({levelId:e.levelid});

        this.getGroupList(this.p,e.levelid);
        this.recurSelected(this.data5, e.levelid)
      });
      Hub.$on('arr', (e) => {
        this.setTreeArr({obj:getArr(e)})
      });

    },
    destroyed(){
      Hub.$off("arr")
    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed() {

      Hub.$off("showAdd");

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
