<template>
  <div>
    <div>查看门店</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
        <div class="m-seeAddStore">
          <div class="m-seeAddStore-basic">
            <el-row>
              <el-col :span="16">
                <el-form ref="form"  label-width="180px">
                  <el-form-item label="门店名称:">
                    <span>天河店</span>
                  </el-form-item>
                  <el-form-item label="门店编码:">
                    <span>u9r89ur89</span>
                  </el-form-item>
                  <el-form-item label="第三方编码:">
                    <span>美团  8989</span>
                  </el-form-item>
                  <el-form-item label="所属门店组:">
                    <span>山口组</span>
                  </el-form-item>
                  <el-form-item label="门店地址:">
                    <span>广东省广州市天河区天河路109号</span>
                  </el-form-item>
                  <el-form-item label="门店电话:">
                    <span>020-9849792</span>
                  </el-form-item>
                  <el-form-item label="营业时间:">
                    <span>11：00-23：00</span>
                  </el-form-item>
                  <el-form-item label="预结单提示语:">
                    <span>扫一扫快速买单哦，再扫一次还能开发票！</span>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="8">
                <div>
                  <router-link to="/storeManage/redact">
                    <el-button type="primary">编辑</el-button>
                  </router-link>
                </div>
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
                    <div class="m-seeAddStore-account-list">
                      <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                      <span>支付宝</span>
                      <span>极易付</span>
                      <span>马场路店</span>
                    </div>
                    <div class="m-seeAddStore-account-list">
                      <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                      <span>微信支付</span>
                      <span>极易付</span>
                      <span>马场路店</span>
                    </div>
                  </div>
                  <div class="m-seeAddStore-account">
                    <div class="m-seeAddStore-account-prepare">备用账户</div>
                    <div class="m-seeAddStore-account-list">
                      <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                      <span>支付宝</span>
                      <span>极易付</span>
                      <span>马场路店</span>
                    </div>
                    <div class="m-seeAddStore-account-list">
                      <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                      <span>支付宝</span>
                      <span>极易付</span>
                      <span>马场路店</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <router-link to="/storeManage/redact">
                    <el-button type="primary">编辑</el-button>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="客户端配置" name="third">
        <el-row>
          <el-col :span="16">
            <el-form ref="form" :model="clientForm" label-width="230px">
              <el-form-item label="支付开关：">
                <el-switch v-model="clientForm.pay" on-text="" off-text=""></el-switch>
              </el-form-item>
              <el-form-item label="模式：">
                <el-radio-group v-model="clientForm.type">
                  <el-radio :label="1">在线模式（POS联网时选择该模式）</el-radio>
                  <el-radio :label="2">离线模式（POS离线时选择该模式）</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="扫码开发票：">
                <el-switch v-model="clientForm.invoice" on-text="" off-text=""></el-switch>
              </el-form-item>
              <el-form-item label="发票码与支付码统一：">
                <el-switch v-model="clientForm.Unified" on-text="" off-text=""></el-switch>
              </el-form-item>
              <el-form-item label="支付成功后跳转的URL：">
                <div class="flex_r">
                  <div class="myInput">
                    <el-input v-model="clientForm.input" placeholder="请输入内容"></el-input>
                  </div>
                  <span>（为空表现不跳转）</span>
                </div>
              </el-form-item>
              <el-form-item label="URL是否带门店编码：">
                <el-radio-group v-model="clientForm.code">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="clientSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>


      </el-tab-pane>
      <el-tab-pane label="发票配置" name="fourth">
        <el-row>
          <el-col :span="14">
            <el-form ref="form" :model="invoiceForm" label-width="230px">
              <el-form-item label="授权标识(百望电子提供针对不同税号企业的授权应用标识)">
                <el-input v-model="invoiceForm.input1" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="公司名称字母缩写(如款易：KY)">
                <el-input v-model="invoiceForm.input2" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="销售方名称">
                <el-input v-model="invoiceForm.input3" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="销售方地址">
                <el-input v-model="invoiceForm.input4" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="销售方电话">
                <el-input v-model="invoiceForm.input5" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="税率（比如6%）">
                <el-input v-model="invoiceForm.input6" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="征税方式">
                <el-radio-group v-model="invoiceForm.taxation">
                  <el-radio :label="1">普通征税</el-radio>
                  <el-radio :label="2">差额征税</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="销售方纳税人识别号">
                <el-input v-model="invoiceForm.input7" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="货物或应税劳务、服务名称">
                <el-input v-model="invoiceForm.input8" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="开票人">
                <el-input v-model="invoiceForm.input9" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="复核人">
                <el-input v-model="invoiceForm.input10" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="收款人">
                <el-input v-model="invoiceForm.input11" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="销售方银行帐号">
                <el-input v-model="invoiceForm.input12" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="预结单扫码开发票（多码合一）">
                <el-switch v-model="invoiceForm.codes" on-text="" off-text=""></el-switch>
              </el-form-item>
              <el-form-item label="是否开启发票">
                <el-switch v-model="invoiceForm.isInvoice" on-text="" off-text=""></el-switch>
              </el-form-item>

              <el-form-item label="发票必填项设置">
                <el-checkbox-group v-model="invoiceForm.checkList">
                  <el-checkbox :label="1">手机号码</el-checkbox>
                  <el-checkbox :label="2">地址</el-checkbox>
                  <el-checkbox :label="3">电话</el-checkbox>
                  <el-checkbox :label="4">开户行</el-checkbox>
                  <el-checkbox :label="5">开户行账号</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="cinvoiceSubmit">保存</el-button>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="通知配置" name="five">
        <el-row>
          <el-col :span="14">
            <el-form ref="form" :model="noticeForm" label-width="230px">
              <el-form-item label="收银员：">
                  <el-checkbox v-model="noticeForm.sms">短信（每条8分钱）</el-checkbox>
              </el-form-item>
              <el-form-item >
                <el-checkbox v-model="noticeForm.weiXin">微信模板消息（收银员需关注款易服务号，并绑定自己的账号）</el-checkbox>
              </el-form-item>
              <el-form-item >
                <el-checkbox v-model="noticeForm.voice">语音播报（电脑或APP）</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="noticeSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    components: {ElFormItem},
    data() {
      return {
        activeName: 'first',
        clientForm: {
          pay: '',
          type: 1,
          invoice:'',
          Unified:'',
          input:'',
          code:1
        },
        invoiceForm:{
          input1:'',
          input2:'',
          input3:'',
          input4:'',
          input5:'',
          input6:'',
          taxation:1,
          input7:'',
          input8:'',
          input9:'',
          input10:'',
          input11:'',
          input12:'',
          codes:'',
          isInvoice:'',
          checkList:[]
        },
        noticeForm:{
          sms:'',
          weiXin:'',
          voice:''
        }


      }
    },
    methods: {
      clientSubmit() {
        console.log(this.clientForm)
      },
      cinvoiceSubmit(){
        console.log(this.invoiceForm)
      },
      noticeSubmit(){
        console.log(this.noticeForm)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scope lang="less">
  .myInput {
    width:300px;
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


</style>
