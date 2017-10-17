<template>
  <div>
    <div>查看门店</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
        <div class="m-seeAddStore">
          <div class="m-seeAddStore-basic">
            <el-row>
              <el-col :span="16">
                <div class="m-seeAddStore-basic-message">
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">门店名称:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">天河店</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">门店编码:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">天河店</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">第三方编码:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">天河店</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">所属门店组:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">门店地址</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">门店电话:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">天河店</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">营业时间:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">天河店</div></el-col>
                    </el-row>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="4"><div class="m-tr">预结单提示语:</div></el-col>
                      <el-col :span="20"><div class="m-padding-left">扫一扫快速买单哦，再扫一次还能开发票</div></el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div>
                  <router-link to="/storeManage/redact">
                    <el-button type="primary">编辑</el-button>
                  </router-link>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        </el-tab-pane>
        <el-tab-pane label="收款账户" name="second">
          <div class="m-seeAddStore">
            <div class="m-seeAddStore-basic">
              <el-row>
                <el-col :span="16">
                  <div>
                    <div class="m-seeAddStore-account">
                      <div class="m-seeAddStore-account-now">正在使用中的账户</div>
                      <div class="m-seeAddStore-account-list">
                        <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                        <span>支付宝</span>
                        <span>极易付</span>
                        <span>马场路店</span>
                      </div>
                      <div class="m-seeAddStore-account-list">
                        <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                        <span>微信支付</span>
                        <span>极易付</span>
                        <span>马场路店</span>
                      </div>
                    </div>
                    <div class="m-seeAddStore-account">
                      <div class="m-seeAddStore-account-prepare">备用账户</div>
                      <div class="m-seeAddStore-account-list">
                        <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                        <span>支付宝</span>
                        <span>极易付</span>
                        <span>马场路店</span>
                      </div>
                      <div class="m-seeAddStore-account-list">
                        <div class="m-seeAddStore-account-list-img"><img src="" alt=""></div>
                        <span>支付宝</span>
                        <span>极易付</span>
                        <span>马场路店</span>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div>
                    <router-link to="/storeManage/redact">
                      <el-button type="primary">编辑</el-button>
                    </router-link>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="客户端配置" name="third"></el-tab-pane>
        <el-tab-pane label="发票配置" name="fourth"></el-tab-pane>
        <el-tab-pane label="通知配置" name="five"></el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
	export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scope lang="less">
  .m-tr {
    text-align: right;
  }
  .m-tl {
    text-align: left;
  }
  .m-padding-left {
    padding-left: 20px;
  }
  .m-seeAddStore-account {
    .m-seeAddStore-account-now
    {
      padding:  10px 0px;
      list-style-type: disc;
      font-weight: bold;
      box-sizing: border-box;
    }
  .m-seeAddStore-account-list
  {
    padding: 10px 0;
    padding-left: 70px;
    height: 50px;
    line-height: 30px;
    box-sizing: border-box;
    position: relative;
    .m-seeAddStore-account-list-img {
      position: absolute;
      left:  10px;
      top: 5px;
      width: 40px;
      height: 40px;
      background: #000;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .m-seeAddStore-account-prepare{
    list-style-type: disc;
    font-weight: bold;
  }
  }
</style>
