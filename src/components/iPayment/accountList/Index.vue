<template>
  <div>
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <xo-count-edit></xo-count-edit>
    </div>
    <div class="contentMsg">
      <xo-detail-msg></xo-detail-msg>
    </div>
    <div class="contentMsg">
      <xo-pagination></xo-pagination>
    </div>
  </div>
</template>
<script>
  import xoCountEdit from './CountEdit.vue'
  import xoDetailMsg from './DetailMsg.vue'
  import xoNavPath from './NavPath.vue'

  export default{
    components: {
      xoCountEdit,
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
