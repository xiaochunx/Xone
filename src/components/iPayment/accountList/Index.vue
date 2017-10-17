<template>
  <div>
    <div>
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

  export default{
    components: {
      xoCountEdit,
      xoDetailMsg,
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding: 25px;
  }

  .contentMsg {
    padding: 0 25px 25px 25px;
  }
</style>
