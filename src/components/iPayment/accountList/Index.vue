<template>
  <div>
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <el-card>
      <div class="contentMsg">
        <xo-detail-msg></xo-detail-msg>
      </div>
      <div class="contentMsg">
        <xo-pagination></xo-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>

  import xoDetailMsg from './DetailMsg.vue'
  import xoNavPath from './NavPath.vue'

  export default{
    data(){
      return {
        msg: '1'
      }
    },
    components: {
      xoDetailMsg,
      xoNavPath
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding: 25px;
  }

  .contentMsg {
    padding: 0 0 25px 0;
  }
</style>
