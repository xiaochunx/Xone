<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <span>选择来源平台</span>
          <el-select v-model="plan_id" clearable placeholder="选择来源平台" size="small">
            <el-option
              v-for="item in planList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>

          <span class="margin_l_10">推送状态</span>
          <el-select v-model="state_id" clearable placeholder="选择来源平台" size="small">
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>

          <el-button class="margin_l_10" size="small" @click="">批量设置推送状态</el-button>

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
        <el-table :data="storeData" border :height="tableHeight" @select-all="handleSelectionChange"
                  ref="multipleTable">
          <el-table-column header-align="center" align="center"
                           type="selection"
                           label-class-name="mySelect"
                           width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="base_store_id"
                           label="门店编码"
                            ></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storename"
                            label="门店名称"></el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" label="来源平台">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="推送状态"
                           width="120">
            <template slot-scope="scope">

              <el-select v-model="state_id" clearable placeholder="选择来源平台" size="small">
                <el-option
                  v-for="item in stateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>

            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" label="外卖门店编码" width="200">

          </el-table-column>
        </el-table>

        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>

    </div>


    <el-dialog
      title=""
      :visible.sync="dialogVisible3"
      width="50%" size="tiny">

    </el-dialog>



  </div>
</template>

<script>
  import {getLeft} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {mapActions, mapGetters} from 'vuex';
  import {oneTwoApi} from '@/api/api.js';

  export default {
    components: {},
    data() {
      return {
        planList:[{id: 1, name: '美团'},{id: 2, name: '饿了么'},{id: 3, name: '百度'}],
        plan_id:'',
        stateList:[{id: 1, name: '推送中'},{id: 2, name: '配置中'},{id: 3, name: '未配置'}],
        state_id:'',
        storeStatusValue: false,

        tableWidth: 0,
        tableHeight: 0,
        dialogVisible1: false,
        dialogVisible3: false,

        navList: [{name: "推送状态", url: ''}],
        data5: [],
        storeName: '',

        storeData: [],
        p: {page: 1, size: 20, total: 0},
        multipleSelection: [],
        baseStore: {},//点击新增时的门店
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setPushStateLevelId']),
      ...mapGetters(['getPushStateLevelId']),


      close2() {
        for (let map in this.baseStore) {
          this.baseStore[map].forEach((item) => {
            item.OK = false
          })
        }
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      getOne(id) {
        this.$router.push({path: `/x2OperationScheme/storeManagement/takeOut/${id}`})

      },
      showDishes() {
        this.dialogVisible3 = true
      },
      getPage(page) {
        this.p.page = page;
        this.showResouce(this.p, this.levelId, this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce(this.p, this.levelId, this.searchName);
      },

      del(base_store_id) {
        this.$confirm(
          '删除后对应的外卖平台门店也将关闭、客人无法下单。确认删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          //删除门店接口
          let params = {
            redirect: "x2.store.delStore",
            storeId: base_store_id,
          };
          oneTwoApi(params).then((res) => {
            if (res.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.showResouce(this.p, this.getPushStateLevelId())
            }
          })

        }).catch(() => {
          //
        });

      },
      search() {

      },




      handleChecked(data) {
        let count = 0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });
        let list = this.storeData.filter((item) => {
          return item.select === true
        });
        let list1 = [];
        list.forEach((item) => {
          list1.push(item.id)
        });
        this.multipleSelection = list1;
        if (count === this.storeData.length) {
          list.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })

        } else {
          this.$refs.multipleTable.clearSelection();

        }

      },
      handleSelectionChange(val) {
        let list = [];
        val.forEach((item) => {
          list.push(item.id)
        });
        this.multipleSelection = list;
        if (val.length === this.storeData.length) {
          this.storeData.forEach((map) => {
            this.$set(map, 'select', true)
          });
        } else {
          this.storeData.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
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
      showLevel() {
        getLeft('x2').then((res) => {
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            if (this.getPushStateLevelId() === '') {
              this.setPushStateLevelId({levelId: res.data.data[0].id});
            }

            this.showResouce(this.p, this.getPushStateLevelId());
            this.recur(this.data5);
            this.recurSelected(this.data5, this.getPushStateLevelId())
          } else {

          }
        })

      },
      showResouce(p, levelId, storeName = "") {
        //获取门店列表
        let params = {
          redirect: "x2.store.index",
          levelId: levelId,
          storeName: storeName,
          page: p.page,
          pagesize: p.size,
        };
        oneTwoApi(params).then((res) => {
          if (res.errcode === 0) {
            if(res.data.list.length !== 0){
              res.data.list.forEach((item)=>{
                for (let i in item.wmData) {
                 if(item.wmData[i].poi_status === 0) {
                   item.wmData[i].poi_status = false
                 }else {
                   item.wmData[i].poi_status = true
                 }
                }
              })
            }

            this.storeData = res.data.list;
             this.p.total = res.data.count;
            this.multipleSelection = []
          }
        })



      },
    },
    created() {
      this.showLevel();




    },

    mounted() {
      Hub.$on('showAdd', (e) => {

        this.showResouce(this.p, e.levelid);
        this.setPushStateLevelId({levelId: e.levelid});
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
    destroyed() {
      Hub.$off("showAdd");
    }
  }
</script>

<style scoped>


</style>
