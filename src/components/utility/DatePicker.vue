<template>
  <div>
    <el-radio-group @change="myChange" v-model="radio">
    <el-radio-button v-for="(item,index) in radioList" :key="item.id" :label="item.label">{{item.name}}
      </el-radio-button>
    </el-radio-group>
    <span class="time">时间：</span>
    <el-date-picker
      @change="getStartTime"
      v-model="time_start"
      type="datetime"
      placeholder="选择开始日期时间">
    </el-date-picker>
    <span>至</span>
    <el-date-picker
      @change="getEndTime"
      v-model="time_end"
      type="datetime"
      placeholder="选择结束日期时间">
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    methods: {
      myChange(label) {
        this.myRadio = label;
        switch (label) {
          case 1:
            this.dateInit()
            this.time_start = '';
            this.time_end = '';
            break;
          case 2:
            let end = new Date(new Date().setHours(0, 0, 0, 0)) * 1;
            let start = end - 3600 * 24 * 1000;
            this.$emit('getRadioDate', [start, end]);
            this.time_start = '';
            this.time_end = '';
            break;
          case 3:
            end = new Date() * 1;
            start = end - 3600 * 24 * 1000 * 7;
            this.$emit('getRadioDate', [start, end]);
            this.time_start = '';
            this.time_end = '';
            break;
          case 4:
            end = new Date() * 1;
            start = end - 3600 * 24 * 1000 * 30;
            this.$emit('getRadioDate', [start, end]);
            this.time_start = '';
            this.time_end = '';
            break;
        }
      },
      getStartTime(data) {
        if (data === undefined) {
          this.radio = this.myRadio;
        } else {
          this.radio = '';
        }
        this.$emit('getStartTime', new Date(data) * 1)
      },
      getEndTime(data) {
        if (data === undefined) {
          this.radio = this.myRadio;
        } else {
          this.radio = '';
        }
        this.$emit('getEndTime', new Date(data) * 1)
      },
      dateInit(){
        let start = new Date(new Date().setHours(0, 0, 0, 0)) * 1;
        let end = new Date() * 1;
        this.$emit('getRadioDate', [start, end]);
      }
    },
    data() {
      return {
        radio: 1,
        myRadio: '',//el-radio-group @change="myChange" 有改变其它element组件状态时BUG，需要有一个中间值
        radioList: [{label: 1, name: "今天"}, {label: 2, name: "昨天"}, {label: 3, name: "近7天"}, {label: 4, name: "近30天"}],
        time_start: '',
        time_end: '',
      };
    },
    created(){
      this.dateInit()

    }
  }
</script>
