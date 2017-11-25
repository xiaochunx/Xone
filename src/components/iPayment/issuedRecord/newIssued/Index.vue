<template>
  <div id="newIssued">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card :style="{ height: height + 'px'}" style="overflow: auto;">
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


                  <div class="flex_sc">
                    <div class="m-storeCode margin_l_10" @click="addDomain('account')">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <div v-if="(form.account.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                         @click.prevent="removeDomain(domain,'account')">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </el-col>

              </el-form-item>
            </el-col>


            <!-- 备用账户 -->
            <el-col :span="24">
              <el-form-item v-for="(domain, index) in form.reserveAcc"
                            :label="'备用账户 ' + index + ':'"
                            :key="domain.key"
                            :prop="'reserveAcc.' + index + '.value'"
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

                  <div class="flex_sc">
                    <div class="m-storeCode margin_l_10" @click="addDomain('reserveAcc')">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <div v-if="(form.reserveAcc.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                         @click.prevent="removeDomain(domain,'reserveAcc')">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </el-col>
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
  import {mapGetters, mapActions} from 'vuex'

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
          }],
        },
        height: 0
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
    computed: {
      ...mapGetters([
        'getTopHeight',
        'getLoadingStatus'
      ]),
    },
    methods: {
      removeDomain(item, status) {
        if (status == 'account') {
          var index = this.form.account.indexOf(item);
          this.form.account.splice(index, 1)
        } else {
          var index = this.form.reserveAcc.indexOf(item);
          this.form.reserveAcc.splice(index, 1)
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
            console.log('submit!!');
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
    ,
    mounted() {
      // 高度调整
      var totalH = window.innerHeight - this.getTopHeight;
      var topH = document.querySelector('.contentMsg').clientHeight;

      this.height = totalH - topH - 50;
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

  .m-storeCode {
    font-size: 30px;
  }

  .flex_sc {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>
