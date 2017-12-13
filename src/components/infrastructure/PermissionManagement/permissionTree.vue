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

  .height_0 {
    height: 0;
  }

  .heightTran {
    overflow: hidden;
    transition: all .3s
  }

  .tree-node:hover {
    background: #e4e8f1;
  }

  .add {
    font-size: 5px;
    margin-left: 2px;
  }
</style>

<template>
  <div>

    <!--子部门-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible1"
      width="50%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="名称:" prop="levelname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="form.levelname" placeholder="请输入内容"></el-input>
        </el-form-item>

        <div v-for="(domain, index) in form.levelcodes" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key" :prop="'levelcodes.' + index + '.name'"
                        :rules="{required: true, message: '第三方编码不能为空', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.name"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="m-rank">
            <div class="m-rank-child"></div>
          </div>
          <el-form-item label-width="0" :key="domain.key" :prop="'levelcodes.' + index + '.providerid'"
                        :rules="{required: true, message: '第三方编码不能为空!', trigger: 'blur'}">
            <div>
              <el-row>
                <el-col>
                  <div style="width:150px">
                    <el-input v-model="domain.providerid"></el-input>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <div class="flex_a" style="margin-bottom: 22px">
            <div class="m-storeCode margin_l_10" @click="addDomain()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(form.levelcodes.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="margin_t_10">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--新增用户-->

    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible2"
      width="50%">
      <el-form ref="formRules2" :model="formUser" label-width="100px">

        <el-form-item label="名称:" prop="nickname" :rules="{required: true, message: '请输入名称', trigger: 'blur'}">
          <el-input v-model="formUser.nickname" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="phone" :rules="{required: true, message: '请输入手机', trigger: 'blur'}">
          <el-input v-model="formUser.phone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <div v-for="(domain, index) in formUser.billHuman" class="flex_r">
          <el-form-item label="第三方编码" :key="domain.key">
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
          <el-form-item label-width="0" :key="domain.key">
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
            <div class="m-storeCode margin_l_10" @click="addDomain2()">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div v-if="(formUser.billHuman.length>1) && (index !== 0)" class="m-storeCode margin_l_10"
                 @click.prevent="removeDomain2(domain)">
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <el-form-item label="所属部门:" >
          <div>{{formUser.group_id}}</div>

        </el-form-item>
        <el-form-item label="拥有权限:" >
          <div>{{formUser.power_id}}</div>

        </el-form-item>

        <el-form-item label="角色:">
          <el-select v-model="formUser.role_id" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="状态:">

          <el-switch
            v-model="formUser.status"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </el-form-item>

        <div class="margin_t_10">
          <!--<el-button>取消</el-button>-->
          <el-button type="primary" @click="submitFrom2('formRules2')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <div v-for='(item,index) in data' style="line-height: 36px;">
      <div class="tree-node" :style="{'padding-left':  count *  20  + 'px','background':(item.selected)?'#edf7ff':''}">

        <span :style="{display:(item.child && item.child.length != 0)?'none':'inline-block'}"
              style="vertical-align: middle;width: 25px"></span>
        <span @click.stop.self='item.show=!item.show' v-if='item.child && item.child.length != 0'
              :style="{transform:(item.show)?'rotate(90deg)':'rotate(0deg)'}" style="margin-right: 8px;"
              class="el-tree-node__expand-icon"></span>

        <span @click.stop.self="test(item)" class="pointer el-tree-node__label">{{item.levelname}}</span>

        <el-popover placement="right" width="200" trigger="click">

          <el-button size="mini" type="text" @click="addBig1(item.id,'新增子部门')">新增子部门</el-button>
          <el-button size="mini" type="text" @click="addBig2(item.id,'新增用户')">新增用户</el-button>

          <i slot="reference" class="el-icon-plus pointer add"></i>
        </el-popover>

      </div>
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
      >
        <trees :data='item.child' v-if="item.show" :count='count +1' class="heightTran" ></trees>
      </transition>
    </div>
  </div>
</template>

<script>

  import Hub from '../../utility/commun'
   import getApi from './permissionManagement.service'

  export default {
    name: 'trees',
    props: ['data', 'count'],
    watch: {

    },

    data() {
      return {
        tree:null,
        title: '',
        myHeight: '',
        styleObject: {
          height: 0
        },
        item: {},
        dialogVisible1: false,
        dialogVisible2:false,
        form: {
          levelname: '',
          levelcodes: [
            {name: '', providerid: ''}
          ],
        },
        formUser: {
          id:'',
          nickname: '',
          phone:'',
          group_id:'',
          power_id:'',
          role_id:'',
          billHuman: [
            {value: '', value1: ''}
          ],
          status:''
        },
        id:'',//组织id
        levelname:'',
        options: [{
          id: 1,
          label: '黄金糕'
        }, {
          id: 2,
          label: '双皮奶'
        }, {
          id: 3,
          label: '蚵仔煎'
        }, {
          id: 4,
          label: '龙须面'
        }, {
          id: 5,
          label: '北京烤鸭'
        }],

      }
    },
    methods: {
      submitFrom2(formRules2){

        this.$refs[formRules2].validate((valid) => {
          if (valid) {


            getApi.newlyAddAccount(this.formUser).then((res)=>{
              console.log(res)
            })




            this.dialogVisible2 = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            this.form.id = this.id;
            if(this.title === '新建大商户' || this.title === '新增集团' || this.title === '新增企业' || this.title === '添加子部门'){

              getApi.addLevel(this.form).then((res)=>{
                console.log(res)
                if(res.data.errcode === 0){
                  Hub.$emit('treeEventEditDel','Ok');
                }
              });
            }

            if(this.title === '修改'){
              getApi.updateLevel(this.form).then((res)=>{
                Hub.$emit('treeEventEditDel','Ok');
                if(res.data.errcode === 0){
                }
              });
            }

            this.dialogVisible1 = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addBig1(id,title) {
        this.form= {
          levelname: '',
          levelcodes: [
            {name: '', providerid: ''}
          ],

        };
        this.id = id;
        this.title = title;
        this.dialogVisible1 = true
      },
      addBig2(id,title) {
        this.form= {
          id:'',
          nickname: '',
          phone:'',
          group_id:'',
          power_id:'',
          role_id:'',
          billHuman: [
            {value: '', value1: ''}
          ],
          status:''
        };

        this.dialogVisible2 = true
      },

      test(item) {
        //console.log(item)
        this.levelname = item.levelname;

       // Hub.$emit('getBsList',{levelid:item.id,storename:item.levelname});

          Hub.$emit('showAdd',{levelid:item.id,type:item.type,levelName:item.levelname});

//        item.show = !item.show
      },
      removeDomain(item) {
        let index = this.form.levelcodes.indexOf(item)
        if (index !== -1) {
          this.form.levelcodes.splice(index, 1)
        }
      },
      addDomain() {
        this.form.levelcodes.push({name: '', providerid: ''});
      },
      removeDomain2(item) {
        let index = this.formUser.billHuman.indexOf(item)
        if (index !== -1) {
          this.formUser.billHuman.splice(index, 1)
        }
      },
      addDomain2() {
        this.formUser.billHuman.push({value: '', value1: ''});
      },

      beforeEnter: function (el) {
        el.style.height = '0';
      },
      enter: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px';
        } else {
          el.style.height = '';
        }
      },
      afterEnter: function (el) {
        el.style.height = '';
      },
      enterCancelled: function (el) {

      },
      beforeLeave: function (el) {
        el.style.height = el.scrollHeight + 'px';
      },

      leave: function (el) {
        if (el.scrollHeight !== 0) {
          el.style.height = 0;
        }
      },
      afterLeave: function (el) {
        el.style.height = '';
      },

      leaveCancelled: function (el) {

      },
    },
    created() {

    },
    mounted() {
    },
    destroyed(){
    }
  }
</script>
