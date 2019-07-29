// 入口文件
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 当已进入页面时，需要从本地数据中获取car数组的数据，这样子徽标才会有正确的的数字显示
let car = JSON.parse(localStorage.getItem('car')|| '[]')
// 注册store实例对象
const store = new Vuex.Store({
    state:{
        car:car
        //用来存储购物车商品的数据
    },
    mutations:{
        // 如果car中已经有该商品信息了，只需要加数量，没有才会追加该条信息
        addTocar(state,goodsinfo) {
            // 假设没有找到该商品
            let flag = false
            store.state.car.some(item=>{
                if(item.id===goodsinfo.id) {
                    item.count+=parseInt(goodsinfo.count)
                    // 找到了对应的商品，就让flag为true
                    flag = true
                    return true
                }
            })
            // 如果store中没有该商品信息，则需要追加该条数据
            if(!flag) {
                state.car.push(goodsinfo)
            }
            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car))    
        },
        // 点击加减号，更新徽标中的数据
        updataShopCount(state,goodsCount) {
            state.car.some(item=>{
                if(item.id ==goodsCount.id) {
                    item.count = parseInt(goodsCount.count)
                    return true
                }   
            })
            localStorage.setItem('car',JSON.stringify(state.car))    
        },
        // 删除car中的数据
        delCar(state,id) {
            state.car.some((item,i)=>{
                if(item.id==id) {
                    state.car.splice(i,1)
                    return true
                }
            })
        },
        // 更新store中的selected状态
        updateSel(state,info) {
            state.car.some(item=>{
                if(item.id==info.id) {
                    item.selected = info.selected
                    // return true 这里不能用，否则只能改变索引为0的selected的状态
                }
            })
            // 将更新后的数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))     
        }
    },
    getters:{
        getAllCount(state){
            // 实现徽标数值的更新,App中用{{$store.getters.getAllCount}}即可
            let c=0 
            state.car.forEach(item=>{
                c+=item.count
            })    
            return c
        },
        // 获取购物车中对应商品的数量
        getGoodsCount(state) {
            let o={}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
            // {88：2，79：5，90：5} shopcar_numbox中就根据对应商品的id获取数量
        },
        // 获取购物车中对应商品有没有被选中
        getSelected(state) {
            let o ={}
            state.car.forEach(item=>{ 
                o[item.id]=item.selected
            })
            return o
        },
        // 结算
        getAmount(state) {
            let o = {
                count:0, //件数汇总
                amount:0 //总价汇总
            }
            state.car.forEach(item=>{ 
                if(item.selected) {
                    o.count +=item.count
                    o.amount += item.count * item.price
                }
            })
            return o
        }
    }
})

// 导入缩略图的插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入请求模块
import VueSource from 'vue-resource';
Vue.use(VueSource);
Vue.http.options.root="http://www.liulongbin.top:3005"

import app from './App.vue';

// 日期格式化的全局组件
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

// 全局定义post请求的第三个参数
Vue.http.options.emulateJSON = true;

/* import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
// 按需导入不会出现懒加载的小图标，所以全部引入
import MintUi from 'mint-ui'
Vue.use(MintUi)


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
    store,  //将store对象挂在到vm实例上
    render:c=> c(app)

})