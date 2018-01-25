<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
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
    </div>


    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <public-tree :data='dataLeft' :count=0 style="width: max-content;"></public-tree>
      </div>

      <div class="padding_l_10 " :style="{width:tableWidth + 'px'}">
        <el-table :data="dishesList" border :height="tableHeight" style="width: 100%;">
          <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
                           width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked"></el-checkbox>
              {{scope.$index + 1 }}
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

  export default {
    components: {
      publicTree
    },
    data() {
      return {
        tableWidth: 0,
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''}],
        dataLeft: [],
        dishesName: '',
        dishesList: [{
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
      getPage(page) {
        this.p.page = page;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.showResouce(this.p, this.levelId,this.searchName);
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

      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.dishesList.forEach((data) => {
            data.select = true
          })
        } else {
          this.dishesList.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.dishesList.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.dishesList.length) {
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
                props: {
                  selectedAll: this.selectedAll
                },

                domProps: {
                  value: this.selectedAll
                },
                on: {
                  change: this.handleCheckAll,
                  input: (event) => {
//                    this.selectedAll = event;
//                    this.$emit('input', event)
                  }

                }
              }, ['全选']
            )
          ]
        );

      },

      recur(data) {
        data.forEach((map) => {
          if (map.id === this.$localStorage.get_s('publicLevelId')) {
            this.type = map.type
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
    },
    created() {
      getLeft('x1').then((res) => {
        if (res.data.errcode === 0) {
          //this.showResouce(this.$localStorage.get_s('publicLevelId')?this.$localStorage.get_s('publicLevelId'):res.data.data[0].id);
          this.dataLeft = res.data.data;
          this.recur(this.dataLeft);
          this.recurSelected(this.dataLeft, this.$localStorage.get_s('publicLevelId') ? this.$localStorage.get_s('publicLevelId') : res.data.data[0].id)
        }
      });


      this.dishesList.forEach((map) => {
        this.$set(map, 'select', false)
      })

    },

    mounted() {
      Hub.$on('showAddPub', (e) => {
        this.levelName = e.levelName;
        this.type = e.type;
        this.$localStorage.set_s('publicLevelId', e.levelid);
        //this.showResouce(e.levelid);
        this.recurSelected(this.dataLeft, e.levelid)
      });

      Hub.$on('arr', (e) => {
        this.setTreeArr({obj: getArr(e)})
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
      Hub.$off("showAddPub");
    }
  }
</script>

<style scoped>


</style>
