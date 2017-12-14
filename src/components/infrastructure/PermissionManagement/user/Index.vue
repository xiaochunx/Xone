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
            <el-button size="small" @click="addAccount('添加用户')">添加用户</el-button>
            <el-button size="small" @click="showStore()">关联门店</el-button>
          </div>
        </div>

      </div>
    </div>

    <el-table :data="storeData" border :height="tableHeight">
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                       type="index" width="70">
        <template slot-scope="scope">
          {{scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="account"
                       label="编码"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                       label="用户账号/手机号"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="用户姓名"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="状态"></el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="关联角色"></el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="">查看</el-button>
          <el-button size="small" @click="editAccount('编辑用户')">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <!--<xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>-->
    </footer>


    <!--新增/编辑用户-->

    <el-dialog
      :title="userName"
      @close="dialogClose"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="formUser" label-width="100px">

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
            <div class="m-storeCode margin_l_10" @click="addDomain2()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formUser.billHuman.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain2(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="所属用户组:">
          <el-select v-model="formUser.group_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="角色:">
          <el-select v-model="formUser.group_id" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="拥有权限:" v-if="userName !== '添加用户'">
          <el-button size="small" type="primary" @click="showPermission()">查看</el-button>
        </el-form-item>

        <el-form-item label="状态:">

          <el-switch
            v-model="formUser.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFrom2('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--查看权限-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="50%">
      <el-table :data="storeData1" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="x" width="120"
                         label="模块"></el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="operation"
                         label="操作权限">
          <template slot-scope="scope">
            <el-checkbox v-for="(item,index) in scope.row.operation" v-model="item.is">{{item.name}}</el-checkbox>
          </template>

        </el-table-column>
      </el-table>
    </el-dialog>

    <!--关联门店-->
    <el-dialog
      title=""
      @close="dialogClose2"
      :visible.sync="dialogVisible2"
      width="50%">

      <div class="flex_a margin_b_10">
        <div></div>
        <div class="margin_l_10">
          <el-select v-model="providerId" placeholder="请选择省" @change="myChange(providerId,'provider')">
            <el-option v-for="item in providerList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="cityId" placeholder="请选择市" @change="myChange(cityId,'city')">
            <el-option v-for="item in cityList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="areaId" placeholder="请选择区">
            <el-option v-for="item in areaList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="margin_l_10 flex_a">
          <el-input placeholder="门店名称/编码" v-model="inputArea" icon="search" class="margin_r_10"></el-input>
          <el-button @click="search()">搜索</el-button>
        </div>
      </div>

      <div class="flex">
        <el-transfer
          class="transfer"
          v-model="value3"
          :props="{
            key: 'id',
            label: 'name'
          }"
          @change="handleChange"
          :render-content="renderFunc"
          :titles="['Source', 'Target']"
          :data="data">
        </el-transfer>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../../utility/getScrollHeight'
  import {getLeft, getArea} from '../../../utility/communApi'
  import getApi from './user.service'
  import ElCheckbox from "element-ui/packages/checkbox/src/checkbox";

  export default {
    components: {ElCheckbox},
    data() {

      return {

        data: [{id:1,name:'备选项 1'},{id:2,name:'备选项 2'},{id:3,name:'备选项 3'}],
        value3: [],
        renderFunc(h, option) {

          return<div class="equal">
            <div class="row">
            <div class="one">{ option.id }</div>
            <div class="two">{ option.name }</div>
            </div>
            </div>;
        },

        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "权限管理", url: ''}],

        storeName: '',
        storeData1: [
          {x: 'x1', operation: [{name: '列表', is: true}, {name: '删除', is: false}, {name: '编辑', is: false}]},
          {x: 'x2', operation: [{name: '列表', is: true}, {name: '删除', is: true}, {name: '编辑', is: true}]}
        ],
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

        value: "",
        options: [{
          id: 1,
          label: '民生银行'
        }, {
          id: 2,
          label: '易极付'
        }],
        levelName: '款易',
        p: {page: 1, size: 20, total: 0},
        levelId: '',//左边树ID
        formUser: {
          nickname: '',
          phone: '',
          group_id: '',
          billHuman: [
            {value: '', value1: ''}
          ],
          status: ''
        },
        userName: '',
        providerId: '',
        providerList: [],
        cityId: '',
        cityList: [],
        areaId: '',
        areaList: [],
        inputArea: ''
      }
    },
    watch: {},
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      search() {
        // getApi.searchStore(this.areaId, this.inputArea).then((res) => {
        //   res.data.data.forEach((map) => {
        //     this.$set(map, 'select', false)
        //   });
        //   this.storeData = res.data.data
        // })

      },
      myChange(id, name) {
        if (name === "provider") {
          this.cityId = "";
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.cityList = res.data.data
          })
        }
        if (name === "city" && this.cityId !== "") {
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.areaList = res.data.data
          })
        }
      },
      showStore() {
        this.dialogVisible2 = true
      },
      showPermission() {
        this.dialogVisible1 = true
      },
      dialogClose2() {
        // this.providerId = '';
        // this.cityId = '';
        // this.cityList = [];
        // this.areaId = '';
        // this.areaList = [];
        // this.inputArea = ''
      },
      dialogClose() {
        this.formUser = {
          nickname: '',
          phone: '',
          group_id: '',
          billHuman: [
            {value: '', value1: ''}
          ],
          status: ''
        };
        this.$refs['formRules'].resetFields();
      },
      addAccount(name) {
        this.userName = name;
        this.dialogVisible = true
      },


      editAccount(name) {
        this.userName = name;
        this.dialogVisible = true
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
      getArea('').then((res) => {
        if (res.data.errcode === 0) {
          this.providerList = res.data.data
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
