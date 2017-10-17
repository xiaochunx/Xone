<style scoped>
  .header-top {
    background-color: #2A3642;
    height: 80px;
    color: white;
    padding: 0 20px;
  }

  .img-size {
    width: 20px;
  }

  .login {
    color: #AAAFB5;
    margin-left: 10px;
  }

  .header-top h3 {
    display: inline;
  }

</style>

<template>
  <div ref="getTop" class="header-top flex_sb">
    <div class="flex_a">
      //
    </div>
    <div>
      <span class="login">帮助</span>
      <el-dropdown @command="loginOut">
  <span class="login el-dropdown-link">
    admin
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        height: 0
      }
    },
    methods: {
      loginOut: function () {
        this.$router.push("/login")
      },
      ...mapActions([
        'topHeight'
      ])
    },
    created() {
    },
    mounted() {
      let top = this.$refs.getTop;
      this.height = top.clientHeight;
      // this.$emit('topHeight',this.height)

      this.topHeight(this.height);
      // this.$store.dispatch('topHeight',this.height);
      // console.log(this.topHeight);
    },
    computed: {}
  }

</script>
