<template>
  <div>
    <div class="padding_b_10 flex_sb bodyTop">
      <xo-nav-path :navList="navList"></xo-nav-path>
      <el-button size="small" type="primary" @click="addGroup()">新增门店组</el-button>
    </div>
    <div>
      <el-table empty-text=" " :data="tableData" border :height="tableHeight" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="65">
          <template scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="id" label="门店组编码">

        </el-table-column>
        <el-table-column header-align="center" align="center" prop="name" label="门店组名称">

        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="200">
          <template scope="scope">
            <div class="flex">

              <el-button size="small" type="primary" @click="showStore(scope.row)">查看门店</el-button>
              <el-button size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>

          </template>
        </el-table-column>

      </el-table>
    </div>
    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>
    <!--查看门店-->
    <el-dialog
      title="查看门店"
      :visible.sync="dialogVisible"
      width="50%">
      <el-table :data="storeData" border>
        <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号" width="100">
          <template scope="scope">
            <div>{{scope.$index + 1}}</div>
          </template>
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                         label="门店编码">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                         label="门店名称">
        </el-table-column>
      </el-table>

      <div class="margin_t_10">
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible1"
      @open="myOpen"
      width="50%">
      <el-form ref="formRules" :model="formEdit" label-width="100px">

        <el-form-item label="标签名称	:" prop="name" :rules="{required: true, message: '请输入标签名称', trigger: 'blur'}">
          <el-input v-model="formEdit.name" placeholder="请输入内容"></el-input>
        </el-form-item>


        <div v-for="(domain, index) in formEdit.thirdCode" class="flex_r">
          <el-form-item label="第三方编码" :prop="'thirdCode.' + index + '.code1'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code1"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :prop="'thirdCode.' + index + '.code2'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code2"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_sc">
            <div class="m-storeCode margin_l_10" @click="addDomain">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formEdit.thirdCode.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="包含门店:">
          <el-table :data="formEdit.store" border>
            <el-table-column :render-header="selectAll" label-class-name="table_head" header-align="center"
                             align="center" width="100">
              <template scope="scope">
                <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="门店编码">
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName"
                             label="门店名称">
            </el-table-column>
          </el-table>
        </el-form-item>

        <div class="margin_t_10">
          <el-button type="primary" @click="update('formRules',formEdit)">确认</el-button>
          <el-button @click="dialogVisible1 = false">取消</el-button>
        </div>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './storeGroup.service';

  export default {
    components: {},
    data() {
      return {
        formEdit: {},
        dialogVisible: false,
        dialogVisible1: false,
        tableHeight: 0,
        navList: [{name: "门店管理", url: ''}, {name: "门店标签", url: ''}],
        tableData: [],//列表
        storeData: [],//查看门店
        p: {page: 1, size: 20, total: 0},
        token: ''
      }
    },
    methods: {
      getPage(page) {
        this.p.page = page;
        this.showResouce();
      },
      getPageSize(size) {
        this.p.size = size;
        this.showResouce();
      },
      update(formRules, data) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            getApi.updateOne(this.token, data).then((res) => {
              console.log(res)
              this.dialogVisible1 = false
              this.showResouce();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleCheckAll(bool) {
        if (bool.target.checked === true) {
          this.formEdit.store.forEach((data) => {
            data.select = true
          })
        } else {
          this.formEdit.store.forEach((data) => {
            data.select = false
          })
        }
      },
      handleChecked() {
        let count = 0;
        this.formEdit.store.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });

        if (count === this.formEdit.store.length) {
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
              }, ['序号']
            )
          ]
        );

      },
      removeDomain(item) {
        var index = this.formEdit.thirdCode.indexOf(item)
        if (index !== -1) {
          this.formEdit.thirdCode.splice(index, 1)
        }
      },
      addDomain() {
        this.formEdit.thirdCode.push({
          code1: '',
          code2: ''
        });
      },
      edit(row) {

        getApi.getOneStore(this.token,row).then((res)=>{
          console.log(res.data.data.store)
          res.data.data.store.forEach((item)=>{
            item.select = true
          });
          this.formEdit = res.data.data
          this.dialogVisible1 = true;
        })




      },
      showStore(row) {
        this.dialogVisible = true

        getApi.getOne(this.token, row.id).then((res) => {
          console.log(res)
          this.storeData = res.data.data.list
        })

      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getApi.delOne(this.token, row.id).then((res) => {
            console.log(res)
            if (res.data.errcode === 0) {
              this.$message({
                type: 'info',
                message: '删除成功'
              });
            } else {
              this.$message({
                type: 'info',
                message: res.data.errmsg
              });
            }
            this.showResouce()
          })
        }).catch(() => {
          //
        });
      },

      myOpen() {
        this.handleChecked()

      },
      addGroup() {
        this.$router.push('/storeManage/storeGroup/addGroup')
      },
      showResouce() {
        getApi.getList(this.token, this.p).then((res) => {
          console.log(res.data.data)
          if (res.data.errcode === 0) {
            this.tableData = res.data.data.list;
            this.p.total = res.data.data.count
          } else {
            this.$alert('请重新登录', '超时', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/login')
              }
            })
          }
        })
      }
    },

    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    created() {
      this.storeData.forEach((map) => {
        this.$set(map, 'select', true)
      });
      this.token = this.$localStorage.get('token');

      this.showResouce()

    }
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
</style>
