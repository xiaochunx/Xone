<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
    </div>


    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <xo-pub-tree  :data='getStoreDishesManageTree()' :count=0 style="width: max-content;"></xo-pub-tree>
      </div>

      <div class="padding_l_10 " :style="{width:tableWidth + 'px'}">

        <div class="flex_es margin_b_10">

          <div class="flex_a">
            <h3 class="margin_r_10">
              {{name}}
            </h3>
            <el-button size="small" @click="add()">批量新增</el-button>
            <el-button size="small" @click="edit()">批量编辑</el-button>
            <el-button size="small" @click="del()">批量删除</el-button>
            <el-button size="small" @click="issued()">批量下发</el-button>
          </div>

          <div class="flex_a">
            <div class="margin_r_10">
              <el-input size="small" v-model="dishesName" placeholder="请输入菜品名称"></el-input>
            </div>
            <el-button size="small" @click="search()">搜索</el-button>

          </div>
        </div>

        <el-table :data="tableData" border :height="tableHeight - 40" style="width: 100%;" @select-all="handleSelectionChange" ref="multipleTable">
          <el-table-column
            header-align="center" align="center"
            type="selection"
            label-class-name="mySelect"
            width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                           label="排序"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="price" label="菜品编码"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="名称"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center"
                           label="第三方编码" width="120">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.thirdPartyCoding">
                <span>{{item.value}} -- {{item.value1}}</span>
              </div>
            </template>


          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="所属品类"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="参考价格"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="菜品图片"
                           width="140">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.imgList">
                <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                 >
                  <img  src="../../../assets/login-ky-login-small.png" alt="" style="width: 200px;height: 200px">
                  <img slot="reference" src="../../../assets/login-ky-login-small.png" alt="" style="width: 100px;height: 100px">
                </el-popover>
              </div>
            </template>


          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="菜品详情"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="菜品规格"
                           width="180">

            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.spec">
                <span>{{item.value}}   {{item.value1}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品属性"
                           width="240">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.attr">
                <span>{{item.value}}:   {{item.value1}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="餐盒"
                           width="240">

            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.box.a">
                <span>{{item.value}}:   {{item.value1}}  {{item.value2}} </span>
              </div>
                <div style="border-top: 1px solid #BECBD9">餐盒总价：{{scope.row.box.b.value}}</div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="平台信息"
                           width="340">

            <template slot-scope="scope">
              <div class="flex_r">
                <div class="flex_1" v-for="(item,index) in scope.row.plat">
                  <div>
                    {{item.value}}
                  </div>
                  <div class="margin_b_10">
                    {{item.value1}}
                  </div>
                  <div v-for="(item1,index) in item.value2">
                    {{item1.value}} {{item1.value1}}
                  </div>

                </div>
              </div>

            </template>

          </el-table-column>


        </el-table>

        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>


    </div>


  </div>
</template>

<script>


  import {getLeft, getArr} from '../../utility/communApi'
  import publicTree from '../../infrastructure/PublicManagement/publicTree'
  import Hub from '../../utility/commun'
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {mapActions, mapGetters} from 'vuex';
  import {oneTwoApi} from '@/api/api.js';

  export default {
    components: {

    },
    computed:{
      ...mapGetters([
        'getTreeArr','getBodyHeight'
      ]),
    },
    data() {
      return {
        tableWidth: 0,
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''},{name: "菜品列表", url: ''}],
        name:'',
        dishesName: '',
        tableData: [{
          storeCode: '83789',
          storeName: '菜品1',
          price: "1角",
          status: '在售中',
          imgList:[{img:'../../../assets/login-ky-login-small.png'}],
          thirdPartyCoding: [
            {value: '11', value1: '22'},
            {value: '33', value1: '44'},
            {value: '55', value1: '66'}
          ],
          spec:[
            {value: '大份', value1: '￥90.00'},
            {value: '中份', value1: '￥80.00'},
            {value: '小份', value1: '￥70.00'},
          ],
          attr:[
            {value: '辣度', value1: '微辣，中辣，重辣'},
            {value: '口味', value1: '免蒜，免葱'},

          ],

          box:{
            a:[
              {value: '圆餐盒', value1: 'X1', value2: '¥18.99'},
              {value: '方餐盒', value1: 'X1', value2: '¥17.99'},
            ],
            b:{value: '¥17.99'}
          },
          plat:[
            {value: '美团', value1: 'MT鱼香肉丝', value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {value: '小份', value1: '￥70.00'},]},
            {value: '饿了么', value1: 'ele鱼香肉丝', value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {value: '小份', value1: '￥70.00'},]},
            {value: '百度', value1: 'BD鱼香肉丝', value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {value: '小份', value1: '￥70.00'},]}
            ]
        }],
        p: {page: 1, size: 20, total: 0},
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setStoreDishesManageTree','setStoreDishesManageLevelId']),
      ...mapGetters(['getStoreDishesManageTree','getStoreDishesManageLevelId']),
      getPage(page) {
        this.p.page = page;
        //this.showResouce(this.p,this.dishesName);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.showResouce(this.p,this.dishesName);
      },

      edit() {
        this.$router.push('/dishesManagement/storeDishesManage/editDishes')

      },
      del() {

      },
      search() {

      },
      add() {

      },
      issued() {

      },
      append(store, data) {
        console.log(store)
        console.log(data)

        store.append({id: id++, label: 'testtest' + id, children: []}, data);
      },
      handleSelectionChange(val) {
        if(val.length === this.tableData.length){
          this.tableData.forEach((map) => {
            this.$set(map, 'select', true)
          });
        }else {
          this.tableData.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },

      handleChecked(data) {
        let list =  this.tableData.filter((item)=>{
          return item.select === true
        });

        if (list.length === this.tableData.length) {
          list.forEach((item)=>{
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        }else {
          this.$refs.multipleTable.clearSelection();
        }

      },

      showResouce(p,dishesName = ''){
        let params = {
          redirect: "x2a.sku.index",
          levelid:this.getStoreDishesManageLevelId(),
          skuname:dishesName,

          page: p.page,
          pagesize:p.size

        };
        oneTwoApi(params).then((res) => {
          if(res.errcode === 0){
            // this.tableData = res.data.list;
            // this.p.total = res.data.count;
          }
        })
      },
      recur(data,bool) {
        data.forEach((map) => {
          if(map.id === this.getStoreDishesManageLevelId()){
            this.name = map.levelname;
            this.$set(map, "selected", true);
          }else {
            this.$set(map, "selected", false);
          }
          if (map.child) {
            if(bool){
              this.$set(map, "show", false);
            }
            this.recur(map.child,bool)
          }
        })
      },
      showLevel() {
        getLeft('x2').then((res) => {
          if (res.data.errcode === 0) {

            this.setStoreDishesManageTree({list:res.data.data});
            if (this.getStoreDishesManageLevelId() === '') {
              this.setStoreDishesManageLevelId({levelId: res.data.data[0].id});
            }
            this.showResouce(this.p,this.dishesName);
            this.recur(res.data.data,true);
          }
        });
      },
    },
    created() {
      if(this.getStoreDishesManageTree().length === 0){
        this.showLevel()
      }else {
        this.showResouce(this.p,this.dishesName);
        this.recur(this.getStoreDishesManageTree(),false);
      }
    },

    mounted() {
      Hub.$on('showAdd', (e) => {
        this.setStoreDishesManageLevelId({levelId: e.levelid});
        this.recur(this.getStoreDishesManageTree(),false);
        this.showResouce(this.p={page: 1, size: this.p.size, total: 0},this.dishesName = '');
      });
      Hub.$emit('mountedOk','mountedOk');
      this.$nextTick(() => {
        getScrollHeight(this.getBodyHeight).then((h) => {
          this.tableHeight = h;
        })

      })
    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;



    },
    destroyed(){

    }
  }
</script>

<style scoped>


</style>
