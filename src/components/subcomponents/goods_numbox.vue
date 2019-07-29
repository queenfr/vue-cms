<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
      <!-- max的最大数量值是通过父组件传过来的，是商品剩余数量 -->
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" ref="num" @change="countChanged" value="1" />
      <!-- change事件监听文本框数值的变化 -->
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui-master/dist/js/mui.min.js";
export default {
    
    /* mounted(){
        mui(".mui-numbox").numbox()
    } */
    // 由于总件数的请求是异步请求的，所以大概子组件的dom渲染完后，会拿不到max的数据，
    // max可能是undefined,也不知道什么时候可以拿到,可以使用watch监听
    // 不管watch会被出发几次，但是最后一次，一定是一个合格的max值
    watch:{
      max:function(newVal) {
          mui(".mui-numbox").numbox().setOption('max',newVal)
          // 这里的选择器肯定是设置max值的那个div
      }
    },
    methods:{
        countChanged() {
            // console.log(this.$refs.num.value);
            
            this.$emit('getcount',parseInt(this.$refs.num.value))
            // 将this.$refs.num.value的值传给父组件
        }
    },
    props:["max"]
};
</script>
<style lang="less" scoped>
</style>

