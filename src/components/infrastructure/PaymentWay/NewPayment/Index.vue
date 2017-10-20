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
            <el-form ref="form" :model="form" label-width="100px">

              <el-form-item label="支付方式名称:">
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
                  <el-button @click.prevent="removeDomain(domain)" type="danger" style="border-radius: 100px" size="small" icon="minus"></el-button>
                  <el-button @click="addDomain" type="primary" icon="plus" style="border-radius: 100px" size="small"></el-button>
                </el-col>

              </el-form-item>


                <el-col :span="24">
                  <el-col :span="12" class="flex-jc">
                    <router-link to="/infrastructure/PaymentWay"><el-button>取消</el-button></router-link>
                  </el-col>
                  <el-col :span="12" class="flex-jc">
                    <el-button type="primary">保存</el-button>
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
    data(){
      return{
        form: {
          payName: '',
          payCode: '',
          domains: [{
            code1: '',
            code2: ''
          }]
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

        if (this.form.domains.length == 1){
          this.$message('不能再删啦');
        }else {
          var index = this.form.domains.indexOf(item);
          if (index !== -1) {
            this.form.domains.splice(index, 1)
          }
        }
      },
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
</style>
