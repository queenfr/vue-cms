import VueRouter from 'vue-router'


// 导入组件
import HomeCon from './components/tabbar/HomeCon.vue'
import MemberCon from  './components/tabbar/MemberCon.vue'
import ShopcarCon from './components/tabbar/ShopcarCon.vue'
import SearchCon from './components/tabbar/SearchCon.vue'
import NewList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import Goodsdesc from './components/goods/Goodsdesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeCon/* ,
      children:[{
        path:'newlist',component:NewList
      }] */},
    {path:'/member',component:MemberCon},
    {path:'/shopcar',component:ShopcarCon},
    {path:'/search',component:SearchCon},
    {path:'/home/newlist',component:NewList},
    {path:'/home/newsinfo/:id',component:NewsInfo},
    {path:'/home/photolst',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodsDesc/:id',component:Goodsdesc,name:'goodsdesc'},
    {path:'/home/goodsComment/:id',component:GoodsComment,name:'goodsComment'}

  ],
  linkActiveClass:'mui-active'
})

// 把路由对象暴露出去
export default router