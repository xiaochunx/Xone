<template>
  <div id="businessInfo">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg" style="display: flex;justify-content: center">
      <el-card class="box-card">
        <div v-for="(value,index) in BusinessInfo" :key="index" class="text item">
          <div class="cell"><span>商家名称: {{value.storeName}}</span></div>
          <div class="cell"><span>商家编码: {{value.storeCode}}</span></div>
          <div class="cell"><span>商家电话: {{value.storeTel}}</span></div>
          <div class="cell"><span>商家地址: {{value.storeAdd}}</span></div>
          <div class="cell"><span>加入时间: {{value.joinTime}}</span></div>
          <div class="cell"><span>预充值余额: {{value.previousMoney}} <el-button size="small">明细</el-button><el-button size="small" type="primary">我要充值</el-button></span></div>
          <div class="cell"><span>有效期: {{value.validity}}</span></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import xoNavPath from './NavPath.vue'
  export default {
    data(){
      return {
        BusinessInfo: [
          {
            storeName: '阿里爸爸',
            storeCode: '8989809',
            storeTel: '020-89854928',
            storeAdd: '广州市天河区天河路898号',
            joinTime: '2017-5-3 12:06:45',
            previousMoney: '￥89.00',
            validity: '2020-5-3 12:06:4'
          }
        ]
      }
    },
    components: {
      xoNavPath
    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }
   .text {
     font-size: 14px;
   }

  .item {
    padding: 18px 0 0 0;
  }

  .box-card {
    width: 480px;
  }
  .cell{
    margin-bottom: 18px;
  }
</style>
