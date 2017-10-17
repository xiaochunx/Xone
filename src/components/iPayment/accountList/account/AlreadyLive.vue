<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账户编码">
      <el-input v-model="ruleForm.accountCode" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="第三方编码" v-for="(value,index) in ruleForm.thirdCodes" :key="index">
      <el-col :span="9">
        <el-form-item>
          <el-input v-model="value.code1" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center">-</el-col>
      <el-col :span="9">
        <el-form-item>
          <el-input v-model="value.code2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button icon="plus" type="primary" @click="addThirdCode()" v-if="!value.isMin"></el-button>
        <el-button icon="minus" type="primary" @click="minThirdCode(index)" v-if="value.isMin"></el-button>
      </el-col>
    </el-form-item>

    <!--<el-form-item label="第三方编码" v-for="(value,index) in ruleForm.thirdCodes" :key="index" prop="thirdCode">
      &lt;!&ndash;<el-col :span="9">
          <el-input v-model="value.code1" placeholder="请输入内容"></el-input>
      </el-col>&ndash;&gt;
      <el-row>
        <el-col :span="9">
          <el-input v-model="value.code1"></el-input>
        </el-col>
      </el-row>
    </el-form-item>-->



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
          thirdCodes: [
            {
              code1: '',
              code2: '',
              isMin: false
            }
          ]
        },
        input: '',
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
            {required: true, message: '请选择第三方编码', trigger: 'change'}
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
      addThirdCode(){
        var obj = {code1:'',code2:'',isMin:true}
        this.ruleForm.thirdCodes.push(obj);
      },
      minThirdCode(index){
        this.ruleForm.thirdCodes.splice(index,1);
      }
    }
  }
</script>
