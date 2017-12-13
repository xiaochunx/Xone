<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>

          <div v-if="levelName === '款易'">
            {{levelName}}
            <el-button size="small" @click="addAccount()">批量新增用户</el-button>
            <el-button size="small" @click="delSelected()">批量删除</el-button>
            <el-button size="small" @click="dialogVisible1 = true">批量开启/关闭</el-button>
          </div>

          <div v-if="levelName !== '款易' && levelName !== ''">
            {{levelName}}
            <el-button size="small" >删除</el-button>
            <el-button size="small" >查看拥有权限</el-button>
            <el-button size="small" >禁用</el-button>
            <el-button size="small" >启用</el-button>
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
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">

        <permission-tree :data='data5' :count=0 style="width: max-content"></permission-tree>

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
                           label="用户"
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
              <el-button size="small" @click="editAccount()">编辑</el-button>
              <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>

      </div>
    </div>

    <!--编辑弹窗-->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules2" :model="formUser" label-width="100px">

        <el-form-item label="名称:" prop="nickname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUser.nickname" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="phone" :rules="{required: true, message: '请输入手机', trigger: 'blur'}">
          <el-input v-model="formUser.phone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div v-for="(domain, index) in formUser.billHuman" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
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
          <el-form-item label-width="0" :key="domain.key">
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
            <div v-if="(formUser.billHuman.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="所属部门:" >
          <div>{{formUser.group_id}}</div>

        </el-form-item>
        <el-form-item label="拥有权限:" >
          <div>{{formUser.power_id}}</div>

        </el-form-item>

        <el-form-item label="角色:">
          <el-select v-model="formUser.role_id" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
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
          <!--<el-button>取消</el-button>-->
          <el-button type="primary" @click="submitFrom2('formRules2')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--开启/关闭-->
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
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

    <!--导入用户-->
    <el-dialog
      title="导入用户"
      :visible.sync="dialogVisible2"
      @close="close2"
      width="50%" size="tiny">
      <div class="flex_f flex">

        <div>
          请按照我们提供的标准模板填写信息
          <a style="color: #52CBF8" :href="$xlsUrl">下载标准模板</a>
        </div>

        <div class="margin_t_10">文件中的成员将会被导入至</div>

        <div ref="tree" style="width: 100%;">
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
            <el-checkbox v-model="isOver">手机号相同时，覆盖原有的信息</el-checkbox>
          </div>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="submitUploadXls">提交</el-button>

        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import permissionTree from './permissionTree'
  import getApi from './permissionManagement.service'
  import Hub from '../../utility/commun'

  export default {
    components: {
      permissionTree,
    },
    data() {
      return {
        showAside: false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "基础设置", url: ''}, {name: "权限管理", url: ''}],
        value2: '',
        department: '部门',
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
        dataLeft:[],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        data5: [],
        formUser: {
          id:'',
          nickname: '',
          phone:'',
          group_id:'',
          power_id:'',
          role_id:'',
          billHuman: [
            {value: '', value1: ''}
          ],
          status:''
        },
        isOver:false,
        fileList:[],
        isEdit: true,
        value: "",
        options: [{
          id: 1,
          label: '民生银行'
        }, {
          id: 2,
          label: '易极付'
        }],
        levelName:'',
        p: {page: 1, size: 20, total: 0},
        levelId:''//左边树ID
      }
    },
    watch: {},
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      beforeAvatarUploadXls(file){
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      handleAvatarSuccessXls(){

      },
      nodeClick() {

      },
      submitUploadXls() {

      },
      close2() {
        this.brandid = '';
        this.xlsFile = '';
        this.fileList = []
      },
      editAccount() {
        this.dialogVisible = true
      },
      batchAdd() {
        this.$router.push('/storeManage/storeList/newAddStore')
      },
      removeDomain(item) {
        var index = this.formUser.billHuman.indexOf(item)
        if (index !== -1) {
          this.formUser.billHuman.splice(index, 1)
        }
      },
      addDomain() {
        this.formUser.billHuman.push({value: '', value1: ''});
      },


      getOneList() {
        this.$router.push('/storeManage/storeList/seeTheStore')
      },
      addAccount() {
        this.dialogVisible2 = true
      },
      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      delSelected() {
        let list = [];
        this.storeData.forEach((item) => {
          if (item.NO) {
            list.push(item.id)
          }
        });

        if (list.length === 0) {
          this.$message('请勾选门店');
        } else {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // getApi.delBsOne(list.join(",")).then((res)=>{
            //   console.log(res)
            //   if(res.data.errcode === 0){
            //     this.$message({
            //       type: 'info',
            //       message: '删除成功'
            //     });
            //     this.getBsList();
            //   }
            // })
          }).catch(() => {
            //
          });
        }


      },
      del(row) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // getApi.delBsOne(row.id).then((res) => {
          //   console.log(res)
          //   if (res.data.errcode === 0) {
          //     this.$message({
          //       type: 'info',
          //       message: '删除成功'
          //     });
          //     this.getBsList();
          //   } else {
          //     this.$message({
          //       type: 'info',
          //       message: res.data.data
          //     });
          //   }
          //
          // })
        }).catch(() => {
          //
        });
      },

      recur(data) {
        data.forEach((map) => {
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
            this.levelId = res.data.data[0].id;
            getApi.getPowerList(this.levelId,this.p.page).then((res)=>{
              console.log(res)
            })
            console.log(this.data5)
            this.recur(this.data5)
          } else {
            this.$alert('请重新登录', '超时', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
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
      getPage(page) {
        this.p.page = page;
        //this.getBsList(this.p);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.getBsList(this.p);
      },
    },
    created() {
      this.showLevel()




    },
    mounted() {
      Hub.$on('showAdd', (e) => {
        this.levelName = e.levelName;
        this.levelId = e.levelid;
        getApi.getPowerList(this.levelId,this.p.page).then((res)=>{
          console.log(res)
        })
        this.recurSelected(this.data5, e.levelid)
      });
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
