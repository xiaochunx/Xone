<template>
  <div>
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
      <div ref="tree" style="min-width: 200px;">
        <el-tree
          :data="dataLeft"
          :props="defaultProps"
          @node-click="nodeClick"
          node-key="id"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
        >
        </el-tree>
      </div>

      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="70">
            <template scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storecodeid"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storename"
                           label="门店"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service"
                           label="款易服务"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="打印机状态" width="120">
            <template scope="scope">
              <el-button type="text" @click="printStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="客户端状态" width="120">
            <template scope="scope">
              <el-button type="text" @click="clientStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="POS端状态"
                           width="120">
            <template scope="scope">
              <el-button type="text" @click="posStatus(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <!--<el-table-column label-class-name="table_head" header-align="center" align="center" label="设置" width="100">-->
            <!--<template scope="scope">-->
              <!--<el-button type="text" @click="operation(scope.row)">操作</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
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
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerid" label="打印机ID">

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerip" label="IP地址">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printertype" label="型号">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="printerstatus" label="状态">
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
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="clientserver" label="服务版本">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="installdata" label="安装日期">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="installlocation" label="安装位置">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="linkstatus" label="状态">
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
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posid" label="POS ID">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posip" label="IP地址">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="poslocation" label="位置">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="poststatus" label="状态">
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
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" width="120"
                         label="打印机ID">
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerPrint" header-align="center" align="center"
                         width="100">
          <template scope="scope">
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
          <template scope="scope">
            <el-button type="text" @click="open()">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerClose" header-align="center" align="center"
                         width="100">
          <template scope="scope">
            <el-button type="text" @click="close()">关闭</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerUpdate" header-align="center"
                         align="center" width="100">
          <template scope="scope">
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
  import {getLeft} from '../../utility/communApi'
  export default {
    components: {},
    data() {
      return {
        printList: [
//          {
//            id: 12321321,
//            ip: '192.168',
//            type: '爱普生',
//            status: '在线',
//          }
        ],
        clientList: [
//          {
//            ver: 12321321,
//            time: '2017-11-11',
//            posion: 'POS3',
//            status: '正常',
//          }
        ],
        POSList: [
//          {
//            id: 12321321,
//            ip: '192.168',
//            posion: 'POS3',
//            status: '在线',
//          }
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

        levelId: -1,//左边树ID
        searchName: '',
        storeData: [],
        p: {page: 1, size: 20, total: 0},
        dataLeft: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
      }
    },
    watch: {},
    methods: {
      search(){
        console.log(this.levelId)
        if(this.searchName === ''){
          this.showResouce(-1)
        }else {
          getApi.getService(this.levelId,this.searchName).then((res)=>{
            console.log(res)
            if (res.data.errcode === 0) {
              res.data.data.list.forEach((item)=>{
                if(item.status === 1){
                  item.status = "开启"
                }else {
                  item.status = "关闭"
                }
                item.select = false
              });
              this.storeData = res.data.data.list;
              this.p.total = res.data.data.count
            } else {

            }
          })
        }
      },

      nodeClick(item, data1, data2) {
        console.log(item.id);
        this.levelId = item.id

        this.showResouce(item.id)
      },
      getPage(page) {
        this.p.page = page;
        this.showResouce(this.levelId);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce(this.levelId);
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
                    console.log(111)
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
                    console.log(111)
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
                    console.log(111)
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
                    console.log(111)
                  },

                }
              }, ['测试打印']
            )
          ]
        );
      },
      print() {
        console.log(this)
      },
      open() {

      },
      close() {

      },
      update() {

      },
      printStatus(row) {
        console.log(row)

        this.printList = row.storeprinters;

        this.dialogVisible = true
      },
      clientStatus(row) {
        console.log(row)
        this.clientList = row.storeclients
        this.dialogVisible2 = true
      },
      posStatus(row) {
        console.log(row)
this.POSList = row.storeposs
        this.dialogVisible3 = true
      },
      operation(row) {
        console.log(row)

        this.dialogVisible4 = true

      },

      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },
      showResouce(id) {
        getApi.getService(id).then((res) => {
          this.storeData = res.data.data.list
          this.p.total = res.data.data.count
        })
      }
    },
    created() {

      getLeft().then((res) => {

        this.dataLeft = res.data.data
      });

      getApi.getService(-1).then((res) => {
        console.log(res)
        this.storeData = res.data.data.list
        this.p.total = res.data.data.count
      })
    },
    mounted() {

    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
  }
</script>

<style lang="less" scoped>
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

  .myStore {
    position: absolute;
    top: 40%;
    right: 0;
    background: white;
    z-index: 100;
    border-radius: 10px;
    border: 1px solid #E5EBF4
  }
</style>
