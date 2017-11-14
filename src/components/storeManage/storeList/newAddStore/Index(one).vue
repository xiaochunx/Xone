<template>
  <div>
    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div>
      <el-row>
        <el-col :span="12" :offset="6">
          <div>
            <el-form ref="formRules" :model="form" label-width="100px">
              <el-form-item prop="name" label="门店名称"
                :rules="[
                  { required: true, message: '请输入门店名称', trigger: 'blur' }
                ]">
                <el-row>
                  <el-col :span="14">
                    <el-input v-model="form.name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="门店编码:">
                <el-row>
                  <el-col :span="14">
                    <div>
                      <el-input v-model="form.code"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <div v-for="(domain, index) in form.thirdPartyCoding" class="flex_r">
                <el-form-item label="第三方编码" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value'"
                  :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
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
                <el-form-item label-width="0" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value1'"
                  :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
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
                <div class="flex_sc">
                  <div class="m-storeCode margin_l_10" @click="addDomain">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </div>
                  <div v-if="(form.thirdPartyCoding.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                       @click.prevent="removeDomain(domain)">
                    <i class="fa fa-minus-circle" aria-hidden="true"></i>
                  </div>
                </div>
              </div>


              <el-form-item label="所属门店组:">
                <el-row>
                  <el-col :span="14">
                    <el-select v-model="storeGroup" filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in storeGrounpData" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="门店地址:">
                <el-row>
                  <el-col :span="5">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>

                  </el-col>
                  <el-col :span="5">
                    <div class="m-store-padding">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="m-store-padding-right">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <el-input placeholder="请输入内容"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="门店电话:">
                <el-col :span="14">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="营业时间:">
                <el-col :span="14">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="是否支付:">
                <el-col :span="14">
                  <el-switch v-model="form.pay" on-text="" off-text=""></el-switch>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button>取消</el-button>

                <el-button type="primary" @click="submitFrom('formRules')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import xoNavPath from '../../NavPath.vue'
  export default {
    components: {
      xoNavPath
    },
    data() {
      return {
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeList'}, {name: "新增门店", url: ''}],
        form: {
          name: '',
          code: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
          pay:''
        },
        storeGrounpData: [{
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
        storeGroup: '',
        options: [{
          value: 'zhinan',
          label: '指南'
        }, {
          value: 'daohang',
          label: '导航'
        }, {
          value: 'zujian',
          label: '组件'
        }],
        value:''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      removeDomain(item) {
        var index = this.form.thirdPartyCoding.indexOf(item)
        if (index !== -1) {
          this.form.thirdPartyCoding.splice(index, 1)
        }
      },
      addDomain() {
        this.form.thirdPartyCoding.push({
          value: '',
          key: Date.now()
        });
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    },
    created() {
      console.log(this)
    }
  }
</script>

<style scoped lang="less">
  .m-rank {
    width: 40px;
    .m-rank-child {
      line-height: 18px;
      border-bottom: 1px solid #000;
    }
  }

  .m-storeCode {
    font-size: 30px;
  }

  .m-store-padding {
    padding: 0 5px;
  }

  .m-store-padding-right {
    padding-right: 5px;
  }
</style>
