<template>
  <div>
    <div class="padding_b_10 flex_sb bodyTop">
      <xo-nav-path :navList="navList"></xo-nav-path>
      <el-button size="small" type="primary" @click="addGroup()">新增门店组</el-button>
    </div>
    <div>
      <el-table :data="tableData" border :height="tableHeight" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="65">
          <template scope="scope">
            <span>{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="门店组编码">
          <template scope="scope">
            <span>{{ scope.row.accountNum }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="门店组名称">
          <template scope="scope">
            <div>
              {{scope.row.account}}
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="200">
          <template scope="scope">
            <div class="flex">

              <el-button size="small" type="primary" @click="showStore()">查看门店</el-button>
              <el-button size="small"  @click="edit()">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>

          </template>
        </el-table-column>

      </el-table>
    </div>
    <footer>
      <xo-pagination></xo-pagination>
    </footer>

    <el-dialog
      title="查看门店"
      :visible.sync="dialogVisible"
      width="50%" >
        <el-table :data="storeData" border>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="序号" width="100">
            <template scope="scope">
              <div>{{scope.$index + 1}}</div>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode" label="门店编码">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店名称">
          </el-table-column>
        </el-table>


      <div class="margin_t_10">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible1"
      @open="myOpen"
      width="50%" >
      <el-form ref="formRules" :model="form" label-width="100px">

        <el-form-item label="标签名称	:" prop="code" :rules="{required: true, message: '请输入标签名称', trigger: 'blur'}">
          <el-input v-model="form.code" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="标签编码	:" prop="name" :rules="{required: true, message: '请输入标签编码', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>


        <div v-for="(domain, index) in form.thirdPartyCoding" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :key="domain.key" :prop="'thirdPartyCoding.' + index + '.value1'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.value1"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_sc">
            <div class="m-storeCode margin_l_10" @click="addDomain">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(form.thirdPartyCoding.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>


        <el-form-item label="包含门店:" >
          <el-table :data="storeData" border>
            <el-table-column :render-header="selectAll"  label-class-name="table_head" header-align="center" align="center" width="100">
              <template scope="scope">
                <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode" label="门店编码">
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店名称">
            </el-table-column>
          </el-table>
        </el-form-item>

        <div class="margin_t_10">
          <el-button type="primary">确认</el-button>
          <el-button>取消</el-button>
        </div>

      </el-form>




    </el-dialog>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'
  export default {
    components: {

    },
    data() {
      return {
        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },
        dialogVisible:false,
        dialogVisible1:false,
        tableHeight:0,
        navList: [{name: "门店管理", url: ''}, {name: "门店标签", url: ''}],
        tableData: [{
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          thirdPartCode: '美团-89898989',
          lastEdit: '王小虎',
          lastDate: '2016-05-04 04:33:23',
          useStore: '天河一店 天河二店'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          count: 1,
          accountNum: 11233,
          account: '支付宝',
          payment: '易极付',
          status: '开户成功',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        storeData:[{
          storeCode:"123",
          storeName:"aaa"
        }],
      }
    },
    methods: {
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
      handleChecked() {
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
              }, ['序号']
            )
          ]
        );

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
      edit(){
        this.dialogVisible1 = true

      },
      showStore(){
        this.dialogVisible = true
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
          this.$message({
            type: 'info',
            message: '删除成功'
          });
        }).catch(() => {
    //
        });
      },

      myOpen(){
        this.handleChecked()

      },
      addGroup(){
        this.$router.push('/storeManage/storeGroup/addGroup')
      }
    },

    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },
    created(){
      this.storeData.forEach((map) => {
        this.$set(map, 'select', true)
      })

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
