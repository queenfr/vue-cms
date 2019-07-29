<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
                <span>发表时间：{{item.add_time|dataFormat}}</span>
                <span>点击{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            newlist:[]
        }
    },
    created() {
        this.getnewlist()
    },
    methods: {
        getnewlist() {
            this.$http.get('api/getnewslist')
            .then(res=>{
                // console.log(res.body);
                if(res.body.status==0) {
                    this.newlist = res.body.message
                } else {
                    Toast('获取数据失败')
                }
            })
        }
    },
};
</script>
<style lang="less" scoped>
    .mui-table-view {
        li {
            h1 {font-size: 14px;}
            .mui-ellipsis {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #226aff;
                
            }
        }
    }
</style>
