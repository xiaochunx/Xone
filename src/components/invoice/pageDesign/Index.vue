<template>
  <div>

    <el-tabs  v-model="activeName2"  @tab-click="handleClick">
      <el-tab-pane label="加载页面" name="first">
        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form1" :model="form1" label-width="100px">

              <el-form-item label="加载图片："  prop="imageUrl" :rules="{required: true, message: '请选择图片', trigger: 'change'}">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form1.imageUrl" :src="form1.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>建议图片尺寸350*350px，格式为png,jpg,jprg,且小于500kb</div>
              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1 margin_l_10">
            <div class="margin_b_10">预览效果</div>
            <img src="../../../assets/pageDesign/1.jpeg" alt="" style="height: 500px">
          </div>
        </div>
        <el-button  @click="submit(1,'form1')" >提交</el-button>
        <el-button  @click="" >重置</el-button>
      </el-tab-pane>
      <el-tab-pane label="发票信息" name="second">

        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form2" :model="form2" label-width="100px">

              <el-form-item label="logo图片：" prop="imageUrl" :rules="{required: true, message: '请选择图片', trigger: 'change'}">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form2.imageUrl" :src="form2.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>建议图片尺寸350*350px，格式为png,jpg,jprg,且小于500kb</div>
              </el-form-item>

              <el-form-item label="主题选择：" prop="selectedColor" :rules="{required: true, message: '请选择主题', trigger: 'change'}">

                <div class="margin_b_10" style="width: 178px;height: 30px" :style="{'background-color':form2.selectedColor}"></div>

                <div class="flex_r">

                  <div v-for="(item,index) in colorList" @click="colorHandle(index)" class="pointer flex" style="width: 30px;height: 30px" :style="{'background-color':item.color}">
                    <img src="../../../assets/selected.png" v-if="item.selected" alt="">

                  </div>
                </div>

              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1 margin_l_10">
            <div class="margin_b_10">预览效果</div>
            <img src="../../../assets/pageDesign/2.jpeg" alt="" style="height: 500px">
          </div>
        </div>

        <el-button  @click="submit(2,'form2')" >提交</el-button>
        <el-button  @click="" >重置</el-button>
      </el-tab-pane>
      <el-tab-pane label="文字公告" name="third">
        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form3" :model="form3" label-width="50px">
              <el-form-item label="" prop="radio" :rules="{type:'number',required: true, message: '请选择选项', trigger: 'change'}">
                  <div class="flex_r margin_t_10">
                    <div @click="click3(1)" class="myButton margin_r_10" style="background-color: #ffffff;height: 100%;" :style="{'color':isBool === 1?'red':'black','border-color':isBool === 1?'red':'#C3C4C3',}">
                      文字版
                    </div>
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请在此输入公告"
                      v-model="form3.textArea">
                    </el-input>
                  </div>
                  <div class="flex_a margin_t_10">
                    <div @click="click3(2)" class="myButton margin_r_10" style="background-color: #ffffff;height: 100%;" :style="{'color':isBool === 2?'red':'black','border-color':isBool === 2?'red':'#C3C4C3',}">
                      网页版
                    </div>
                    <el-input
                      placeholder="请在此输入链接"
                      v-model="form3.text">
                    </el-input>
                  </div>
              </el-form-item>

              <el-form-item label="" >
                <div>
                  *以上二选一
                </div>
              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1 margin_l_10">
            <div class="margin_b_10">预览效果</div>
            <img src="../../../assets/pageDesign/3.jpeg" alt="" style="height: 500px">
          </div>
        </div>

        <el-button  @click="submit(3,'form3')" >提交</el-button>
        <el-button  @click="" >重置</el-button>

      </el-tab-pane>
      <el-tab-pane label="加载页面" name="fourth">
        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form4" :model="form4" label-width="100px">

              <el-form-item label="加载图片："  prop="imageUrl" :rules="{required: true, message: '请选择图片', trigger: 'change'}">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess4"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form4.imageUrl" :src="form4.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>建议图片尺寸350*350px，格式为png,jpg,jprg,且小于500kb</div>
              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1">
            预览效果
          </div>
        </div>
        <el-button  @click="submit(4,'form4')" >提交</el-button>
        <el-button  @click="" >重置</el-button>
      </el-tab-pane>
    </el-tabs>




  </div>
</template>

<script>


  import {oneTwoApi} from '@/api/api.js'

  import {mapActions, mapGetters} from 'vuex';

  export default {
    computed: {

    },
    components: {},
    data() {
      return {
        activeName2: 'first',
        isBool:1,
        colorList:[
          {id:0,color:'#3F9CCF',selected:false},
          {id:1,color:'#3B6894',selected:false},
          {id:2,color:'#C06A43',selected:false},
          {id:3,color:'#EF716F',selected:false},
          {id:4,color:'#916C96',selected:false},
          {id:5,color:'#C69735',selected:false},
          {id:6,color:'#989998',selected:false},
          {id:7,color:'#000000',selected:false}
        ],
        form1:{
          imageUrl:'',
        },
        form2:{
          imageUrl:'',
          selectedColor:''
        },
        form3:{
          radio:1,
          textArea:'',
          text:''
        },
        form4:{
          imageUrl:'',
        },
      }
    },
    watch: {},
    methods: {

      handleClick(tab, event) {
        console.log(tab, event);
      },

      click3(id){
        this.isBool = id
      },
      colorHandle(i){
        this.colorList.forEach((item)=>{
          if(item.id === i){
            item.selected = true;
            this.form2.selectedColor = item.color
          } else {
            item.selected = false
          }
        })
      },
      handleAvatarSuccess1(res, file) {
        this.form1.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess2(res, file) {
        this.form2.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess4(res, file) {
        this.form4.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';

        const isLt5 = file.size  < 512000;
        let img;

        if(isJPG || isPNG){
          img = true
        }else {
          img = false;
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
        }
        if (!isLt5) {
          this.$message.error('上传头像图片大小不能超过 500kb!');
        }
        return img && isLt5;

      },

      submit(tab,form) {
        this.$refs[form].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit!!');
            return false;
          }
        });
        switch (tab){
          case 1:
            console.log(1);
            break;
          case 2:
            console.log(2);
            break;
          case 3:
            if(this.isBool === 1){
              console.log(this.form3.textArea)
            } else {
              console.log(this.form3.text)
            }
            break;
          case 4:
            console.log(4);
            break;
        }


      },

    },
    created() {

    },
    mounted() {

    },
    destroyed(){

    },
    updated() {

    }
  }
</script>

<style scoped lang="less">



</style>
