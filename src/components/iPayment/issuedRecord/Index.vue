<template>
  <div id="issuedRecord">
    <router-link to="/iPayment/issuedRecord/newIssued"><el-button type="primary" icon="plus">新增下发</el-button></router-link>
    <div style="margin-top: 25px">
      <xo-screen-form></xo-screen-form>
    </div>
    <div style="margin-top: 25px">
      <xo-pagination></xo-pagination>
    </div>
  </div>
</template>

<script>
  import xoScreenForm from './ScreenForm.vue'

  export default {
      data(){
          return{

          }
      },
    components: {
      xoScreenForm
    }
  }
</script>
<style>
  div.cell{
    text-align: center;
  }
</style>
