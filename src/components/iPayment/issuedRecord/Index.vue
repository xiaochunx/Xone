<template>
  <div id="issuedRecord">
    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
            <router-link to="/iPayment/issuedRecord/newIssued"><el-button size="small" type="primary" icon="plus">新增下发</el-button></router-link>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-card>
      <div>
        <xo-screen-form></xo-screen-form>
      </div>
      <div style="margin-top: 25px">
        <xo-pagination></xo-pagination>
      </div>
    </el-card>
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
