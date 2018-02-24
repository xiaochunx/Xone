<template>
  <el-card :style="{height:getBodyHeight -52 +'px'}" style="overflow-y: scroll">

      <div style="border-bottom: 1px solid gainsboro">
        <h3 style="margin-bottom: 10px;">{{title}}</h3>
      </div>


    <el-form ref="ruleForm" :model="form" label-width="120px" class="margin_t_10">
      <el-form-item label="接收人邮箱" prop="eMail" :rules="{required: true, message: '请输入接收人邮箱', trigger: 'blur'}">
        <el-input v-model="form.eMail" placeholder="请输入接收人邮箱" style="width: 300px">
        </el-input>
      </el-form-item>

      <el-form-item label="选择门店">
        <div class="flex_r">
          <el-input v-model="storeName" placeholder="门店名称" style="width: 300px">
          </el-input>
          <el-button type="primary" @click="search(storeName)" class="margin_l_10">搜索</el-button>
        </div>
        <div class="flex_r margin_t_10">
          <div class="margin_r_10 fr_body">
            <div class="fr flex_a">
              组织结构
            </div>
            <el-tree class="tree "
                     :data="dataLeft"
                     :props="defaultProps"
                     @node-click="nodeClick"
                     node-key="id"
                     default-expand-all
                     :highlight-current="true"
                     :expand-on-click-node="false">
            </el-tree>
          </div>
          <el-transfer v-model="selectStore" :data="allStore"
                       :props="{key: 'id',label: 'storename'}"
                       :titles="['全部门店', '已选门店']">
          </el-transfer>
        </div>
      </el-form-item>
      <el-form-item label="接收时间" prop="time" :rules="{type:'date',required: true, message: '请选择时间', trigger: 'change'}">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>



    </el-form>

    <div class="flex">
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button type="primary" @click="reset('ruleForm')">重置</el-button>
    </div>

  </el-card>

</template>

<script>
  import { mapActions,mapGetters } from 'vuex';
  import {getLeft} from '../../../utility/communApi'
  import {oneTwoApi} from '@/api/api.js'
  export default {

    data() {
      return {
        tableHeight:0,
        storeName:'',
        dataLeft:[],
        title:'',
        form:{
          eMail:'',
          time:''
        },
        allStore: [],
        selectStore: [],
        defaultProps: {
          value:'id',
          children: 'child',
          label: 'levelname'
        },
      }
    },
    computed: {
      ...mapGetters([
        'getBodyHeight'
      ]),
    },
    components:{
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

console.log(this.selectStore)

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(formName){
        this.allStore = [];
        this.selectStore = [];
        this.storeName = '';
        this.$refs[formName].resetFields();
      },
      nodeClick(item) {
        this.search('',item.id)
      },
      search(storeName = '',levelId = '') {
        let params = {
          redirect: 'x2.store.index',
          levelId: levelId,
          storeName: storeName,
          page: 1,
          pagesize:1000
        };
        oneTwoApi(params).then((res) => {
          if (res.errcode === 0) {
            this.allStore = res.data.list;
          }
        })
      },
      operate(name){

      },

    },
    created(){

      if(this.$route.params.data === 'add'){
        this.title = "新增"
      } else {
        this.title = "修改"
      }

      getLeft('x2').then((res) => {
        if (res.data.errcode === 0) {
          this.dataLeft = res.data.data
        }
      });
    },
    updated(){

    },
    mounted() {


    },
    destroyed(){

    }
  }
</script>

<style scoped>
  .fr {
    height: 36px;
    background: #fbfdff;
    border-top: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
    border-right: 1px solid #d1dbe5;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .fr_body {
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
  }

  .tree {
    width: 300px;
    height: 284px;
    overflow-y: auto;
    box-sizing: border-box;
  }
</style>
