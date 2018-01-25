<template>
  <div>

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="addDishes()">+新增菜品</el-button>
          <el-button size="small" @click="test()">批量编辑</el-button>
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
        <el-tree
          :data="data5"
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

        <el-table :data="dishesData" border :height="tableHeight">
          <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center" align="center"
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

    <!--编辑-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="oneList" label-width="100px">
        <el-form-item label="编码:" prop="id">
          <el-input v-model="oneList.id" placeholder="请输入内容" disabled></el-input>
        </el-form-item>

        <el-form-item label="名称:" prop="product_name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="oneList.product_name" placeholder="请输入内容"></el-input>
        </el-form-item>


        <div v-for="(domain, index) in oneList.productcodes" class="flex_r">
          <el-form-item :label="index === 0?'第三方编码':''" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.name" placeholder="请输入名称"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.providerid" placeholder="请输入编码"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(oneList.productcodes.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="价格:" prop="price" :rules="{required: true, message: '请输入价格', trigger: 'blur'}">
          <el-input v-model="oneList.price" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="所属品牌:" prop="levelid"
                      :rules="{type:'number',required: true, message: '请输入价格', trigger: 'change'}">

          <el-select v-model="oneList.levelid" placeholder="请选择">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.levelname"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>


        <el-form-item label="上传图片1">
          <el-upload
            class="avatar-uploader margin_r_10"
            :action="$updateUrl"
            name='filename'
            :show-file-list="false"
            :on-success="(res, file,list)=>{
                  return handleAvatarSuccess1(res, file,list)
                }"
            :before-upload="beforeAvatarUpload">
            <img v-if="oneList.imgurl_1" :src="oneList.imgurl_1" class="avatar">
            <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传图片2">
          <el-upload
            class="avatar-uploader margin_r_10"
            :action="$updateUrl"
            name='filename'
            :show-file-list="false"
            :on-success="(res, file,list)=>{
                  return handleAvatarSuccess2(res, file,list)
                }"
            :before-upload="beforeAvatarUpload">
            <img v-if="oneList.imgurl_2" :src="oneList.imgurl_2" class="avatar">
            <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传图片1">
          <el-upload
            class="avatar-uploader margin_r_10"
            :action="$updateUrl"
            name='filename'
            :show-file-list="false"
            :on-success="(res, file,list)=>{
                  return handleAvatarSuccess3(res, file,list)
                }"
            :before-upload="beforeAvatarUpload">
            <img v-if="oneList.imgurl_3" :src="oneList.imgurl_3" class="avatar">
            <div v-else class="avatar-uploader-icon"><i class="el-icon-plus"></i></div>
          </el-upload>
        </el-form-item>

        <div class="margin_t_10">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editOne('formRules')">确认</el-button>
        </div>
      </el-form>

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

  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './dishesLibrary.service'
  import {getLeft, getArea} from '../../utility/communApi'

  export default {
    components: {},
    data() {
      return {
        tableHeight: 0,
        navList: [{name: "菜品管理", url: ''}, {name: "菜品库", url: ''}],
        selectedAll: false,
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible4: false,
        searchName: '',
        dishesData: [],
        p: {page: 1, size: 20, total: 0},
        data5: [],
        tableWidth: 0,
        defaultProps: {
          children: 'child',
          label: 'levelname'
        },
        levelName: '',
        levelId: -1,//左边树ID
        number: 1,
        oneList: {},//一条菜品
        brandList: [],
        dataLeft: [],
        fileList: [],
        fileurl: '',
        brandid: '',
        isOver: false,
      }
    },
    watch: {},
    methods: {
      search() {
        if (this.searchName === '') {
          this.showProductList(this.p = {page: 1, size: 20, total: 0}, this.levelId)
        } else {
          this.showProductList(this.p = {page: 1, size: 20, total: 0}, this.levelId, this.searchName)

        }
      },
      test() {
        console.log(this)
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
          console.log(res)
          if (res.data.errcode === 0) {
            this.$message({
              type: 'info',
              message: '上传成功'
            });
            this.dialogVisible4 = false
          }

        })

      },
      handleAvatarSuccessXls(res, file) {
        console.log(res)
        console.log(file)

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
        getLeft('x1').then((res) => {
          console.log(res)
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
      handleAvatarSuccess1(res, file, list) {
        this.oneList.imgurl_1 = file.response.data.file_url;
      },
      handleAvatarSuccess2(res, file, list) {
        this.oneList.imgurl_2 = file.response.data.file_url;
      },
      handleAvatarSuccess3(res, file, list) {
        this.oneList.imgurl_3 = file.response.data.file_url;
      },
      removeDomain(item) {
        var index = this.oneList.productcodes.indexOf(item)
        if (index !== -1) {
          this.oneList.productcodes.splice(index, 1)
        }
      },
      addDomain() {
        this.oneList.productcodes.push({name: '', providerid: ''});
      },
      goToAddDishes() {
        if (this.number < 1) {
          this.$message('需要最少一道菜');
        } else {
          this.$router.push({path: `/infrastructure/DishesLibrary/addDishes/${this.number}/${this.levelId}`})
        }
      },
      addDishes() {
        if (this.levelName === "") {
          this.$message('请选择门店库');
        } else {
          this.dialogVisible2 = true;

        }
      },
      nodeClickDishes(data, data1, data2) {
        this.brandid = data.id;
      },
      nodeClick(data, data1, data2) {
        console.log(data.levelname)

        this.levelName = data.levelname;
        this.levelId = data.id;
        this.showProductList(this.p = {page: 1, size: 20, total: 0}, this.levelId, this.searchName = '')

      },
      getPage(page) {
        this.p.page = page;
        this.showProductList(this.p, this.levelId, this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.showProductList(this.p, this.levelId, this.searchName);
      },

      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.dishesData.forEach((data) => {
            data.select = true
          })
        } else {
          this.dishesData.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked(data) {
        let count = 0;
        this.dishesData.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.dishesData.length) {
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
                on: {
                  change: this.handleCheckAll,
                  input: (event) => {
                  }
                }
              }, ['全选']
            )
          ]
        );

      },
      editOne(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            console.log(this.oneList)
            getApi.updateProduct(this.oneList).then((res) => {
              console.log(res)
              if (res.data.errcode === 0) {
                this.showProductList(this.p, this.levelId);
                this.dialogVisible = false
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      edit(id) {
        getApi.getOne(id).then((res) => {
          console.log(res)
          if (res.data.errcode === 0) {
            this.oneList = res.data.data[0];
            getApi.getBrand(this.levelId).then((res) => {
              console.log(res)
              this.brandList = res.data.data
            })
            this.dialogVisible = true
          }
        })
      },
      del(id) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.delProduct(id).then((res) => {
            console.log(res)
            if (res.data.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
              this.showProductList(this.p, this.levelId);
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
              console.log(res)
              if (res.data.errcode === 0) {
                this.$message({
                  type: 'info',
                  message: '删除成功'
                });
                this.showProductList(this.p, this.levelId);
              }
            })
          }).catch(() => {
            //
          });
        }


      },

      showLevel() {
        getApi.getLevel('', 1).then((res) => {
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            console.log(this.data5)
          } else {
          }
        })
      },

      showProductList(p, levelid, searchName = '') {
        getApi.getProductList(p, levelid, searchName).then((res) => {
          console.log(res)
          if (res.data.errcode === 0) {

            for (let map of res.data.data.list) {
              this.$set(map, 'select', false)
            }
            this.dishesData = res.data.data.list
            this.p.total = res.data.data.count
          }
        })
      }

    },
    created() {

      this.showProductList(this.p, this.levelId);

      this.showLevel()

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

<style scoped lang="less">
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


</style>
