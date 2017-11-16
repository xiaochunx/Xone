<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <!--<xo-nav-path :navList="navList"></xo-nav-path>-->
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="addDishes()">+新增菜品</el-button>
          <el-button size="small">批量编辑</el-button>
          <el-button size="small">批量删除</el-button>
          <el-button size="small" @click="handle()">下发</el-button>
        </div>
        <div class="flex_1 flex_ec">
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="margin_l_10 margin_r_10" style="width: 200px">
            <el-input size="small" v-model="storeName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small">从菜品库中导入</el-button>
        </div>
      </div>

    </div>


      <el-table :data="storeData" border :height="tableHeight">
        <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"

                         width="100">
          <template scope="scope">
            <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>

          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                         label="菜品编码"
                         width="100"></el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                         label="名称"></el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="所属品牌"
        ></el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
          <template scope="scope">
            <el-button size="small" type="primary" @click.stop.self="getOneList()">查看</el-button>
            <el-button size="small" @click.stop.self="edit()">编辑</el-button>
            <el-button size="small" type="danger" @click.stop.self="del()">删除</el-button>

          </template>
        </el-table-column>
      </el-table>


    <footer>
      <xo-pagination></xo-pagination>
    </footer>


  </div>
</template>

<script>

  //import xoNavPath from '../NavPath.vue'
  import {getScrollHeight} from '../../utility/getScrollHeight'

  export default {
    components: {
     // xoNavPath
    },
    data() {
      return {
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''}, {name: "菜品库", url: ''}],
        value: '',
        selectedAll: false,
        selectedList: [],//选择了的数组
        options: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: 'store1'
        }],

        storeName: '',
        storeData: [{
          select:false,
          storeCode: '837893',
          storeName: '炳胜（马场店）',
          status: '品牌'
        }, {
          select:false,
          storeCode: '837894',
          storeName: '炳胜（马场店）',
          status: '品牌'
        }],

      }
    },
    watch: {

    },
    methods: {
      addDishes(){
        this.$router.push('/dishesManagement/takeawayDishes/addDishes')
      },
      handle() {
        console.log(this)

      },
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.storeData.forEach((data) => {
            data.select = true
          })
        } else {
          this.storeData.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count =0;
        this.storeData.forEach((data) => {
          if (data.select === true) {
            count += data.select*1
          }
        });

        if(count === this.storeData.length){
          this.selectedAll = true;
          this.$nextTick(()=>{
            let all = document.querySelector('#all span');
            all.classList.add('is-checked');
            let allInput = document.querySelector('#all span input');
            allInput.checked = true
          })
        }else {
          this.selectedAll = false;
          this.$nextTick(()=>{
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
              'class': {
              },
                on: {
                  change: this.handleCheckAll,
                  input: (event)=> {
                  }
                }
              }, ['全选']
            )
          ]
        );

      },

      getOneList() {
        //this.$router.push('/storeManage/storeList/seeTheStore')
      },
      edit() {

      },
      del() {

      },
      append(store, data) {
        console.log(store)
        console.log(data)

        store.append({id: id++, label: 'testtest' + id, children: []}, data);
      },
    },
    created() {
      this.storeData.forEach((map) => {
        this.$set(map, 'select', false)
      })
    },
    mounted() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>

<style scoped lang="less">
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


</style>
