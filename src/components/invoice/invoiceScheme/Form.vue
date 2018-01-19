<template>
  <el-form :ref="myRef" :model="clientFormData" label-width="200px">
    <div class="margin_b_10">销售方信息</div>
    <el-form-item label="销售方纳税人识别号" prop="code_number" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.code_number" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="销售方名称" prop="sale_name" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.sale_name" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="销售方地址" prop="address" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.address" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="销售方电话" prop="tel" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.tel" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="销售方银行账号" prop="account" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.account" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="开票人" prop="drawer" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.drawer" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="税率(比如6%：0.06)" prop="tax_rate" :rules="{validator: checkTax,required: true, trigger: 'blur'}">
      <el-input v-model="clientFormData.tax_rate" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <el-form-item label="货物或应税劳务、服务名称" prop="service_name" :rules="{required: true, message: '必填项', trigger: 'blur'}">
      <el-input v-model="clientFormData.service_name" placeholder="必填" :disabled="showName === '查看'"></el-input>
    </el-form-item>
    <div class="flex_sb margin_b_10" style="border-bottom: 1px solid #bfcbd9">
      <div>选填项</div>
      <div @click="showOption = !showOption" class="pointer">展开
        <i class="el-icon-arrow-down"  v-if="showOption"></i>
        <i class="el-icon-arrow-up"  v-if="!showOption"></i>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <div v-if="showOption" class="heightTran">
        <el-form-item label="收款人">
          <el-input v-model="clientFormData.payee" placeholder="收款人" :disabled="showName === '查看'"></el-input>
        </el-form-item>
        <el-form-item label="复核人">
          <el-input v-model="clientFormData.reviewer" placeholder="复核人" :disabled="showName === '查看'"></el-input>
        </el-form-item>
      </div>
    </transition>
    <el-form-item label-width="100px" label="">
      <h3 class="margin_b_10">购买方信息 <span style="color: #8c939d;font-size: 14px">(红色按钮为必填项，灰色按钮选填、可自行决定)</span></h3>
      <div class="flex_r f_f margin_b_10">


        <xo-button v-for="(item,index) in purchaserList" :key="item.id" :id="item.id" :showName="showName"
                   :name="item.name" marginRight="10px" marginBottom="10px" backgroundColor="#ffffff" :isBool="item.selectF"
                   @click="buyInfo1"></xo-button>



      </div>
    </el-form-item>

    <div class="margin_b_10" style="border-bottom: 1px solid #bfcbd9"></div>

    <el-form-item label-width="110px" label="">
      <div class="flex_a">
        <el-switch
          v-model="clientFormData.auto_log"
          on-color="#13ce66"
          off-color="#ff4949" :disabled="showName === '查看'">
        </el-switch>

        <div class="margin_l_10 margin_r_10 t_a">
          自动记录开票方信息，再次开票免输入
        </div>
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          content="备注：客人开过一次发票后，系统将自动记录该开票信息，客人再次开票时，可免输入开票信息">
          <i class="fa fa-info-circle" aria-hidden="true" slot="reference" style="font-size: 15px;"></i>
        </el-popover>
      </div>
    </el-form-item>

  </el-form>
</template>
<script>


  export default {
    name:"xoForm",
    props:["clientFormData","purchaserList","showName","myRef"],
    data() {
      return {
        showOption:false,

      };
    },
    methods: {
      checkTax(rule, value, callback){
        let re = /^0.0[\d{9}]$|^[\d{9}]%$/;
        if (value === '') {
          callback(new Error('请输入税率'));
        }else {
          if(re.test(value)){
            callback()
          }else {
            callback(new Error('请输入正确税率，如0.06'));
          }
        }
      },
      buyInfo1(id, bool) {
        this.purchaserList.forEach((item) => {
          if (item.id === id) {
            item.selectF = bool
          }
        })
      },

      beforeEnter: function (el) {
        el.style.height = '0';
      },
      enter: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px';
        } else {
          el.style.height = '';
        }
      },
      afterEnter: function (el) {
        el.style.height = '';
      },
      enterCancelled: function (el) {

      },
      beforeLeave: function (el) {
        el.style.height = el.scrollHeight + 'px';
      },

      leave: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = 0;
        }
      },
      afterLeave: function (el) {
        el.style.height = '';
      },

      leaveCancelled: function (el) {

      },
    },
    created(){

    },
    mounted() {

    },
    updated(){

    }
  }

</script>


<style scoped lang="less">



</style>
