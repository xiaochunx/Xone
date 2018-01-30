<template>

  <div>
    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
    </div>


    <div >
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="待激活" name="first">

          <el-table :data="storeData" border >

            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                             label="序号"
                             width="80">
              <template slot-scope="scope">
                <div>{{scope.$index + 1}}</div>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                             label="商户名称"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="注册账号"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" width="100"
                             label="证件资料">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="show()">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="提交时间"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="状态"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="操作" width="160">
              <template slot-scope="scope">
                <div>
                  <el-button size="small" type="primary" @click="activate()">激活</el-button>
                  <el-button size="small" @click="reject()">驳回</el-button>
                </div>

                <div>
                  <el-button size="small" type="primary" @click="activate()">重新激活</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>


        </el-tab-pane>

        <el-tab-pane label="已激活" name="second">

          <el-table :data="storeData" border class="flex_1">

            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id"
                             label="序号"
                             width="80">
              <template slot-scope="scope">
                <div>{{scope.$index + 1}}</div>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                             label="商户名称"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="注册账号"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" width="100"
                             label="证件资料">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="提交时间"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="状态"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                             label="操作" width="160">
              <template slot-scope="scope">

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>



    <footer>
      <!--<xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>-->
    </footer>

    <!--激活-->
    <el-dialog
      title="将此商户放入至"
      :visible.sync="dialogVisible1"
      width="50%" size="tiny">
      <div class="flex flex_d_c">
        <div style="border: 1px solid #8c939d; height: 50px;width: 250px" class="flex margin_b_10 pointer">
          aa
        </div>

        <div style="border: 1px solid #8c939d; height: 50px;width: 250px" class="flex margin_b_10 pointer">
          bb
        </div>

        <div style="border: 1px solid #8c939d; height: 50px;width: 250px" class="flex margin_b_10 pointer">
          cc
        </div>
      </div>

    </el-dialog>

    <!--驳回-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible2"
      width="50%" size="tiny">
      <el-form ref="formRules" :model="rejectForm" label-width="100px">
        <el-form-item label="驳回原因:" prop="text" :rules="{required: true, message: '请输入内容', trigger: 'blur'}">
          <el-input v-model="rejectForm.text" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <div class="margin_t_10">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="rejectSubmit('formRules')">确认</el-button>
      </div>
    </el-dialog>

    <!--查看-->
    <el-dialog
      title="查看证件资料"
      :visible.sync="dialogVisible"
      width="50%">

      <div class="flex_j">
        <el-form label-width="120px" class="myBusiness">
          <el-form-item label="营业执照" class="">
            <div class="flex_r" style="align-items: flex-end">
              <img class="avatar-uploader-icon">
              <a class="margin_l_10 pointer" href="" download="">下载图片</a>
            </div>
          </el-form-item>

          <el-form-item label="组织机构代码证" class="">
            <div class="flex_r" style="align-items: flex-end">
              <img class="avatar-uploader-icon">
              <a class="margin_l_10 pointer" href="" download="">下载图片</a>
            </div>
          </el-form-item>

          <el-form-item label="开户许可证" class="">
            <div class="flex_r" style="align-items: flex-end">
              <img class="avatar-uploader-icon">
              <a class="margin_l_10 pointer" href="" download="">下载图片</a>
            </div>
          </el-form-item>

          <el-form-item label="税务登记证" class="">
            <div class="flex_r" style="align-items: flex-end">
              <img class="avatar-uploader-icon">
              <a class="margin_l_10 pointer" href="" download="">下载图片</a>
            </div>
          </el-form-item>

        </el-form>
      </div>


    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'

  export default {
    components: {},
    data() {
      return {
        navList: [{name: "商户资料核实", url: ''}, {name: "商户列表", url: ''}],
        activeName: 'first',
        tableHeight: 0,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        storeData: [{}],
        storeData1: [{}],
        rejectForm: {text: ''},
        p: {page: 1, size: 20, total: 0},
      }
    },
    methods: {
      handleClick(tab, event) {

      },
      rejectSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      show() {
        this.dialogVisible = true
      },
      activate() {
        this.dialogVisible1 = true
      },
      reject() {
        this.dialogVisible2 = true
      },
      getPage(page) {
        this.p.page = page;
        // this.showResouce(this.p, this.getX1StoreLevelId(),this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        // this.showResouce(this.p, this.getX1StoreLevelId(),this.searchName);
      },
    },
    created() {

    },
    mounted(){

    },
    updated() {
      this.$nextTick(() => {
        console.log(55)
        getScrollHeight().then((h) => {
          console.log(h)
          this.tableHeight = h;
        })
      })
    },
  }
</script>

<style scoped>

</style>
