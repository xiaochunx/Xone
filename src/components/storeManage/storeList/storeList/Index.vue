<template>
  <div>
    <div>门店管理/<span>门店列表</span></div>
    <el-row>
      <el-col :span="16">
        <el-row :gutter="16">
          <el-col :span="6">
            <div>
              <div class="m-storeList">门店组</div>
              <div>
                <el-select v-model="storeGroup" placeholder="全部">
                  <el-option
                    v-for="item in storeGroupData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="m-storeList">支付</div>
              <div>
                <el-select v-model="payValue" placeholder="请选择">
                  <el-option
                    v-for="item in payValueData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="m-storeList">门店名称</div>
              <div>
                <el-input v-model="storeName" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="m-storeList"></div>
              <el-button>搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="m-newStore">
         <router-link to="/storeManage/storeList/newAddStore">
          <el-button type="primary">+新增门店</el-button>
        </router-link>
        </div>
      </el-col>
    </el-row>
    <div class="m-store">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr class="m-store-tr">
          <td>序号</td>
          <td>门店编码</td>
          <td>门店名称</td>
          <td>门店组</td>
          <td>账户</td>
          <td>备用账号</td>
          <td>支付</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in storeData" :key="index"  class="m-store-tr">
          <td>{{item.NO}}</td>
          <td>{{item.storeCode}}</td>
          <td>{{item.storeName}}</td>
          <td>{{item.storeGroup}}</td>
          <td><div v-for="(acc,andex) in item.account" :key="andex">{{acc}}</div></td>
          <td>{{item.reserveAccount}}</td>
          <td>{{item.pay}}</td>
          <td>
            <div>
              <el-button type="text" @click="getOneList()">查看</el-button>
              <el-button type="text">关闭</el-button>
              <el-button type="text">删除</el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div><xo-pagination></xo-pagination></div>
  </div>
</template>

<script>
	export default {
    data() {
      return {
        storeGroupData: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '支付宝'
        }, {
          value: '选项3',
          label: '微信支付'
        }, {
          value: '选项4',
          label: 'QQ钱包'
        }],
        storeGroup: '全部',
        payValue: '开启',
        payValueData: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '开启'
        }, {
          value: '选项3',
          label: '关闭'
        }],
        storeName: '',
        storeData: [{
          NO: '1',
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          pay: '开启'
        }, {
          NO: '1',
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          pay: '开启'
        }, {
          NO: '1',
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          pay: '开启'
        }, {
          NO: '1',
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          pay: '开启'
        }]
      }
    },
    methods:{
      getOneList(){
        this.$router.push('/storeManage/storeList/seeTheStore')
      }
    }
  }
</script>

<style scoped>
  .m-storeList {
    height: 50px;
    line-height: 50px;
  }
  .m-newStore{
    position: absolute;
    right: 20px;
    top: 50px;
    width: 99px;
  }
  .m-t{
    text-align: center;
  }
  .m-store {
    padding: 20px 0;
  }
  .m-store table tr td{
    padding: 10px 0;
    border-bottom: 1px dashed #000;
  }
  .m-store table tr:nth-child(1){
     height: 50px;
   }
  .m-store table tr:nth-child(1) td{
    border-bottom: 1px solid #000;
  }
</style>
