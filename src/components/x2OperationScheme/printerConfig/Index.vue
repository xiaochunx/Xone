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
              <el-button class="margin_b_10" type="primary" @click="addPrint('新增打印机',1)">新增打印机</el-button>

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
                    <el-button size="small" type="primary" @click="edit('修改打印机',1)">修改打印机</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除打印机</el-button>
                    <el-button size="small" @click="conf()">打印模板配置</el-button>
                  </template>
                </el-table-column>
              </el-table>


            </el-tab-pane>
            <el-tab-pane label="打印模板列表" name="second">

              <el-button class="margin_b_10" type="primary" @click="addPrint('新增打印模板',2)">新增打印模板</el-button>

              <el-table :data="storeData" border :height="tableHeight - 103">

                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="模板名称" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="模板下打印机" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 width="160" label="打印机小票类型">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="打印时机" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="最后编辑时间" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="编辑人" width="160">
                </el-table-column>
                <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code"
                                 label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="edit('修改',2)">修改</el-button>
                    <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>

                  </template>
                </el-table-column>
              </el-table>


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
      <el-form ref="formRules" :model="formPrint" label-width="100px">
        <el-form-item label="打印机编码:" v-if="name === '修改打印机'">
        <el-input v-model="formPrint.code" placeholder="请输入内容" disabled></el-input>
        </el-form-item>

        <el-form-item label="打印机类型:">
          <el-select v-model="formPrint.typeId" placeholder="请选择">
            <el-option
              v-for="item in printType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="打印机名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formPrint.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="打印机编号:" >
          <el-input v-model="formPrint.code" placeholder="请输入编号"></el-input>
        </el-form-item>



        <div v-for="(domain, index) in formPrint.thirdCode" class="flex_r">
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
            <div v-if="(formPrint.thirdCode.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="配置模板:">
          <el-select multiple v-model="formPrint.template" placeholder="请选择">
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
            v-model="formPrint.status"
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
      width="50%">
      <div>
        <span>模板名称</span>
        <el-checkbox v-model="checkedAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>

      <div class="width_100 flex_r margin_t_10">
        <div class="flex_1">
          <el-checkbox-group v-model="checked" @change="handleChecked">
            <div class="flex_d_c myPrintConfig">
              <el-checkbox v-for="(item,index) in templateName" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </div>
          </el-checkbox-group>

        </div>
        <div class="flex_1">
          <div class="flex flex_d_c">
            <img src="../../../assets/u6264.png" alt="" style="width: 300px">
            <div class="margin_t_10">
              预览
            </div>
          </div>

        </div>
      </div>
    </el-dialog>

    <el-dialog
      :title="name"
      :visible.sync="dialogVisible3"
      @open="open3"
      @close="close3"
      width="50%">
      <el-form ref="formRulesTemp" :model="formPrintTemp" label-width="140px">

        <el-form-item label="模板名称:" prop="name" :rules="{required: true, message: '请输入模板名称', trigger: 'blur'}">
          <el-input v-model="formPrintTemp.name" placeholder="请输入模板名称"></el-input>
        </el-form-item>

        <div v-for="(domain, index) in formPrintTemp.thirdCode" class="flex_r">
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
            <div class="m-storeCode margin_l_10" @click="addDomain1()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formPrintTemp.thirdCode.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain1(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="打印时机:">
          <el-select v-model="formPrintTemp.printTime_id" placeholder="请选择">
            <el-option
              v-for="item in printTime"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="打印机小票类型:">
          <el-select v-model="formPrintTemp.printTicketType_id" placeholder="请选择">
            <el-option
              v-for="item in printTicketType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="打印机小票类型:">
          <el-select v-model="formPrintTemp.printTicketType_id2" placeholder="请选择">
            <el-option
              v-for="item in printTicketType2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      <div class="flex_r">
        <div class="flex_1">
          <h3>模板内容</h3>
          <div class="margin_b_10" style="border-bottom: 1px solid #DFE6EC">必选</div>
          <el-form-item label="订单来源">
            <el-switch
              v-model="formPrintTemp.switch1"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize1" clearable placeholder="字号选择" style="width: 130px;">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div class="margin_b_10" style="border-bottom: 1px solid #DFE6EC">选填</div>
          <el-form-item label="店铺地址">
            <el-switch
              v-model="formPrintTemp.switch11"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize11" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch11">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺电话">
            <el-switch
              v-model="formPrintTemp.switch12"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize12" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch12">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-switch
              v-model="formPrintTemp.switch13"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize13" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch13">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-switch
              v-model="formPrintTemp.switch14"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize14" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch14">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折前金额">
            <el-switch
              v-model="formPrintTemp.switch15"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize15" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch15">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣金额">
            <el-switch
              v-model="formPrintTemp.switch16"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize16" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch16">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期望送达时间">
            <el-switch
              v-model="formPrintTemp.switch17"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize17" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch17">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客人备注">
            <el-switch
              v-model="formPrintTemp.switch18"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <el-select v-model="formPrintTemp.fontSize18" clearable placeholder="字号选择" style="width: 130px;" v-if="formPrintTemp.switch18">
              <el-option
                v-for="item in fontSize"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="flex_1">
          <img class="margin_l_10" src="../../../assets/printConfig.png" alt="" style="width: 320px">
        </div>
      </div>

        <el-form-item label="选择打印方式">
          <el-select v-model="formPrintTemp.printType2_id" clearable placeholder="请选择">
            <el-option
              v-for="item in printType2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-checkbox label="全选"></el-checkbox>
          <div>
            <el-checkbox label="好吃的菜"></el-checkbox>
            <el-checkbox label="不好吃的菜"></el-checkbox>
            <el-checkbox label="一般好吃的菜"></el-checkbox>
            <el-checkbox label="饭"></el-checkbox>
          </div>

        </el-form-item>

        <el-form-item label="打印订单类型">
          <el-checkbox label="全部"></el-checkbox>
          <el-checkbox label="外卖配送"></el-checkbox>
          <el-checkbox label="外卖自提"></el-checkbox>

        </el-form-item>

        <el-form-item label="打印订单来源">
          <el-checkbox label="美团"></el-checkbox>
          <el-checkbox label="饿了么"></el-checkbox>
          <el-checkbox label="百度"></el-checkbox>

        </el-form-item>

        <el-form-item label="分单打印类型">
          <el-select v-model="formPrintTemp.printType3_id" clearable placeholder="请选择">
            <el-option
              v-for="item in printType3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜品单独配置">
          <el-select v-model="formPrintTemp.conf_id" clearable placeholder="请选择">
            <el-option
              v-for="item in dishesConf"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div class="margin_t_10">
        <el-button type="primary" @click="">测试打印</el-button>
        <el-button type="primary" @click="">提交</el-button>
        <el-button @click="">重置</el-button>

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
        formPrint: {
          typeId: '',
          name: '',
          code:'',
          thirdCode: [
            {code1: '', code2: ''}
          ],
          template:[],
          status: true,
        },
        formPrintTemp: {
          name: '',
          thirdCode: [
            {code1: '', code2: ''}
          ],
          printTime_id:'',
          printTicketType_id:'',
          printTicketType_id2:'',
          fontSize1:'',
          fontSize2:'',
          fontSize3:'',
          fontSize4:'',
          fontSize5:'',
          fontSize6:'',
          fontSize7:'',
          fontSize8:'',
          fontSize9:'',
          fontSize10:'',
          fontSize11:'',
          fontSize12:'',
          fontSize13:'',
          fontSize14:'',
          fontSize15:'',
          fontSize16:'',
          fontSize17:'',
          fontSize18:'',
          switch1:true,
          switch2:true,
          switch3:true,
          switch4:true,
          switch5:true,
          switch6:true,
          switch7:true,
          switch8:true,
          switch9:true,
          switch10:true,
          switch11:false,
          switch12:false,
          switch13:false,
          switch14:false,
          switch15:false,
          switch16:false,
          switch17:false,
          switch18:false,
          printType2_id:'',
          printType3_id:'',
          conf_id:''
        },
        printType:[{id:1,name:'款易打印机'}],
        templateList:[{id:1,name:'外卖 - 客联'},{id:2,name:'存根 - 堂食'},{id:3,name:'后厨 - 外卖'}],
        checkedAll:false,
        checked:[],
        templateName:[{id:1,name:'西餐A'},{id:2,name:'外卖-客联'},{id:3,name:'外卖-存根'}],
        printTime:[{id:1,name:'外部外卖已受理'},{id:2,name:'外部外卖未受理'},{id:3,name:'退款单'},{id:4,name:'外卖平台营业报表'}],
        printTicketType:[{id:1,name:'易联云-小票宽度80mm'},{id:2,name:'易联云-小票宽度58mm'},{id:3,name:'易联云-小票宽度80mm'}],
        printTicketType2:[{id:1,name:'模板一 - 适用于存根 - 外卖'},{id:2,name:'模板二 - 适用于客联 - 外卖'},{id:3,name:'模板三 - 适用于后厨 - 外卖'}],
        fontSize:[{id:0,name:'不选择的话默认2',disabled: true},{id:1,name:'2'},{id:2,name:'4'},{id:3,name:'6'}],
        printType2:[{id:1,name:'分品类打印'},{id:2,name:'分厨房打印'}],
        printType3:[{id:1,name:'不分单'},{id:2,name:'分单打印，数量不合并'},{id:3,name:'分单打印，数量合并'}],
        dishesConf:[{id:1,name:'不分组'},{id:2,name:'分单标签 - 篮子'},{id:3,name:'分单标签 - 口袋'},{id:4,name:'分单标签 - 加菜'},{id:5,name:'分单标签 - 分组'}],
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
          this.formPrint =  {
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
      handleCheckAllChange(e) {
        let list = [];
        if(e.target.checked === true){
          this.templateName.forEach((item)=>{
            list.push(item.id)
          });
          this.checked = list
        }else {
          this.checked = []
        }

      },
      handleChecked(e){

        console.log(this.checked)
      },
      close1(){
        this.$refs['formRules'].resetFields();
      },
      open3(){

      },
      close3(){

      },
      edit(name,Int){
        this.name = name;
        if(Int === 1){
          this.dialogVisible1 = true
        }else {
          this.dialogVisible3 = true
        }

      },
      addPrint(name,Int) {
        this.name = name;
        if(Int === 1){
          this.dialogVisible1 = true
        } else {
          this.dialogVisible3 = true
        }
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

      removeDomain(item) {
        var index = this.formPrint.thirdCode.indexOf(item)
        if (index !== -1) {
          this.formPrint.thirdCode.splice(index, 1)
        }
      },
      addDomain() {
        this.formPrint.thirdCode.push({code1: '', code2: ''});
      },

      removeDomain1(item) {
        var index = this.formPrintTemp.thirdCode.indexOf(item)
        if (index !== -1) {
          this.formPrintTemp.thirdCode.splice(index, 1)
        }
      },
      addDomain1() {
        this.formPrintTemp.thirdCode.push({code1: '', code2: ''});
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
