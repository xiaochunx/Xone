<template>
  <div id="account">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <el-button type="primary">查看填写说明</el-button>
    <div style="margin-top: 25px">
      <el-tabs type="border-card">
        <el-tab-pane label="已有账户">
          <xo-already-live></xo-already-live>
        </el-tab-pane>
        <el-tab-pane label="开户申请">开户申请</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import xoAlreadyLive from './AlreadyLive.vue'
  import xoNavPath from './NavPath.vue'

  export default {
      data(){
          return {

          }
      },
    components: {
      xoAlreadyLive,
      xoNavPath
    }
  }
</script>
<style scoped>
  .contentMsg{
    padding: 0 0 25px 0;
  }
</style>
