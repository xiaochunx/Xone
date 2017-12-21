<template>
  <div v-show="getTreeArr['列表']">

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <!--<el-button size="small" @click="isSwitch()">批量开启/关闭</el-button>-->
        </div>
        <div class="flex_r">
          <el-input size="small" v-model="searchName" icon="search" placeholder="请输入内容">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="margin_l_10" size="small" @click="search()">搜索</el-button>
        </div>
      </div>

    </div>
    <el-table :data="payWayList" border :height="tableHeight">
      <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                       width="100">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>

        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="基础支付通道编码"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="thirdCode" label="第三方编码">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.thirdCode">{{item.code1}} {{item.code2}}</div>
        </template>
      </el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="基础支付通道"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="payment" label="基础支付方式" width="120">
        <template slot-scope="scope">
          <div v-for="(item,index) in scope.row.payment" class="flex_r" v-show="getTreeArr['勾选支付方式']">
            <el-checkbox v-model="item.status" @change="(e)=>{
              return handleCheckedWay(e,item,scope.row.id)
            }">{{item.name}}</el-checkbox>

          </div>

        </template>
      </el-table-column>

    </el-table>

    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--开启/关闭-->
    <el-dialog
      title="开启/关闭"
      :visible.sync="dialogVisible1"
      width="50%" size="tiny">
      <el-switch
        v-model="storeStatusValue"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
      <div class="margin_t_10">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="changeStoresStatus()">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './paymentWay.service'
  import ElButton from "element-ui/packages/button/src/button";
  import {getArr} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {},
    data() {
      return {

        dialogVisible1:false,
        storeStatusValue: false,
        tableHeight: 0,
        navList: [{name: "基础设置", url: ''}, {name: "支付配置", url: ''}],

        selectedAll: false,

        payWayList: [],
        p: {page: 1, size: 20, total: 0},

        searchName:''
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setTreeArr']),
      handleCheckedWay(e,item,id){
        let status;
        if(item.status === true){
          status = 1
        }else {
          status = 0
        }
        getApi.eidtChannelPayment(id,item.id,status).then((res)=>{
          if(res.data.errcode === 0){
            this.getCommonChannelList(this.p,this.searchName);
          }
        })
      },
      //批量状态设置
      changeStoresStatus() {
        let list = [];
        this.payWayList.forEach((item)=>{
          if(item.select){
            list.push(item.id)
          }
        });

        let storeStatusValue;
        if (this.storeStatusValue) {
          storeStatusValue = 1
        } else {
          storeStatusValue = 0
        }

        getApi.storesStatus(list.join(','), storeStatusValue).then((res) => {
          if(res.data.errcode === 0){
            this.$message('操作成功');
            this.getCommonChannelList(this.p,this.searchName);
            this.dialogVisible1 = false
          }
        })
      },
      isSwitch(){
        this.storeStatusValue = false;
        let list = [];
        this.payWayList.forEach((item)=>{
          if(item.select){
            list.push(item.id)
          }
        });

        if(list.length === 0){
          this.$message('请勾选门店');
        }else {
          this.dialogVisible1 = true
        }
      },

      search(){
        if(this.searchName === ''){
          this.getCommonChannelList(this.p = {page: 1, size: 20, total: 0})
        }else {
          this.getCommonChannelList(this.p = {page: 1, size: 20, total: 0},this.searchName)
        }
      },
      getPage(page) {
        this.p.page = page;
        this.getCommonChannelList(this.p,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.getCommonChannelList(this.p,this.searchName);
      },

      getCommonChannelList(p,name = "") {
        getApi.getCommonChannelList(p,name).then((res) => {
          if (res.data.errcode === 0) {
            res.data.data.list.forEach((item)=>{
              item.select = false
              item.payment.forEach((item1)=>{
                if(item1.is_open === 1){
                  item1.status = true
                } else {
                  item1.status = false
                }
              })
            });
            this.payWayList = res.data.data.list;
            this.p.total = res.data.data.count
          }else {
            // this.$alert('请重新登录', '超时', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     this.$router.push('/login')
            //   }
            // })
          }
        })
      },


      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.payWayList.forEach((data) => {
            data.select = true
          })
        } else {
          this.payWayList.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.payWayList.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.payWayList.length) {
          this.selectedAll = true;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        } else {
          this.selectedAll = false;
          this.$nextTick(() => {
            let all = document.querySelector('#all span');
            all.classList.remove('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = false
          })
        }

      },
      selectAll(h) {
        return h(
          'div',
          {},
          [
            h('el-checkbox', {
                attrs: {id: "all"},
                'class': {},
                on: {
                  change: this.handleCheckAll,
                  input: (event) => {
                  }
                }
              }, ['序号']
            )
          ]
        );
      },

    },
    created() {

      this.getCommonChannelList(this.p)

    },
    mounted() {
      Hub.$on('arr', (e) => {
        this.setTreeArr({obj:getArr(e)})
      });
    },
    destroyed(){
      Hub.$off("arr")
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>

<style scoped lang="less">
  .m-rank {
    width: 40px;
    .m-rank-child {
      height: 18px;
      border-bottom: 1px solid #000;
    }
  }

  .m-storeCode {
    font-size: 30px;
  }

  .m-storeList {
    height: 50px;
    line-height: 50px;
  }

  .m-newStore {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 99px;
  }

  .m-t {
    text-align: center;
  }

  .m-store {
    padding: 20px 0;
  }

  .m-store table tr td {
    padding: 10px 0;
    border-bottom: 1px dashed #000;
  }

  .m-store table tr:nth-child(1) {
    height: 50px;
  }

  .m-store table tr:nth-child(1) td {
    border-bottom: 1px solid #000;
  }


</style>
