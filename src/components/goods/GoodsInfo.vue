<template>
  <div class="goodsinfo-conteiner">
    <!-- 小球动 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu"></swiper>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsDesc.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsDesc.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsDesc.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getCount"  :max="goodsDesc.stock_quantity"></numbox>
            <!-- 由于商品数量是在子组件中，所以涉及到子组件向父组件传值 -->
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addTo">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsDesc.goods_no}}</p>
          <p>库存情况：{{goodsDesc.stock_quantity}}</p>
          <p>上架时间：{{goodsDesc.add_time | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(goodsDesc.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(goodsDesc.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goods_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsDesc: [],
      ballFlag:false,
      goodsCount:1
    };
  },
  components: {
    swiper,
    numbox
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      // console.log(this.$route);
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        // console.log(res.body);
        // 由于swiper中用的是item.img，所这里需要添加一个这个属性
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = res.body.message;
        }
      });
    },
    // 商品信息
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        // console.log(res.body);
        if (res.body.status == 0) {
          this.goodsDesc = res.body.message[0];
        }
      });
    },
    // 跳转到图文介绍页面
    goDesc(id) {
      // 编程式导航
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    // 跳转到评论
    goComment(id) {
      this.$router.push({ name: "goodsComment", params: { id } });
    },
    // 加入购物车
    addTo() {
        this.ballFlag = !this.ballFlag

        // 用对象的方式存商品信息
        let goodsinfo = {
            id:this.id,
            count:this.goodsCount,
            price:this.goodsDesc.sell_price,
            selected:true
        }
        // 将商品信息存储到store中，需要操作mutations中的方法
        this.$store.commit('addTocar',goodsinfo)
    },
    // 小球半场动画 
    beforeEnter(el) {
        el.style.transform="translate(0,0)"
    },
    enter(el,done) {
        el.offsetWidth
        // translate如果这个值写死后，会不适配滚动条和屏幕大小
        // 用徽标距离左侧和顶部的距离减去小球距离左侧和顶部的距离，来动态设置小球移动的距离
        // 获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect()
        // 获取徽标在页面中的位置
        const badgePosition = document.getElementById('badge').getBoundingClientRect()
        const x = badgePosition.left-ballPosition.left
        const y = badgePosition.top-ballPosition.top
        el.style.transform=`translate(${x}px,${y}px)`
        el.style.transition="all 1s cubic-bezier(.42,-0.31,1,.55)"
        done()
    },
    afterEnter(el) {
        this.ballFlag = !this.ballFlag
    },
    // 由于商品数量是在子组件中，所以涉及到子组件向父组件传值
    getCount(count) {
        // 将获取到的子组件的值挂载到data上
        this.goodsCount = count
        // console.log(this.goodsCount);
        
    }
  }
};
</script>
<style lang="less" scoped>
.goodsinfo-conteiner {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    position: absolute;
    top: 381px;
    left: 80px;
    z-index: 99;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
  }
}
</style>
