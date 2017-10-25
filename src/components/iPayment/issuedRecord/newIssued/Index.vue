<template>
  <div id="newIssued">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店</h3>
          </el-col>
          <el-form ref="form" :model="form" label-width="120px">

            <!-- 账户 -->
            <el-col :span="24" class="cell">
              <el-form-item label="账户:"
                            v-for="(domain, index) in form.account"
                            :label="'账户 ' + index + ':'"
                            :key="domain.key"
                            :prop="'account.' + index + '.value'"
              >
                <el-col :span="24">
                  <el-col :span="6">
                    <el-select v-model="domain.value1" placeholder="请选择">
                      <el-option
                        v-for="item in domain.options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.value2" placeholder="请选择">
                      <el-option
                        v-for="item in domain.options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.value3" placeholder="请选择">
                      <el-option
                        v-for="item in domain.options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="4" :offset="1">

                    <el-button class="plusBtn" @click.prevent="removeDomain(domain,'account')" size="small"><i class="fa fa-minus-circle"></i></el-button>
                    <el-button class="minusBtn" @click="addDomain('account')" size="small"><i class="fa fa-plus-circle"></i></el-button>



                  </el-col>
                </el-col>

              </el-form-item>
            </el-col>


            <!-- 备用账户 -->
            <el-col :span="24">
              <el-form-item label="备用账户:">
                <el-form-item v-for="(domain, index) in form.reserveAcc"
                              :key="domain.key"
                              :prop="'reserveAcc.' + index + '.value'"
                >
                  <el-col :span="24" class="cell-b">
                    <el-col :span="6">
                      <el-select v-model="domain.value1" placeholder="请选择">
                        <el-option
                          v-for="item in domain.options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-select v-model="domain.value2" placeholder="请选择">
                        <el-option
                          v-for="item in domain.options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-select v-model="domain.value3" placeholder="请选择">
                        <el-option
                          v-for="item in domain.options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="4" :offset="1">

                      <el-button class="plusBtn" @click.prevent="removeDomain(domain,'reserveAcc')" size="small"><i class="fa fa-minus-circle"></i></el-button>
                      <el-button class="minusBtn" @click="addDomain('reserveAcc')" size="small"><i class="fa fa-plus-circle"></i></el-button>

                    </el-col>
                  </el-col>

                </el-form-item>
              </el-form-item>
            </el-col>

            <!-- 选择门店 -->
            <el-col :span="24">
              <el-form-item label="选择门店">
                <el-row>
                  <el-col :span="24" class="smallContentMsg">
                    <el-radio class="radio" v-model="form.shop" label="1">全部门店</el-radio>
                    <el-radio class="radio" v-model="form.shop" label="2">部分门店</el-radio>
                    <router-link to="/iPayment/issuedRecord/newIssued/newAdd">
                      <el-button size="small">新增</el-button>
                    </router-link>
                  </el-col>
                  <el-col :span="24" v-if="form.shop == 2">
                    <el-col :span="12">
                      <el-card>

                        <el-tree :data="form.store" :props="defaultProps"
                                 @node-click="handleNodeClick"
                                 :default-expanded-keys="form.data" node-key="id"></el-tree>
                      </el-card>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <!-- 下发规则 -->
            <el-col :span="24">
              <el-form-item label="下发规则:">

                <el-col :span="6">
                  <el-radio class="radio" v-model="form.rules" label="1">替换</el-radio>
                  <el-popover
                    ref="popover1"
                    placement="top-start"
                    title="标题"
                    width="200"
                    trigger="hover">
                    <p>sjdlajflk</p>
                  </el-popover>
                  <el-button v-popover:popover1 style="border: none;position: relative" size="small"><i
                    class="fa fa-question-circle-o icon-style"></i></el-button>
                </el-col>

                <el-col :span="6">
                  <el-radio class="radio" v-model="form.rules" label="2">更新</el-radio>
                  <el-popover
                    ref="popover2"
                    placement="top-start"
                    title="以支付方式为对比依据，例如："
                    width="200"
                    trigger="hover">
                    <p>1、若下发账户和原来的配置均有支付宝，则用新账户替换原有的账户；</p>
                    <p>2、若下发账户和原来的配置均有支付宝，则用新账户替换原有的账户；</p>
                    <p>3、若下发账户和原来的配置均有支付宝，则用新账户替换原有的账户；</p>
                  </el-popover>
                  <el-button v-popover:popover2 style="border: none;position: relative" size="small"><i
                    class="fa fa-question-circle-o icon-style"></i></el-button>
                </el-col>
              </el-form-item>
            </el-col>

            <!-- 执行时间 -->
            <el-col :span="24">
              <el-form-item label="执行时间">
                <el-radio class="radio" v-model="form.runTime" label="1">立即执行</el-radio>
                <el-radio class="radio" v-model="form.runTime" label="2">定时执行</el-radio>
              </el-form-item>
              <el-form-item v-if="form.runTime == '2'">
                <el-col :span="24">
                  <el-col :span="7">
                    <div class="block">
                      <el-date-picker
                        v-model="form.runTimeValue"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-col>

                  <el-col :span="10">
                    <el-card>
                      若执行失败，则在
                      <el-input v-model="form.delayTime" placeholder="请输入执行的时间"></el-input>
                      分钟后重新发起执行
                      (为空则不发起）
                    </el-card>
                  </el-col>
                </el-col>
              </el-form-item>
            </el-col>

          </el-form>
          <el-col :span="24">
            <el-col :span="12" class="flex-jc">
              <el-button>取消</el-button>
            </el-col>
            <el-col :span="12" class="flex-jc">
              <el-button type="primary" @click="submitForm('form')">确定</el-button>
            </el-col>
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
          data: ["ssss"], // 已选门店key
          data2: [
            {
              key: 10,
              label: '门店组1',
            },
            {
              key: 2,
              label: '门店组2',
            },
            {
              key: 3,
              label: '门店组3',
            }],
          options: [{
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
          value: '',
          storeInfo: '',
          shop: '1',
          rules: '1',
          runTime: '1',
          runTimeValue: '',
          delayTime: '',
          store: [
            {label: '一级 1', id: "ssss", children: [{label: '二级 2', id: 11}]},
            {label: '一级 2', id: 1},
            {label: '一级 3', id: 3},
            {label: '一级 4', id: 4},
          ],
          account: [{
            value1: '',
            value2: '',
            value3: '',
            options1: [{
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
            options2: [{
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
            options3: [{
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
            }
            ],
          }],
          reserveAcc: [{
            value1: '',
            value2: '',
            value3: '',
            options1: [{
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
            options2: [{
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
            options3: [{
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
            }
            ],
          }]
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
      removeDomain(item, status) {
        if (status == 'account') {
          if (this.form.account.length == 1) {
            this.$message('不能再删啦');
          } else {
            var index = this.form.account.indexOf(item);
            if (index !== -1) {
              this.form.account.splice(index, 1)
            }
          }
        } else {
          if (this.form.reserveAcc.length == 1) {
            this.$message('不能再删啦');
          } else {
            var index = this.form.reserveAcc.indexOf(item);
            if (index !== -1) {
              this.form.reserveAcc.splice(index, 1)
            }
          }
        }

      },
      addDomain(status) {
        if (status == 'reserveAcc') {
          this.form.reserveAcc.push({
            value1: '',
            value2: '',
            value3: '',
            options1: [{
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
            options2: [{
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
            options3: [{
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
            }
            ],
            key: Date.now()
          });
        } else {
          this.form.account.push({
            value1: '',
            value2: '',
            value3: '',
            options1: [{
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
            options2: [{
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
            options3: [{
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
            }
            ],
            key: Date.now()
          });
        }

      },
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
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }

  .selectedStore {
    padding-bottom: 10px;
    border-bottom: 1px solid gainsboro;
  }

  .cell {
    margin-top: 20px;
  }

  .cell-b {
    margin-bottom: 20px;
  }

  .icon-style {
    font-size: 22px;
    color: red;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(-70%) translateX(65%);
  }

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
