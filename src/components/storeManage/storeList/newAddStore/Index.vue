<template>
  <div>

    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>

    <div class="flex_sb">
      <div class="flex_1">

      </div>
      <div class="flex_1 flex_ce">

        <el-button type="primary" @click="submitFrom()">保存</el-button>
      </div>
    </div>

    <div class="margin_t_10 width_100">
      <el-table :data="storeData" border :height="tableHeight" style="width: 100%;">
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="门店名称" width="200">
          <template scope="scope">
            <el-input :class="{isInput:scope.row.nameClass === true}" v-model="scope.row.name" @change="myChange(scope.row,'name','nameClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="门店编码" width="200">
          <template scope="scope">
            <el-input  :class="{isInput:scope.row.codeClass === true}" v-model="scope.row.code" @change="myChange(scope.row,'code','codeClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="第三方编码" width="420">
          <template scope="scope">
            <div v-for="(domain, index) in scope.row.thirdPartyCoding" class="flex_a padding_10">
              <div style="width:150px">
                <el-input :class="{isInput:domain.valueClass === true}" v-model="domain.value" @change="myChange(domain,'value','valueClass')" placeholder="请输入内容"></el-input>
              </div>
              <div class="m-rank">
                <div class="m-rank-child"></div>
              </div>
              <div style="width:150px">
                <el-input :class="{isInput:domain.value1Class === true}" v-model="domain.value1" @change="myChange(domain,'value1','value1Class')" placeholder="请输入内容"></el-input>
              </div>
              <div class="flex_sb" style="width:80px">
                <div class="m-storeCode margin_l_10" @click="addDomain(scope.row.thirdPartyCoding)">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </div>
                <div v-if="(scope.row.thirdPartyCoding.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                     @click.prevent="removeDomain(scope.row.thirdPartyCoding,index)">
                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="所属品牌" width="200">
          <template scope="scope">
            <el-select :class="{isSelected:scope.row.brandClass === true}" v-model="scope.row.brand" @change="myChange(scope.row,'brand','brandClass')" placeholder="请选择">
              <el-option
                v-for="item in brandList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="门店地址" width="600">
          <template scope="scope">
            <div class="flex_a">
              <el-select :class="{isSelected:scope.row.provinceClass === true}" v-model="scope.row.province" @change="myChange(scope.row,'province','provinceClass','isProvince')" placeholder="请选择省">
                <el-option
                  v-for="item in provinceList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              <div class="margin_l_10">
                <el-select :class="{isSelected:scope.row.cityClass === true}" v-model="scope.row.city" @change="myChange(scope.row,'city','cityClass','isCity')" placeholder="请选择市">
                  <el-option
                    v-for="item in scope.row.cityList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </div>
              <div class="margin_l_10">
                <el-select :class="{isSelected:scope.row.areaClass === true}" v-model="scope.row.area" @change="myChange(scope.row,'area','areaClass')" placeholder="请选择区">
                  <el-option
                    v-for="item in scope.row.areaList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="margin_l_10">
                <el-input :class="{isInput:scope.row.addressClass === true}" v-model="scope.row.address"  @change="myChange(scope.row,'address','addressClass')" placeholder="详细地址"></el-input>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="门店电话" width="200">
          <template scope="scope">
            <el-input :class="{isInput:scope.row.telClass === true}" v-model="scope.row.tel" @change="myChange(scope.row,'tel','telClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作">
          <template scope="scope">
            <!--<i class="fa fa-plus-circle m-storeCode" aria-hidden="true"></i>-->
            <!--<i class="el-icon-delete m-storeCode" aria-hidden="true"></i>-->
            <i v-if="storeData.length === scope.$index+1" class="el-icon-plus m-storeCode" aria-hidden="true"
               @click="addRow()"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--<div>-->
    <!--<xo-pagination></xo-pagination>-->
    <!--</div>-->
  </div>
</template>

<script>
import areaList from "../../../utility/areaData"
  export default {
    components: {

    },

    data() {
      return {
        tableHeight: 0,
        navList: [{name: "门店管理", url: ''}, {name: "新增门店", url: ''}],
        brandList: [{
          value: 1,
          label: '品牌1'
        }, {
          value: 2,
          label: '品牌2'
        }],
        value: '',
        provinceList: [],

        storeName: '',
        storeData: [{
          name: "",
          nameClass:false,
          code: '',
          codeClass:false,
          brand: '',
          brandClass:false,
          province:"",
          provinceClass:false,
          city:"",
          cityList:[],
          cityClass:false,
          area:"",
          areaList:[],
          areaClass:false,
          address:"",
          addressClass:false,
          tel: "",
          telClass:false,
          thirdPartyCoding: [
            {value: '',valueClass:false, value1: '',value1Class:false}
          ],
        }],

        va:""
      }
    },
    watch: {

    },
    methods: {
      myChange(map,name,className,str){
        if(str === 'isProvince'){
          areaList.forEach((data)=>{
            if(data.name === map.province){
              this.$set(map,"city",'');
              this.$set(map,"area",'');
              this.$set(map,"cityList",data.city);
              this.$set(map,"areaList",[]);
            }
          })
        }
        if(str === 'isCity' && map.city !== ""){
          map.cityList.forEach((data)=>{
            if(data.name === map.city){
              this.$set(map,"area",'');
              this.$set(map,"areaList",data.area);
            }
          })
        }

        if(map[name] !== ""){
          map[className] = false
        }else {
          map[className] = true
        }
      },
      checkSubmit(){
        for(let map of this.storeData){
          if (map.name === "") {
           map.nameClass = true
          }
          if (map.code === "") {
            map.codeClass = true
          }
          if (map.brand === "") {
            map.brandClass = true
          }
          if (map.province === "") {
            map.provinceClass = true
          }
          if (map.city === "") {
            map.cityClass = true
          }
          if (map.area === "") {
            map.areaClass = true
          }
          if (map.address === "") {
            map.addressClass = true
          }
          if (map.tel === "") {
            map.telClass = true
          }
          for(let map1 of map.thirdPartyCoding){
            if (map1.value === "") {
              map1.valueClass = true
            }
            if (map1.value1 === "") {
              map1.value1Class = true
            }
          }
        }
      },
      submitFrom() {
        this.checkSubmit();
        outer:
        for(let map of this.storeData){
          if (map.name === "" || map.code === "" || map.brand === "" || map.province === "" || map.city === "" || map.area === "" || map.address === "" || map.tel === "") {
            this.va = "";
            break
          }

          for(let map1 of map.thirdPartyCoding){
            if (map1.value === "" || map1.value1 === "") {
              this.va = "";
              break outer
            }
            this.va = "ok"
          }
        }

        console.log(this.va )
      },

      addRow() {
        this.storeData.push({
          name: "",
          nameClass:false,
          code: '',
          codeClass:false,
          brand: '',
          brandClass:false,
          province:"",
          provinceClass:false,
          city:"",
          cityClass:false,
          area:"",
          areaClass:false,
          address:"",
          addressClass:false,
          tel: "",
          telClass:false,
          thirdPartyCoding: [
            {value: '',valueClass:false, value1: '',value1Class:false}
          ],
        })
      },
      removeDomain(list, i) {
        list.splice(i, 1)
      },
      addDomain(list) {
        list.push({value: '',valueClass:false, value1: '',value1Class:false});
      },

      getOneList() {
        //this.$router.push('/storeManage/storeList/seeTheStore')
        console.log(document.querySelectorAll('#all span input'))
      },
      edit() {

      },
      del() {

      },
    },
    created() {
      this.provinceList = areaList




    },
    mounted() {

    },
    updated() {

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
