<template>
  <div id="newPayment">
    <div class="contentMsg">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店标签</h3>
          </el-col>

          <el-col :span="24" class="cell">
            <el-form ref="formRules" :model="form" label-width="100px">

              <el-form-item label="标签名称	:" prop="code" :rules="{required: true, message: '请输入标签名称', trigger: 'blur'}">
                <el-input v-model="form.code" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="标签编码	:" prop="name" :rules="{required: true, message: '请输入标签编码', trigger: 'blur'}">
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


              <el-form-item label="门店:" prop="name" :rules="{required: true, message: '请输入门店名称', trigger: 'blur'}">
                <div class="flex_a margin_b_10">
                  <el-input class="margin_r_10" v-model="form.name" placeholder="请输入内容"></el-input>
                  <el-button>搜索</el-button>
                </div>



              </el-form-item>


              <el-form-item label="" >
                <el-table :data="searchList" border>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号" width="100">
                    <template scope="scope">
                      <div>{{scope.$index + 1}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode" label="门店编码">
                  </el-table-column>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店名称">
                  </el-table-column>
                </el-table>
              </el-form-item>



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

    <el-dialog title="选择门店" :visible.sync="dialogFormVisible" size="small">

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
          <el-input placeholder="门店名称/编码" icon="search"></el-input>
        </div>
      </div>

      <div class="margin_t_10">
        <el-table :data="storeData" border style="width: 100%;">
          <el-table-column :render-header="selectAll"  label-class-name="table_head" header-align="center" align="center" width="100">
            <template scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店">

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
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    data() {
      return {
        dialogFormVisible: false,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeGroup'}, {name: "门店标签", url: ''}],
        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },
        value1: 1,
        option: [{value: 1, label: '饿了么门店1'}, {value: 2, label: '饿了么门店2'}],
        searchList:[{
          storeCode:"123",
          storeName:"aaa"
        }],
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
      ElButton

    },
    methods: {
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.storeData.forEach((data) => {
            data.select = true
          })
        } else {
          this.storeData.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count =0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select*1
          }
        });

        if(count === this.storeData.length){
          this.selectedAll = true;
          this.$nextTick(()=>{
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        }else {
          this.selectedAll = false;
          this.$nextTick(()=>{
            let all = document.querySelector('#all span');
            all.classList.remove('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = false
          })
        }

      },
      selectAll(h) {
        return h(
          'div',
          {},
          [
            h('el-checkbox', {
                attrs: {id: "all"},
                'class': {
                },
                on: {
                  change: this.handleCheckAll,
                  input: (event)=> {
                  }
                }
              }, ['序号']
            )
          ]
        );

      },
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
