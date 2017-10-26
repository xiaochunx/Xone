<template>
  <div id="backupAcc">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card class="box-card">
        <el-row>
          <el-col :span="24">
            <div class="cell"><span style="color: red">说明: 备用账户体系是为了规避当正在使用的支付渠道出现不可控的故障时出现的风险，降低因支付故障而产生的损失。</span></div>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <div class="item">
                <h4 class="changeTitle">半自动切换</h4>
                <p class="changeContent">系统接收到报警时，桌面端自动弹出切换提示框，手动确认后触发切换操作</p>
              </div>
              <div class="singleSelect">
                <el-radio-group v-model="radio" @change="changeBackup">
                  <el-radio class="radio" v-model="radio" label="1" size="large">半自动</el-radio>
                </el-radio-group>

              </div>
            </el-col>
            <el-col :span="8">
              <div class="item">
                <h4 class="changeTitle">手动切换</h4>
                <p class="changeContent">系统接收到报警时，桌面端自动弹出预警信息，手动在桌面端切换支付通道</p>
              </div>
              <div class="singleSelect">
                <el-radio-group v-model="radio" @change="changeBackup">
                  <el-radio class="radio" v-model="radio" label="2" size="large">手动</el-radio>
                </el-radio-group>
                <!--<el-radio class="radio" v-model="radio" label="2" @click.native="changeBackup(2)">手动</el-radio>-->
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item">
                <h4 class="changeTitle">不切换</h4>
                <!--<p>系统接收到报警时，桌面端自动弹出切换提示框，手动确认后触发切换操作</p>-->
              </div>
              <div class="singleSelect">
                <el-radio-group v-model="radio" @change="changeBackup">
                  <el-radio class="radio" v-model="radio" label="3" size="large">不切换</el-radio>
                </el-radio-group>
                <!--<el-radio class="radio" v-model="radio" label="3" @click.native="changeBackup(3)">不切换</el-radio>-->
              </div>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
  import xoNavPath from './NavPath.vue'
  export default {
    data(){
      return {
        radio: '1'
      }
    },
    components: {
      xoNavPath
    },
    methods: {
      changeBackup(value){
         console.log(value);
      },
      change(value){
        console.log(value);
      }
    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }
  .cell{
    margin-bottom: 18px;
  }
  .item{
    border: 1px solid gainsboro;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    // align-content: center;
  }
  .singleSelect{
    display: flex;
    justify-content: center;
    align-content: center;
    padding-top: 18px;
  }
  .changeTitle{
    text-align: center;
  }
  .changeContent{
    margin-top: 20px;
    text-align: center;
  }
</style>
