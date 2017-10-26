<template>
  <div id="issuedRecord">
    <div class="contentMsg">
      <el-row>
        <el-col :span="24">
          <el-col :span="18" style="display: flex;align-items: center">
            <xo-nav-path></xo-nav-path>
          </el-col>
          <el-col :span="2" :offset="2">
            <router-link to="/iPayment/issuedRecord/newIssued"><el-button size="small" type="primary" icon="plus">新增下发</el-button></router-link>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <el-card>
      <div>
        <el-form :inline="true" :model="form" :label-position="'top'">
          <el-form-item label="状态">
            <el-select v-model="form.value" placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="vertical-align: bottom">
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <xo-screen-form></xo-screen-form>
      </div>
      <div style="margin-top: 25px">
        <xo-pagination></xo-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import xoScreenForm from './ScreenForm.vue'
  import xoNavPath from './NavPath.vue'

  export default {
      data(){
          return{
            form: {
              options: [{
                value: '选项1',
                label: '全部状态'
              }, {
                value: '选项2',
                label: '已完成'
              }, {
                value: '选项3',
                label: '待完成'
              }],
              value: ''
            }
          }
      },
    components: {
      xoScreenForm,
      xoNavPath
    }
  }
</script>
<style scoped>
  div.cell{
    text-align: center;
  }

  .contentMsg{
    padding: 0 25px 25px 0;
  }
</style>
