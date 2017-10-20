<template>
  <div id="newAdd">
    <div class="contentMsg">
      <xo-nav-path></xo-nav-path>
    </div>
    <div class="contentMsg">
      <el-card>
        <el-row>
          <el-col :span="24" style="border-bottom: 1px solid gainsboro">
            <h3 style="margin-bottom: 10px;">添加门店</h3>
          </el-col>
          <el-form ref="form" :model="form" label-width="0px">
            <el-col :span="24" class="cell">
              <el-col :span="24">
                <el-form-item>
                  <el-col :span="7">
                    <el-select v-model="form.value" placeholder="--省份--">
                      <el-option
                        v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-select v-model="form.value" placeholder="--城市--">
                      <el-option
                        v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-select v-model="form.value" placeholder="--门店标签--">
                      <el-option
                        v-for="item in form.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="16">
                    <el-input v-model="form.storeInfo" placeholder="请输入门店关键字"></el-input>
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button>搜索</el-button>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-transfer v-model="form.data" :data="form.data2" :titles="['门店','已选门店']"></el-transfer>
                </el-form-item>
              </el-col>
            </el-col >
          </el-form>
          <el-col :span="24">
            <el-col :span="12" class="flex-jc">
              <el-button>取消</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary">确定</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
  import xoNavPath from './NavPath.vue'

  export default {
    data() {
      return {
        form: {
          data: [2], // 已选门店key
          data2: [
            {
              key: 10,
              label: '门店组1',
            },
            {
              key: 2,
              label: '门店组2',
            },
            {
              key: 3,
              label: '门店组3',
            }
            ],
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
          ],
          value: '',
          storeInfo: '',
        }
      }
    },
    props: {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    },
    components: {
      xoNavPath
    },
    methods: {

    }
  }
</script>
<style scoped lang="less">
  .contentMsg {
    padding: 0 0 25px 0;
  }

  .selectedStore {
    padding-bottom: 10px;
    border-bottom: 1px solid gainsboro;
  }

  .cell {
    margin-top: 20px;
  }
</style>
