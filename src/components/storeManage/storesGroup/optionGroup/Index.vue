<template>
  <div id="newPayment">
    <div class="contentMsg">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店组</h3>
          </el-col>

          <el-col :span="24" class="cell">
            <el-form ref="form" :model="form" label-width="100px">

              <el-form-item label="门店组编码	:">
                <el-input v-model="form.code" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="门店组名称	:">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-col :span="24">
                <el-col :span="12" class="flex-jc">
                  <el-button>取消</el-button>
                </el-col>
                <el-col :span="12" class="flex-jc">
                  <el-button type="primary">保存</el-button>
                </el-col>
              </el-col>

            </el-form>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>
<script>
  import xoNavPath from '../../NavPath.vue'

  export default {
    data(){
      return{
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeGroup'}, {name: "门店组", url: ''}],
        form: {
          name: '',
          code: '',

        }
      }
    },
    components: {
      xoNavPath
    },
    methods: {

    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }

  .cell {
    margin-top: 20px;
    width: 50%;
  }
</style>
