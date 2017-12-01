<style scoped>
  .time {
    margin-left: 100px;
  }

  .bodyTop {
    padding-bottom: 10px;
  }
  .invoice_top{
    height: 36px;
    display: flex;
    align-items: center;
    border:1px solid #bfcbd9;
    padding: 10px;
    border-radius:5px;
  }

  .pop_cell{
    height: 36px;
  }
</style>

<template>
  <div class="scroll_of">
    <div class="bodyTop">
      <div class="margin_b_10">
        <xo-nav-path :navList="navList"></xo-nav-path>
      </div>
      <xo-datePicker @getRadioDate="getRadioDate" @getStartTime="getStartTime" @getEndTime="getEndTime"></xo-datePicker>

      <div class="flex_es padding_t_10">
        <div class="flex_a">
          <div class="invoice_top margin_r_10">开票张数总计：5</div>
          <div class="invoice_top">
            开票金额总计：¥670
          </div>

        </div>

        <div class="flex_ec">
          <div class="margin_r_10">
            <span>门店</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary">导出</el-button>
        </div>
      </div>

    </div>
      <el-table :data="tableData" border :height="tableHeight">
        <el-table-column header-align="center" align="center" label="序号" width="70">
          <template slot-scope="scope">
            <div>
              {{scope.$index + 1}}
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="invoiceNumber" label="发票号码"></el-table-column>
        <el-table-column header-align="center" align="center" prop="shop" label="开票门店"></el-table-column>
        <el-table-column header-align="center" align="center" prop="name" label="购买方名称"></el-table-column>
        <el-table-column header-align="center" align="center" prop="tel" label="电话"></el-table-column>
        <el-table-column header-align="center" align="center" prop="money" label="开票金额"></el-table-column>
        <el-table-column header-align="center" align="center" prop="time" label="开票时间"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <el-popover
              ref="popover4"
              placement="right"
              width="300"
              trigger="click" @show="()=>{
                return showPop(scope.row)
              }">
             <div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">购买方名称</div>
                 <div class="flex_2">广州九毛九有限公司</div>
               </div>

               <div class="flex_r pop_cell">
                 <div class="flex_1">购买方税号</div>
                 <div class="flex_2">6392193048202C</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">购买方地址</div>
                 <div class="flex_2">广州市荔枝湾沙面大街11111111111111111111</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">购买电话</div>
                 <div class="flex_2">020-34211356</div>
               </div>

               <div class="flex_r pop_cell">
                 <div class="flex_1">金额</div>
                 <div class="flex_2">¥47.43</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">税额</div>
                 <div class="flex_2">0¥5.57</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">价税合计</div>
                 <div class="flex_2">¥53.00</div>
               </div>
               <div style="border-bottom: 1px dashed #bfcbd9;width: 100%">

               </div>

               <div class="flex_r pop_cell">
                 <div class="flex_1">发票代码</div>
                 <div class="flex_2">19837481724</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">发票号码</div>
                 <div class="flex_2">12348023</div>
               </div>
               <div class="flex_r pop_cell">
                 <div class="flex_1">开票日期</div>
                 <div class="flex_2"> 2017-09-09</div>
               </div>

             </div>
              <el-button size="small" type="primary"  slot="reference">查看详情</el-button>
            </el-popover>

          </template>
        </el-table-column>

      </el-table>

    <!--<xo-footer :pageData=pageState @childEvent="getPage" @childEventPageSize="getPageSize"></xo-footer>-->
    <footer>
      <xo-pagination></xo-pagination>
    </footer>

  </div>
</template>

<script>
  import {getScrollHeight} from '../../utility/getScrollHeight'

  export default {
    components: {

    },
    data() {
      return {
        width: 0,
        tableHeight: 0,
        navList: [{name: "统计报表", url: ''}, {name: "差异账单查询", url: ''}],

        input1: '',
        input2: '',
        options: [{
          value: '选项1',
          label: '11'
        }, {
          value: '选项2',
          label: '22'
        }],
        value: '',
        tableData: [{
          invoiceNumber: '111111',
          shop: 'shop',
          name: 'name',
          tel:'130000000',
          money:'123',
          time:'2017'
        },
          {
            invoiceNumber: '111111',
            shop: 'shop',
            name: 'name',
            tel:'130000000',
            money:'123',
            time:'2017'
          }]
      }
    },
    computed: {
      pageState() {
        return {page: 1}
      }
    },
    methods: {
      showPop(data){
console.log(data)
      },
      getPage() {
      },
      getPageSize() {
      },
      getRadioDate(d) {
        console.log(d)
      },
      getStartTime(d) {
        console.log(d)
      },
      getEndTime(d) {
        console.log(d)
      },
    },
    created() {

    },
    updated() {
      getScrollHeight().then((h) => {
        this.tableHeight = h;
      })
    },

  }
</script>
