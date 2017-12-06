<template>
  <div>
    <div class="bodyTop padding_b_10">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_es">
        <div>
          <el-button size="small">批量删除</el-button>
          <el-button size="small" @click="batchAdd()">批量新增</el-button>
          <el-button size="small">批量关闭</el-button>
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
      <div ref="tree" style="min-width: 200px;overflow-y: auto" :style="{height:tableHeight + 'px'}">
        <el-tree
          :data="data5"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="true"
          :render-content="renderContent">
        </el-tree>
      </div>

      <div :style="{width:tableWidth + 'px'}">
          <el-table :data="storeData" border :height="tableHeight"  @row-click="rClick">
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="NO" label="序号"
                             type="index" width="70">
              <template scope="scope">

                <el-checkbox v-model="scope.row.NO"></el-checkbox>
                {{scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeCode"
                             label="编码"
                             width="100"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="storeName" width="150"
                             label="门店"></el-table-column>

            <el-table-column header-align="center" align="center" prop="storeGroup" label="门店组" width="80"></el-table-column>
            <el-table-column header-align="center" align="center" prop="account" width="280" label="账户">
              <template scope="scope">
                <div v-for="(item,index) in scope.row.account">
                  {{item}}
                </div>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="reserveAccount" width="280" label="备用账号"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status" label="支付"
                             width="80"></el-table-column>
            <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="240">
              <template scope="scope">
                <el-button size="small" type="primary" @click.stop="getOneList()">查看</el-button>
                <el-button size="small" @click.stop="edit()">编辑</el-button>
                <!--<el-button size="small" type="danger" @click.stop="del()">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        <footer>
          <xo-pagination></xo-pagination>
        </footer>

      </div>
    </div>
    <!--弹窗-->
    <transition name="myStore">
      <!--一定要有class,写style无效-->
      <div v-show="showAside" class="myStore">
        <div class="padding_10" style="width: 280px">
          <div>{{showAsideObj.storeName}}</div>
          <div class="flex_r margin_t_10">
            <div class="flex_1 flex_ce">门店编码：</div>
            <div class="flex_1">{{showAsideObj.storeCode}}</div>
          </div>

          <div class="flex_r margin_t_10">
            <div class="flex_1 flex_ce">第三方编码：</div>
            <div class="flex_1">美团  8989</div>
          </div>
          <div class="flex_r margin_t_10">
            <div class="flex_1 flex_ce">所属组：</div>
            <div class="flex_1">广州运营区</div>
          </div>
          <div class="flex_r margin_t_10">
            <div class="flex_1 flex_ce">门店电话：</div>
            <div class="flex_1">020-9849792</div>
          </div>

          <div class="flex_r margin_t_10">
            <el-button size="mini" type="primary">置顶</el-button>
            <el-button size="mini" type="primary">修改</el-button>
            <el-button size="mini" type="primary">停用</el-button>
            <el-button size="mini" type="primary">更多</el-button>
          </div>
        </div>
      </div>
    </transition>
    <el-dialog
      title="新建／修改组"
      :visible.sync="dialogVisible"
      width="50%">
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

  </div>
</template>

<script>
  let id = 1000;
  import xoNavPath from '../../NavPath.vue'
  import {getScrollHeight} from '../../../utility/getScrollHeight'
  export default {
    components: {
      xoNavPath
    },
    data() {
      return {
        showAside: false,
        dialogVisible:false,
        tableHeight: 0,
        tableWidth:0,
        navList: [{name: "门店管理", url: ''}, {name: "门店列表", url: ''}],
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
          NO: true,
          storeCode: '83789',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          status: '开启'
        }, {
          NO: false,
          storeCode: '837892',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          status: '开启'
        }, {
          NO: false,
          storeCode: '837893',
          storeName: '炳胜（马场店）',
          storeGroup: '山口组',
          account: ['支付宝  易极付  炳胜（马场店）','支付宝  易极付  炳胜（马场店）'],
          reserveAccount:'支付宝  易极付  炳胜（马场店）',
          status: '开启'
        }],
        data4: [{
          id: 1, name: '民生银行000', children: [
            {
              id: 5,
              parentId: 1,
              name: '九毛九',
            }, {
              id: 6,
              parentId: 1,
              name: '太二酸菜鱼',
            }]
        }, {
          id: 2, name: '易极付', children: [
            {
              id: 7,
              parentId: 2,
              name: '狮子牌',
            }, {
              id: 8,
              parentId: 2,
              name: '狮子牌22', children: [
                {id: 9, parentId: 8,name: 'pkkkk',}
              ]
            },
            {
              id: 10,
              parentId: 2,
              name: '狮子牌33'
            },
          ]
        },{
          id: 3, name: '易极付4444'
        }],
        data5: [{
          id: 1,
          label: '民生银行',
          children: [{
            id: 4,
            label: '狮子牌',
            children: [{
              id: 9,
              label: '狮子牌33'
            }, {
              id: 10,
              label: '易极付4444'
            }]
          }]
        }, {
          id: 2,
          label: '民生银行1',
          children: [{
            id: 5,
            label: '九毛九'
          }, {
            id: 6,
            label: '太二酸菜鱼'
          }]
        }],
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
      }
    },
    watch: {
      "showAsideObj": function (n, o) {
        if (n.storeCode === o.storeCode) {
          this.showAside = !this.showAside
        } else {
          if (this.showAside === false) {
            this.showAside = true;
          } else {
            this.showAside = false;
            setTimeout(() => {
              this.showAside = true;
            }, 500)
          }
        }
      }
    },
    methods: {
      batchAdd(){
        this.$router.push('/storeManage/storeList/newAddStore')
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
      renderContent(h, { node, data, store }) {
        return (
          <span >
          <span>
          <span>{node.label}</span>
        </span>
        <span class="clickEvent">
          <el-popover placement="right" width="200" trigger="click">
          <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加下级组</el-button>
        <el-button size="mini" type="text" on-click={ () => this.editGroup(data) }>修改组</el-button>
        <el-button size="mini" type="text" >上移</el-button>
          <el-button size="mini" type="text">下移</el-button>
          <el-button size="mini" type="text">删除</el-button>
          <i slot="reference" class="el-icon-plus pointer margin_l_10"></i>
          </el-popover>
          </span>
          </span>);
      },
      rClick(row, event, column) {
        this.showAsideObj = {"storeName": row.storeName, "storeCode": row.storeCode}
      },
      getOneList() {
        console.log(123)
        this.$router.push('/storeManage/storeList/seeTheStore')
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
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        this.clickEvent()
      },

      recur(data){
        data.forEach((map)=>{
          if(map.children){
            //map.height = map.children.length *35
            this.$set(map,"show",true)
            this.recur(map.children)
          }
        })
      },
      clickEvent(){
        let dom = document.querySelectorAll('.clickEvent');
        dom.forEach((map)=>{
          map.addEventListener('click',function (event) {
            event.stopPropagation()
            event.preventDefault()

          })
        })
      }

    },
    created() {
      let data = this.data4;
      this.recur(data)

    },
    mounted(){
      this.clickEvent()
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
