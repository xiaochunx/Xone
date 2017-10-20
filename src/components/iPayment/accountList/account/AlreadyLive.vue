<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账户编码">
      <el-input v-model="ruleForm.accountCode" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="第三方编码:"
                  v-for="(domain, index) in ruleForm.domains"
                  :label="'第三方编码 ' + index + ':'"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'"
    >
      <el-col :span="7">
        <el-input v-model="domain.code1"></el-input>
      </el-col>
      <el-col :span="1" style="text-align: center;">
        -
      </el-col>
      <el-col :span="11">
        <el-input v-model="domain.code2"></el-input>
      </el-col>

      <el-col :span="4" :offset="1">
        <el-button @click.prevent="removeDomain(domain)" type="danger" style="border-radius: 100px" size="small" icon="minus"></el-button>
        <el-button @click="addDomain" type="primary" icon="plus" style="border-radius: 100px" size="small"></el-button>
      </el-col>

    </el-form-item>

    <el-form-item label="账户名称" prop="accountName">
      <el-input v-model="ruleForm.accountName"></el-input>
    </el-form-item>

    <el-form-item label="支付方式" prop="pay">
      <el-select v-model="ruleForm.pay" placeholder="请选择支付方式">
        <el-option label="支付宝" value="Alipay"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="支付通道" prop="Payment">
      <el-select v-model="ruleForm.Payment" placeholder="请选择支付通道">
        <el-option label="民生银行" value="minShengYinHang"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="商户号" prop="Merchants">
      <el-input v-model="ruleForm.Merchants"></el-input>
    </el-form-item>

    <el-form-item label="商户密钥" prop="payKey">
      <el-row>
        <el-col :span="2">
          <el-popover trigger="hover" placement="top">
            <p>{{ ruleForm.caption }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>说明</el-tag>
            </div>
          </el-popover>
        </el-col>
        <el-col :span="21" :offset="1">
          <el-input v-model="ruleForm.payKey"></el-input>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="证书apiclient_cert.pem" style="display: flex; align-items: center">
      <el-row>
        <el-col>
          <el-button icon="plus">本地上传</el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="证书apiclient_key.pem" style="display: flex; align-items: center">
      <el-row>
        <el-col>
          <el-button icon="plus">本地上传</el-button>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"> 保存 </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          accountCode: 54252,
          accountName: '',
          pay: '',
          Payment: '',
          Merchants: '',
          caption: '我是说明文字',
          delivery: false,
          payKey: '',
          thirdCode: '',
          domains: [{
            code1: '',
            code2: ''
          }]
        },

        rules: {
          accountName: [
            {required: true, message: '请选择账号名称', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          pay: [
            {required: true, message: '请选择支付方式'}
          ],
          Payment: [
            {required: true, message: '请选择支付通道', trigger: 'change'}
          ],
          Merchants: [
            {required: true, message: '请选择商户号', trigger: 'change'}
          ],
          payKey: [
            {required: true, message: '请选择商户支付秘钥', trigger: 'change'}
          ],
          thirdCode: [
            {required: true, message: '请选择商户支付秘钥', trigger: 'blur'}
          ],
        },

      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {

        if (this.ruleForm.domains.length == 1){
          this.$message('不能再删啦');
        }else {
          var index = this.ruleForm.domains.indexOf(item);
          if (index !== -1) {
            this.ruleForm.domains.splice(index, 1)
          }
        }
      },
      addDomain() {
        this.ruleForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
    }
  }
</script>
