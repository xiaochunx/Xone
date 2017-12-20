<template>
  <div id="account">

    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-card class="detail" :style="{ height: height + 'px'}">
        <el-tabs type="border-card">
          <el-tab-pane label="已有账户">
            <xo-already-live></xo-already-live>
          </el-tab-pane>
          <el-tab-pane label="开户申请" :disabled="true">
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
      data(){
          return {
            height: 0
          }
      },
    components: {
      xoAlreadyLive,
      xoNavPath,
      xoNewAccount
    },
    computed: {
      ...mapGetters([
        'getTopHeight',
        'getLoadingStatus'
      ]),
    },
    mounted(){
      var totalH = window.innerHeight - this.getTopHeight;
      var topH = document.querySelector('.contentMsg').clientHeight;

      this.height = totalH - topH - 50;
    },
    create(){

    }
  }
</script>
<style scoped lang="less">
  .contentMsg{
    padding: 0 0 25px 0;
  }
  .detail{
    overflow: auto;
  }
</style>
