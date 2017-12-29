<style scoped>
  .myButton{
    height: 36px;


    border: 1px solid;
    border-radius: 5px;
    cursor: pointer;
    margin: 0;
    padding: 10px 15px;
    line-height: 1;
    white-space: nowrap;
  }
  .myButton:active {
    box-shadow: 1px 1px 20px #B6C5D8;
    opacity: 0.8;
  }
  .myButton:focus {
    outline: none;
  }
</style>

<template>
  <button @click="handleClick" class="myButton" :style="{'margin-left':marginLeft,'color':!isBool?'black':'red','border-color':!isBool?'#C3C4C3':'red','background-color':backgroundColor}">
    {{name}}
  </button>

</template>

<script>
  export default {
    name:"xoButton",
    props:["id","name","color","backgroundColor","marginLeft","isBool","showName"],
    data(){
      return{

      }
    },
    methods: {
      handleClick(evt) {
        if(this.$props.showName !== '查看'){
          let myBool;
          if(this.$props.isBool === false){
            myBool = true
          }else {
            myBool = false
          }
          this.$emit('click', this.$props.id, myBool);
        }
      }
    },
    created:function () {

    },
  }
</script>
