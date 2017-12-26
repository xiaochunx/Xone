<template>
  <div>

    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>

    <div>
      <el-table :data="dishesList" border style="width: 100%;">

        <el-table-column label-class-name="table_head" header-align="center" align="center" width="80" label="序号">

          <template slot-scope="scope">
            <div>{{scope.$index + 1}}</div>
          </template>

        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" width="100" label="排序">

          <template slot-scope="scope">
            <el-input v-model="scope.row.order"></el-input>
          </template>

        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品品类">
          <template slot-scope="scope">
            <el-input v-model="scope.row.storeName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                         label="品类编码">

          <template slot-scope="scope">
            <el-input v-model="scope.row.storeName"></el-input>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="品牌" width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.category" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

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



      </el-table>

      <div class="flex margin_t_10">
        <el-button type="primary" @click="submitFrom()">保存</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </div>


  </div>
</template>
<script>

  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
    data() {
      return {
        navList: [{name: "菜品管理", url: ''}, {name: "菜品品类", url: '/dishesManagement/dishesCategory'}, {name: "新增品类", url: ''}],
        categoryList: [{
          value: 1,
          label: '品类1'
        }, {
          value: 2,
          label: '品类2'
        }],
        dishesList: [],

      }
    },
    components: {
      ElButton

    },
    methods: {

      removeDomain(list, i) {
        list.splice(i, 1)
      },
      addDomain(list) {
        list.push({value: '', value1: ''});
      },


      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){

      if(this.$route.params.number === 'edit'){
        for (let i = 0; i < 2; i++) {
          this.dishesList.push({
            order: i + 1,
            storeName: '',
            category: '',
            thirdPartyCoding: [
              {value: '', value1: ''}
            ]
          })

        }
      }else {
        for (let i = 0; i < this.$route.params.number; i++) {
          this.dishesList.push({
            order: i + 1,
            storeName: '',
            category: '',
            thirdPartyCoding: [
              {value: '', value1: ''}
            ]
          })

        }
      }



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
