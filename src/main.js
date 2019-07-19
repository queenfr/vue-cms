// 入口文件
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入请求模块
import VueSource from 'vue-resource';
Vue.use(VueSource);

import app from './App.vue';

import { Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// import 'mint-ui/lib/style.css'
// 还可以不用导入样式文件，利用插件babel-plugin-component

import './lib/mui-master/dist/css/mui.min.css';
import './lib/mui-master/dist/css/icons-extra.css';
import './lib/mui-master/dist/fonts/mui-icons-extra.ttf';



import router from './router.js'
let vm = new Vue({
    el:"#app",
    data:{


    },
    router,
    render:c=> c(app)

})