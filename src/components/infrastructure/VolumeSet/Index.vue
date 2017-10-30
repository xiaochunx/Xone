<template>
  <div id="volumeSet">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-form ref="form" :model="form" label-width="170px" :rules="rules" >
          <el-form-item label="支付开关">
            <el-switch
              v-model="form.paySwitch"
              on-text=""
              off-text="">
            </el-switch>
          </el-form-item>

          <el-form-item label="模式">
            <div>
              <el-radio class="radio" v-model="form.mode" label="1">在线模式（POS联网时选择该模式）</el-radio>
            </div>
            <div>
              <el-radio class="radio" v-model="form.mode" label="2">离线模式（POS离线时选择该模式）</el-radio>
            </div>
          </el-form-item>

          <el-form-item label="扫码开发票">
            <el-switch
              v-model="form.invoice"
              on-text=""
              off-text="">
            </el-switch>
          </el-form-item>

          <el-form-item label="发票码与支付码统一">
            <el-switch
              v-model="form.invoicePay"
              on-text=""
              off-text="">
            </el-switch>
          </el-form-item>

          <el-form-item label="支付成功后跳转的URL"
                        prop="url"
          >
            <el-input v-model="form.url" placeholder="请输入URL"></el-input>
          </el-form-item>

          <el-form-item label="URL是否带门店编码">
            <el-radio class="radio" v-model="form.code" label="1">是</el-radio>
            <el-radio class="radio" v-model="form.code" label="2">否</el-radio>
          </el-form-item>

          <el-form-item label="选择门店">
            <el-row>
              <el-col :span="24" class="smallContentMsg">
                <el-radio class="radio" v-model="form.shop" label="1">全部门店</el-radio>
                <el-radio class="radio" v-model="form.shop" label="2">部分门店</el-radio>
                <router-link to="/infrastructure/VolumeSet/newAdd">
                  <el-button size="small">新增</el-button>
                </router-link>
              </el-col>
              <el-col :span="24" v-if="form.shop == 2">
                <el-card>
                  <el-tree :data="form.data" :props="defaultProps" @node-click="handleNodeClick"
                           :default-expanded-keys="[2]" node-key="id"></el-tree>
                </el-card>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>

  import xoNavPath from './NavPath.vue'

  export default {
    data() {
      return {
        form: {
          paySwitch: false,
          mode: '1',
          invoice: false,
          invoicePay: false,
          url: '',
          code: '1',
          shop: '1',
          data: [
            {label: '一级 1', id: 2, children: [{label: '二级 2', id: 11}]},
            {label: '一级 2', id: 1},
            {label: '一级 3', id: 3},
            {label: '一级 4', id: 4},
          ]
        },
        rules: {
          url: [
            {required: true, message: '请输入url', trigger: 'blur'},
            {type: 'url', message: '请输入正确的url地址', trigger: 'blur,change'}
          ]
        }
      }
    },
    props: {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    },
    components: {
      xoNavPath
    },
    methods: {
      onSubmit(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$message({
              message: "提交成功",
              type: "success"
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>
<style>
  .contentMsg {
    padding: 0 0 25px 0;
  }

  .smallContentMsg {
    padding: 0 0 20px 0;
  }
</style>
