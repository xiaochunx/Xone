<template>
  <div>
    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div class="flex_r margin_b_10" v-for="(item,index) in list" :key="item.id">
      <div class="margin_r_10 ">
        <el-select v-model="item.payValue" placeholder="请选择">
          <el-option
            v-for="item in payOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="margin_r_10 ">
        <el-select v-model="item.payTypeValue" placeholder="请选择">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="margin_r_10 ">
        <el-select v-model="item.addressValue" placeholder="请选择">
          <el-option
            v-for="item in addressList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex">
        <div class="m-storeCode flex pointer" @click="addDomain()">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="m-storeCode flex margin_l_10 pointer" @click="removeDomain(index)">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="title">
      备用账户
    </div>
    <div class="flex_r margin_b_10" v-for="(item,index) in subList" :key="item.id">
      <div class="margin_r_10 ">
        <el-select v-model="item.payValue" placeholder="请选择">
          <el-option
            v-for="item in payOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="margin_r_10 ">
        <el-select v-model="item.payTypeValue" placeholder="请选择">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="margin_r_10 ">
        <el-select v-model="item.addressValue" placeholder="请选择">
          <el-option
            v-for="item in addressList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="flex">
        <div class="m-storeCode flex pointer" @click="subAddDomain()">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="m-storeCode flex margin_l_10 pointer" @click="subRemoveDomain(index)">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: '/storeManage/storeList'},{name: "查看门店", url: '/storeManage/storeList/seeTheStore'},{name: "天河店收款账户编辑", url: ''}],
        list:[
          {id:1,payValue:1,payTypeValue:2,addressValue:1},
          {id:2,payValue:1,payTypeValue:3,addressValue:1},
        ],
        subList:[
          {id:1,payValue:1,payTypeValue:2,addressValue:1},
          {id:2,payValue:2,payTypeValue:3,addressValue:2},
        ],
        payOptions: [
          {value: 1, label: '支付宝'},
          {value: 2, label: '微信支付'}
        ],
        payType: [
          {value: 1, label: '兴业银行'},
          {value: 2, label: '易极付'},
          {value: 3, label: '通联'}
        ],
        addressList: [
          {value: 1, label: '炳胜（马场店）'},
          {value: 2, label: '炳胜（兴盛路店）'}
        ],

      }
    },
    methods: {
      addDomain() {
        let length = this.list.length;
        let id = this.list[length -1].id;
        this.list.push({id:++id,payValue:'',payTypeValue:'',addressValue:''})

      },
      removeDomain(i) {
        this.list.splice(i,1)
      },
      subAddDomain() {
        let length = this.subList.length;
        let id = this.subList[length -1].id;
        this.subList.push({id:++id,payValue:'',payTypeValue:'',addressValue:''})

      },
      subRemoveDomain(i) {
        this.subList.splice(i,1)
      },
    },
    created() {

    }
  }
</script>

<style scoped>
  .title {
    font-size: 16px;
    height: 35px;
  }

  .m-storeCode {
font-size: 30px;
  }

</style>
