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
            <el-input size="small" v-model="storeName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;">
        <el-tree
          :data="data5"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="true"
        >
        </el-tree>
      </div>

      <div :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                           type="index" width="70">
            <template scope="scope">

              <el-checkbox v-model="scope.row.NO">{{scope.$index + 1 }}</el-checkbox>

            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                           label="门店"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service" label="款易服务"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center"  label="打印机状态" width="120">
            <template scope="scope">
              <el-button type="text" @click="printStatus()">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="客户端状态" width="120">
            <template scope="scope">
              <el-button type="text" @click="clientStatus()">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="POS端状态" width="120">
            <template scope="scope">
              <el-button type="text" @click="posStatus()">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="设置" width="100">
            <template scope="scope">
              <el-button type="text" @click="operation()">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination></xo-pagination>
        </footer>

      </div>
    </div>
    <!--弹窗打印机状态-->
    <el-dialog
      title="打印机状态"
      :visible.sync="dialogVisible"
      width="50%">
      <el-table :data="printList" border >
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="打印机ID" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="ip" label="IP地址" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="type" label="型号" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态" >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--弹窗客户端状态-->
    <el-dialog
      title="客户端状态"
      :visible.sync="dialogVisible2"
      width="50%">
      <el-table :data="clientList" border >
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="ver" label="服务版本" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="time" label="安装日期" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posion" label="安装位置" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态" >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--弹窗POS状态-->
    <el-dialog
      title="客户端状态"
      :visible.sync="dialogVisible3"
      width="50%">
      <el-table :data="POSList" border >
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="POS ID" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="ip" label="IP地址" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="posion" label="位置" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态" >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--设置状态-->
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible4"
      width="70%">
      <el-table :data="setList" border >
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         type="index" width="70">
          <template scope="scope">
            {{scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"  width="120" label="打印机ID" >
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerPrint" header-align="center" align="center" width="100">
          <template scope="scope">
            <el-button type="text" @click="print()">打印</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="client" label="客户端" >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service"  width="100" label="款易服务" >
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerOpen" header-align="center" align="center" width="100">
          <template scope="scope">
            <el-button type="text" @click="open()">开启</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerClose" header-align="center" align="center" width="100">
          <template scope="scope">
            <el-button type="text" @click="close()">关闭</el-button>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" :render-header="headerUpdate" header-align="center" align="center" width="100">
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

  export default {
    components: {

    },
    data() {
      return {
        printList:[
          {
            id: 12321321,
            ip: '192.168',
            type: '爱普生',
            status: '在线',
          }
        ],
        clientList:[
          {
            ver: 12321321,
            time: '2017-11-11',
            posion: 'POS3',
            status: '正常',
          }
        ],
        POSList:[
          {
            id: 12321321,
            ip: '192.168',
            posion: 'POS3',
            status: '在线',
          }
        ],
        setList:[
          {
            id: 12321321,
            client: 'POS3',
            service: 'X2',
          }
        ],
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4:false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "运营状态", url: ''}],

        storeGroup: 1,
        payValue: 2,
        payValueData: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '开启'
        }, {
          value: 3,
          label: '关闭'
        }],
        storeName: '',
        storeData: [{
          NO: true,
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          service: 'x1',
        }, {
          NO: false,
          storeCode: '837892',
          storeName: '炳胜（马场店）',
          service: 'x1',
        }, {
          NO: false,
          storeCode: '837893',
          storeName: '炳胜（马场店）',
          service: 'x1',
        }],

        data5: [{
          id: 1,
          label: '民生银行',
          children: [{
            id: 4,
            label: '狮子牌',
            children: [{
              id: 9,
              label: '狮子牌33'
            }, {
              id: 10,
              label: '易极付4444'
            }]
          }]
        }, {
          id: 2,
          label: '民生银行1',
          children: [{
            id: 5,
            label: '九毛九'
          }, {
            id: 6,
            label: '太二酸菜鱼'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },

        isEdit: true,
        value: "",
        options: [{
          value: 1,
          label: '民生银行'
        }, {
          value: 2,
          label: '易极付'
        }],
      }
    },
    watch: {},
    methods: {
      headerUpdate(h){
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {
                },
                on: {
                  click: ()=>{
                    console.log(111)
                  },

                }
              }, ['更新']
            )
          ]
        );
      },
      headerClose(h){
        return h(
          'div',
          {},
          [
            h('el-button', {
                attrs: {size: "mini"},
                'class': {
                },
                on: {
                  click: ()=>{
                    console.log(111)
                  },

                }
              }, ['关闭']
            )
          ]
        );
      },
      headerOpen(h){
      return h(
        'div',
        {},
        [
          h('el-button', {
              attrs: {size: "mini"},
              'class': {
              },
              on: {
                click: ()=>{
                  console.log(111)
                },

              }
            }, ['开启']
          )
        ]
      );
    },
      headerPrint(h){
        return h(
          'div',
          {},
          [
            h('el-button', {
              attrs: {size: "mini"},
                'class': {
                },
                on: {
                  click: ()=>{
                    console.log(111)
                  },

                }
              }, ['测试打印']
            )
          ]
        );
      },
      print(){
console.log(this)
      },
      open(){

      },
      close(){

      },
      update(){

      },
      printStatus(){
        this.dialogVisible = true
      },
      clientStatus(){
        this.dialogVisible2 = true
      },
      posStatus(){
        this.dialogVisible3 = true
      },
      operation(){
        this.dialogVisible4 = true

      },

      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },


    },
    created() {


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
