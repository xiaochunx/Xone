<style scoped>

</style>

<template>
  <div @click="handleClick" class="myButton" :style="{'margin-right':marginRight,'margin-bottom':marginBottom,'color':!isBool?'black':'red','border-color':!isBool?'#C3C4C3':'red','background-color':backgroundColor}">
    {{name}}
  </div>

</template>

<script>
  export default {
    name:"xoButton",
    props:["id","name","color","backgroundColor","marginRight","marginBottom","isBool","showName"],
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
