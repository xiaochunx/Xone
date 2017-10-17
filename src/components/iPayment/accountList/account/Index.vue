<template>
  <div id="account">
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

  export default {
      data(){
          return {

          }
      },
    components: {
      xoAlreadyLive
    }
  }
</script>
<style scoped>

</style>
