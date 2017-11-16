<template>
  <div id="newPayment">
    <div class="contentMsg">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店组</h3>
          </el-col>

          <el-col :span="24" class="cell">
            <el-form ref="formRules" :model="form" label-width="100px">

              <el-form-item label="门店组编码	:" prop="code" :rules="{required: true, message: '请输入门店编码', trigger: 'blur'}">
                <el-input v-model="form.code" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="门店组名称	:" prop="name" :rules="{required: true, message: '请输入门店名称', trigger: 'blur'}">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
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

              <el-form-item label="门店:">
                <el-button @click='openDialog()'>添加门店</el-button>
              </el-form-item>

              <el-col :span="24">
                <el-col :span="12" class="flex-jc">
                  <el-button>取消</el-button>
                </el-col>
                <el-col :span="12" class="flex-jc">
                  <el-button type="primary" @click="submitFrom('formRules')">保存</el-button>
                </el-col>
              </el-col>

            </el-form>
          </el-col>
        </el-row>

      </el-card>
    </div>

    <el-dialog title="选择门店" :visible.sync="dialogFormVisible">

      <div class="flex_a">
        <div>所在地</div>
        <div class="margin_l_10">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="margin_l_10 flex_1" >
          <el-input placeholder="门店名称/编码"></el-input>
        </div>
      </div>

      <div class="margin_t_10">
        <el-table :data="storeData" border style="width: 100%;">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="meiTuan" label="美团">
            <template scope="scope">
              <el-checkbox v-model="scope.row.meiTuan"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="ele" label="饿了么">
            <template scope="scope">
              <el-checkbox v-model="scope.row.ele"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="baiDu" label="百度">
            <template scope="scope">
              <el-checkbox v-model="scope.row.baiDu"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="margin_t_10">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>

      </div>

    </el-dialog>

  </div>
</template>
<script>
  import xoNavPath from '../../NavPath.vue'
  export default {
    data() {
      return {
        dialogFormVisible: false,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeGroup'}, {name: "门店组", url: ''}],
        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },
        value1: 1,
        option: [{value: 1, label: '饿了么门店1'}, {value: 2, label: '饿了么门店2'}],
        storeData: [{
          storeName: '炳胜（马场店）',
          meiTuan:false,
          ele:true,
          baiDu:false
        }, {
          storeName: '炳胜（马场店）',
          meiTuan:false,
          ele:true,
          baiDu:false
        }, {
          storeName: '炳胜（马场店）',
          meiTuan:false,
          ele:true,
          baiDu:false
        }, {
          storeName: '炳胜（马场店）',
          meiTuan:false,
          ele:true,
          baiDu:false

        }],
      }
    },
    components: {
      xoNavPath
    },
    methods: {
      openDialog() {
        this.dialogFormVisible = true;
      },
      removeDomain(item) {
        let index = this.form.thirdPartyCoding.indexOf(item)
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
    }
  }
</script>
<style scoped lang="less">
  .m-rank {
    width: 40px;
    .m-rank-child {
      height: 18px;
      border-bottom: 1px solid #000;
    }
  }

  .m-storeCode {
    font-size: 30px;
  }

  .contentMsg {
    padding: 0 0 25px 0;
  }

  .cell {
    margin-top: 20px;
    width: 50%;
  }
</style>
