<template>
  <div>
    <el-radio-group @change="myChange" v-model="radio">
      <el-radio-button v-for="(item,index) in radioList" :key="item.id" :label="item.name"></el-radio-button>
    </el-radio-group>
    <span class="time">时间：</span>
    <el-date-picker
      @change="getStartTime"
      v-model="time_start"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    <span>至</span>
    <el-date-picker
      @change="getEndTime"
      v-model="time_end"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>
<script>
  export default {
    methods: {
      myChange(label) {
        this.$emit('getRadioDate',label)
      },
      getStartTime(data){
        this.$emit('getStartTime',data)
      },
      getEndTime(data){
        this.$emit('getEndTime',data)
      }
    },
    data() {
      return {
        radio: '今天',
        radioList: [{id: 1, name: "今天"}, {id: 2, name: "昨天"}, {id: 3, name: "近7天"}, {id: 4, name: "近30天"}],
        time_start: '',
        time_end: '',
      };
    }
  }
</script>
