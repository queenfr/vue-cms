import VueRouter from 'vue-router'

// 导入组件
import HomeCon from './components/tabbar/HomeCon.vue'
import MemberCon from  './components/tabbar/MemberCon.vue'
import ShopcarCon from './components/tabbar/ShopcarCon.vue'
import SearchCon from './components/tabbar/SearchCon.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeCon},
    {path:'/member',component:MemberCon},
    {path:'/shopcar',component:ShopcarCon},
    {path:'/search',component:SearchCon},
  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router