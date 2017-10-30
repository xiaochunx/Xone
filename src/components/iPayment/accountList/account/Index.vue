<template>
  <div id="account">

    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
            <router-link to=""><el-button size="small" type="primary">查看填写说明</el-button></router-link>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-card>
        <el-tabs type="border-card">
          <el-tab-pane label="已有账户">
            <xo-already-live></xo-already-live>
          </el-tab-pane>
          <el-tab-pane label="开户申请">
            <xo-new-account></xo-new-account>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

  </div>
</template>
<script>
  import xoAlreadyLive from './AlreadyLive.vue'
  import xoNavPath from './NavPath.vue'
  import xoNewAccount from './NewAccount.vue'

  export default {
      data(){
          return {

          }
      },
    components: {
      xoAlreadyLive,
      xoNavPath,
      xoNewAccount
    }
  }
</script>
<style scoped>
  .contentMsg{
    padding: 0 0 25px 0;
  }
</style>
