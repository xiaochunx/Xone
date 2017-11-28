<template>
  <div>
    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
        <div class="m-seeAddStore">
          <div class="m-seeAddStore-basic">
            <el-row>
              <el-col :span="16">
                <el-form ref="form" :data="storeData" label-width="180px" class="myForm">
                  <el-form-item label="门店名称:">
                    <span>{{storeData.name}}</span>
                  </el-form-item>
                  <el-form-item label="门店编码:">
                    <span>{{storeData.code}}</span>
                  </el-form-item>
                  <el-form-item label="第三方编码:">
                    <div v-for="(item,index) in storeData.storeCode">
                      <span>{{item.code1}} -- {{item.code2}}</span>
                    </div>

                  </el-form-item>
                  <el-form-item label="">
                    <div v-for="(item,index) in storeData.thirdCode">
                      <span>{{item.code1}} -- {{item.code2}}</span>
                    </div>

                  </el-form-item>
                  <el-form-item label="所属门店组:">
                    <span>{{storeData.storeLabel}}</span>
                  </el-form-item>
                  <el-form-item label="公众号:">
                    <span>{{storeData.wx_id}}</span>
                  </el-form-item>
                  <el-form-item label="门店地址:">
                    <span>{{storeData.address}}</span>
                  </el-form-item>
                  <el-form-item label="门店电话:">
                    <span>{{storeData.tel}}</span>
                  </el-form-item>
                  <el-form-item label="营业时间:">
                    <span>{{storeData.openTimeStart}} -- {{storeData.openTimeEnd}}</span>
                  </el-form-item>
                  <el-form-item label="预结单提示语:">
                    <span>{{storeData.orderPrompting}}</span>
                  </el-form-item>
                  <el-form-item label="支付成功后跳转的URL:">
                    <el-input v-model="storeData.payJumpUrl" :disabled="true"></el-input>
                    <span>（为空表现不跳转）</span>
                  </el-form-item>
                  <el-form-item label="URL是否带门店编码:">
                    <el-radio-group v-model="storeData.urlCode">
                      <el-radio disabled :label="1">是</el-radio>
                      <el-radio disabled :label="0">否</el-radio>

                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收款账户" name="second">
        <div class="m-seeAddStore">
          <div class="m-seeAddStore-basic">
            <el-row>
              <el-col :span="16">
                <div>
                  <div class="m-seeAddStore-account">
                    <div class="m-seeAddStore-account-now">正在使用中的账户</div>

                    <div v-for="(item,index) in storeAccount.account" class="padding_l_10">
                      <!--<div class=""><img src="" alt=""></div>-->
                      <span>{{item.accountName}}</span>
                      <span>{{item.paymentName}}</span>
                      <span>{{item.paymentChannel}}</span>
                    </div>
                  </div>
                  <div class="m-seeAddStore-account margin_t_10">
                    <div class="m-seeAddStore-account-prepare">备用账户</div>

                    <div v-for="(item,index) in storeAccount.reserveAcc" class="padding_l_10">
                      <!--<div class=""><img src="" alt=""></div>-->
                      <span>{{item.accountName}}</span>
                      <span>{{item.paymentName}}</span>
                      <span>{{item.paymentChannel}}</span>
                    </div>

                  </div>
                </div>
              </el-col>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="发配配置" name="third">-->
      <!--<el-row>-->
      <!--<el-col :span="16">-->
      <!--<div class="margin_b_10">-->
      <!--<span class="margin_r_10 cell_title">查看发票信息</span>-->
      <!--<span style="color: red">此页仅显示电子发票的编辑成果，纸质发票略过（电子发票与纸质发票在单个门店时二选一）</span>-->
      <!--</div>-->
      <!--<el-form ref="form" :model="clientForm" label-width="180px" class="myForm">-->
      <!--<el-form-item label="商家编码:">-->
      <!--<span>234782378947</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="商家名称:">-->
      <!--<span>广州云藏信息技术有限公司</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="第三方编码:">-->
      <!--<span>abc名称</span>-->
      <!--</el-form-item>-->
      <!--<div class="partLine"></div>-->
      <!--<el-form-item label="发票类别:">-->
      <!--<span>电子发票</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="服务商:">-->
      <!--<span>百望</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="授权标识(百望电子提供针对不同税号企业的授权应用标识):">-->
      <!--<span>2983091723974907037482739879827xg</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="开票类型:">-->
      <!--<span>红字发票</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="征税方式:">-->
      <!--<span>普通征税</span>-->
      <!--</el-form-item>-->
      <!--<div class="partLine"></div>-->
      <!--<div class="cell_title">销售方信息</div>-->
      <!--<el-form-item label="销售方纳税人识别号:">-->
      <!--<span>123243434134314311324546456</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方名称:">-->
      <!--<span>广州云藏信息科技有限公司</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方地址:">-->
      <!--<span>广州市体育中心南方证券大厦</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方电话:">-->
      <!--<span>13837490281</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方银行账号:">-->
      <!--<span>1972289333002810</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="复核人:">-->
      <!--<span>江小鱼</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="税率(比如6%：0.06):">-->
      <!--<span>0.06</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="货物或应税劳务、服务名称:">-->
      <!--<span>餐饮服务</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="开票人:">-->
      <!--<span>江小鱼</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="收款人:">-->
      <!--<span>江小鱼</span>-->
      <!--</el-form-item>-->
      <!--<div class="partLine"></div>-->

      <!--&lt;!&ndash;纸质发票&ndash;&gt;-->
      <!--<el-form-item label="自动记录开票方信息，再次开票免输入:">-->
      <!--<el-card class="box-card">-->
      <!--<div>-->
      <!--备注：客人开过一次发票后，系统将自动记录该开票信息，客人再次开票时，可免输入开票信息-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="允许自动读取客人微信的“我的发票抬头”:">-->
      <!--<el-card class="box-card">-->
      <!--<div>-->
      <!--备注：如客人有设置“我的发票抬头”，则款易能在客人授权的情况下自动读取该信息，免输入-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="电子发票二维码打印在结账单小票:">-->
      <!--<el-card class="box-card">-->
      <!--<div>-->
      <!--备注：客人完成支付后，向服务员索取发票，服务员打印结账单及电子发票二维码并拿给客人，客人扫码进入自助开电子发票页面-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-form-item>-->

      <!--<div class="partLine"></div>-->
      <!--<div class="cell_title margin_b_10">购买方信息</div>-->
      <!--<div class="margin_b_10">-->
      <!--<el-button>纳税人识别号</el-button>-->
      <!--<el-button>名称</el-button>-->
      <!--<el-button>手机号</el-button>-->
      <!--<el-button>邮箱</el-button>-->
      <!--<el-button>地址</el-button>-->
      <!--<el-button>电话</el-button>-->
      <!--<el-button>银行账号</el-button>-->
      <!--</div>-->

      <!--<div class="flex margin_t_10">-->
      <!--<el-button type="primary">关闭</el-button>-->
      <!--</div>-->

      <!--</el-form>-->
      <!--</el-col>-->
      <!--</el-row>-->


      <!--</el-tab-pane>-->

      <!--<el-tab-pane label="通知配置" name="five">-->
      <!--<el-row>-->
      <!--<el-col :span="14">-->
      <!--<el-form ref="form" :model="noticeForm" label-width="230px" class="myForm">-->
      <!--<el-form-item label="顾客：">-->
      <!--<el-checkbox v-model="noticeForm.clientSms" disabled>微信模板消息（顾客如关注餐厅服务号，则餐厅服务号推送；如未关注餐厅服务号，则“服务通知”推送）-->
      <!--</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-checkbox v-model="noticeForm.clientPay" disabled>支付成功通知</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-checkbox v-model="noticeForm.clientRefund" disabled>退款成功通知</el-checkbox>-->
      <!--</el-form-item>-->


      <!--<el-form-item label="收银员：">-->
      <!--<el-checkbox v-model="noticeForm.sms" disabled>语音播报</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-checkbox v-model="noticeForm.weiXin" disabled>电脑客户端</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-checkbox v-model="noticeForm.voice" disabled>款易App</el-checkbox>-->
      <!--</el-form-item>-->

      <!--</el-form>-->
      <!--</el-col>-->
      <!--</el-row>-->

      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input.vue";
  import getApi from './seeTheStore.service';

  export default {
    components: {
      ElInput

    },
    data() {
      return {
        form: {
          radio: 0,
          input: ''
        },
        storeData: {},
        storeAccount:{},
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeList'}, {name: "查看门店", url: ''}],
        activeName: 'first',
        clientForm: {
          pay: '',
          type: 1,
          invoice: '',
          Unified: '',
          input: '',
          code: 1
        },
        invoiceForm: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
          input6: '',
          taxation: 1,
          input7: '',
          input8: '',
          input9: '',
          input10: '',
          input11: '',
          input12: '',
          codes: '',
          isInvoice: '',
          checkList: []
        },
        noticeForm: {
          clientSms: true,
          clientPay: '',
          clientRefund: '',
          sms: '',
          weiXin: '',
          voice: ''
        }


      }
    },
    methods: {
      editStoreBase() {
        this.$router.push('/storeManage/storeList/seeTheStore/editStoreBase')
      },
      editStoreAccount() {
        this.$router.push('/storeManage/storeList/seeTheStore/editStoreAccount')
      },
      clientSubmit() {
        console.log(this.clientForm)
      },
      cinvoiceSubmit() {
        console.log(this.invoiceForm)
      },
      noticeSubmit() {
        console.log(this.noticeForm)
      },
      handleClick(tab, event) {
        console.log(tab.name);
        if (tab.name === "first") {
          this.getFirst()
        }
        if (tab.name === "second") {
          this.getSecond()
        }
      },
      getSecond() {
        getApi.getSecond(this.token, this.$route.params.id).then((res) => {
          if (res.data.errcode === 0) {

            this.storeAccount = res.data.data
            console.log(this.storeAccount)
          } else {
            this.$alert('请重新登录', '超时', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
          }

        })
      },
      getFirst() {
        getApi.getFirst(this.token, this.$route.params.id).then((res) => {
          if (res.data.errcode === 0) {
            res.data.data.urlCode = res.data.data.urlWithCode * 1;
            this.storeData = res.data.data;
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
    },
    created() {
      this.token = this.$localStorage.get('token');

      this.getFirst()

    }
  }
</script>

<style scope lang="less">
  .myInput {
    width: 300px;
  }

  .m-tr {
    text-align: right;
  }

  .m-tl {
    text-align: left;
  }

  .m-padding-left {
    padding-left: 20px;
  }

  .m-seeAddStore-account {
    .m-seeAddStore-account-now {
      padding: 10px 0px;
      list-style-type: disc;
      font-weight: bold;
      box-sizing: border-box;
    }
    .m-seeAddStore-account-list {
      padding: 10px 0;
      padding-left: 70px;
      height: 50px;
      line-height: 30px;
      box-sizing: border-box;
      position: relative;
      .m-seeAddStore-account-list-img {
        position: absolute;
        left: 10px;
        top: 5px;
        width: 40px;
        height: 40px;
        background: #000;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .m-seeAddStore-account-prepare {
      list-style-type: disc;
      font-weight: bold;
    }
  }

  .partLine {
    border-bottom: 1px solid #787978
  }

  .cell_title {
    font-size: 18px;
  }

  .box-card {
    margin: 10px;
    width: 400px;
  }

</style>
