<template>
  <div>

    <el-tabs v-model="activeName2" @tab-click="handleClick">
      <!--<el-tab-pane label="加载页面" name="first">-->
      <!--<div class="flex_r" style="height: 500px">-->
      <!--<div class="flex_1">-->
      <!--<h2>内容设置</h2>-->
      <!--<h3>基本信息</h3>-->
      <!--<el-form ref="form1" :model="form1" label-width="100px">-->

      <!--<el-form-item label="加载图片：">-->
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--:action="$updateUrl"-->
      <!--name='filename'-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess1"-->
      <!--:before-upload="beforeAvatarUpload">-->
      <!--<img v-if="form1.load_img" :src="form1.load_img" class="avatar">-->
      <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
      <!--<div>建议图片尺寸350*350px，格式为png,jpg,jprg,且小于500kb</div>-->
      <!--</el-form-item>-->

      <!--</el-form>-->

      <!--</div>-->

      <!--<div class="flex_1 margin_l_10">-->
      <!--<div class="margin_b_10">预览效果</div>-->
      <!--<img src="../../../assets/pageDesign/1.jpeg" alt="" style="height: 500px">-->
      <!--</div>-->
      <!--</div>-->

      <!--</el-tab-pane>-->
      <el-tab-pane label="发票信息" name="second">
        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form2" :model="form2" label-width="100px">

              <el-form-item label="logo图片：">
                <el-upload
                  class="avatar-uploader"
                  :action="$updateUrl"
                  name='filename'
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload">
                  <img v-show="form2.log_img" :src="form2.log_img" style="display: block" ref="img">
                  <i v-show="!form2.log_img" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>建议图片尺寸350*350px，格式为png,jpg,jprg,且小于500kb</div>
                <el-input v-model="form2.log_img" hidden></el-input>
              </el-form-item>

              <el-form-item label="主题选择：">

                <div class="margin_b_10" style="width: 178px;height: 30px"
                     :style="{'background-color':form2.theme_color}"></div>
                <el-radio-group v-model="form2.theme_color" hidden>
                  <el-radio :label="item.color" v-for="(item,index) in colorList" :key="item.color">{{item.color}}
                  </el-radio>
                </el-radio-group>
                <div class="flex_r">
                  <div v-for="(item,index) in colorList" @click="colorHandle(index)" class="pointer flex"
                       style="width: 30px;height: 30px" :style="{'background-color':item.color}">
                    <img src="../../../assets/selected.png" v-if="item.selected" alt="">

                  </div>
                </div>

              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1 margin_l_10">
            <h2 class="margin_b_10">预览效果</h2>
            <img src="../../../assets/pageDesign/2.jpeg" alt="" style="height: 500px">
          </div>
        </div>


      </el-tab-pane>
      <el-tab-pane label="文字公告" name="third">
        <div class="flex_r" style="height: 500px">
          <div class="flex_1">
            <h2>内容设置</h2>
            <h3>基本信息</h3>
            <el-form ref="form3" :model="form3" label-width="50px">
              <el-form-item label="" >
                <div class="flex_r margin_t_10">
                  <div @click="click3(1)" class="myButton margin_r_10" style="background-color: #ffffff;height: 100%;"
                       :style="{'color':selectEdit === 1?'red':'black','border-color':selectEdit === 1?'red':'#C3C4C3',}">
                    文字版
                  </div>

                  <div>
                    <el-input
                      class="margin_b_10"
                      placeholder="标题"
                      v-model="form3.title">
                    </el-input>
                    <el-input
                      class="margin_b_10"
                      type="textarea"
                      :rows="5"
                      placeholder="请在此输入公告"
                      v-model="form3.content">
                    </el-input>
                    <el-input
                      placeholder="日期"
                      v-model="form3.date">
                    </el-input>
                  </div>

                </div>
                <div class="flex_a margin_t_10">
                  <div @click="click3(2)" class="myButton margin_r_10" style="background-color: #ffffff;height: 100%;"
                       :style="{'color':selectEdit === 2?'red':'black','border-color':selectEdit === 2?'red':'#C3C4C3',}">
                    网页版
                  </div>
                  <el-input
                    placeholder="请在此输入链接"
                    v-model="form3.prompt_content">
                  </el-input>
                </div>
              </el-form-item>

              <el-form-item label="">
                <div>
                  *以上二选一
                </div>
              </el-form-item>

            </el-form>

          </div>

          <div class="flex_1 margin_l_10">
            <h2 class="margin_b_10">预览效果</h2>
            <img src="../../../assets/pageDesign/3.jpeg" alt="" style="height: 500px">
          </div>
        </div>


      </el-tab-pane>

    </el-tabs>

    <el-button @click="submit()">提交</el-button>
    <el-button @click="reset()">重置</el-button>


  </div>
</template>

<script>


  import {oneTwoApi} from '@/api/api.js'

  import {mapActions, mapGetters} from 'vuex';

  export default {
    computed: {},
    components: {},
    data() {
      return {
        activeName2: 'second',
        selectEdit:1,
        colorList: [
          {id: 0, color: '#3F9CCF', selected: false},
          {id: 1, color: '#3B6894', selected: false},
          {id: 2, color: '#C06A43', selected: false},
          {id: 3, color: '#EF716F', selected: false},
          {id: 4, color: '#916C96', selected: false},
          {id: 5, color: '#C69735', selected: false},
          {id: 6, color: '#989998', selected: false},
          {id: 7, color: '#000000', selected: false}
        ],
        form1: {
          load_img: '',
        },
        form2: {
          log_img: '',
          theme_color: ''
        },
        form3: {
          prompt_type: 1,
          content: '',
          title: '',
          date: '',
          prompt_content: 'http://',

        },

      }
    },
    watch: {},
    methods: {

      handleClick(tab, event) {
        //console.log(tab, event);
      },

      click3(id) {
        this.selectEdit = id
      },
      colorHandle(i) {
        this.colorList.forEach((item) => {
          if (item.id === i) {
            item.selected = true;
            this.form2.theme_color = item.color
          } else {
            item.selected = false
          }
        })
      },
      handleAvatarSuccess1(res, file) {
        this.form1.load_img = file.response.data.file_url;
      },
      handleAvatarSuccess2(res, file) {
        console.log(file)
        this.form2.log_img = file.response.data.file_url;
      },

      beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';

        const isLt5 = file.size < 512000;
        let img;

        if (isJPG || isPNG) {
          img = true
        } else {
          img = false;
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
        }
        if (!isLt5) {
          this.$message.error('上传头像图片大小不能超过 500kb!');
        }

        setTimeout(() => {
          if (this.$refs.img.clientHeight > 350 || this.$refs.img.clientWidth > 350) {
            this.$message.error('图片尺寸不能超过350px!');
            this.form2.log_img = ''
          }
        }, 400);

        return img && isLt5;

      },

      submit() {
        if (this.selectEdit === 1) {
          let params = {
            redirect: "x1.invoice.updateDecorate",
            id: this.$route.params.id,
            log_img: this.form2.log_img,
            theme_color: this.form2.theme_color,
            title: this.form3.title,
            content: this.form3.content,
            date: this.form3.date,
            prompt_type: 1
          };
          oneTwoApi(params).then((res) => {
            if (res.errcode === 0) {
              this.$alert('提交成功', '', {
                confirmButtonText: '返回',
                callback: action => {
                  this.$router.go(-1)
                }
              });
            }
          })
        } else {
          let params = {
            redirect: "x1.invoice.updateDecorate",
            id: this.$route.params.id,
            log_img: this.form2.log_img,
            theme_color: this.form2.theme_color,
            prompt_content: this.form3.prompt_content,
            prompt_type: 2
          };
          oneTwoApi(params).then((res) => {
            if (res.errcode === 0) {
              this.$alert('提交成功', '', {
                confirmButtonText: '返回',
                callback: action => {
                  this.$router.go(-1)
                }
              });
            }
          })

        }

      },
      reset() {
        this.colorList.forEach((item) => {
          item.selected = false
        });
        this.form2 = {
          log_img: '',
          theme_color: ''
        };
        this.form3 = {
          prompt_type: 1,
          content: '',
          title: '',
          date: '',
          prompt_content: 'http://',
        };

      }
    },
    created() {
      let params = {
        redirect: "x1.invoice.decorateInfo",
        id: this.$route.params.id
      };
      oneTwoApi(params).then((res) => {
        if (res.errcode === 0) {
          this.colorList.forEach((item)=>{
            if(item.color === res.data.theme_color){
              item.selected = true
            }
          });
          this.form2.log_img = res.data.log_img;
          this.form2.theme_color = res.data.theme_color;
          this.form3.title = res.data.title;
          this.form3.content = res.data.content;
          this.form3.date = res.data.date;
          this.form3.prompt_type = res.data.prompt_type;
          this.form3.prompt_content = res.data.prompt_content?res.data.prompt_content:'http://';

        }
      })

    },
    mounted() {

    },
    destroyed() {

    },
    updated() {

    }
  }
</script>

<style scoped lang="less">


</style>
