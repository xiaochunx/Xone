<template>
  <div id="main">
    <xo-header></xo-header>
    <el-row type="flex">
      <el-col :span="4">
        <xo-left-nav></xo-left-nav>
      </el-col>
      <el-col :span="20" style="overflow-y: scroll">
        <div :style="{height:ListHeight + 'px'}">
          <div class="content">
            <xo-nav-path></xo-nav-path>
          </div>
          <div class="contentMsg">
            <!--路由视图-->
            <router-view></router-view>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  import xoHeader from './Header.vue'
  import xoNavPath from './NavPath.vue'
  import xoLeftNav from './LeftNav.vue'

  export default {
    name: 'Header',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        ListHeight: 0
      }
    },
    computed: {
      ...mapGetters([
          'getTopHeight'
      ]),
      getMsg(){
        return this.msg;
      }
    },
    components: {
      xoHeader,
      xoNavPath,
      xoLeftNav,
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
        this.ListHeight = this.getTopHeight;
    }
  }
</script>

<!-- 添加scoped属性为了限制CSS只在这个组件中生效 -->
<style scoped lang="less">
  .content {
    padding: 25px;
  }
  .contentMsg{
    padding: 0 25px 25px 25px;
  }
</style>
