<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">

        <!--<el-tree-->
          <!--:data="dataLeft"-->
          <!--:props="defaultProps"-->
          <!--@node-click="nodeClick"-->
          <!--node-key="id"-->
          <!--default-expand-all-->
          <!--:highlight-current="true"-->
          <!--:expand-on-click-node="false"-->
          <!--:filter-node-method="filterNode"-->
          <!--ref="tree2"-->
        <!--&gt;-->
        <!--</el-tree>-->


        <public-tree :data='dataLeft' :count=0 style="width: max-content;"></public-tree>
      </div>

      <div class="padding_l_10 width_100" v-show="getTreeArr['列表']">
        <el-table :data="storeData" border>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号" width="70">
            <template slot-scope="scope">
              <div>{{scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="authorizer_appid" label="APPID">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="nick_name"
                           label="公众号名称">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="updated_at"
                           label="上次授权时间">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="op_manage"
                           label="操作人">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="操作" width="70">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>

            </template>
          </el-table-column>

        </el-table>
        <div class="margin_10">
          <el-button type="primary" @click="auth()" :disabled="type !== 4">公众号授权</el-button>
        </div>
        <el-dialog
          title="公众号"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form ref="formRules" :model="form" label-width="100px">
            <el-form-item label="公众号:">
              <el-input v-model="form.code" disabled></el-input>
            </el-form-item>


            <el-form-item label="修改授权:" prop="name">
              <el-button type="primary" @click="auth()">公众号授权</el-button>
            </el-form-item>


            <div class="margin_t_10">
              <!--<el-button type="primary">提交</el-button>-->
              <!--<el-button>重置</el-button>-->
            </div>
          </el-form>
        </el-dialog>
        <footer>
          <!--<xo-pagination></xo-pagination>-->
        </footer>

      </div>
    </div>


  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {getLeft} from '../../utility/communApi'
  import getApi from './publicManagement.service'
  import publicTree from './publicTree'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {
      publicTree,
    },
    data() {
      return {
        showAside: false,
        dialogVisible: false,
        tableHeight: 0,

        navList: [{name: "基础设置", url: ''}, {name: "公众号管理", url: ''}],
        name: '',
        storeName: '',
        storeData: [],
        dataLeft: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        form: {
          code: '',
        },
        type:'',
      }
    },
    watch: {

    },
    methods: {
      ...mapActions(['setPublicLevelId','setTreeArr']),
      ...mapGetters(['getPublicLevelId']),
      filterNode(value, data) {

        // if (!value) return true;
         return data.type !== value;
      },

      auth(){
        getApi.threeAuthorize(this.$localStorage.get_s('publicLevelId')).then((res)=>{
          window.location.href = res.data.data
        })
      },
      nodeClick(data, data1, data2) {

        this.setPublicLevelId({levelId:data.id});
        this.showResouce(data.id)

      },
      edit(row) {
        this.form.code = row.nick_name;
        this.dialogVisible = true
      },
      recur(data) {
        data.forEach((map) => {
          if(map.id === this.$localStorage.get_s('publicLevelId')){
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
      showResouce(id){
        getApi.getGzhInfo(id).then((res)=>{
          if(res.data.errcode === 0){
            this.storeData = res.data.data
          }
        })
      }

    },
    created() {
      getLeft('x1').then((res) => {
        if(res.data.errcode === 0){
          this.showResouce(this.$localStorage.get_s('publicLevelId')?this.$localStorage.get_s('publicLevelId'):res.data.data[0].id);
          this.dataLeft = res.data.data;
          this.recur(this.dataLeft);
          this.recurSelected(this.dataLeft, this.$localStorage.get_s('publicLevelId')?this.$localStorage.get_s('publicLevelId'):res.data.data[0].id)
        }
      });

    },
    mounted() {
      Hub.$on('showAddPub', (e) => {
        this.levelName = e.levelName;
        this.type = e.type;
        this.$localStorage.set_s('publicLevelId',e.levelid);
        this.showResouce(e.levelid);
        this.recurSelected(this.dataLeft, e.levelid)
      });
      Hub.$emit('mountedOk','mountedOk');

    },
    destroyed(){
      Hub.$off("showAddPub");
    },
    updated() {
      //this.$refs.tree2.filter(5);

      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
  }
</script>

<style lang="less" scoped>

  .myStore {
    position: absolute;
    top: 40%;
    right: 0;
    background: white;
    z-index: 100;
    border-radius: 10px;
    border: 1px solid #E5EBF4
  }

  /*不能有相同的class名*/
  .myStore-enter-active, .myStore-leave-active {
    transition: all .5s;
  }

  .myStore-enter, .myStore-leave-to {
    right: -280px;
  }
</style>
