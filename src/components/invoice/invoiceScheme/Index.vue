<template>
  <div v-show="getTreeArr['列表']">

    <div class="bodyTop padding_b_10">
      <div class="padding_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>

      <div class="flex_sb">
        <div class="flex_1">
          <el-button size="small" @click="add('新增方案')" v-show="getTreeArr['新增方案']">+新增方案</el-button>
        </div>
        <div class="flex_r">
          <el-input size="small" v-model="searchName" icon="search" placeholder="请输入名称">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="margin_l_10" size="small" @click="search()">搜索</el-button>
        </div>
      </div>

    </div>
    <el-table :data="invoiceList" border :height="tableHeight">
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="编码"
                       width="100">
      </el-table-column>

      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                       label="名称"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="type"
                       label="发票类型"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="service"
                       label="发票服务商"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" prop="status"
                       label="状态"></el-table-column>
      <el-table-column label-class-name="table_head" header-align="center" align="center" label="在用门店">
        <template slot-scope="scope">

          <el-button size="small" @click="show(scope.row)" v-show="getTreeArr['查看门店']">查看门店</el-button>

        </template>
      </el-table-column>


      <el-table-column label-class-name="table_head" header-align="center" align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit('修改',scope.row)" v-show="getTreeArr['修改']">修改</el-button>
          <el-button size="small" @click="edit('查看',scope.row)" v-show="getTreeArr['详情']">查看</el-button>
          <el-button size="small" @click="down(scope.row)" v-show="getTreeArr['下发']">下发</el-button>
          <el-button size="small" type="danger" @click="del(scope.row)" v-show="getTreeArr['删除']">删除</el-button>

        </template>
      </el-table-column>
    </el-table>


    <footer>
      <xo-pagination :pageData=p @page="getPage" @pageSize="getPageSize"></xo-pagination>
    </footer>

    <!--查看门店-->
    <el-dialog title="查看门店" :visible.sync="dialogFormVisible">
      <el-table :data="storeData" border style="width: 100%;">
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="code" label="序号">
          <template slot-scope="scope">
            <div>
              {{scope.$index + 1}}
            </div>
          </template>
        </el-table-column>

        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="门店编码">
        </el-table-column>
        <el-table-column label-class-name="table_head" header-align="center" align="center" prop="store_name"
                         label="门店名称">
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--新增/修改方案-->
    <el-dialog :title="showName" :visible.sync="dialogFormVisible1" @open="open1">


      <el-form ref="clientForm" :model="clientForm" label-width="180px">
        <el-form-item label="方案名称:" prop="name" :rules="{required: true, message: '请输入方案名称', trigger: 'blur'}">
          <el-input v-model="clientForm.name" style="width: 200px;" :disabled="showName === '查看'"></el-input>
        </el-form-item>

        <div v-for="(domain, index) in clientForm.third_code" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.code1" placeholder="请输入名称" :disabled="showName === '查看'"></el-input>
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
                    <el-input v-model="domain.code2" placeholder="请输入编码" :disabled="showName === '查看'"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_sc">
            <div class="m-storeCode margin_l_10" @click="addDomain">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(clientForm.third_code.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(index)">
              <i class="fa fa-minus-circle" aria-hidden="true" style="font-size: 15px;"></i>
            </div>
          </div>
        </div>


        <el-tabs v-model="activeName" @tab-click="handleClick">

          <el-tab-pane label="纸质发票" name="first">

            <el-form-item label-width="50px" label="">
              <el-switch
                v-model="clientForm.status"
                on-color="#13ce66"
                off-color="#ff4949" :disabled="showName === '查看'">
              </el-switch>
              <span>开启</span>
            </el-form-item>

            <el-form-item label-width="50px" label="">

              <div class="flex_a">
                <el-switch
                  v-model="clientForm.auto_log"
                  on-color="#13ce66"
                  off-color="#ff4949" :disabled="showName === '查看'">
                </el-switch>

                <div class="margin_l_10 margin_r_10 t_a">
                  自动记录开票方信息，再次开票免输入:
                </div>
                <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                  content="备注：客人开过一次发票后，系统将自动记录该开票信息，客人再次开票时，可免输入开票信息">

                  <i class="fa fa-info-circle" aria-hidden="true" slot="reference"></i>
                </el-popover>
              </div>

            </el-form-item>


            <el-form-item label-width="50px" label="">

              <div class="cell_title margin_b_10">购买方信息</div>

              <div class="flex_r f_f margin_b_10" v-if="showName === '查看' || showName === '修改'">
                <xo-button v-for="(item,index) in clientForm.purchasers" :key="item.id" :id="item.id"
                           :showName="showName" :name="item.name" marginLeft="10px" backgroundColor="#ffffff"
                           :isBool="item.select"
                           @click="buyInfo"></xo-button>
              </div>


              <div class="flex_r f_f margin_b_10" v-if="showName === '新增方案'">
                <xo-button v-for="(item,index) in purchaserList" :key="item.id" :id="item.id" :showName="showName"
                           :name="item.name" marginLeft="10px" backgroundColor="#ffffff" :isBool="item.select"
                           @click="buyInfo"></xo-button>
              </div>

            </el-form-item>

          </el-tab-pane>
        </el-tabs>

        <div class="flex" v-if="showName !== '查看'">
          <el-button type="primary" @click="submitFrom('clientForm')">保存</el-button>
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
        </div>
      </el-form>


    </el-dialog>

    <!--下发-->
    <el-dialog title="" :visible.sync="dialogFormVisible2" @open="open2" @close="close2">
      <el-radio-group v-model="radio2" @change="changeRadio">
        <el-radio :label="1">门店标签</el-radio>
        <el-radio :label="2">门店</el-radio>
      </el-radio-group>

      <div class="flex_a margin_t_10" v-if="radio2 === 1">
        <el-input size="small" placeholder="门店标签名称" class="margin_r_10" style="width: 200px"
                  v-model="inputArea0"></el-input>
        <el-button size="small" @click="searchStore()">搜索</el-button>
      </div>

      <div class="flex_a margin_t_10" v-if="radio2 === 2">
        <div class="margin_l_10">
          <el-select v-model="providerId" placeholder="请选择省" @change="myChange(providerId,'provider')">
            <el-option v-for="item in providerList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="cityId" placeholder="请选择市" @change="myChange(cityId,'city')">
            <el-option v-for="item in cityList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>

        <div class="margin_l_10">
          <el-select v-model="areaId" placeholder="请选择区">
            <el-option v-for="item in areaList" :key="item.id" :label="item.address" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="margin_l_10 flex_a">
          <el-input placeholder="请输入门店名称" v-model="inputArea" icon="search" class="margin_r_10"></el-input>
          <el-button @click="searchStore1()">搜索</el-button>
        </div>
      </div>

      <div class="margin_t_10" v-if="radio2 === 1">
        <el-table :data="storeData0" border style="width: 100%;" @select-all="handleSelectionChange0"
                  ref="multipleTable0">
          <el-table-column
            header-align="center" align="center"
            type="selection"
            label-class-name="mySelect"
            width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked0">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="门店标签编码">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name"
                           label="门店标签名称">
          </el-table-column>
        </el-table>

        <div class="flex margin_t_10">
          <el-button type="primary" @click="submitFrom0()">确定</el-button>
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
        </div>
      </div>

      <div class="margin_t_10" v-if="radio2 === 2">
        <el-table :data="storeData1" border style="width: 100%;" @select-all="handleSelectionChange"
                  ref="multipleTable">
          <el-table-column
            header-align="center" align="center"
            type="selection"
            label-class-name="mySelect"
            width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" @change="handleChecked">{{scope.$index + 1 }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="id" label="门店编码">
          </el-table-column>
          <el-table-column label-class-name="table_head" header-align="center" align="center" prop="name" label="门店名称">
          </el-table-column>
        </el-table>

        <div class="flex margin_t_10">
          <el-button type="primary" @click="submitFrom1()">确定</el-button>
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
        </div>

      </div>


    </el-dialog>

  </div>
</template>

<script>

  import {getScrollHeight} from '../../utility/getScrollHeight'
  import getApi from './invoiceScheme.service'
  import {getArr, getArea} from '../../utility/communApi'
  import Hub from '../../utility/commun'
  import {mapActions, mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'getTreeArr'
      ]),
    },
    components: {},
    data() {
      return {
        radio2: 1,
        activeName: 'first',
        showName: '',
        purchaserList: [],
        clientForm: {
          name: '',
          third_code: [
            {code1: '', code2: ''}
          ],
          status: true,
          auto_log: true,
          purchasers: [],
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        invoiceList: [],
        storeData0: [],
        storeData1: [],
        tableHeight: 0,
        navList: [{name: "发票方案", url: ''}],
        name: '',
        id: '',
        roleType: [],
        storeData: [],
        p: {page: 1, size: 20, total: 0},
        multipleSelection0: [],
        multipleSelection: [],
        searchName: '',
        providerId: '',
        providerList: [],
        cityId: '',
        cityList: [],
        areaId: '',
        areaList: [],
        inputArea0: '',
        inputArea: '',
      }
    },
    watch: {},
    methods: {
      ...mapActions(['setTreeArr']),
      changeRadio(e) {
        this.inputArea0 = '';
        this.inputArea = '';
        this.storeData0 = [];
        this.storeData1 = [];
        this.multipleSelection0 = [];
        this.multipleSelection = []
      },
      handleChecked0(data) {
        let count = 0;
        this.storeData0.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });
        let list = this.storeData0.filter((item) => {
          return item.select === true
        });
        let list1 = [];
        list.forEach((item) => {
          list1.push(item.id)
        });
        this.multipleSelection0 = list1;
        if (count === this.storeData0.length) {
          list.forEach((item) => {
            this.$refs.multipleTable0.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable0.clearSelection();
        }
      },
      handleSelectionChange0(val) {
        let list = [];
        val.forEach((item) => {
          list.push(item.id)
        });
        this.multipleSelection0 = list;
        if (val.length === this.storeData0.length) {
          this.storeData0.forEach((map) => {
            this.$set(map, 'select', true)
          });
        } else {
          this.storeData0.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },
      handleChecked(data) {
        let count = 0;
        this.storeData1.forEach((data) => {
          if (data.select === true) {
            count += data.select * 1
          }
        });
        let list = this.storeData1.filter((item) => {
          return item.select === true
        });
        let list1 = [];
        list.forEach((item) => {
          list1.push(item.id)
        });
        this.multipleSelection = list1;
        if (count === this.storeData1.length) {
          list.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        let list = [];
        val.forEach((item) => {
          list.push(item.id)
        });
        this.multipleSelection = list;
        if (val.length === this.storeData1.length) {
          this.storeData1.forEach((map) => {
            this.$set(map, 'select', true)
          });
        } else {
          this.storeData1.forEach((map) => {
            this.$set(map, 'select', false)
          });
        }
      },
      searchStore() {

        getApi.getList({page: 1, size: 1000, total: 0}, this.inputArea0).then((res) => {

          res.data.data.list.forEach((map) => {
            this.$set(map, 'select', false)
          });
          this.storeData0 = res.data.data.list;
          this.multipleSelection0 = []
        })

      },
      searchStore1() {
        getApi.searchStore(this.areaId, this.inputArea).then((res) => {
          res.data.data.forEach((map) => {
            this.$set(map, 'select', false)
          });
          this.storeData1 = res.data.data;
          this.multipleSelection = []

        })
      },
      submitFrom0() {
        if (this.multipleSelection0.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择门店标签'
          });
          return
        }

        let str = "";
        this.storeData0.forEach((item)=>{
          this.multipleSelection0.forEach((item1)=>{
            if(item.id === item1){
              str += item.stores + ","
            }
          })
        });

       let store_id =  str.substr(0,str.lastIndexOf(","));

        getApi.issuedInvoice(this.id, store_id).then((res) => {
          if (res.data.errcode === 0) {
            this.dialogFormVisible2 = false
          }
        })

      },
      submitFrom1() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择门店'
          });
          return
        }
        getApi.issuedInvoice(this.id, this.multipleSelection.join(',')).then((res) => {
          if (res.data.errcode === 0) {
            this.dialogFormVisible2 = false
          }
        })
      },
      down(row) {
        this.id = row.id;
        this.dialogFormVisible2 = true
      },
      async handleClick(tab, event) {
        if (tab.name === 'first') {

        }
      },
      open2() {
        this.providerId = '';
        this.cityId = '';
        this.cityList = [];
        this.areaId = '';
        this.areaList = [];
        this.inputArea0 = '';
        this.inputArea = '';
        this.storeData0 = [];
        this.storeData1 = [];
      },
      close2() {
        this.providerId = '';
        this.cityId = '';
        this.cityList = [];
        this.areaId = '';
        this.areaList = [];
        this.inputArea0 = '';
        this.inputArea = '';
        this.storeData0 = [];
        this.storeData1 = [];
        this.multipleSelection0 = [];
        this.multipleSelection = []
      },
      open1() {

        if (this.showName === "新增方案") {
          this.clientForm = {
            name: '',
            third_code: [
              {code1: '', code2: ''}
            ],
            status: true,
            auto_log: true,
            purchasers: []
          }
        }

      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            if (this.showName === "新增方案") {
              let list = [];
              this.purchaserList.forEach((item) => {
                if (item.select === true) {
                  list.push(item.id)
                }
              });
              getApi.add(this.clientForm, list.join(',')).then((res) => {
                if (res.data.errcode === 0) {
                  this.dialogFormVisible1 = false;
                  this.getProgrammeList(this.p = {page: 1, size: 20, total: 0})
                }
              })
            } else {
              let list = [];
              this.clientForm.purchasers.forEach((item) => {
                if (item.select === true) {
                  list.push(item.id)
                }
              });
              getApi.update(this.clientForm, list.join(',')).then((res) => {
                if (res.data.errcode === 0) {
                  this.dialogFormVisible1 = false;
                  this.getProgrammeList(this.p)
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      buyInfo(id, bool) {

        if (this.showName === "新增方案") {
          this.purchaserList.forEach((item) => {
            if (item.id === id) {
              item.select = bool
            }
          })
        } else {
          this.clientForm.purchasers.forEach((item) => {
            if (item.id === id) {
              item.select = bool
            }
          })
        }

      },
      show(row) {
        this.dialogFormVisible = true;
        getApi.getUseStoreList(row.id).then((res) => {
          if (res.data.errcode === 0) {
            this.storeData = res.data.data
          }
        })


      },
      search() {
        if (this.searchName === '') {
          this.getProgrammeList(this.p = {page: 1, size: 20, total: 0})
        } else {
          this.getProgrammeList(this.p = {page: 1, size: 20, total: 0}, this.searchName)
        }
      },
      removeDomain(index) {
        this.clientForm.third_code.splice(index, 1)
      },
      addDomain() {
        this.clientForm.third_code.push({code1: '', code2: ''});
      },

      getPage(page) {
        this.p.page = page;
        this.getProgrammeList(this.p, this.searchName);
      },
      getPageSize(size) {
        this.p.size = size;
        this.getProgrammeList(this.p, this.searchName);
      },


      add(name) {
        this.showName = name;
        this.dialogFormVisible1 = true;
        getApi.getPurchaserList().then((res) => {
          if (res.data.errcode === 0) {
            res.data.data.forEach((item) => {
              if (item.select === 0) {
                item.select = false
              } else {
                item.select = true
              }
            });
            this.purchaserList = res.data.data
          }
        })
      },

      edit(name, row) {
        this.showName = name;
        this.dialogFormVisible1 = true;
        getApi.getInvoiceInfo(row.id).then((res) => {
          if (res.data.errcode === 0) {
            if (res.data.data.status === 1) {
              res.data.data.status = true
            } else {
              res.data.data.status = false
            }
            if (res.data.data.auto_log === 1) {
              res.data.data.auto_log = true
            } else {
              res.data.data.auto_log = false
            }
            res.data.data.purchasers.forEach((item) => {
              if (item.select === 1) {
                item.select = true
              } else {
                item.select = false
              }
            });
            this.clientForm = res.data.data
          }
        })

      },
      del(row) {
        console.log(row)
        if (row.status === "关闭") {
          this.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getApi.del(row.id).then((res) => {

              if (res.data.errcode === 0) {
                this.$message({
                  type: 'info',
                  message: '删除成功'
                });

                this.getProgrammeList(this.p);
              }

            })

          }).catch(() => {
            //
          });
        } else {
          this.$message({
            type: 'info',
            message: '此方案正在使用，不能删除！如须删除，请先禁用后删除。'
          });
        }


      },

      getProgrammeList(p, name = "") {
        getApi.getProgrammeList(p, name).then((res) => {
          if (res.data.errcode === 0) {
            res.data.data.list.forEach((data) => {
              data.select = false;
            });
            this.invoiceList = res.data.data.list;
            this.p.total = res.data.data.count;

          } else {

          }
        })
      },


      myChange(id, name) {
        if (name === "provider") {
          this.cityId = "";
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.cityList = res.data.data
          })
        }
        if (name === "city" && this.cityId !== "") {
          this.areaId = "";
          this.areaList = [];
          getArea(id).then((res) => {
            this.areaList = res.data.data
          })
        }
      },
    },
    created() {

      this.getProgrammeList(this.p);

      getArea('').then((res) => {
        if (res.data.errcode === 0) {
          this.providerList = res.data.data
        } else {

        }
      })

    },
    mounted() {
      Hub.$on('arr', (e) => {
        this.setTreeArr({obj: getArr(e)})
      });
    },
    destroyed() {
      Hub.$off("arr")
    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
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
