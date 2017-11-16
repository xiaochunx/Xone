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
    transition: all .5s
  }

</style>

<template>
  <div>
    <!--点击款易弹窗-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="formRules" :model="form" label-width="100px">
        <el-form-item label="编码:">
          <el-input v-model="form.code" :disabled="true"></el-input>
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

        <div>
          请上传以下证件（图片大小不要超过5M）
        </div>

        <div class="margin_t_10">
          <div>营业执照</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <div>
            组织机构代码
          </div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <div>开户许可证</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <div>税务登记证</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <div>法人证件正面照</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <div>法人证件反面照</div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="margin_t_10">
          <el-button>取消</el-button>
          <el-button type="primary" @click="submitFrom('formRules')">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <div v-for='(item,index) in data' :style="{'margin-left': count +20 + 'px'}" style="line-height: 35px;">
      <i @click.stop.self='item.show=!item.show' v-if='item.children && item.children.length != 0'
         :style="{transform:(item.show)?'rotate(90deg)':'rotate(0deg)'}"
         class="el-icon-caret-right pointer heightTran "></i>

      <span @click="test(item)" class="pointer">{{item.label}}</span>

      <i slot="reference" class="el-icon-plus pointer" v-if="item.id === 0" @click="addBig('新建大商户')"></i>

      <el-popover placement="right" width="200" trigger="click">
        <el-button size="mini" type="text" @click="addGroup('新增集团')" v-if="item.id === 1">新增集团</el-button>
        <el-button size="mini" type="text" @click="addEnterprise('新增企业')" v-if="item.id === 2">新增企业</el-button>
        <el-button size="mini" type="text" @click="addDepartment('添加子部门')" v-if="item.id === 3">添加子部门</el-button>
        <el-button size="mini" type="text" @click="addStore('添加门店')" v-if="item.id === 3">添加门店</el-button>

        <el-button size="mini" type="text" @click="edit(item,'修改')">修改</el-button>

        <el-button size="mini" type="text">删除</el-button>
        <i slot="reference" class="el-icon-plus pointer" v-if="item.id > 0 &&item.id <4"></i>
      </el-popover>

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
        <trees :data='item.children' v-if="item.show" :count='count' class="heightTran"></trees>
      </transition>
    </div>
  </div>
</template>

<script>

  let id = 1;
  export default {
    name: 'trees',
    props: ['data', 'count'],
    watch: {
      'data': function (n) {
        console.log(n)
      }
    },
    data() {
      return {
        title: '',
        imageUrl: '',
        myHeight: '',
        styleObject: {
          height: 0
        },
        isEdit: true,
        value: "",
        item: {},
        dialogVisible: false,
        options: [{
          value: 1,
          label: '民生银行'
        }, {
          value: 2,
          label: '易极付'
        }],
        form: {
          name: '',
          code: '',
          thirdPartyCoding: [
            {value: '', value1: ''}
          ],
        }

      }
    },
    methods: {
      submitFrom(formRules) {
        this.$refs[formRules].validate((valid) => {
          if (valid) {
            const newChild = {id: id++, label: 'testtest', show: true, children: []};
            this.data[0].children.push(newChild);
            this.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG ||!isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return (isJPG || isPNG) && isLt5M;
      },
      addStore(){
        this.$router.push('/storeManage/storeList/newAddStore')

      },
      addDepartment(title){
        this.title = title
        this.dialogVisible = true
      },
      addEnterprise(title) {
        this.title = title
        this.dialogVisible = true
      },
      addGroup(title) {
        this.title = title
        this.dialogVisible = true
      },
      addBig(title) {
        this.title = title
        this.dialogVisible = true
      },

      test(item) {
        item.show = !item.show
      },
      removeDomain(item) {
        let index = this.form.thirdPartyCoding.indexOf(item)
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
      append(item) {
        const newChild = {id: id++, label: 'testtest', show: true, children: []};
        if (!item.children) {
          this.$set(item, 'children', []);
        }
        item.children.push(newChild);
        console.log(this.data)
      },
      edit(item,name) {
        this.item = item;
        this.dialogVisible = true
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

  }
</script>
