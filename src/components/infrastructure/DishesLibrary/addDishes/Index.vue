<template>
  <div>

    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>

    <div class="margin_t_10 width_100">
      <el-table :data="dishesData" border :height="tableHeight" style="width: 100%;">
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品名称" width="200">
          <template slot-scope="scope">
            <el-input :class="{isInput:scope.row.nameClass === true}" v-model="scope.row.product_name"
                      @change="myChange(scope.row,'product_name','nameClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <!--<el-table-column label-class-name="table_head" header-align="center" align="center" label="门店编码" width="200">-->
        <!--<template scope="scope">-->
        <!--<el-input :class="{isInput:scope.row.codeClass === true}" v-model="scope.row.storecodeid"-->
        <!--@change="myChange(scope.row,'storecodeid','codeClass')" placeholder="请输入内容"></el-input>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="第三方编码" width="420">
          <template slot-scope="scope">
            <div v-for="(domain, index) in scope.row.productcodes" class="flex_a padding_10">
              <div style="width:150px">
                <el-input v-model="domain.name" placeholder="请输入名称"></el-input>
              </div>
              <div class="m-rank">
                <div class="m-rank-child"></div>
              </div>
              <div style="width:150px">
                <el-input v-model="domain.providerid" placeholder="请输入编码"></el-input>
              </div>
              <div class="flex_sb" style="width:80px">
                <div class="m-storeCode margin_l_10" @click="addDomain(scope.row.productcodes)">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </div>
                <div v-if="(scope.row.productcodes.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                     @click.prevent="removeDomain(scope.row.productcodes,index)">
                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="所属品牌" width="200">
          <template slot-scope="scope">
            <el-select :class="{isSelected:scope.row.brandClass === true}" v-model="scope.row.levelid"
                       @change="myChange(scope.row,'levelid','brandClass')" placeholder="请选择">
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.levelname"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>


        <el-table-column label-class-name="table_head" header-align="center" align="center" label="参考价格" width="200">
          <template slot-scope="scope">
            <el-input :class="{isInput:scope.row.priceClass === true}" v-model="scope.row.price"
                      @change="myChange(scope.row,'price','priceClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" label="图片" width="600">
          <template slot-scope="scope">
            <div class="flex_r">
              <el-upload
                class="avatar-uploader margin_r_10"
                :action="$updateUrl"
                name='filename'
                :show-file-list="false"
                :on-success="(res, file,list)=>{
                  return handleAvatarSuccess1(res, file,list,scope.row)
                }"
                :before-upload="beforeAvatarUpload">
                <img v-if="scope.row.imgurl_1" :src="scope.row.imgurl_1" class="avatar">
                <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
              </el-upload>

              <el-upload
                class="avatar-uploader margin_r_10"
                :action="$updateUrl"
                name='filename'
                :show-file-list="false"
                :on-success="(res, file,list)=>{
                  return handleAvatarSuccess2(res, file,list,scope.row)
                }"
                :before-upload="beforeAvatarUpload">
                <img v-if="scope.row.imgurl_2" :src="scope.row.imgurl_2" class="avatar">
                <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
              </el-upload>

              <el-upload
                class="avatar-uploader"
                :action="$updateUrl"
                name='filename'
                :show-file-list="false"
                :on-success="(res, file,list)=>{
                  return handleAvatarSuccess3(res, file,list,scope.row)
                }"
                :before-upload="beforeAvatarUpload">
                <img v-if="scope.row.imgurl_3" :src="scope.row.imgurl_3" class="avatar">
                <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
              </el-upload>
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
  import getApi from "./addDishes.service"
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton
    },

    data() {
      return {
        tableHeight: 0,
        navList: [{name: "菜品库", url: '/infrastructure/DishesLibrary'}, {name: "新增菜品", url: ''}],
        brandList: [],
        dishesData: [],
        va: "",
        index: ''
      }
    },
    watch: {},
    methods: {


      myChange(map, name, className, str) {
        console.log(map);

        if (map[name] !== "") {
          map[className] = false
        } else {
          map[className] = true
        }
      },
      checkSubmit() {
        for (let map of this.dishesData) {
          if (map.product_name === "") {
            map.nameClass = true
          }
          if (map.levelid === "") {
            map.brandClass = true
          }

          if (map.price === "") {
            map.priceClass = true
          }

        }
      },
      submitFrom() {
        this.checkSubmit();
        outer:
          for (let map of this.dishesData) {
            if (map.product_name === "" || map.price === "" || map.levelid === "") {
              this.va = "";
              break
            }

//            for (let map1 of map.productcodes) {
//              if (map1.name === "" || map1.providerid === "") {
//                this.va = "";
//                break outer
//              }
//              this.va = "ok"
//            }
            this.va = "ok"
          }
        console.log(this.va)


        if (this.va === "ok") {

          this.dishesData.forEach((item) => {
            delete item.nameClass;
            delete item.brandClass;
            delete item.priceClass;
          });

          console.log(this.dishesData);
          getApi.addDishes(this.$route.params.levelid, this.dishesData).then((res) => {
            console.log(res)
            if (res.data.errcode === 0) {
              this.$alert('添加成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(-1)
                }
              })
            }

          })
        } else {
          this.$message({
            type: 'warning',
            message: '请填写所需选项'
          });
        }

      },

      removeDomain(list, i) {
        list.splice(i, 1)
      },
      addDomain(list) {
        list.push({name: '',  providerid: ''});
      },


      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;
        let img;

        if (isJPG || isPNG) {
          img = true
        } else {
          img = false;
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return img && isLt5M;
      },
      handleAvatarSuccess1(res, file,list,item) {
        item.imgurl_1 = file.response.data.file_url;
      },
      handleAvatarSuccess2(res, file,list,item) {
        item.imgurl_2 = file.response.data.file_url;
      },
      handleAvatarSuccess3(res, file,list,item) {
        item.imgurl_3 = file.response.data.file_url;
      },
    },
    created() {
      for (let i = 0; i < this.$route.params.number; i++) {
        this.dishesData.push({
          product_name: "",
          nameClass: false,
          levelid: '',//品牌
          brandClass: false,
          price: "",
          priceClass: false,
          imgurl_1:'',
          imgurl_2:'',
          imgurl_3:'',
          material: '',
          productcodes: [
            {name: '',  providerid: ''}
          ],
        })

      }

      getApi.getBrand(this.$route.params.levelid).then((res) => {
        console.log(res)
        this.brandList = res.data.data
      })
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
