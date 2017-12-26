<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>

          <div class="margin_b_10">
            {{levelName}}
          </div>
          <div>
            <el-button size="small" @click="add()">新增品类</el-button>
            <el-button size="small" @click="edit()">批量编辑</el-button>
            <el-button size="small" @click="del()">批量删除</el-button>
          </div>


        </div>

        <div class="flex_a">
          <div class="margin_r_10">
            <el-input size="small" v-model="dishesName" placeholder="请输入菜品品类"></el-input>
          </div>
          <el-button size="small" @click="search()">搜索</el-button>

        </div>
      </div>
    </div>


    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <public-tree :data='dataLeft' :count=0></public-tree>
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
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" width="120"
                           label="排序"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="category" label="菜品品类"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="品类编码"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="bank" label="所属品牌"
                           width="120"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center"
                           label="第三方编码" >
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.thirdPartyCoding">
                <span>{{item.value}} -- {{item.value1}}</span>
              </div>
            </template>


          </el-table-column>

        </el-table>

        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>


    </div>

    <el-dialog
      title="批量新增"
      :visible.sync="dialogVisible"
      width="50%" size="tiny">
      <div class="flex_f flex">
        <div class="margin_b_10">需要增加多少菜品？</div>
        <div class="flex_a">
          <el-input v-model="number" style="width: 60px" min="1" max="100" type="number"></el-input>
          <span class="padding_l_10"></span>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="goToAddStore()">确认</el-button>
        </div>
      </div>
    </el-dialog>

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
        dialogVisible:false,
        number:1,
        levelName:'',
        tableWidth: 0,
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''}],
        dataLeft: [],
        dishesName: '',
        dishesList: [{
          storeCode: '83789',
          storeName: '菜品1',
          code: '123',
          category:'菜品品类',
          bank:'太二',
          thirdPartyCoding: [
            {value: '11', value1: '22'},
            {value: '33', value1: '44'},
            {value: '55', value1: '66'}
          ],

        }],
        p: {page: 1, size: 20, total: 0},
      }
    },
    watch: {},
    methods: {
      goToAddStore() {
        if(this.number < 1){
          this.$message('需要最少一家门店');
        }else {
          this.$router.push({path: `/dishesManagement/dishesCategory/addCategory/${this.number}`})
        }
      },
      getPage(page) {
        this.p.page = page;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },

      edit() {
        let list = [];
        this.dishesList.forEach((item)=>{
          if(item.select){
            list.push(item.id)
          }
        });

        if(list.length === 0){
          this.$message('请勾选菜品');
        }else {
            this.$router.push(`/dishesManagement/dishesCategory/addCategory/edit`)
        }

      },
      del() {
        let list = [];
        this.dishesList.forEach((item)=>{
          if(item.select){
            list.push(item.id)
          }
        });

        if(list.length === 0){
          this.$message('请勾选菜品');
        }else {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // getApi.delBsOne(list.join(",")).then((res)=>{
            //   if(res.data.errcode === 0){
            //     this.$message({
            //       type: 'info',
            //       message: '删除成功'
            //     });
            //     this.getBsList(this.p,this.getShowStoreTree().levelid);
            //   }
            // })
          }).catch(() => {
            //
          });
        }
      },
      search() {

      },
      add() {
        this.dialogVisible = true
      },



      handleCheckAll(bool) {
        if (bool === true) {
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
      getLeft().then((res) => {
        if (res.data.errcode === 0) {
          //this.showResouce(this.$localStorage.get_s('publicLevelId')?this.$localStorage.get_s('publicLevelId'):res.data.data[0].id);
          this.levelName = res.data.data[0].levelname
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
      Hub.$off("arr");
    }
  }
</script>

<style scoped>


</style>
