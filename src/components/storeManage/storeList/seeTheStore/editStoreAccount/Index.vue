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
                <el-form ref="form" :data="storeData" label-width="180px">
                  <el-form-item label="门店名称:">
                    <span>{{storeData.name}}</span>
                  </el-form-item>
                  <el-form-item label="门店编码:">
                    <span>{{storeData.code}}</span>
                  </el-form-item>
                  <el-form-item label="门店地址:">
                    <span>{{storeData.address}}</span>
                  </el-form-item>
                  <el-form-item label="门店电话:">
                    <span>{{storeData.tel}}</span>
                  </el-form-item>
                  <el-form-item label="第三方编码:">
                    <div v-for="(item,index) in storeData.thirdCode">
                      <span>{{item.code1}} -- {{item.code2}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="所属门店组:">
                    <el-select v-model="storeData.storeLabelId" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in storeGroup"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--<el-form-item label="公众号:">-->
                    <!--<el-select v-model="storeData.wx_id" placeholder="请选择">-->
                      <!--<el-option-->
                        <!--v-for="item in form.options"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                  <el-form-item label="营业时间:">
                    <el-time-select
                      v-model="storeData.openTimeStart"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30'
                      }"
                      placeholder="选择时间">
                    </el-time-select>
                    --
                    <el-time-select
                      v-model="storeData.openTimeEnd"
                      :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30'
                      }"
                      placeholder="选择时间">
                    </el-time-select>

                  </el-form-item>
                  <el-form-item label="预结单提示语:">
                    <el-input v-model="storeData.orderPrompting"></el-input>
                  </el-form-item>
                  <el-form-item label="支付成功后跳转的URL:">
                    <el-input v-model="storeData.payJumpUrl"></el-input>
                    <span>（为空表现不跳转）</span>
                  </el-form-item>
                  <el-form-item label="URL是否带门店编码:">
                    <el-radio-group v-model="storeData.urlCode">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>

                    </el-radio-group>
                  </el-form-item>
                </el-form>

                <div class="flex">
                  <el-button type="primary" @click="editStoreBase()">保存</el-button>
                  <el-button @click="editStoreBase()">取消</el-button>

                </div>
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
                <div class="cell_title margin_b_10">
                  正在使用中的账户
                </div>
                <div class="flex_r margin_b_10" v-for="(item,index) in list" :key="item.id">
                  <div class="margin_r_10 ">
                    <el-select v-model="item.payValue" placeholder="请选择">
                      <el-option
                        v-for="item in payOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>

                  <div class="margin_r_10 ">
                    <el-select v-model="item.payTypeValue" placeholder="请选择">
                      <el-option
                        v-for="item in payType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>

                  <div class="margin_r_10 ">
                    <el-select v-model="item.addressValue" placeholder="请选择">
                      <el-option
                        v-for="item in addressList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="flex">
                    <div class="m-storeCode flex pointer" @click="addDomain()">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <div class="m-storeCode flex margin_l_10 pointer" @click="removeDomain(index)">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <div class="cell_title margin_b_10">
                  备用账户
                </div>
                <div class="flex_r margin_b_10" v-for="(item,index) in subList" :key="item.id">
                  <div class="margin_r_10 ">
                    <el-select v-model="item.payValue" placeholder="请选择">
                      <el-option
                        v-for="item in payOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>

                  <div class="margin_r_10 ">
                    <el-select v-model="item.payTypeValue" placeholder="请选择">
                      <el-option
                        v-for="item in payType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>

                  <div class="margin_r_10 ">
                    <el-select v-model="item.addressValue" placeholder="请选择">
                      <el-option
                        v-for="item in addressList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="flex">
                    <div class="m-storeCode flex pointer" @click="subAddDomain()">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                    <div class="m-storeCode flex margin_l_10 pointer" @click="subRemoveDomain(index)">
                      <i class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <div class="flex">
                  <el-button type="primary" @click="editStoreBase()">保存</el-button>
                  <el-button @click="editStoreBase()">取消</el-button>

                </div>
              </el-col>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="发配配置" name="third">-->


      <!--<el-row v-if="!showConfig">-->
      <!--<el-col :span="16">-->

      <!--<el-form ref="clientForm" :model="clientForm" label-width="180px" >-->
      <!--<el-form-item label="方案编码:">-->
      <!--<span>234782378947</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="方案名称:" prop="caseName" :rules="{required: true, message: '请输入标签名称', trigger: 'blur'}">-->
      <!--<el-input v-model="clientForm.caseName" style="width: 200px;"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="第三方编码:">-->
      <!--<div class="flex_r margin_b_10" v-for="(item,index) in clientForm.list" :key="item.id">-->
      <!--<div class="margin_r_10 ">-->
      <!--<el-select v-model="item.payValue" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in payOptions"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->

      <!--<div class="margin_r_10 ">-->
      <!--<el-select v-model="item.payTypeValue" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in payType"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->

      <!--<div class="margin_r_10 ">-->
      <!--<el-select v-model="item.addressValue" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="item in addressList"-->
      <!--:key="item.value"-->
      <!--:label="item.label"-->
      <!--:value="item.value">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</div>-->
      <!--<div class="flex">-->
      <!--<div class="m-storeCode flex pointer" @click="addDomainClient()">-->
      <!--<i class="fa fa-plus-circle" aria-hidden="true"></i>-->
      <!--</div>-->
      <!--<div class="m-storeCode flex margin_l_10 pointer" @click="removeDomainClient(index)">-->
      <!--<i class="fa fa-minus-circle" aria-hidden="true"></i>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div>*请选择发票类别</div>-->
      <!--<el-tabs v-model="activeName2" type="border-card">-->
      <!--<el-tab-pane label="电子发票" name="electronicInvoice">-->
      <!--<el-form ref="clientForm1" :model="clientForm1">-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<el-switch-->
      <!--v-model="clientForm1.value2"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="170px" label="请选择发票服务商">-->
      <!--<el-radio-group v-model="clientForm1.radio2">-->
      <!--<el-radio :label="3">百望</el-radio>-->
      <!--<el-radio :label="6">航天</el-radio>-->
      <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<div>授权标识(百望电子提供针对不同税号企业的授权应用标识)</div>-->
      <!--<el-input style="width: 200px"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="170px" label="请选择开票类型" prop="radio3" :rules="[{type:'number',required: true, message: '请选择一个', trigger: 'change'}]">-->
      <!--<el-radio-group v-model="clientForm1.radio3">-->
      <!--<el-radio :label="3">蓝字发票</el-radio>-->
      <!--<el-radio :label="6">红字发票</el-radio>-->
      <!--</el-radio-group>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="170px" label="请选择征税方式">-->
      <!--<el-radio-group v-model="clientForm1.radio4">-->
      <!--<el-radio :label="1">普通征税</el-radio>-->
      <!--<el-radio :label="2">减按计征</el-radio>-->
      <!--<el-radio :label="3">差额征税</el-radio>-->

      <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<div class="flex">-->

      <!--<el-button type="danger" @click="config2('clientForm','clientForm1')">下一步</el-button>-->
      <!--</div>-->

      <!--</el-form>-->

      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="纸质发票" name="paperInvoice">-->
      <!--<el-form ref="clientForm2" :model="clientForm2">-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value3"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<span>开启</span>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->

      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value4"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->

      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--自动记录开票方信息，再次开票免输入:-->
      <!--</div>-->
      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人开过一次发票后，系统将自动记录该开票信息，客人再次开票时，可免输入开票信息-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->

      <!--</el-form-item>-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value5"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->

      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许自动读取客人微信的“我的发票抬头”-->
      <!--</div>-->
      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：如客人有设置“我的发票抬头”，则款易能在客人授权的情况下自动读取该信息，免输入-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->

      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value6"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--电子发票二维码打印在结账单小票-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人完成支付后，向服务员索取发票，服务员打印结账单及电子发票二维码并拿给客人，客人扫码进入自助开电子发票页面-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
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
      <!--</el-form-item>-->
      <!--<div class="flex">-->
      <!--<el-button type="primary" @click="config3('clientForm')">保存</el-button>-->
      <!--</div>-->
      <!--</el-form>-->
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->

      <!--</el-col>-->
      <!--</el-row>-->

      <!--<el-row v-if="showConfig">-->
      <!--<el-col :span="16">-->
      <!--<div class="margin_b_10 cell_title">请填写发票信息</div>-->
      <!--<div class="partLine"></div>-->
      <!--<el-form ref="clientForm" :model="invoiceForm" label-width="180px" >-->

      <!--<div class="margin_b_10 cell_title">销售方信息</div>-->
      <!--<el-form-item label="销售方纳税人识别号">-->
      <!--<el-input v-model="invoiceForm.input1" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方名称">-->
      <!--<el-input v-model="invoiceForm.input2" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方地址">-->
      <!--<el-input v-model="invoiceForm.input3" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方电话">-->
      <!--<el-input v-model="invoiceForm.input4" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="销售方银行账号">-->
      <!--<el-input v-model="invoiceForm.input5" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="开票人">-->
      <!--<el-input v-model="invoiceForm.input6" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="开票人">-->
      <!--<el-input v-model="invoiceForm.input7" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="税率(比如6%：0.06)">-->
      <!--<el-input v-model="invoiceForm.input8" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="货物或应税劳务、服务名称">-->
      <!--<el-input v-model="invoiceForm.input9" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->


      <!--<el-form-item label="收款人">-->
      <!--<el-input v-model="invoiceForm.input9" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="复核人">-->
      <!--<el-input v-model="invoiceForm.input9" placeholder="请输入内容"></el-input>-->
      <!--</el-form-item>-->

      <!--<div class="flex_sb margin_b_10">-->
      <!--<span>选填项</span>-->
      <!--<span>展开</span>-->
      <!--</div>-->
      <!--<div class="partLine"></div>-->

      <!--<div class=" margin_b_10">-->
      <!--<span class="cell_title">购买方信息</span>-->
      <!--<span>（红色按钮为必填项，灰色按钮选填、可自行决定）</span>-->
      <!--</div>-->
      <!--<div class="margin_b_10">-->
      <!--<el-button type="danger">纳税人识别号</el-button>-->
      <!--<el-button type="danger">名称</el-button>-->
      <!--<el-button type="danger">手机号</el-button>-->
      <!--<el-button type="danger">邮箱</el-button>-->
      <!--<el-button>地址</el-button>-->
      <!--<el-button>电话</el-button>-->
      <!--<el-button>银行账号</el-button>-->
      <!--</div>-->
      <!--<div class="partLine margin_b_10"></div>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value4"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--自动记录开票方信息，再次开票免输入:-->
      <!--</div>-->
      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人开过一次发票后，系统将自动记录该开票信息，客人再次开票时，可免输入开票信息-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->

      <!--</el-form-item>-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value5"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->

      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许自动读取客人微信的“我的发票抬头”-->
      <!--</div>-->
      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：如客人有设置“我的发票抬头”，则款易能在客人授权的情况下自动读取该信息，免输入-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->

      <!--</el-form-item>-->


      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value6"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--电子发票二维码打印在预结单小票-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：电子发票二维码与支付二维码均在预结单小票上打印（二码合一），客人第一次扫码完成支付，第二次扫进入自助开电子发票页面-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->

      <!--</el-form-item>-->
      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value6"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--电子发票二维码打印在结账单小票-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人完成支付后，向服务员索取发票，服务员打印结账单及电子发票二维码并拿给客人，客人扫码进入自助开电子发票页面-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->


      <!--&lt;!&ndash;选项&ndash;&gt;-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value7"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许输入并选择多个开票方信息-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人完成支付后，向服务员索取发票，服务员打印结账单及电子发票二维码并拿给客人，客人扫码进入自助开电子发票页面-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value8"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许电子发票以卡券形式存入卡包-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：除了发送邮箱和下载pdf这两种形式外，电子发票可以变成微信卡券的形式，并保存在客人的微信卡包中，随时查看或操作-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value8"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许微信卡券（电子发票）的所属服务号为餐厅为主体的服务号-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：微信卡券的发券主体为服务号，如无特别要求，则该服务号默认为发票服务提供商（百望或航天）。如需更改为餐厅所持有的服务号，则须打开                    </div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value8"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许餐厅为主体的服务号向客人发送发票开具成功的通知（模板消息）-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：客人提交开票请求后，发票开具成功则提醒客人，提醒方式为餐厅服务号推送模板消息（须餐厅授权方可）-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value8"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许支付宝扫码开电子发票-->
      <!--</div>-->
      <!--<div class="flex_1">-->

      <!--</div>-->

      <!--</div>-->
      <!--</el-form-item>-->

      <!--<el-form-item label-width="50px" label="">-->
      <!--<div class="flex_a">-->
      <!--<el-switch-->
      <!--v-model="clientForm2.value8"-->
      <!--on-color="#13ce66"-->
      <!--off-color="#ff4949">-->
      <!--</el-switch>-->
      <!--<div class="margin_l_10 margin_r_10 t_a flex_1">-->
      <!--允许客人现金及刷卡支付也可自助开电子发票-->
      <!--</div>-->

      <!--<el-card class="flex_1">-->
      <!--<div>-->
      <!--备注：无论客人选择哪种支付方式，均可打印结账单及电子发票二维码，由客人自助完成开具电子发票-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<div class="flex_sb margin_b_10">-->
      <!--<span style="color: red">增值服务（付费使用）</span>-->
      <!--<span>展开</span>-->
      <!--</div>-->
      <!--<div class="partLine"></div>-->

      <!--<div class="flex margin_t_10">-->
      <!--<el-button type="" @click="">返回</el-button>-->
      <!--<el-button type="primary" @click="">保存并跳转页面设计</el-button>-->
      <!--<el-button type="primary" @click="">保存</el-button>-->


      <!--</div>-->

      <!--</el-form>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-tab-pane>-->

      <!--<el-tab-pane label="通知配置" name="five">-->
      <!--<el-row>-->
      <!--<el-col :span="24">-->
      <!--<el-card class="box-card-notice">-->
      <!--<el-form ref="form" :model="noticeForm" label-width="230px" class="myForm">-->
      <!--<el-form-item label="顾客：">-->
      <!--<el-checkbox v-model="noticeForm.clientSms" >微信模板消息（顾客如关注餐厅服务号，则餐厅服务号推送；如未关注餐厅服务号，则“服务通知”推送）-->
      <!--</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<div v-if="noticeForm.clientSms">-->
      <!--<el-form-item label-width="250px">-->
      <!--<el-checkbox v-model="noticeForm.clientPay" >支付成功通知</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item label-width="250px">-->
      <!--<el-checkbox v-model="noticeForm.clientRefund" >退款成功通知</el-checkbox>-->
      <!--</el-form-item>-->
      <!--</div>-->


      <!--<el-form-item label="收银员：">-->
      <!--<el-checkbox v-model="noticeForm.sms" >语音播报</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<div v-if="noticeForm.sms">-->
      <!--<el-form-item label-width="250px">-->
      <!--<el-checkbox v-model="noticeForm.weiXin" >电脑客户端</el-checkbox>-->
      <!--</el-form-item>-->
      <!--<el-form-item label-width="250px">-->
      <!--<el-checkbox v-model="noticeForm.voice" >款易App</el-checkbox>-->
      <!--</el-form-item>-->
      <!--</div>-->

      <!--<el-form-item>-->

      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--</el-card>-->

      <!--<div class="flex margin_t_10">-->
      <!--<el-button type="primary" @click="noticeSubmit">保存</el-button>-->
      <!--<el-button  @click="">取消</el-button>-->
      <!--</div>-->

      <!--</el-col>-->
      <!--</el-row>-->

      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

  import getApi from './editStoreAccount.service';


  export default {
    components: {},
    data() {
      return {
        showConfig: false,
        activeName2: 'electronicInvoice',
        form: {
          radio: 0,
          input: '',
          time1: '',
          time2: '',
          value: '',
          options: [{
            value: '',
            label: ''
          }],
        },
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeList'}, {name: "查看门店", url: ''}],
        activeName: 'first',
        clientForm2: {
          value3: '',
          value4: '',
          value5: '',
          value6: '',
        },
        clientForm1: {
          value2: false,
          radio2: '',
          radio3: '',
          radio4: '',
        },
        clientForm: {
          caseName: '',
          pay: '',
          type: 1,
          invoice: '',
          Unified: '',
          input: '',
          code: 1,
          list: [
            {id: 1, payValue: 1, payTypeValue: 2, addressValue: 1},],

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
        },
        list: [
          {id: 1, payValue: 1, payTypeValue: 2, addressValue: 1},
          {id: 2, payValue: 1, payTypeValue: 3, addressValue: 1},
        ],
        subList: [
          {id: 1, payValue: 1, payTypeValue: 2, addressValue: 1},
          {id: 2, payValue: 2, payTypeValue: 3, addressValue: 2},
        ],
        payOptions: [
          {value: 1, label: '支付宝'},
          {value: 2, label: '微信支付'}
        ],
        payType: [
          {value: 1, label: '兴业银行'},
          {value: 2, label: '易极付'},
          {value: 3, label: '通联'}
        ],
        addressList: [
          {value: 1, label: '炳胜（马场店）'},
          {value: 2, label: '炳胜（兴盛路店）'}
        ],
        storeData: {},
        storeGroup: []


      }
    },
    methods: {
      async config2(clientForm, clientForm1) {
        let a, b;
        await this.$refs[clientForm].validate((valid) => {
          if (valid) {
            //alert('submit!');
            a = true
          } else {
            console.log('error submit!!');
            //return false;
            a = false
          }
        })

        await  this.$refs[clientForm1].validate((valid) => {
          if (valid) {
            //alert('submit!');
            b = true
          } else {
            console.log('error submit!!');
            //return false;
            b = false
          }
        });

        if (a === true && b === true) {

          console.log(3)
          this.showConfig = true

        }
      },

      config3(clientForm) {
        this.$refs[clientForm].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            //return false;
          }
        });
      },
      editStoreBase() {


        getApi.editStore(this.token, this.storeData).then((res) => {
          console.log(res)
        })


        //this.$router.push('/storeManage/storeList/seeTheStore/editStoreBase')
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
        console.log(tab, event);
      },
      addDomainClient() {
        let length = this.clientForm.list.length;
        let id = this.clientForm.list[length - 1].id;
        this.clientForm.list.push({id: ++id, payValue: '', payTypeValue: '', addressValue: ''})

      },
      removeDomainClient(i) {
        this.clientForm.list.splice(i, 1)
      },
      addDomain() {
        let length = this.list.length;
        let id = this.list[length - 1].id;
        this.list.push({id: ++id, payValue: '', payTypeValue: '', addressValue: ''})

      },
      removeDomain(i) {
        this.list.splice(i, 1)
      },
      subAddDomain() {
        let length = this.subList.length;
        let id = this.subList[length - 1].id;
        this.subList.push({id: ++id, payValue: '', payTypeValue: '', addressValue: ''})

      },
      subRemoveDomain(i) {
        this.subList.splice(i, 1)
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
      getApi.getList(this.token).then((res) => {
        this.storeGroup = res.data.data.list;
        console.log(res.data.data)
      })

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

  .box-card-notice {
    height: 400px;
  }

  .m-storeCode {
    font-size: 30px;
  }

  .t_a {
    text-align: end
  }

</style>
