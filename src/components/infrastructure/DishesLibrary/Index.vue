<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="addDishes()">+新增菜品</el-button>
          <el-button size="small" @click="batchEdit()">批量编辑</el-button>
          <el-button size="small" @click="delSelected()">批量删除</el-button>
        </div>
        <div class="flex_1 flex_ec">

          <div class="margin_l_10 margin_r_10" style="width: 200px">
            <el-input size="small" v-model="searchName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small" @click="search()">搜索</el-button>
          <el-button size="small" @click="importXls()">导入</el-button>
        </div>
      </div>

    </div>


    <div class="flex_r">

      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <xo-pub-tree :data='getDishesLibraryTree()' :count=0 style="width: max-content;"></xo-pub-tree>

      </div>
      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">

        <el-table :data="dishesData" border :height="tableHeight" @select-all="handleSelectionChange" ref="multipleTable">
          <el-table-column
            header-align="center" align="center"
            type="selection"
            label-class-name="mySelect"
            width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>

          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                           label="菜品编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="product_name"
                           label="名称"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="level" label="所属品牌"
          ></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="180">
            <template slot-scope="scope">

              <el-button size="small" type="primary" @click="edit(scope.row.id)">编辑</el-button>
              <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>


        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>

      </div>

    </div>

    <!--批量新增-->
    <el-dialog
      title="批量新增"
      :visible.sync="dialogVisible2"
      width="50%" size="tiny">
      <div class="flex_f flex">
        <div class="margin_b_10">请问需要新增多少？</div>
        <div class="flex_a">
          <el-input v-model="number" style="width: 60px" min="1" max="100" type="number"></el-input>
          <span class="padding_l_10"></span>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="goToAddDishes()">确认</el-button>
        </div>
      </div>
    </el-dialog>

    <!--导入菜品-->
    <el-dialog
      title="导入门店"
      :visible.sync="dialogVisible4"
      @open="open4"
      @close="close4"
      width="50%" size="tiny">
      <div class="flex_f flex">

        <div>
          请按照我们提供的标准模板填写信息
          <a style="color: #52CBF8" :href="$xlsDishesUrl">下载标准模板</a>
        </div>

        <div class="margin_t_10">文件中的成员将会被导入至</div>

        <div ref="tree" style="width: 100%;">
          <el-tree
            :data="dataLeft"
            :props="defaultProps"
            @node-click="nodeClickDishes"
            node-key="id"
            default-expand-all
            :highlight-current="true"
            :expand-on-click-node="false"
          >
          </el-tree>
        </div>

        <div class="margin_t_10 width_100">
          <el-upload
            class="upload-demo"
            :action="$updateXlsUrl"
            name="filename"
            :on-change="handleChange"
            :on-success="handleAvatarSuccessXls"
            :on-remove="removeXls"
            :before-upload="beforeAvatarUploadXls"
            :file-list="fileList"
            :multiple="false"
          >
            <el-button size="small" type="primary">选取文件上传</el-button>

          </el-upload>
          <div class="margin_t_10">
            <el-checkbox v-model="isOver">菜品名称相同时，覆盖原的有信息</el-checkbox>
          </div>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible4 = false">取消</el-button>
          <el-button type="primary" @click="submitUploadXls">提交</el-button>

        </div>
      </div>
    </el-dialog>


    <!--批量编辑-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible1"
      size="large"
      width="80%">
      <el-table :data="brandEditList" border style="width: 100%;">
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="门店编码" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.id" disabled placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="菜品名称" width="200">
          <template slot-scope="scope">
            <el-input :class="{isInput:scope.row.nameClass === true}" v-model="scope.row.product_name"
                      @change="myChange(scope.row,'product_name','nameClass')" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="第三方编码" width="420">
          <template slot-scope="scope">
            <div v-for="(domain, index) in scope.row.productcodes" class="flex_r padding_10">
              <div style="width:150px">
                <el-input v-model="domain.name" placeholder="请输入第三方名称"></el-input>
              </div>
              <div class="m-rank">
                <div class="m-rank-child"></div>
              </div>
              <div style="width:150px">
                <el-input v-model="domain.providerid" placeholder="请输入第三方编码"></el-input>
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
        <el-button @click="dialogVisible1 = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './dishesLibrary.service'
  import {getLeft} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import { mapActions,mapGetters } from 'vuex';
  export default {
    components: {},
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    data() {
      return {
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''}, {name: "菜品库", url: ''}],
        selectedAll: false,
        dialogVisible1:false,
        dialogVisible2: false,
        dialogVisible4: false,
        searchName: '',
        dishesData: [],
        p: {page: 1, size: 20, total: 0},
        tableWidth: 0,
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        number: 1,
        firstLevleId:'',
        brandList: [],
        brandEditList:[],
        dataLeft: [],
        fileList: [],
        fileurl: '',
        brandid: '',
        isOver: false,
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setDishesLibraryTree','setDishesLibraryLevelId']),
      ...mapGetters(['getDishesLibraryTree','getDishesLibraryLevelId']),
      search() {
        if (this.searchName === '') {
          this.showProductList(this.p = {page: 1, size: 20, total: 0}, this.getDishesLibraryLevelId())
        } else {
          this.showProductList(this.p = {page: 1, size: 20, total: 0}, this.getDishesLibraryLevelId(), this.searchName)

        }
      },
      submitFrom(){
        outer:
          for (let map of this.brandEditList) {
            if (map.product_name === "" || map.price === "" || map.levelid === "") {
              this.va = "";
              break
            }
            this.va = "ok"
          }
        console.log(this.va)

        if (this.va === "ok") {
          this.brandEditList.forEach((item) => {
            delete item.nameClass;
            delete item.brandClass;
            delete item.priceClass;
            delete item.created_at;
            delete item.updated_at;
            delete item.x2;
          });
          if(this.brandEditList.length === 1){
            getApi.updateProduct(this.brandEditList[0]).then((res) => {
              if (res.data.errcode === 0) {
                this.showProductList(this.p, this.getDishesLibraryLevelId());
                this.$message("操作成功");
                this.dialogVisible1 = false
              }
            })
          }else {
            getApi.batchChange(this.brandEditList).then((res) => {
              if (res.data.errcode === 0) {
                this.showProductList(this.p, this.getDishesLibraryLevelId());
                this.$message("操作成功");
                this.dialogVisible1 = false
              }
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请填写所需选项'
          });
        }
      },
      myChange(map, name, className, str) {
        (map[name] !== "") ? map[className] = false : map[className] = true
      },
      getBrand(){
        getApi.getBrand(this.firstLevleId).then((res) => {
          this.brandList = res.data.data
        });
      },
      edit(id) {
        this.dialogVisible1 = true;
        this.getBrand();
        getApi.getView(id).then((res) => {
          if (res.data.errcode === 0) {
            this.brandEditList = res.data.data;
          }
        })
      },
      batchEdit() {
        let list = [];
        this.dishesData.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });
        if (list.length === 0) {
          this.$message('请勾选门店');
        } else {
          this.dialogVisible1 = true;
          this.getBrand();
          getApi.getView(list.join(",")).then((res) => {
            if (res.data.errcode === 0) {
              this.brandEditList = res.data.data;

            }
          })

        }
      },
      open4() {
      },
      close4() {
        this.brandid = '';
        this.xlsFile = '';
        this.fileList = []
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      submitUploadXls() {
        if (this.brandid === '') {
          this.$message('请选择成员');
          return
        }
        if (this.fileurl === '') {
          this.$message('需要上传XLS文件');
          return
        }
        let over = '';
        if (this.isOver === false) {
          over = 0
        } else {
          over = 1
        }

        getApi.updateXlsDishesFile(this.brandid, this.fileurl, over).then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              type: 'info',
              message: '上传成功'
            });
            this.dialogVisible4 = false
          }

        })

      },
      removeXls(file, fileList){
        this.fileurl = ""
      },
      handleAvatarSuccessXls(res, file) {
        this.fileurl = file.response.data.file_url
      },
      beforeAvatarUploadXls(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      importXls() {
        getLeft('x2').then((res) => {
          if (res.data.errcode === 0) {
            this.dataLeft = res.data.data;
            this.dialogVisible4 = true
          }

        });
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

      removeDomain(list, i) {
        list.splice(i, 1)
      },
      addDomain(list) {
        list.push({name: '',  providerid: ''});
      },
      goToAddDishes() {
        if (this.number < 1) {
          this.$message('需要最少一道菜');
        } else {
          this.$router.push({path: `/infrastructure/DishesLibrary/addDishes/${this.number}/${this.getDishesLibraryLevelId()}`})
        }
      },
      addDishes() {
        this.dialogVisible2 = true;
      },
      nodeClickDishes(data, data1, data2) {
        this.brandid = data.id;
      },

      getPage(page) {
        this.p.page = page;
        this.showProductList(this.p, this.getDishesLibraryLevelId(), this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showProductList(this.p, this.getDishesLibraryLevelId(), this.searchName);
      },

      handleSelectionChange(val) {
        if(val.length === this.dishesData.length){
          this.dishesData.forEach((map) => {
            this.$set(map, 'select', true)
          });
        }else {
          this.dishesData.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },

      handleChecked(data) {
        let list =  this.dishesData.filter((item)=>{
          return item.select === true
        });

        if (list.length === this.dishesData.length) {
          list.forEach((item)=>{
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        }else {
          this.$refs.multipleTable.clearSelection();
        }

      },


      del(id) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.delProduct(id).then((res) => {
            if (res.data.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.showProductList(this.p, this.getDishesLibraryLevelId());
            } else {
              this.$message({
                type: 'info',
                message: res.data.data
              });
            }

          })
        }).catch(() => {
          //
        });

      },
      delSelected() {
        let list = [];
        this.dishesData.forEach((item) => {
          if (item.select) {
            list.push(item.id)
          }
        });

        if (list.length === 0) {
          this.$message('请勾选门店');
        } else {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getApi.delProduct(list.join(",")).then((res) => {
              if (res.data.errcode === 0) {
                this.$message({
                  type: 'info',
                  message: '删除成功'
                });
                this.showProductList(this.p, this.getDishesLibraryLevelId());
              }
            })
          }).catch(() => {
            //
          });
        }


      },
      recur(data,bool) {
        data.forEach((map) => {
          if (map.id === this.getDishesLibraryLevelId()) {
            this.$set(map, "selected", true);
          } else {
            this.$set(map, "selected", false);
          }
          if (map.child) {
            if(bool){
              this.$set(map, "show", false);
            }
            this.recur(map.child,bool)
          }
        })
      },
      showLevel() {
        getApi.getLevel('', 1).then((res) => {
          if (res.data.errcode === 0) {
            this.setDishesLibraryTree({list:res.data.data});

            if(this.getDishesLibraryLevelId() === ''){
              this.setDishesLibraryLevelId({levelId:res.data.data[0].id});
            }
            this.firstLevleId = res.data.data[0].id;
            this.showProductList(this.p, this.getDishesLibraryLevelId());
            this.recur(res.data.data,true);
          }
        })
      },

      showProductList(p, levelid, searchName = '') {
        getApi.getProductList(p, levelid, searchName).then((res) => {
          if (res.data.errcode === 0) {
            for (let map of res.data.data.list) {
              this.$set(map, 'select', false)
            }
            this.dishesData = res.data.data.list;
            this.p.total = res.data.data.count
          }
        })
      }

    },
    created() {
      if(this.getDishesLibraryTree().length === 0){
        this.showLevel()
      }else {
        this.showProductList(this.p, this.getDishesLibraryLevelId());
        getApi.getLevel('', 1).then((res) => {
            if (res.data.errcode === 0) {
              this.firstLevleId = res.data.data[0].id;
            }
        })
      }
    },
    mounted() {
      Hub.$on('showAdd', (e) => {
        this.showProductList(this.p = {page: 1, size: this.p.size, total: 0}, e.levelid);
        this.setDishesLibraryLevelId({levelId:e.levelid});
        this.recur(this.getDishesLibraryTree(),false);
      });
      Hub.$emit('mountedOk','mountedOk');
    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    destroyed(){
      Hub.$off("showAdd");
    }
  }
</script>

<style scoped lang="less">


</style>
