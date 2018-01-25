<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;overflow: auto" :style="{height:tableHeight + 'px'}">
        <xo-pub-tree :data='data5' :count=0 style="width: max-content;"></xo-pub-tree>
      </div>

      <div class="padding_l_10" :style="{width:tableWidth + 'px'}">

        <div :style="{height:tableHeight + 'px'}">

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="打印机列表" name="first">
              <el-button class="margin_b_10" type="primary" @click="addPrint('新增打印机')">新增打印机</el-button>

              <!--<div :style="{height:tableHeight - 93 + 'px'}">-->
<!--a-->
              <!--</div>-->
              <el-table :data="storeData" border :height="tableHeight - 103">

                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="打印机名称" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="打印机类型" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                  width="160" :render-header="header">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="打印机模板" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="上次联网时间" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="操作" width="320">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="edit('修改打印机')">修改打印机</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除打印机</el-button>
                    <el-button size="small" @click="conf()">打印模板配置</el-button>
                  </template>
                </el-table-column>
              </el-table>


            </el-tab-pane>
            <el-tab-pane label="打印模板列表" name="second">
              <div :style="{height:tableHeight - 57 + 'px'}">

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>
      </div>
    </div>

    <el-dialog
      :title="name"
      :visible.sync="dialogVisible1"
      @open="open1"
      @close="close1"
      width="50%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="打印机编码:" v-if="name === '修改打印机'">
        <el-input v-model="form.code" placeholder="请输入内容" disabled></el-input>
        </el-form-item>

        <el-form-item label="打印机类型:">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option
              v-for="item in printType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="打印机名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="打印机编号:" >
          <el-input v-model="form.code" placeholder="请输入编号"></el-input>
        </el-form-item>



        <div v-for="(domain, index) in form.thirdCode" class="flex_r">
          <el-form-item :label="index === 0?'第三方编码':''" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code1" placeholder="请输入名称"></el-input>
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
                    <el-input v-model="domain.code2" placeholder="请输入编码"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(form.thirdCode.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="配置模板:">
          <el-select multiple v-model="form.template" placeholder="请选择">
            <el-option
              v-for="item in templateList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:">
          <el-switch
            v-model="form.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>
        <div class="margin_t_10">
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
          <el-button @click="dialogVisible1 = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="配置打印模板"
      :visible.sync="dialogVisible2"
      @open="open1"
      @close="close1"
      width="50%">

      <div>
        <span>模板名称</span>
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
      </div>

      <div class="width_100 flex_r margin_t_10">
        <div class="flex_1">
          <el-checkbox-group v-model="checked" @change="handleChecked">
            <el-checkbox v-for="(item,index) in templateName" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>

        </div>
        <div class="flex_1">

          预览
        </div>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {getLeft} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import {mapActions, mapGetters} from 'vuex';

  export default {
    components: {

    },
    data() {
      return {
        name:'',
        activeName: 'first',
        tableWidth: 0,
        tableHeight: 0,
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        navList: [{name: "x2运营方案", url: '打印机配置'}],
        data5: [],
        storeData:[{}],
        p: {page: 1, size: 20, total: 0},
        form: {
          typeId: '',
          name: '',
          code:'',
          thirdCode: [
            {code1: '', code2: ''}
          ],
          template:[],
          status: true,
        },
        printType:[{id:1,name:'款易打印机'}],
        templateList:[{id:1,name:'外卖 - 客联'},{id:2,name:'存根 - 堂食'},{id:3,name:'后厨 - 外卖'}],
        checkedAll:false,
        checked:[],
        templateName:[{id:1,name:'西餐A'},{id:2,name:'外卖-客联'},{id:3,name:'外卖-存根'}]
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setX2StoreLevelId']),
      ...mapGetters(['getX2StoreLevelId']),
      handleClick(tab, event) {
        console.log(tab, event);
      },
      open1(){
        if(this.name === "新增打印机"){
          this.form =  {
            typeId: '',
            name: '',
            code:'',
            thirdCode: [
              {code1: '', code2: ''}
            ],
            template:[],
            status: true,
          }
        }
      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChecked(e){
console.log(e)
      },
      close1(){
        this.$refs['formRules'].resetFields();
      },
      edit(name){
        this.name = name;
        this.dialogVisible1 = true
      },
      addPrint(name) {
        this.name = name;
        this.dialogVisible1 = true

      },
      conf(){
        this.dialogVisible2 = true

      },
      showDishes() {
        this.dialogVisible3 = true
      },
      getPage(page) {
        this.p.page = page;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        //this.showResouce(this.p, this.levelId,this.searchName);
      },

      header(h) {
        return h(
          'div',
          {},
          [
            h('el-tooltip', {
                attrs: {content: "打印机底部的编号，例如716800234",placement:"top"},
              }, [
                  h('div', {
                      attrs: {type:"text"},
                    }, ['打印机编号',h(
                      'i',{
                      attrs: {class: "fa fa-question-circle-o"}
                    }
                    )]
                  )
                ]
            )
          ]
        );
      },
      del(id) {
        this.$confirm(
          '确认删除？', '删除打印机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // getApi.del(id).then((res) => {
          //
          //   if (res) {
          //
          //   }
          //   this.$message({
          //     type: 'info',
          //     message: '删除成功'
          //   });
          //   this.showResouce(this.p, this.levelId)
          //
          // })

        }).catch(() => {
          //
        });

      },

      add() {

      },





      recur(data) {
        data.forEach((map) => {

          if (map.child) {
            this.$set(map, "show", true);
            this.$set(map, "selected", false);
            this.recur(map.child)
          }
        })
      },
      recurSelected(data, levelId) {
        data.forEach((map) => {
          if (map.id === levelId) {
            this.$set(map, "selected", true);
          } else {
            this.$set(map, "selected", false);
          }
          if (map.child) {
            this.recurSelected(map.child, levelId)
          }
        })
      },
      showLevel() {
        getLeft('x2').then((res) => {
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            if(this.getX2StoreLevelId() === ''){
              this.setX2StoreLevelId({levelId:res.data.data[0].id});
            }
            // this.getGroupList(this.p,this.getX2StoreLevelId());

            this.recur(this.data5);
            this.recurSelected(this.data5, this.getX2StoreLevelId())
          } else {

          }
        })

      },
    },
    created() {
      this.showLevel();




    },

    mounted() {
      Hub.$on('showAdd', (e) => {
        this.setX2StoreLevelId({levelId:e.levelid});
        this.recurSelected(this.data5, e.levelid)
      });

    },
    updated() {
      let bodyWidth = document.querySelector('.content div').clientWidth;
      this.tableWidth = bodyWidth - this.$refs.tree.clientWidth;
      this.$nextTick(() => {
        getScrollHeight().then((h) => {
          this.tableHeight = h;
        })

      })

    },
    destroyed(){
      Hub.$off("showAdd");
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
