<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDeatil(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore" v-show="flag">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageIndex:1,
            goodslist:[],
            flag:true
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex='+this.pageIndex)
            .then(res=>{
                // console.log(res.body)
                if(res.body.status==0) {
                    this.goodslist =this.goodslist.concat(res.body.message)
                    // 当没有数据时，用户点击后就是隐藏加载更多数据按钮
                    if(res.body.message.length<0) {
                        this.flag = !this.flag
                    }
                }
            })
        },
        getMore() {
            this.pageIndex++
            this.getGoodsList()
            
        },
        getDeatil(id) {
            // console.log(this)
            // 编辑式跳转，点击后跳转，$router.push是vue提供的
            this.$router.push({name:'goodsinfo',params:{id:id}})
        }
    },
}
</script>
<style lang="less" scoped>
    .goods-list {
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        padding:7px;
        .goods-item {
            width:49%;
            border:1px solid #ccc;
            box-shadow:0 0 8px #ccc;
            margin:3px 0;
            padding:1px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            min-height:293px;
            img {
                width:100%;
            }
            .title {
                font-size:14px;
            }
            .info {
                background-color:#ccc;
                p {
                    margin:0;
                    padding:5px;
                }
                .price {
                    .new {
                        color:red;
                        font-size:16px;
                        font-weight:700;

                    }
                    .old {
                        text-decoration:line-through;
                        font-size:12px;
                        margin-left:10px;

                    }

                }
                .sell {
                    display:flex;
                    justify-content:space-between;
                }
            }
        }
    }
</style>