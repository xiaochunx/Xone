<template>
  <div>

    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>

    <div>
      <el-table :data="dishesList" border style="width: 100%;">

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="排序">

          <template slot-scope="scope">
            <el-input v-model="scope.row.order"></el-input>
          </template>

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品名称"
                         width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.storeName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                         label="菜品编码"
                         width="120"></el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center"
                         label="第三方编码" width="420">


          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.thirdPartyCoding" class="flex_a padding_10">
              <div style="width:150px">
                <el-input v-model="item.value" placeholder="请输入名称"></el-input>
              </div>
              <div class="m-rank">
                <div class="m-rank-child"></div>
              </div>
              <div style="width:150px">
                <el-input v-model="item.value" placeholder="请输入编码"></el-input>
              </div>
              <div class="flex_sb" style="width:80px">
                <div class="m-storeCode margin_l_10" @click="addDomain(scope.row.thirdPartyCoding)">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </div>
                <div v-if="index !== 0" class="m-storeCode margin_l_10"
                     @click.prevent="removeDomain(scope.row.thirdPartyCoding,index)">
                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </template>


        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="所属品类" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.category" placeholder="请选择">
              <el-option
                v-for="item in scope.row.categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="price" label="参考价格"
                         width="120">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品图片"
                         width="140">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.imgList">
              <el-popover
                placement="right"
                width="200"
                trigger="hover"
              >
                <img src="../../../../assets/login-ky-login-small.png" alt="" style="width: 200px;height: 200px">
                <img slot="reference" src="../../../../assets/login-ky-login-small.png" alt=""
                     style="width: 100px;height: 100px">
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品详情"
                         width="120">
          <template slot-scope="scope">

            <el-input v-model="scope.row.details"></el-input>

          </template>

        </el-table-column>


        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品规格" width="360">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.spec" class="flex_a margin_b_10">
              <el-select v-model="item.value" placeholder="请选择" style="width:120px">
                <el-option
                  v-for="item1 in specList"
                  :key="item1.id"
                  :label="item1.name"
                  :value="item1.id">
                </el-option>
              </el-select>
              <div class="margin_l_10" style="width:120px">
                <el-input v-model="item.value1" placeholder="请输入内容"></el-input>
              </div>

              <div class="m-storeCode margin_l_10" @click="addDomain2(scope.row.spec)">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </div>

              <div v-if="index !== 0" class="m-storeCode margin_l_10"
                   @click.prevent="removeDomain2(scope.row.spec, index)">
                <i class="fa fa-minus-circle" aria-hidden="true"></i>
              </div>
            </div>
          </template>
        </el-table-column>


        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品属性"
                         width="300">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.attr" class="flex_a margin_b_10">
              <div class="flex_f">
                <el-select v-model="item.value" placeholder="请选择" @change="changeAttr(item)" style="width:120px">
                  <el-option
                    v-for="item1 in attrList"
                    :key="item1.id"
                    :label="item1.name"
                    :value="item1.id">
                  </el-option>
                </el-select>

                <el-checkbox-group v-model="item.checkList">
                  <div v-for="(item1,index) in item.options" >
                    <el-checkbox v-if="item1.id === item.value " :label="item2.id" v-for="(item2,index) in item1.checkList2" :key="item2.id">{{item2.name}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>

              <div class="m-storeCode margin_l_10" @click="addDomain3(scope.row.attr)">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </div>

              <div v-if="index !== 0" class="m-storeCode margin_l_10"
                   @click.prevent="removeDomain3(scope.row.attr, index)">
                <i class="fa fa-minus-circle" aria-hidden="true"></i>
              </div>
            </div>
          </template>

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="餐盒配置"
                         width="360">

          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.box" class="flex_a margin_b_10">
              <el-select v-model="item.id" placeholder="请选择" style="width:120px">
                <el-option
                  v-for="item1 in boxList"
                  :key="item1.id"
                  :label="item1.name"
                  :value="item1.id">
                </el-option>
              </el-select>
              <div class="margin_l_10" style="width:120px">
                <el-input v-model="item.value1" placeholder="请输入内容"></el-input>
              </div>

              <div class="m-storeCode margin_l_10" @click="addDomain4(scope.row.box)">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
              </div>

              <div v-if="index !== 0" class="m-storeCode margin_l_10"
                   @click.prevent="removeDomain4(scope.row.box, index)">
                <i class="fa fa-minus-circle" aria-hidden="true"></i>
              </div>
            </div>
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


    </div>


  </div>
</template>

<script>


  import Hub from '../../../utility/commun'

  import {mapActions, mapGetters} from 'vuex';
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    components: {
      ElInput

    },
    data() {
      return {
        navList: [{name: "菜品管理", url: '/dishesManagement/storeDishesManage'}, {name: "编辑菜品", url: ''}],


        attrList: [{id: 1, name: '辣度'}, {id: 2, name: '甜度'}, {id: 3, name: '口味'}],
        boxList:[{
          id: 1,
          name: '大杯'
        }, {
          id: 2,
          name: '中杯'
        }, {
          id: 3,
          name: '小杯'
        }],
        specList: [{
          id: 1,
          name: '品类1'
        }, {
          id: 2,
          name: '品类2'
        }],
        dishesList: [{
          order: '1',
          storeCode: '83789',
          storeName: '菜品1',
          price: "1角",
          status: '在售中',
          imgList: [{img: '../../../assets/login-ky-login-small.png'}],
          category: 2,
          details: '好吃的',
          categoryList: [{
            value: 1,
            label: '品类1'
          }, {
            value: 2,
            label: '品类2'
          }],
          thirdPartyCoding: [
            {value: '11', value1: '22'},
            {value: '33', value1: '44'},
            {value: '55', value1: '66'}
          ],


          spec: [
            {value: '大份', value1: '￥90.00'},
            {value: '中份', value1: '￥80.00'},
            {value: '小份', value1: '￥70.00'},
          ],

          attr: [
            {
              value: 1,  checkList: [1], options: [
                {id: 1, checkList2: [{id: 1, name: '小辣'}, {id: 2, name: '中辣'}, {id: 3, name: '大辣'}]},
                {id: 2, checkList2: [{id: 1, name: '小甜'}, {id: 2, name: '中甜'}, {id: 3, name: '大甜'}]},
                {id: 3, checkList2: [{id: 1, name: '小味'}, {id: 2, name: '中味'}, {id: 3, name: '大味'}]},
              ]
            },
            {
              value: 2,  checkList: [3], options: [
                {id: 1, checkList2: [{id: 1, name: '小辣'}, {id: 2, name: '中辣'}, {id: 3, name: '大辣'}]},
                {id: 2, checkList2: [{id: 1, name: '小甜'}, {id: 2, name: '中甜'}, {id: 3, name: '大甜'}]},
                {id: 3, checkList2: [{id: 1, name: '小味'}, {id: 2, name: '中味'}, {id: 3, name: '大味'}]},
              ]
            },

          ],

          box: [
              {id: 1, value1: '¥18.99'},
              {id: 3, value1: '¥17.99'},
            ],
          plat: [
            {
              value: '美团',
              value1: 'MT鱼香肉丝',
              value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {
                value: '小份',
                value1: '￥70.00'
              },]
            },
            {
              value: '饿了么',
              value1: 'ele鱼香肉丝',
              value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {
                value: '小份',
                value1: '￥70.00'
              },]
            },
            {
              value: '百度',
              value1: 'BD鱼香肉丝',
              value2: [{value: '大份', value1: '￥90.00'}, {value: '中份', value1: '￥80.00'}, {
                value: '小份',
                value1: '￥70.00'
              },]
            }
          ]
        }],

      }
    },
    watch: {},
    methods: {
      changeAttr(changeAttr){
        changeAttr.checkList = []
      },

      removeDomain(list, i) {
        list.splice(i, 1)
      },
      addDomain(list) {
        list.push({value: '', value1: ''});
      },

      removeDomain2(list, i) {
        list.splice(i, 1)
      },
      addDomain2(list) {
        list.push({value: '', value1: ''});
      },
      removeDomain3(list, i) {
        list.splice(i, 1)
      },
      addDomain3(list) {
        list.push(     {
          value: '',  checkList: [], options: [
            {id: 1, checkList2: [{id: 1, name: '小辣'}, {id: 2, name: '中辣'}, {id: 3, name: '大辣'}]},
            {id: 2, checkList2: [{id: 1, name: '小甜'}, {id: 2, name: '中甜'}, {id: 3, name: '大甜'}]},
            {id: 3, checkList2: [{id: 1, name: '小味'}, {id: 2, name: '中味'}, {id: 3, name: '大味'}]},
          ]
        });
      },
      removeDomain4(list, i) {
        list.splice(i, 1)
      },
      addDomain4(list) {
        list.push({id: '', value1: ''});
      },
    },
    created() {

      this.dishesList.forEach((map) => {
        this.$set(map, 'select', false)
      })

    },
    mounted() {

    }


  }
</script>


<style scoped lang="less">
  .m-rank {
    width: 40px;
    .m-rank-child {
      line-height: 18px;
      border-bottom: 1px solid #000;
    }
  }

  .m-storeCode {
    font-size: 30px;
  }
</style>
