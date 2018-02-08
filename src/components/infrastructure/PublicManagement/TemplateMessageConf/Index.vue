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
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="type" label="业务类型">
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="template_id" label="消息模板ID" >
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="title" label="消息模板类型">
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态" width="100">
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
      width="30%" >
      <el-form ref="formRules" :model="form" label-width="180px">
        <el-form-item label="业务类型" prop="type" :rules="{type:'number',required: true, message: '请选择业务类型', trigger: 'change'}">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="消息模板ID">
          <el-input v-model="form.template_id" disabled style="width: 193px"></el-input>
        </el-form-item>

        <el-form-item label="消息模板类型" prop="title" :rules="{required: true, message: '请选择消息模板类型', trigger: 'change'}">
          <el-select v-model="form.title" placeholder="请选择消息模板类型" @change="handleTemplate">
            <el-option
              v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item v-for="(item,index) in form.templateDataList" :key="item.value" :label="item.value"
                      :prop="'templateDataList.' + index + '.selectName'"
        :rules="{required: true, message: '必填项', trigger: 'change'}"
                      >

          <div class="flex_r">
            <el-select v-model="item.selectName" placeholder="请选择" @change="changeValue(item.value,item.selectName)">
              <el-option
                v-for="item1 in messageTemplateList"
                :key="item1.id"
                :label="item1.name"
                :value="item1.id">
              </el-option>
            </el-select>

            <el-color-picker class="margin_l_10" v-model="form.data[item.value].color">
            </el-color-picker>
          </div>

          <el-input class="margin_t_10" v-if="item.selectName==='custom'" v-model="form.textTemp[item.value]"  style="width: 193px"></el-input>


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

  import {oneTwoApi} from '@/api/api.js'
  import { mapActions,mapGetters } from 'vuex';

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
        typeList:[],
        roleList: [],
        form: {
          type: '',
          template_id:'',
          title:'',
          status: true,
          data:{},
          colorTemp:{},
          textTemp:{},
          templateDataList:[],
        },
        dialogVisible: false,
        dialogVisible2: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "公众号管理", url: '/infrastructure/PublicManagement'}, {name: "模板消息配置", url: ''}],
        name: '',
        templateList:[],

        templateDataTemp:{},
        storeData: [],
        p: {page: 1, size: 20, total: 0},
        messageTemplateList:[]

      }
    },
    watch: {},
    methods: {
      handleTemplate(e){
        // this.templateList.forEach((item)=>{
        //   if(item.name === e){
        //     this.form.template_id = item.id
        //   }
        // })
        this.form.template_id = e;
        this.form.templateDataList = this.templateDataTemp[e];
        this.form.templateDataList.forEach((item)=>{
          this.$set(item,'selectName','');
          this.form.data[item.value]= {name:item.name,value:'',color:'#20a0ff'}
        })
      },
      changeValue(i,data){
        console.log(i)
        console.log(data)
        this.form.data[i].value = data

      },
      changeColor(i,data){
        this.form.data[i].color = data
      },
      show(){
        this.dialogVisible2 = true
      },

      dialogOpen() {
        //获取业务类型列表
        let params = {
          redirect: "x1.privateTemplate.getTypeList"
        };
        oneTwoApi(params).then((res) => {
          if(res.errcode === 0){
            this.typeList = res.data;

          }
        })

        //获取所有消息模板
        let params1 = {
          redirect: "x1.privateTemplate.getTemplateList"
        };
        oneTwoApi(params1).then((res) => {
          if(res.errcode === 0){
            this.templateList = res.data.type;
            this.templateDataTemp = res.data.list;
          }
        });
        //获取当前所有内容选项
        let params2 = {
          redirect: "x1.privateTemplate.getMessageTemplateList"
        };
        oneTwoApi(params2).then((res) => {
          if(res.errcode === 0){
            this.messageTemplateList = res.data;

          }
        })
      },
      dialogClose(){
        this.form = {
          type: '',
          template_id:'',
          title:'',
          status: true,
          data:{},
          colorTemp:{},
          textTemp:{},
          templateDataList:[],
        };
        this.$refs['formRules'].resetFields();
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            if(this.name === '新增'){
              console.log(this.form)
              // let params = {
              //   redirect: "x1.privateTemplate.add",
              //   wx_id: this.$route.params.id,
              //   type:'',
              //   status:'',
              //   title:'',
              //   data:'',
              //   template_id:'',
              // };
              // oneTwoApi(params).then((res) => {
              //   if(res.errcode === 0){
              //
              //   }
              // })
            } else {

            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      delTemplate(id){
        //删除模板
        let params = {
          redirect: "x2.privateTemplate.del",
          id: id,
        };
        oneTwoApi(params).then((res) => {
          if (res.errcode === 0) {
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            this.showResouce(this.$route.params.id)
          }
        })
      },

      del(id,status){
        if(status === 1){
          this.$confirm(
            '该模板消息正在使用中，如删除顾客在微信中会收不到模板消息提醒哦～', '删除', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.delTemplate(id)

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

            this.delTemplate(id)

          }).catch(() => {
            //
          });
        }
      },

      handle(name,row) {
        this.name = name;
        this.dialogVisible = true;
        this. templateDataList = [{name: "",
          selectName: "",
          value: ""}];
        if(name === '修改'){
          //模板详情
          let params = {
            redirect: "x1.privateTemplate.getInfo",
            id: row.id,

          };
          oneTwoApi(params).then((res) => {
            if(res.errcode === 0){
              this.form = res.data;

            }
          })
        }
      },
      getPage(page) {
        this.p.page = page;
        // this.showRoleList(this.p,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        // this.showRoleList(this.p,this.searchName);
      },

      showResouce(id) {
        //获取消息模板列表
        let params = {
          redirect: "x1.privateTemplate.getList",
          id: id,

        };
        oneTwoApi(params).then((res) => {
          if(res.errcode === 0){
            this.storeData = res.data;
            // this.p.total = res.data.count
          }
        })


      }
    },
    created() {
      this.showResouce(this.$route.params.id)

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
