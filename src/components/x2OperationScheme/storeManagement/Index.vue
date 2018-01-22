<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <el-button size="small" @click="add()">批量新增</el-button>

          <el-button size="small" @click="isSwitch()">批量开启/关闭</el-button>

        </div>
        <div class="flex_a">
          <div class="margin_r_10">
            <el-input size="small" v-model="storeName" placeholder="请输入门店名称"></el-input>
          </div>
          <el-button size="small" @click="search()">搜索</el-button>

        </div>
      </div>
    </div>


    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow: auto" :style="{height:tableHeight + 'px'}">
        <xo-pub-tree :data='data5' :count=0 style="width: max-content;"></xo-pub-tree>
      </div>

      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight" @select-all="handleSelectionChange" ref="multipleTable">
          <el-table-column header-align="center" align="center"
                           type="selection"
                           label-class-name="mySelect"
                           width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                           label="门店编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                           width="160" label="门店名称"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" width="160" label="第三方编码">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.thirdPartyCoding">
                {{item.value}} {{item.value1}}
              </div>
            </template>

          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="营业状态"
                           width="120">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.status">
                <el-switch
                  v-model="item.value"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" label="在售菜品"
                           width="120">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.status">
                <el-button size="small" type="text" @click="showDishes()">点击查看</el-button>
              </div>
            </template>
          </el-table-column>


          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="getOne()">外卖平台映射</el-button>
              <el-button size="small" @click="printEdit()">打印机配置</el-button>

              <el-button size="small" type="danger" @click.stop="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>


    </div>

    <!--在买菜品-->
    <el-dialog
      title="在买菜品"
      :visible.sync="dialogVisible3"
      width="50%" size="tiny">
      <el-table :data="dishesList" border  style="width: 100%;">
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号"
                         width="100">
          <template slot-scope="scope">
            <div>
              {{scope.$index + 1}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="编码"
        >
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="名称"
        >
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--批量开启/关闭-->
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

    <!--外卖平台映射-->
    <el-dialog
      title="外卖平台映射"
      :visible.sync="dialogVisible4"
      width="30%" size="tiny">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="百度" name="first">

          <div class="margin_b_10">绑定映射</div>

          <el-form label-position="right" ref="form" :model="baiduDialog">
            <el-form-item label-width="100px" label="百度门店ID" class="margin_b_10">
              <el-input v-model="baiduDialog.input1"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="百度门店名称" class="margin_b_10">
              <el-input v-model="baiduDialog.input2"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="合作方账号" class="margin_b_10">
              <el-input v-model="baiduDialog.input3"></el-input>
            </el-form-item>
            <el-form-item label-width="100px" label="合作方密钥" class="margin_b_10">
              <el-input v-model="baiduDialog.input4"></el-input>
            </el-form-item>
            <el-button type="primary" size="small">点击绑定百度外卖</el-button>

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="baiduDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="baiduDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>

          <el-form label-position="right" ref="form" :model="baiduDialog">
            <el-form-item label-width="100px" label="百度门店ID" class="margin_b_10">
              <div>123</div>
            </el-form-item>
            <el-form-item label-width="100px" label="百度门店名称" class="margin_b_10">
              <div>123</div>
            </el-form-item>

            <el-button type="primary" size="small">解除绑定</el-button>

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="baiduDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="baiduDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>


        </el-tab-pane>
        <el-tab-pane label="饿了么" name="second">

          <el-form label-position="right" ref="form" :model="eleDialog">
            <el-form-item label-width="100px" label="授权门店ID" class="margin_b_10">
              <el-input v-model="eleDialog.input1"></el-input>
            </el-form-item>

            <el-button type="primary" size="small">点击授权饿了么外卖</el-button>

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="eleDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="eleDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>

          <el-form label-position="right" ref="form" :model="eleDialog">
            <el-form-item label-width="100px" label="授权门店ID" class="margin_b_10">
              <div>asd</div>
            </el-form-item>

            <el-button type="primary" size="small">解除绑定</el-button>

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="eleDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="eleDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>

        </el-tab-pane>
        <el-tab-pane label="美团" name="third">
          <div class="flex_r margin_t_10">

            <div>绑定映射</div>
            <div>
              <!--<img class="margin_l_10 margin_r_10" src="static/img/WX20171103-105446.png" alt="">-->
            </div>
            <div>
              <el-button type="text">复制绑定链接</el-button>
            </div>
          </div>
          <div>
            <el-button type="primary" size="small">点击去绑定美团外卖</el-button>
          </div>

          <el-form label-position="right" ref="form" :model="meiTuanDialog">

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="eleDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="eleDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>

          <el-form label-position="right" ref="form" :model="meiTuanDialog">
            <el-form-item label-width="100px" label="授权门店ID" class="margin_b_10">
              <div>asd</div>
            </el-form-item>

            <el-button type="primary" size="small">解除绑定</el-button>

            <el-form-item label-width="200px" label="款易APP发送订单提醒" class="margin_b_10">
              <el-switch v-model="eleDialog.switch1"></el-switch>
            </el-form-item>
            <el-form-item label-width="200px" label="自动接单" class="margin_b_10">
              <el-switch v-model="eleDialog.switch2"></el-switch>
            </el-form-item>

            <div class="flex">
              <el-button type="primary">保存</el-button>
            </div>

          </el-form>

        </el-tab-pane>

      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
  import {getLevel} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {mapActions, mapGetters} from 'vuex';

  export default {
    components: {

    },
    data() {
      return {
        storeStatusValue: false,
        baiduDialog: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          switch1: false,
          switch2: true
        },
        eleDialog: {
          input1: '',
          switch1: false,
          switch2: true
        },
        meiTuanDialog:{
          switch1: false,
          switch2: true
        },
        activeName: 'first',
        tableWidth: 0,
        tableHeight: 0,
        dialogVisible1:false,
        dialogVisible3:false,
        dialogVisible4:false,
        navList: [{name: "菜品管理", url: ''}],
        data5: [],
        storeName: '',
        dishesList: [
          {code: '123', name: '炳胜（马场店）'},
          {code: '456', name: '炳胜（马场店）'}
        ],
        storeData:[{
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          thirdPartyCoding: [
            {value: '美团', value1: '123'},
            {value: '饿了么', value1: '456'}
          ],
          status: [{id: 1, value: true}, {id: 2, value: false}]
        }, {
          storeCode: '837892',
          storeName: '炳胜（马场店）',
          thirdPartyCoding: [
            {value: '美团', value1: '123'},
            {value: '饿了么', value1: '456'}
          ],
          status: [{id: 1, value: true}, {id: 2, value: false}]
        }],
        p: {page: 1, size: 20, total: 0},
        multipleSelection:[]
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setX2StoreLevelId']),
      ...mapGetters(['getX2StoreLevelId']),
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getOne() {
        this.dialogVisible4 = true

      },
      showDishes() {
        this.dialogVisible3 = true
      },
      getPage(page) {
        this.p.page = page;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },
      printEdit(){

      },

      del(id) {
        this.$confirm(
          '删除后对应的外卖平台门店也将关闭、客人无法下单。确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // getApi.del(id).then((res) => {
          //
          //   if (res) {
          //
          //   }
          //   this.$message({
          //     type: 'info',
          //     message: '删除成功'
          //   });
          //   this.showResouce(this.p, this.levelId)
          //
          // })

        }).catch(() => {
          //
        });

      },
      search() {

      },
      add() {

      },
      //批量状态设置
      changeStoresStatus() {
        let storeStatusValue;
        if (this.storeStatusValue) {
          storeStatusValue = 1
        } else {
          storeStatusValue = 0
        }

        // getApi.storesStatus(this.multipleSelection.join(','), storeStatusValue).then((res) => {
        //
        //   if(res.data.errcode === 0){
        //     this.$message('操作成功');
        //     this.showResouce(this.p, this.levelId);
        //     this.dialogVisible1 = false
        //   }
        // })
      },
      isSwitch() {
        let list = [];

        this.storeData.forEach((item)=>{
          if(item.select){
            list.push(item.id)
          }
        });
        if(list.length === 0){
          this.$message('请勾选门店');
        } else {
          this.dialogVisible1 = true
        }


      },

      handleChecked(data) {
        let count = 0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });
        let list =  this.storeData.filter((item)=>{
          return item.select === true
        });
        let list1 = [];
        list.forEach((item)=>{
          list1.push(item.id)
        });
        this.multipleSelection = list1;
        if (count === this.storeData.length) {
          list.forEach((item)=>{
            this.$refs.multipleTable.toggleRowSelection(item)
          })

        } else {
          this.$refs.multipleTable.clearSelection();

        }

      },
      handleSelectionChange(val) {
        let list = [];
        val.forEach((item)=>{
          list.push(item.id)
        });
        this.multipleSelection = list;
        if(val.length === this.storeData.length){
          this.storeData.forEach((map) => {
            this.$set(map, 'select', true)
          });
        }else {
          this.storeData.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },

      recur(data) {
        data.forEach((map) => {
          if(map.id === this.getX2StoreLevelId()){
            this.levelName = map.levelname
          }
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
      showLevel() {
        getLevel().then((res) => {
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            if(this.getX2StoreLevelId() === ''){
              this.setX2StoreLevelId({levelId:res.data.data[0].id});
            }
            // this.getGroupList(this.p,this.getX2StoreLevelId());

            this.recur(this.data5);
            this.recurSelected(this.data5, this.getX2StoreLevelId())
          } else {

          }
        })
      },
    },
    created() {
      this.showLevel();


      this.dishesList.forEach((map) => {
        this.$set(map, 'select', false)
      })

    },

    mounted() {
      Hub.$on('showAdd', (e) => {
        console.log(e)
        this.levelName = e.levelName;
        this.setX2StoreLevelId({levelId:e.levelid});

        this.recurSelected(this.data5, e.levelid)

      });


    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      this.$nextTick(() => {
        getScrollHeight().then((h) => {
          this.tableHeight = h;
        })

      })

    },
    destroyed(){
      Hub.$off("showAdd");
    }
  }
</script>

<style scoped>


</style>
