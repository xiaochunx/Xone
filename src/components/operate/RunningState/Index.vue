<template>
  <div v-show="getTreeArr['列表']">
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>

        </div>

        <div class="flex_a">
          <div class="margin_r_10">
            <el-input size="small" v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small" @click="search()">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <xo-pub-tree :data='data5' :count=0 style="width: max-content;"></xo-pub-tree>
      </div>

      <div class="padding_l_10 width_100"  >
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="100">
            <template slot-scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storename"
                           label="门店"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service"
                           label="款易服务"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="打印机状态" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="printStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="客户端状态" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="clientStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="POS端状态"
                           width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="posStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="设置" width="100">
          <template slot-scope="scope">
          <el-button type="text" @click="operation(scope.row)">操作</el-button>
          </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>

      </div>
    </div>
    <!--弹窗打印机状态-->
    <el-dialog
      title="打印机状态"
      :visible.sync="dialogVisible"
      width="50%">
      <el-table :data="printList" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerid"
                         label="打印机ID">

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerip"
                         label="IP地址">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printertype"
                         label="型号">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerstatus"
                         label="状态">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--弹窗客户端状态-->
    <el-dialog
      title="客户端状态"
      :visible.sync="dialogVisible2"
      width="50%">
      <el-table :data="clientList" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="clientserver"
                         label="服务版本">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="installdata"
                         label="安装日期">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="installlocation"
                         label="安装位置">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="linkstatus"
                         label="状态">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--弹窗POS状态-->
    <el-dialog
      title="客户端状态"
      :visible.sync="dialogVisible3"
      width="50%">
      <el-table :data="POSList" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posid" label="POS ID">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posip" label="IP地址">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="poslocation"
                         label="位置">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="poststatus"
                         label="状态">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--设置状态-->
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible4"
      width="70%">
      <el-table :data="setList" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template slot-scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" width="120"
                         label="打印机ID">
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerPrint" header-align="center" align="center"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="print()">打印</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="client" label="客户端">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service" width="100"
                         label="款易服务">
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerOpen" header-align="center" align="center"
                         width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="value2"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerClose" header-align="center" align="center"
                         width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="value2"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerUpdate" header-align="center"
                         align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="update()">更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './runningState.service'
  import {getLevel} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    data() {
      return {
        value2:false,
        printList: [

        ],
        clientList: [

        ],
        POSList: [

        ],
        setList: [
          {
            id: 12321321,
            client: 'POS3',
            service: 'X2',
          }
        ],
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "运营状态", url: ''}],

        searchName: '',
        storeData: [],
        p: {page: 1, size: 20, total: 0},
        data5: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
      }
    },
    watch: {

    },

    methods: {
      ...mapActions(['setRunningStateLevelId']),
      ...mapGetters(['getRunningStateLevelId']),
      search() {

        if (this.searchName === '') {
          this.showResouce(this.p = {page: 1, size: 20, total: 0}, this.getRunningStateLevelId())
        } else {
           this.showResouce(this.p = {page: 1, size: 20, total: 0}, this.getRunningStateLevelId(),this.searchName)
          // this.p = {page: 1, size: 20, total: 0}
          // getApi.getService({page: 1, size: 20, total: 0},this.levelId, this.searchName).then((res) => {

          //   if (res.data.errcode === 0) {
          //     res.data.data.list.forEach((item) => {
          //       if (item.status === 1) {
          //         item.status = "开启"
          //       } else {
          //         item.status = "关闭"
          //       }
          //       item.select = false
          //     });
          //     this.storeData = res.data.data.list;
          //     //this.p.total = res.data.data.count
          //   } else {
          //
          //   }
          // })
        }
      },


      getPage(page) {
        this.p.page = page;
        this.showResouce(this.p, this.getRunningStateLevelId(),this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce(this.p, this.getRunningStateLevelId(),this.searchName);
      },
      headerUpdate(h) {
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {},
                on: {
                  click: () => {

                  },

                }
              }, ['更新']
            )
          ]
        );
      },
      headerClose(h) {
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {},
                on: {
                  click: () => {
                    console.log(this)
                  },

                }
              }, ['关闭']
            )
          ]
        );
      },
      headerOpen(h) {
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {},
                on: {
                  click: () => {
                    console.log(this)
                  },

                }
              }, ['开启']
            )
          ]
        );
      },
      headerPrint(h) {
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {},
                on: {
                  click: () => {
                    console.log(this)
                  },

                }
              }, ['测试打印']
            )
          ]
        );
      },
      print() {

      },

      update() {

      },
      printStatus(row) {
        this.printList = row.storeprinters;
        this.dialogVisible = true
      },
      clientStatus(row) {

        this.clientList = row.storeclients
        this.dialogVisible2 = true
      },
      posStatus(row) {

        this.POSList = row.storeposs
        this.dialogVisible3 = true
      },
      operation(row) {
        this.dialogVisible4 = true

      },

      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },
      recur(data) {
        data.forEach((map) => {

          if (map.child) {
            this.$set(map, "show", true);
            this.$set(map, "selected", false);
            this.recur(map.child)
          }
        })
      },
      recurSelected(data, levelId) {
        data.forEach((map) => {
          if (map.id === levelId) {
            this.$set(map, "selected", true);
          } else {
            this.$set(map, "selected", false);
          }
          if (map.child) {
            this.recurSelected(map.child, levelId)
          }
        })
      },
      showResouce(p,id,storename = '') {
        getApi.getService(p,id,storename).then((res) => {
          this.storeData = res.data.data.list
          this.p.total = res.data.data.count
        })
      }
    },
    created() {

      getLevel().then((res) => {
        if (res.data.errcode === 0) {
          this.data5 = res.data.data;

          if(this.getRunningStateLevelId() === ''){
            this.setRunningStateLevelId({levelId:res.data.data[0].id});
          }
          this.showResouce(this.p, this.getRunningStateLevelId());
          this.recur(this.data5);
          this.recurSelected(this.data5, this.getRunningStateLevelId())
        }
      });
    },
    mounted() {
      Hub.$on('showAdd', (e) => {
        this.showResouce(this.p = {page: 1, size: 20, total: 0}, e.levelid);
        this.setRunningStateLevelId({levelId:e.levelid});
        this.recurSelected(this.data5, e.levelid)
      });
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed(){
      Hub.$off("showAdd");
    }
  }
</script>

<style lang="less" scoped>

</style>
