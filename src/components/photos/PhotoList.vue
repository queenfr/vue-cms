<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <!-- <div class="mui-scroll" v-for="item in cateList" :key="item.id"> -->
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cateList" :key="item.id" @tap="getPhoto(item.id)">{{item.title}}</a>
          
        </div>
      </div>
    </div>
    <ul class="info-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
          <img v-lazy="item.img_url">
          <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao }}</div>
          </div>
        </router-link>
    </ul>
  </div>
</template>
<script>
import mui from '../../lib/mui-master/dist/js/mui.min.js';
export default {
    data(){
        return {
            // 所有分类的数组
            cateList:[],
            // 图片的数组
            list:[]
        }
    },
    created() {
       this.getCate();
       this.getPhoto(0); //默认进入页面请求的所有图片数据
    },
    mounted() {
        // 初始化scroll控件：
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }, 
    methods: {
      // 获取分类
      getCate() {
          this.$http.get('api/getimgcategory')
          .then(res=>{
             
              if(res.body.status==0) {
                  let cate = {title:'全部',id:0};
                  res.body.message.unshift(cate)
                  this.cateList = res.body.message
                  //  console.log(this.cateList);
              }
              
          })
      },
      // 获取图片
      getPhoto(cateId) {
          this.$http.get('api/getimages/'+cateId)
          .then(res=>{
              // console.log(res.body);
              if(res.body.status==0) {
                  this.list = res.body.message
              }
              
          })
      }
    }, 
};
</script>
<style lang="less" scoped>
    * {
        touch-action:pan-y;
    }
    .info-list {
        list-style:none;
        margin:0;
        padding:10px;
        padding-bottom:0;
      li {
        position: relative;
        background-color: #ccc;
        text-align: center;
        margin-bottom:10px;
        box-shadow:0 0 9px #999;
        img {
          width:100%;
          vertical-align: middle;
          // display:block;
          
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
        .info {
          position:absolute;
          bottom:0;
          color:#fff;
          text-align:left;
          max-height:84px;
          background:rgba(0,0,0,.6);
          .info-title {
              font-size:14px;
          }
          .info-body {
              font-size:13px;
          }
        }

      }
        
    }
    
</style>
