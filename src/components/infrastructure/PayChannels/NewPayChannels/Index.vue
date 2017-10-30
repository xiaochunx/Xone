<template>
  <div id="newPayment">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店</h3>
          </el-col>

          <el-col :span="24" class="cell">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">

              <el-form-item label="支付方式名称:" prop="payName">
                <el-input v-model="form.payName" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="支付方式编码:">
                <el-input v-model="form.payCode" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="第三方编码:"
                            v-for="(domain, index) in form.domains"
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
                  <el-button class="plusBtn" @click.prevent="removeDomain(domain)" size="small"><i
                    class="fa fa-minus-circle"></i></el-button>
                  <el-button class="minusBtn" @click="addDomain" size="small"><i class="fa fa-plus-circle"></i>
                  </el-button>

                </el-col>

              </el-form-item>


              <el-col :span="24">
                <el-col :span="12" class="flex-jc">
                  <router-link to="/infrastructure/PayChannels">
                    <el-button>取消</el-button>
                  </router-link>
                </el-col>
                <el-col :span="12" class="flex-jc">
                  <el-button type="primary" @click="submitForm('form')">保存</el-button>
                </el-col>
              </el-col>

            </el-form>
          </el-col>
        </el-row>

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
          payName: '',
          payCode: '11122',
          domains: [{
            code1: '',
            code2: ''
          }]
        },
        rules: {
          payName: [
            {required: true, message: '请选择账号名称', trigger: 'change'}
          ]
        }
      }
    },
    components: {
      xoNavPath
    },
    methods: {
      addDomain() {
        this.form.domains.push({
          value: '',
          key: Date.now()
        });
      },
      removeDomain(item) {

        if (this.form.domains.length == 1) {
          this.$message('不能再删啦');
        } else {
          var index = this.form.domains.indexOf(item);
          if (index !== -1) {
            this.form.domains.splice(index, 1)
          }
        }
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            var flag = true;

            this.form.domains.forEach(function (item) {
              for (var value in item) {
                if (item[value] == "") {
                  flag = false;
                }
              }
            });

            if (flag) {
              var _this = this;
              this.$message({
                message: "提交成功",
                onClose() {
                  _this.$router.push("/infrastructure/PayChannels")
                }
              });

            } else {
              this.$message({
                message: "所有表格都必须填写",
                type: "warning"
              });
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }

  .cell {
    margin-top: 20px;
  }

  .plusBtn {
    border: none;
    color: red;
    font-size: 35px;
    padding: 0 9px 0 9px;
  }

  .minusBtn {
    border: none;
    color: deepskyblue;
    font-size: 35px;
    padding: 0 9px 0 9px;
  }
</style>
