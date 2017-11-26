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
            <el-col :span="24">
              <el-form-item v-for="(domain, index) in form.account"
                            :label="'账户 ' + index + ':'"
                            :key="domain.key"
                            class="cell"
                            :prop="'account.' + index + '.value'"
              >
                <el-col :span="24">
                  <el-col :span="6">
                    <el-select v-model="domain.paymentMethod" placeholder="支付方式" @change="getStore(index,0)">
                      <el-option
                        v-for="item in domain.options1"
                        :key="item.id"
                        :label="item.memo"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.paymentChannel" placeholder="支付通道" @change="getStore(index,0)">
                      <el-option
                        v-for="item in domain.options2"
                        :key="item.id"
                        :label="item.memo"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.accountId" placeholder="账户名">
                      <el-option
                        v-for="item in domain.options3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
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
                    <el-select v-model="domain.paymentMethod" placeholder="支付方式" @change="getStore(index,1)">
                      <el-option
                        v-for="item in domain.options1"
                        :key="item.id"
                        :label="item.memo"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.paymentChannel" placeholder="支付通道" @change="getStore(index,1)">
                      <el-option
                        v-for="item in domain.options2"
                        :key="item.id"
                        :label="item.memo"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="6">
                    <el-select v-model="domain.accountId" placeholder="账户名">
                      <el-option
                        v-for="item in domain.options3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
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
                    <!--<router-link to="/iPayment/issuedRecord/newIssued/newAdd">
                      <el-button size="small">新增</el-button>
                    </router-link>-->
                  </el-col>

                  <el-col :span="24" v-if="form.shop == 2">
                    <el-col :span="10">
                      <el-transfer v-model="selectStore" :data="allStore"
                                   :props="{
                                      key: 'id',
                                      label: 'name'
                                    }"
                                   :titles="['全部门店', '已选门店']"
                      ></el-transfer>
                    </el-col>
                    <el-col :span="12">
                      <el-col :span="24">
                        <el-select v-model="province" placeholder="请选择省" clearable @change="changeProvince" style="width: 120px;">
                          <el-option
                            v-for="item in provinceOptions"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>

                        <el-select v-model="city" placeholder="请选择市" clearable @change="changeCity" style="width: 120px;">
                          <el-option
                            v-for="item in cityOptions"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id">
                          </el-option>
                        </el-select>

                        <el-select v-model="area" placeholder="请选择区" clearable style="width: 120px;">
                          <el-option
                            v-for="item in areaOptions"
                            :key="item.id"
                            :label="item.address"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="24">&nbsp;</el-col>
                      <el-col :span="24">
                        <el-col :span="6">
                          <el-input v-model="storeName" placeholder="门店名称"></el-input>
                        </el-col>
                        <el-col :span="17" :offset="1">
                          <el-select v-model="tag" placeholder="请选择标签" clearable style="width: 120px;">
                            <el-option
                              v-for="item in tagOptions"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                          &nbsp;
                          <el-button type="primary" @click="search">搜索</el-button>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <!-- 下发规则 -->
            <!--<el-col :span="24">
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

            &lt;!&ndash; 执行时间 &ndash;&gt;
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
            </el-col>-->

          </el-form>
          <el-col :span="24">
            <el-col :span="12" class="flex-jc">
              <router-link to="/iPayment/issuedRecord">
                <el-button>取消</el-button>
              </router-link>
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
  import {oneTwoApi, payMethods, payMent, accessRegion} from '@/api/api.js'

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
            paymentMethod: '',
            paymentChannel: '',
            accountId: '',
            options1: [],
            options2: [],
            options3: [],
          }],
          reserveAcc: [{
            paymentMethod: '',
            paymentChannel: '',
            accountId: '',
            options1: [],
            options2: [],
            options3: [],
          }],
        },
        height: 0,
        payOptions: [],       // 支付方式选项
        paymentOptions: [],   // 支付通道选项
        allStore: [],
        selectStore: [],
        provinceOptions: [],
        cityOptions: [],
        areaOptions: [],
        tagOptions: [],
        area: '',
        city: '',
        province: '',
        storeName: '',
        tag: '',
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
            options1: this.payOptions,
            options2: this.paymentOptions,
            options3: [],
            key: Date.now()
          });
        } else {
          this.form.account.push({
            value1: '',
            value2: '',
            value3: '',
            options1: this.payOptions,
            options2: this.paymentOptions,
            options3: [],
            key: Date.now()
          });
        }

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitSave();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleNodeClick(data) {
        console.log(data);
      },
      getStore(index, type) {

        var params = {};

        if (type == 0) {
          params = {
            redirect: 'x1.accountmanage.getCanUseAccountList',
            paymentMethod: this.form.account[index].paymentMethod,
            paymentChannel: this.form.account[index].paymentChannel
          };

          if (this.form.account[index].paymentMethod && this.form.account[index].paymentChannel) {
            // 获取可用的门店
            oneTwoApi(params).then((res) => {
              console.log(res);
              if (res.errcode == 0) {
                // type 0 -> 账户 1 -> 备用账户
                if (type == 0) {
                  this.form.account[index].options3 = res.data;
                } else {
                  this.form.reserveAcc[index].options3 = res.data;
                }
              }
            }).catch((err) => {

            });
          }

        } else {
          params = {
            redirect: 'x1.accountmanage.getCanUseAccountList',
            paymentMethod: this.form.reserveAcc[index].paymentMethod,
            paymentChannel: this.form.reserveAcc[index].paymentChannel
          };


          if (this.form.reserveAcc[index].paymentMethod && this.form.reserveAcc[index].paymentChannel) {
            // 获取可用的门店
            oneTwoApi(params).then((res) => {
              console.log(res);
              if (res.errcode == 0) {
                // type 0 -> 账户 1 -> 备用账户
                if (type == 0) {
                  this.form.account[index].options3 = res.data;
                } else {
                  this.form.reserveAcc[index].options3 = res.data;
                }
              }
            }).catch((err) => {

            });
          }
        }
      },
      changeProvince(value) {
        var params = {
          pid: value
        };

        console.log(params);

        // 初始化地区
        accessRegion(params).then((res) => {
          console.log(res);
          if (res.errcode == 0) {
            this.cityOptions = res.data;
          }
        }).catch((err) => {
        })
      },
      changeCity(value) {
        var params = {
          pid: value
        };

        console.log(value);
        // 初始化地区
        accessRegion(params).then((res) => {
          if (res.errcode == 0) {
            this.areaOptions = res.data;
          }
        }).catch((err) => {
        })
      },
      regionApi(value) {
        var params = {
          pid: value
        };

        // 初始化地区
        accessRegion(params).then((res) => {
          console.log(res);
          if (res.errcode == 0) {
            this.provinceOptions = res.data;
          }
        }).catch((err) => {
        })
      },
      search() {
        var params = {
          redirect: 'x1.store.searchStore',
          areaId: this.area,
          storeName: this.storeName,
          labelId: this.tag,
        };

        oneTwoApi(params).then((res) => {
          console.log(res);
          if (res.errcode == 0) {
            this.allStore = res.data;
          }
        }).catch((err) => {})
      },
      submitSave(){

        // 选中门店id
        var selectStore = "";
        for (var value in this.selectStore) {
          selectStore += this.selectStore[value] + ',';
        }
        selectStore = selectStore.substring(0,selectStore.length - 1);


        var account = [];
        for (var value in this.form.account) {
          console.log(value);
          var obj = {};
          obj.accountId = this.form.account[value].accountId;
          obj.paymentMethod = this.form.account[value].paymentMethod;
          obj.paymentChannel = this.form.account[value].paymentChannel;

          account.push(obj)
        }

        var reserveAcc = '';

        if (this.form.reserveAcc[value].accountId){
          reserveAcc = [];
          for (var value in this.form.reserveAcc) {
            console.log(value);
            var obj = {};
            obj.accountId = this.form.reserveAcc[value].accountId;
            obj.paymentMethod = this.form.reserveAcc[value].paymentMethod;
            obj.paymentChannel = this.form.reserveAcc[value].paymentChannel;

            reserveAcc.push(obj)
          }
        }

        var params = {
          redirect: 'x1.accountmanage.saveAccountUse',
          account: account,
          reserveAcc: reserveAcc,
          shop: this.form.shop,                  // 下发门店
          selectStore: selectStore,              // 选中门店id
          rules: 2,
          runTime: 1,
          runTimeValue: '',
          delayTime: '',
        };

        console.log(params);

        oneTwoApi(params).then((res) => {
          console.log(res);
          if (res.errcode == 0){
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success",
            });

            var _this = this;
            setTimeout(function () {
              _this.$router.push('/iPayment/issuedRecord');
            },400);
          }
        }).catch((error) => {})
      }
    },
    mounted() {
      // 高度调整
      var totalH = window.innerHeight - this.getTopHeight;
      var topH = document.querySelector('.contentMsg').clientHeight;
      this.height = totalH - topH - 50;

      var params = {};

      // 支付方式初始化
      payMethods(params).then((res) => {
        if (res.errcode == 0) {
          console.log(res.data);
          this.payOptions = res.data;
          this.form.account[0].options1 = res.data;
          this.form.reserveAcc[0].options1 = res.data;
        } else {
          this.$confirm(res.errormsg, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err);
      });

      // 支付通道初始化
      payMent(params).then((res) => {
        if (res.errcode == 0) {
          this.paymentOptions = res.data;
          this.form.account[0].options2 = res.data;
          this.form.reserveAcc[0].options2 = res.data;
        } else {
          this.$confirm(res.errormsg, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err);
      });


      var param = {
        redirect: 'x1.store.storeLabelList',
      };

      // 获取门店标签列表
      oneTwoApi(param).then((res) => {
        if (res.errcode == 0) {
          console.log(res);
          this.tagOptions = res.data.list;
        }
      }).catch((err) => {

      });

      // 初始化地理位置
      this.regionApi();
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

  .el-transfer-panel__body {
    box-sizing: content-box;
  }
</style>
