<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <!-- 账户编码 -->
    <el-form-item label="账户编码">
      <el-input v-model="ruleForm.accountCode" :disabled="true"></el-input>
    </el-form-item>

    <!-- 第三方编码 -->
    <el-row>
      <el-col :span="24" v-for="(domain, index) in ruleForm.domains">
        <el-col :span="7">
          <el-form-item label="第三方编码:"
                        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
          >
            <el-input v-model="domain.code1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: center;line-height: 36px;">
          -
        </el-col>
        <el-col :span="11">
          <el-form-item label-width="0"
                        prop="accountName"
          >
            <el-input v-model="domain.code2"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-button class="plusBtn" @click.prevent="removeDomain(domain)" size="small"><i class="fa fa-minus-circle"></i></el-button>
          <el-button class="minusBtn" @click="addDomain" size="small"><i class="fa fa-plus-circle"></i></el-button>

        </el-col>

        <!--<el-form-item label="第三方编码:"
                      :label="'第三方编码 ' + index + ':'"
                      :key="domain.key"
                      :prop="'domains.' + index + '.value'"
        >
          <el-col :span="7">
            <el-form-item label-width="0"
                          :key="domain.key"
                          :rules="{
        required: true, message: '域名不能为空', trigger: 'change'
      }"
            >
              <el-input v-model="domain.code1"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label-width="0"
                          :key="domain.key"
                          :rules="{
        required: true, message: '域名不能为空', trigger: 'change'
      }"
            >
              <el-input v-model="domain.code2"></el-input>
            </el-form-item>

          </el-col>

          <el-col :span="4" :offset="1">
            <el-button class="plusBtn" @click.prevent="removeDomain(domain)" size="small"><i class="fa fa-minus-circle"></i></el-button>
            <el-button class="minusBtn" @click="addDomain" size="small"><i class="fa fa-plus-circle"></i></el-button>

          </el-col>

        </el-form-item>-->
      </el-col>
    </el-row>



    <!-- 账户名称 -->
    <el-form-item label="账户名称:" prop="accountName">
      <el-input v-model="ruleForm.accountName"></el-input>
    </el-form-item>

    <!-- 支付方式 -->
    <el-form-item label="支付方式:" prop="pay">
      <el-select v-model="ruleForm.value1" placeholder="请选择">
        <el-option
          v-for="item in ruleForm.option1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </el-form-item>

    <!-- 支付通道 -->
    <el-form-item label="支付通道:" prop="Payment">
      <el-select v-model="ruleForm.value2" placeholder="请选择">
        <el-option
          v-for="item in ruleForm.option2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <!-- 商户号 -->
    <el-form-item label="商户号:" prop="Merchants">
      <el-input v-model="ruleForm.Merchants"></el-input>
    </el-form-item>

    <!-- 商户密钥 -->
    <el-form-item label="商户密钥:" prop="payKey">
      <el-row>
        <el-col :span="2">
          <el-popover trigger="hover" placement="top">
            <p>{{ ruleForm.caption }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>说明</el-tag>
            </div>
          </el-popover>
        </el-col>
        <el-col :span="21">
          <el-input v-model="ruleForm.payKey"></el-input>
        </el-col>
      </el-row>
    </el-form-item>


    <!-- 证书 apiclient_cert.pem -->
    <el-form-item label="证书:" prop="type">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="ruleForm.fileList1"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">apiclient_cert.pem</div>
      </el-upload>
    </el-form-item>

    <!-- 证书 apiclient_cert.pem -->
    <el-form-item label="证书:" prop="type">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="ruleForm.fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">apiclient_cert.pem</div>
      </el-upload>
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
          accountCode: 54252, // 账户编码
          accountName: '',    // 账户名称
          Merchants: '',      // 商户号
          caption: '我是说明文字', // 说明文字
          payKey: '',         // 商户密钥

          option1: [{     // 支付方式
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value1: '',    // 支付方式

          option2: [{     // 支付通道
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value2: '',    // 支付通道

          fileList1: [{  // 证书1
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],
          fileList2: [{  // 证书2
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],

          domains: [{ // 第三方编码
            code1: '',
            code2: ''
          }]
        },

        rules: {
          accountName: [  // 账号名称
            {required: true, message: '请选择账号名称', trigger: 'change'}
          ],
          name: [   // 活动名称
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          pay: [    // 支付方式
            {required: true, message: '请选择支付方式', trigger: 'blur'}
          ],
          Payment: [  // 支付通道
            {required: true, message: '请选择支付通道', trigger: 'blur'}
          ],
          Merchants: [  // 商户号
            {required: true, message: '请选择商户号', trigger: 'change'}
          ],
          payKey: [ // 支付秘钥
            {required: true, message: '请选择商户支付秘钥', trigger: 'change'}
          ],
          type: [   // 开户类型
            {required: true, message: '请选择活动区域', trigger: 'blur'}
          ],
          test: [
            {required: true, message: '请选择账号名称', trigger: 'change'}
          ]
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
      // 图片上传操作方法
      handleRemove(file, fileList) {
        console.log(this.ruleForm.fileList1);
        console.log(fileList);
        console.log(file);
        // console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style scoped>
  .plusBtn{
    border: none;
    color: red;
    font-size: 35px;
    padding: 0 9px 0 9px;
  }

  .minusBtn{
    border: none;
    color: deepskyblue;
    font-size: 35px;
    padding: 0 9px 0 9px;
  }
</style>
