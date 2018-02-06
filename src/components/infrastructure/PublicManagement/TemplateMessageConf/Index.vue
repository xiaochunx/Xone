<template>
  <div >

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="handle('新增')" >新增模板消息</el-button>

        </div>
        <div class="flex_r">

        </div>
      </div>

    </div>
    <el-table :data="storeData" border :height="tableHeight"  >
      <el-table-column header-align="center" align="center" label="业务类型" label-class-name="mySelect" >
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="消息模板ID" >
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="消息模板类型">
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="is_use" label="状态" width="100">
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="140">
        <template slot-scope="scope">

          <el-button size="small" type="primary" @click="handle('修改',scope.row)" >修改</el-button>
          <el-button size="small" @click="del(scope.row.id,scope.row.status)" >删除</el-button>

        </template>
      </el-table-column>
    </el-table>


    <footer>
      <!--<xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>-->
    </footer>

    <!--弹窗新增/修改-->
    <el-dialog
      :title="name"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
      @close="dialogClose"
      width="30%" size="tiny">
      <el-form ref="formRules" :model="form" label-width="120px">
        <el-form-item label="业务类型" prop="type" :rules="{type:'number',required: true, message: '请选择业务类型', trigger: 'change'}">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in roleType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="消息模板ID" prop="ID" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.ID" placeholder="请输入内容" style="width: 193px"></el-input>
        </el-form-item>

        <el-form-item label="消息模板类型" prop="typeId" :rules="{type:'number',required: true, message: '请选择消息模板类型', trigger: 'change'}">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="item in roleType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="first.DATA" >
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
          <el-button type="primary" @click="show()">预览</el-button>
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="dialogVisible2"
      width="30%" size="tiny">
      <div>f</div>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../../utility/getScrollHeight'
  // import getApi from '../../roleManagement.service'

  import { mapActions,mapGetters } from 'vuex';
  import Hub from '../../../utility/commun'
  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {

    },
    data() {
      return {

        roleList: [],
        form: {
          type: '',
          ID:'',
          status: true,
          typeId: '',

        },
        dialogVisible: false,
        dialogVisible2: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "公众号管理", url: '/infrastructure/PublicManagement'}, {name: "模板消息配置", url: ''}],
        name: '',

        roleType:[],
        storeData: [{}],
        p: {page: 1, size: 20, total: 0},


      }
    },
    watch: {},
    methods: {

      getPage(page) {
        this.p.page = page;
        // this.showRoleList(this.p,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        // this.showRoleList(this.p,this.searchName);
      },
      show(){
        this.dialogVisible2 = true
      },

      dialogOpen() {


      },
      dialogClose(){
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


      del(id,status){
        if(status === 1){
          this.$confirm(
            '该模板消息正在使用中，如删除顾客在微信中会收不到模板消息提醒哦～', '删除', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

            // let params = {
            //   redirect: "x2.store.delStore",
            //   storeId: base_store_id,
            // };
            // oneTwoApi(params).then((res) => {
            //   if (res.errcode === 0) {
            //     this.$message({
            //       type: 'info',
            //       message: '删除成功'
            //     });
            //     this.showResouce(this.p, this.getX2StoreLevelId())
            //   }
            // })

          }).catch(() => {
            //
          });
        }else {
          this.$confirm(
            '确认是否删除？', '删除', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

            // let params = {
            //   redirect: "x2.store.delStore",
            //   storeId: base_store_id,
            // };
            // oneTwoApi(params).then((res) => {
            //   if (res.errcode === 0) {
            //     this.$message({
            //       type: 'info',
            //       message: '删除成功'
            //     });
            //     this.showResouce(this.p, this.getX2StoreLevelId())
            //   }
            // })

          }).catch(() => {
            //
          });


        }


      },



      handle(name,row) {
        this.name = name;
        this.dialogVisible = true

        // getApi.roleInfo(row.id).then((res)=>{
        //   if(res.data.errcode === 0){
        //     if(res.data.data.status === 1){
        //       res.data.data.status = true
        //     }else {
        //       res.data.data.status = false
        //     }
        //     if(res.data.data.thirdCode.length === 0){
        //       res.data.data.thirdCode = [{code1: '', code2: ''}]
        //     }
        //     this.form = res.data.data
        //   }
        // });

        this.dialogVisible = true
      },


      showResouce(p,name = "") {

      }
    },
    created() {
        console.log(this.$route.params.id)
      this.showResouce(this.p)

    },
    mounted() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed(){

    }
  }
</script>

<style scoped lang="less">



</style>
