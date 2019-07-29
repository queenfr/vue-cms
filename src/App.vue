<template>
  <div class="app-conteiner">
    <mt-header fixed title="黑马程序员·Vue项目">
        <!-- 回退按钮 -->
        <span slot="left" @click="goBack" v-show="flag">
          <mt-button icon="back">返回</mt-button>
        </span>
    </mt-header>
    <transition>
        <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact">   
        </span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import mui from './lib/mui-master/dist/js/mui.min.js';
export default {
    data(){
        return {
          flag:true
        }
    },
   mounted() {
        // 解决tab栏组件不能切换的问题 方案一
        mui('nav').on('tap','a',function () {
            mui.openWindow({url:this.href})
        })
        // 解决tab栏组件不能切换的问题 方案二：
        // 可以修改mui-tab-item(这个类名与mui有冲突）的类名，不过需要重新写样式
    },  
    created() {
      // 让首页的返回按钮隐藏
      this.flag = this.$route.path ==='/home' ? false : true
    },
    methods:{
      goBack() {
        // console.log(this);
        // 回退功能
        this.$router.go(-1)  //$router的__proto__上有个go属性

      }
    },
    // 监听url地址、
    watch:{
      '$route.path' : function(newVal) {
          if(newVal === '/home') {
             this.flag = false
          } else{
              this.flag = true
          }
      }
    }


};
</script>

<style lang="less" scoped>
    .app-conteiner {
      padding-top: 40px;
      padding-bottom: 50px;
      overflow: hidden;
      
    }
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
      position: absolute;
      opacity: 0;
      transform: translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active {
      transition: all .6s ease;
    }
    * {
      touch-action: pan-y;
    }
    .mint-header {
      z-index:999;
    }
   
</style>
