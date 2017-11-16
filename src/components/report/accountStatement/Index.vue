<style scoped>
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  body {
    font-family: Verdana, sans-serif;
    background: #E8F0F3;
  }

  #calendar {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .month {
    width: 100%;
    background: rgba(42, 54, 67, 1);
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  .year-month {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }

  .choose-month {
    text-align: center;
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: rgba(50, 65, 87, 1);
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.28%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 1rem;
    color: #000;
  }

  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }
</style>

<template>
  <div>
    <div class="margin_b_10">
      <xo-nav-path :navList="navList"></xo-nav-path>
    </div>
    <div id="calendar">
      <div class="month">
        <ul>
          <li class="arrow pointer" @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year">{{ currentYear }}</span>
            <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <li class="arrow pointer" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <ul class="weekdays">
        <li style="color:red">星期日</li>
        <li>星期一</li>
        <li>星期二</li>
        <li>星期三</li>
        <li>星期四</li>
        <li>星期五</li>
        <li style="color:red">星期六</li>

      </ul>
      <ul class="days">
        <li class="pointer" v-for="dayobject in days" @click="getEvent(dayobject.day)">
          <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
          <span v-else>
          <span
            v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"
            class="active">{{ dayobject.day.getDate() }}</span>
          <span v-else>{{ dayobject.day.getDate() }}</span>
        </span>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
  import xoNavPath from '../NavPath.vue'
  export default {
    components:{
      xoNavPath
    },
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        navList:[{name:"统计报表",url:''},{name:"对账单",url:''}],
      }
    },
    computed: {},
    methods: {
      initData: function (cur) {
        let date;
        if (cur) {
          date = new Date(cur);
        } else {
          let now = new Date();
          let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
          d.setDate(35);
          date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay();
        let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);

        this.days = [];
        for (let i = this.currentWeek; i >= 0; i--) {
          let d = new Date(str);
          d.setDate(d.getDate() - i);
          let dayObject = {};
          dayObject.day = d;
          this.days.push(dayObject);
        }
        //当月总天数
        let day = new Date(this.currentYear, this.currentMonth, 0);
        let dayCount = day.getDate();

        //当月最后一天后面的日期个数
        let weekSurplusDay = 6 - day.getDay();

        //1号后面的天数
        let showDay = this.currentWeek + dayCount + weekSurplusDay - 1;
        //1号以外的其他周
        for (let i = 1; i <= showDay - this.currentWeek; i++) {
          let d = new Date(str);
          d.setDate(d.getDate() + i);
          let dayObject = {};
          dayObject.day = d;
          this.days.push(dayObject);
        }
      },
      pickPre: function (year, month) {

        let d = new Date(this.formatDate(year, month, 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      pickNext: function (year, month) {
        let d = new Date(this.formatDate(year, month, 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      pickYear: function (year, month) {
        alert(year + "," + month);
      },

      formatDate: function (year, month, day) {
        let y = year;
        let m = month;
        if (m < 10) m = "0" + m;
        let d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      getEvent(e) {
        console.log(e)
      }
    },
    created() {
      this.initData(null);
    },
    updated() {

    },

  }
</script>
