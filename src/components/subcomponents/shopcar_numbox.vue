<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" style="height:25px;">
      <!-- max的最大数量值是通过父组件传过来的，是商品剩余数量 -->
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <!-- $store.getters.getGoodsCount[goodsId] 如果父组件将商品id传过来了，是可以直接用vuex中的getters的 -->
      <input id="test" class="mui-input-numbox" type="number" ref="num" @change="countChanged" :value="initCount" />
      <!-- change事件监听文本框数值的变化 -->
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui-master/dist/js/mui.min.js";
export default {
    
     mounted(){
        mui(".mui-numbox").numbox()
    }, 
    
    methods:{
        countChanged() {
            this.$store.commit("updataShopCount",{
                id:this.goodsId,
                count:this.$refs.num.value
            })
            
            
        }
    },
    props:["initCount","goodsId"]
    
};
</script>
<style lang="less" scoped>
</style>

