<template>
  <div id="issuedRecord">
    <div class="contentMsg">
      <xoNavPath></xoNavPath>
    </div>
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
  import xoNavPath from './NavPath.vue'

  export default {
      data(){
          return{

          }
      },
    components: {
      xoScreenForm,
      xoNavPath
    }
  }
</script>
<style scoped>
  div.cell{
    text-align: center;
  }

  .contentMsg{
    padding: 0 25px 25px 0;
  }
</style>
