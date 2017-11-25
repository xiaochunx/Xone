<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <el-button size="small" @click="batchAdd()" :disabled="!showAdd.showAdd">批量新增</el-button>
          <el-button size="small">批量删除</el-button>
          <el-button size="small" @click="isSwitch()">批量开启/关闭</el-button>
        </div>

        <div class="flex_a">
          <div class="margin_r_10" >
            <el-input size="small" v-model="storeName" placeholder="请输入内容"></el-input>
          </div>
          <el-button size="small">搜索</el-button>
          <el-button size="small" type="primary">+导入门店</el-button>
        </div>
      </div>
    </div>

    <div class="flex_r">
      <div ref="tree" style="min-width: 200px;">
        <!--<el-tree-->
          <!--:data="data5"-->
          <!--:props="defaultProps"-->
          <!--node-key="id"-->
          <!--default-expand-all-->
          <!--:expand-on-click-node="false"-->
          <!--:render-content="renderContent">-->
        <!--</el-tree>-->

        <tree :data='data5' :count=0></tree>

      </div>

      <div :style="{width:tableWidth + 'px'}">
        <el-table :data="storeData" border :height="tableHeight">
          <el-table-column :render-header="selectAll"  label-class-name="table_head" header-align="center" align="center" width="100">
            <template scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                           label="编码"
                           width="100"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" label="门店"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="状态"
                           width="80"></el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="320">
            <template scope="scope">

              <el-popover
                ref="popover4"
                placement="right"
                width="400"
                @show="()=>{
                  return show(scope.row)
                }"
                trigger="click">
                <div class="padding_10">
                  <div>{{showAsideObj.storeName}}</div>
                  <div class="flex_r margin_t_10">
                    <div class="flex_1 flex_ce">地址：</div>
                    <div class="flex_2">广东省广州市天河区天河东路88号</div>
                  </div>
                  <div class="flex_r margin_t_10">
                    <div class="flex_1 flex_ce">门店编码：</div>
                    <div class="flex_2">{{showAsideObj.storeCode}}</div>
                  </div>

                  <div class="flex_r margin_t_10">
                    <div class="flex_1 flex_ce">第三方编码：</div>
                    <div class="flex_2">美团  8989</div>
                  </div>
                  <div class="flex_r margin_t_10">
                    <div class="flex_1 flex_ce">所属组：</div>
                    <div class="flex_2">广州运营区</div>
                  </div>
                  <div class="flex_r margin_t_10">
                    <div class="flex_1 flex_ce">门店电话：</div>
                    <div class="flex_2">020-9849792</div>
                  </div>

                  <div class="flex_r margin_t_10">
                    <el-button type="primary">日志</el-button>

                  </div>
                </div>
              </el-popover>

              <el-button size="sshowAddmall" type="primary" v-popover:popover4>查看</el-button>
              <el-button size="small" @click.stop="edit()">编辑</el-button>
              <el-button size="small" type="danger" @click.stop="del()">删除</el-button>
              <el-button size="small" type="primary" >上传资料</el-button>
            </template>
          </el-table-column>
        </el-table>
        <footer>
          <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
        </footer>

      </div>
    </div>
    <el-dialog
      title="开启/关闭"
      :visible.sync="dialogVisible1"
      width="50%" size="tiny">
      <el-switch
        v-model="value2"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
      <div class="margin_t_10">
        <el-button>取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="新建／修改组"
      :visible.sync="dialogVisible"
      width="50%" >
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="编码:" prop="code" :rules="{required: true, message: '请输入编码', trigger: 'blur'}">
          <el-input v-model="form.code" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="名称:" prop="name" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
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
                        :rules="{required: true, message: '第三方编码不能为空!', trigger: 'blur'}">
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
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(form.thirdPartyCoding.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="上级组:" v-if="isEdit">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="margin_t_10">
          <el-button>取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="批量新增"
      :visible.sync="dialogVisible2"
      width="50%" size="tiny">
      <div class="flex_f flex">
        <div class="margin_b_10">需要增加几家？</div>
        <div class="flex_a">
          <el-input v-model="number" style="width: 50px"></el-input><span class="padding_l_10">家</span>
        </div>

        <div class="margin_t_10">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="goToAddStore()">确认</el-button>
        </div>
      </div>



    </el-dialog>

  </div>
</template>

<script>
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  let id = 1;
  import Hub from '../../utility/commun'
  import tree from './tree.vue'
  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './storeLibrary.service'

  export default {
    components: {
      ElInput,
      tree,
    },
    data() {
      return {
        value2:false,
        showAside: false,
        dialogVisible:false,
        dialogVisible1:false,
        dialogVisible2:false,
        tableHeight: 0,
        tableWidth:0,
        navList: [{name: "门店管理", url: ''}, {name: "门店库", url: ''}],
        storeGroupData: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '支付宝'
        }, {
          value: 3,
          label: '微信支付'
        }, {
          value: 4,
          label: 'QQ钱包'
        }],
        storeGroup: 1,
        payValue: 2,
        payValueData: [{
          value: 1,
          label: '全部'
        }, {
          value: 2,
          label: '开启'
        }, {
          value: 3,
          label: '关闭'
        }],
        storeName: '',
        storeData: [{
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          status: '开启'
        }, {
          storeCode: '837892',
          storeName: '炳胜（马场店）',
          status: '开启'
        }, {
          storeCode: '837893',
          storeName: '炳胜（马场店）',
          status: '开启'
        }],

        data5: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showAsideObj: {storeName: "", storeCode: ""},//侧滑内容
        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        },

        isEdit: true,
        value: "",
        options: [{
          value: 1,
          label: '民生银行'
        }, {
          value: 2,
          label: '易极付'
        }],
        token:'',
        p: {page: 1, size: 20, total: 0},
        showAdd:{levelid:'',type:'',showAdd:false},
        number:''
      }
    },
    watch: {

    },
    methods: {
      goToAddStore(){
        console.log(this.showAdd)
        this.$router.push({path:`/storeManage/storeList/newAddStore/${this.number}/${this.showAdd.levelid}/${this.showAdd.type}`})
      },
      getPage(page) {
        this.p.page = page;
//        this.showResouce();
      },
      getPageSize(size) {
        this.p.size = size;
//        this.showResouce();
      },
      isSwitch(){
        this.dialogVisible1 = true
      },
      show(row){
        this.showAsideObj = {"storeName": row.storeName, "storeCode": row.storeCode}

      },
      renderContent(h, { node, data, store }) {
        return (
          <span >
          <span>
          <span>{node.label}</span>
        </span>
        <span style="padding-left: 10px;">
        <el-button style="font-size: 12px;" type="text" on-click={ () => this.addBig('新建大商户') }>+</el-button>

        </span>
        </span>);
      },
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
      handleChecked(data) {
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
      addBig(){
        this.title = title
        this.dialogVisible = true
      },
      batchAdd(){
        this.dialogVisible2 = true
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

      rClick(row, event, column) {

      },

      edit() {

      },
      editGroup(item){
        this.item = item;
        this.dialogVisible = true
      },
      del() {

      },
      append(data) {
        console.log(data)
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        //this.clickEvent()
      },


      clickEvent(){
        let dom = document.querySelectorAll('.clickEvent');
        dom.forEach((map)=>{
          map.addEventListener('click',function (event) {
            event.stopPropagation()
            event.preventDefault()

          })
        })
      },
      recur(data){
        data.forEach((map)=>{
          if(map.child){
            this.$set(map,"show",true);
            this.recur(map.child)
          }
        })
      },
      showLevel() {
        getApi.getLevel(this.token).then((res)=>{
          if (res.data.errcode === 0) {
            this.data5 = res.data.data;
            this.recur(this.data5)
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
    created() {
//      let data = this.data5;
//      this.recur(data)
      this.token = this.$localStorage.get('token');

      this.storeData.forEach((map) => {
        this.$set(map, 'select', false)
      })

      this.showLevel();




    },
    mounted(){
      //this.clickEvent()

      Hub.$on('treeEventEditDel', (e) => {
        this.showLevel();
      })

      Hub.$on('showAdd', (e) => {
        this.showAdd = e

      })

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

<style lang="less" scoped>
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

  .myStore {
    position: absolute;
    top: 40%;
    right: 0;
    background: white;
    z-index: 100;
    border-radius: 10px;
    border: 1px solid #E5EBF4
  }



  /*不能有相同的class名*/
  .myStore-enter-active, .myStore-leave-active {
    transition: all .5s;
  }

  .myStore-enter, .myStore-leave-to {
    right: -280px;
  }
</style>
