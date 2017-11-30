<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
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
        <el-table :data="storeData" border>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号">
            <template scope="scope">
              <div>{{scope.$index}}</div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="APPID">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="account"
                           label="公众号名称">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="time"
                           label="上次授权时间">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="operation"
                           label="操作人">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="操作">
            <template scope="scope">
              <el-button size="mini" type="primary" @click="edit()">修改</el-button>

            </template>
          </el-table-column>

        </el-table>
        <div class="margin_10">
          <el-button type="primary">公众号授权</el-button>
        </div>
        <el-dialog
          title="公众号"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form ref="formRules" :model="form" label-width="100px">
            <el-form-item label="公众号:">
              <el-input v-model="form.code"></el-input>
            </el-form-item>


            <el-form-item label="修改授权:" prop="name">
              <el-button type="primary">公众号授权</el-button>
            </el-form-item>


            <div class="margin_t_10">
              <el-button type="primary">提交</el-button>
              <el-button>重置</el-button>
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
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import {getLeft,getArea} from '../../utility/communApi'
  import getApi from './publicManagement.service'

  export default {
    data() {
      return {
        showAside: false,
        dialogVisible: false,
        tableHeight: 0,
        tableWidth: 0,
        navList: [{name: "基础设置", url: ''}, {name: "公众号管理", url: ''}],

        name: '',
        department: '部门',
        payValue: 2,
        storeName: '',
        storeData: [{
          id: "24u6r3y953",
          account: "s酸菜鱼",
          time: "2017-10-10",
          operation: "aaa"

        }],
        levelId: '',
        dataLeft: [],
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        form: {
          name: '',
          code: '',
          tel: '',
          status: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },

      }
    },
    watch: {},
    methods: {
      nodeClick(data, data1, data2) {
        console.log(data.levelname)
        this.levelId = data.id;
        //this.showResouce(data.levelname, data.id)

      },
      edit() {
        this.dialogVisible = true
      },
      getName(name) {
        this.name = name
      },

      addAccount() {
        this.dialogVisible = true
      },
      batchAdd() {
        this.$router.push('/storeManage/storeList/newAddStore')
      },
      removeDomain(item) {
        var index = this.form.thirdPartyCoding.indexOf(item)
        if (index !== -1) {
          this.form.thirdPartyCoding.splice(index, 1)
        }
      },
      addDomain() {
        this.form.thirdPartyCoding.push({
          value: '',
          key: Date.now()
        });
      },


      getOneList() {
        this.$router.push('/storeManage/storeList/seeTheStore')
      },

      editGroup(item) {
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },


    },
    created() {
      this.token = this.$localStorage.get('token');

      getLeft(this.token).then((res) => {
        this.dataLeft = res.data.data
      });

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

  /*不能有相同的class名*/
  .myStore-enter-active, .myStore-leave-active {
    transition: all .5s;
  }

  .myStore-enter, .myStore-leave-to {
    right: -280px;
  }
</style>
