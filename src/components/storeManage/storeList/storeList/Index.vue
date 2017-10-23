<template>
  <div>
    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
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

    <div class="margin_t_10 width_100">
      <el-table :data="storeData" border :height="tableHeight" style="width: 100%;">
        <el-table-column header-align="center" align="center" prop="NO" label="序号" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" prop="storeCode" label="门店编码" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="storeName" label="门店名称" width="100"></el-table-column>
        <el-table-column header-align="center" align="center" prop="storeGroup" label="门店组" width="80"></el-table-column>
        <el-table-column header-align="center" align="center" prop="account" label="账户">
          <template scope="scope">
            <div v-for="(item,index) in scope.row.account">
              {{item}}
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="reserveAccount" label="备用账号"></el-table-column>
        <el-table-column header-align="center" align="center" prop="pay" label="支付" width="70"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作"  width="210">
          <template scope="scope">
            <el-button size="small" @click="getOneList()">查看</el-button>
            <el-button size="small">关闭</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div><xo-pagination></xo-pagination></div>
  </div>
</template>

<script>
  import xoNavPath from '../../NavPath.vue'
  export default {
    components: {
      xoNavPath
    },
    data() {
      return {
        tableHeight:0,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: ''}],
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
    },
    created(){
      console.log(this)
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
