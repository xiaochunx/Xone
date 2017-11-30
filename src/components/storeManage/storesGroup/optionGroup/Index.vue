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

              <el-form-item label="标签名称	:" prop="name" :rules="{required: true, message: '请输入标签名称', trigger: 'blur'}">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>

              <div v-for="(domain, index) in form.thirdPartyCoding" class="flex_r">
                <el-form-item label="第三方编码" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.code1'"
                              :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
                  <div>
                    <el-row>
                      <el-col>
                        <div style="width:150px">
                          <el-input v-model="domain.code1"></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
                <div class="m-rank">
                  <div class="m-rank-child"></div>
                </div>
                <el-form-item label-width="0" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.code2'"
                              :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
                  <div>
                    <el-row>
                      <el-col>
                        <div style="width:150px">
                          <el-input v-model="domain.code2"></el-input>
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
                <div class="flex_a margin_b_10">
                  <el-input class="margin_r_10" v-model="searchValue" placeholder="请输入门店"></el-input>
                  <el-button @click="searchSelect()">搜索</el-button>
                </div>
              </el-form-item>

              <el-form-item label="">
                <el-table :data="searchList" border>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                                   width="100">
                    <template scope="scope">
                      <div>{{scope.$index + 1}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                                   label="门店编码">
                  </el-table-column>
                  <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                                   label="门店名称">
                  </el-table-column>
                </el-table>
              </el-form-item>


              <el-form-item label="门店:">
                <el-button @click='openDialog()'>添加门店</el-button>
              </el-form-item>

              <el-col :span="24">
                <el-col :span="12" class="flex-jc">
                  <el-button @click="$router.go(-1)">取消</el-button>
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

    <el-dialog title="选择门店" :visible.sync="dialogFormVisible" size="">

      <div class="flex_a">
        <div>所在地</div>
        <div class="margin_l_10">
          <el-select v-model="providerId" placeholder="请选择省" @change="myChange(providerId,'provider')">
            <el-option v-for="item in providerList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="cityId" placeholder="请选择市" @change="myChange(cityId,'city')">
            <el-option v-for="item in cityList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="areaId" placeholder="请选择区">
            <el-option v-for="item in areaList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="margin_l_10 flex_a">
          <el-input placeholder="门店名称/编码" v-model="inputArea" icon="search" class="margin_r_10"></el-input>
          <el-button @click="search()">搜索</el-button>
        </div>
      </div>

      <div class="margin_t_10">
        <el-table :data="storeData" border style="width: 100%;">
          <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                           width="100">
            <template scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="门店">

          </el-table-column>
        </el-table>
      </div>
      <div class="margin_t_10">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd()">确认</el-button>

      </div>

    </el-dialog>

  </div>
</template>
<script>
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import getApi from './optionGroup.service';
  import {getLeft,getArea} from '../../../utility/communApi'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        navList: [{name: "门店管理", url: ''}, {name: "门店标签列表", url: '/storeManage/storeGroup'}, {name: "门店标签", url: ''}],
        searchValue: '',
        form: {
          name: '',
          thirdPartyCoding: [
            {code1: '', code2: ''}
          ],
        },
        searchList: [],
        searchListTemp:[],
        storeData: [],
        providerId: '',
        providerList: [],
        cityId: '',
        cityList: [],
        areaId: '',
        areaList: [],
        inputArea: ''
      }
    },
    components: {
      ElButton

    },
    methods: {
      searchSelect() {
        let list = [];

        list = this.searchListTemp.filter((item) => {
          return item.name.includes(this.searchValue)
        })

        this.searchList = list

        console.log(list)
       // console.log(this.searchList)
      },
      submitAdd() {
        let list = [];
        list = this.storeData.filter((item) => {
          return item.select === true
        });

        if (list.length === 0) {
          this.$message({
            message: '请选择门店',
            type: 'warning'
          });
        } else {
          this.searchList = list
          this.searchListTemp = list
          this.dialogFormVisible = false
        }


      },
      myChange(id, name) {
        if (name === "provider") {
          this.cityId = "";
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.cityList = res.data.data
          })
        }
        if (name === "city" && this.cityId !== "") {
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.areaList = res.data.data
          })
        }
      },

      search() {
        getApi.searchStore(this.areaId, this.inputArea).then((res) => {
          res.data.data.forEach((map) => {
            this.$set(map, 'select', false)
          });
          this.storeData = res.data.data
        })

      },
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
        let count = 0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.storeData.length) {
          this.selectedAll = true;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        } else {
          this.selectedAll = false;
          this.$nextTick(() => {
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
                'class': {},
                on: {
                  change: this.handleCheckAll,
                  input: (event) => {
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
        this.form.thirdPartyCoding.push({code1: '', code2: ''});
      },
      submitFrom(formRules) {

        this.$refs[formRules].validate((valid) => {
          if (valid) {
            let list = [];
            this.searchList.forEach((map) => {
              list.push(map.id)
            });
            let storeIds = list.join(",");

            getApi.addOne(this.form, storeIds).then((res) => {
              if (res.data.errcode === 0) {
                this.$alert('添加成功', '', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.go(-1)
                  }
                })
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {

      getArea('').then((res) => {
        if (res.data.errcode === 0) {
          this.providerList = res.data.data
        } else {
          this.$alert('请重新登录', '超时', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/login')
            }
          })
        }
      })
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
