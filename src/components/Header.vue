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
    <div class="flex">
      <img src="../assets/home/mingsheng-log.png" alt="" style="width: 291px;height: 35px;">
      <img src="../assets/home/vertical-line.png" alt="" style="width: 2px;height: 30px;margin-left: 10px;">
      <img src="../assets/home/happy-font.png" alt="" style="width: 30px;height: 30px;margin-left: 10px;">
      <img src="../assets/home/zhihuicanyin-log.png" alt="" style="width: 95px;height: 23px;margin-left: 10px;">
    </div>
    <div>
      <span class="login">帮助</span>
      <el-dropdown @command="loginOut">
        <span class="login el-dropdown-link pointer">
          {{user}}
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
        height: 0,
        user: ''
      }
    },
    methods: {
      ...mapActions(['setStoreTreeList','setShowStoreTree','setPermissionLevelId']),
      loginOut: function () {
        this.$http.get(`?controller=user&action=logout&token=${this.$localStorage.get("token")}`).then((res) => {
          if(res.data.errcode === 0){
            this.$localStorage.remove("token");
            this.$localStorage.remove("user");
            this.$localStorage.remove("treeArr");
            this.setStoreTreeList({list:[]});
            this.setShowStoreTree({obj:{levelid:'', type: '', showAdd: false}});
            this.setPermissionLevelId({levelId:''});
            this.$router.push("/login")
          }else {
            this.$message(res.data.errmsg)
          }
        });
      },
      ...mapActions([
        'topHeight'
      ])
    },
    created() {
      this.user = this.$localStorage.get("user")
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
