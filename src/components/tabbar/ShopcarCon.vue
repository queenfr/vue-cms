<template>
    <div class="shopcar-contaner">
        <!-- 商品列表页 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,index) in carlist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getSelected[item.id]" 
                        @change="updateSelected(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <shopnumbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></shopnumbox>
                                <a href="#" @click.prevent="delGoods(item.id,index)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <!-- 商品结算区 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner pay">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getAmount.count}}</span>件，
                                总价<span class="red">￥{{$store.getters.getAmount.amount}}</span>
                            </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
           
    </div>
</template>
<script>
import shopnumbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            carlist:[]
        }
    },
    created(){
        this.getCarList()
    },
    methods:{
        getCarList() {
            // 获取本地存储中所有购物车种商品的id
            let idArr=[]
            
            // 遍历car中的数据，获取到商品的id
            this.$store.state.car.forEach(item => idArr.push(item.id))
            // 如果说本地存储中没有数据，就直接return出去，不用请求数据
    
            if(idArr.length<=0) {
                return 
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(','))
            .then(res=>{
                if(res.body.status===0) {
                    this.carlist = res.body.message
                }
            })

        },
        // 删除操作
        delGoods(id,i) {
            this.carlist.splice(i,1)
            this.$store.commit('delCar',id)
        },
        updateSelected(id,val) {
            this.$store.commit('updateSel',{id:id,selected:val})
        }

    },
    components:{
        shopnumbox
    }
}
</script>
<style lang="less" scoped>
    .shopcar-contaner {
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
                height: 60px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                p {
                    display: flex;
                    justify-content: space-between;
                    padding-top: 10px;
                    margin-bottom: 0;
                    a {
                        margin-top: 2px;
                    }
                }
                h1 {
                    font-size: 13px;
                }
                .price {
                    color: red;
                    font-weight: bold;
                    margin: 2px 0 0 10px;
                }
            }
        } 
        .pay {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
            }
        }
    }
</style>
