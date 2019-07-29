<template>
    <div class="photoinfo-con">
        <div v-for="item in photoInfo" :key="item.id">
        <h3 class="title">{{item.title}}</h3>
        <p class="tips">
            <span>发表时间：{{item.add_time | dataFormat}}</span>
            <span>点击{{item.click}}次</span>
        </p>
        <hr />
        <div class="thumbs">
            <vue-preview :slides="imgs"></vue-preview>
        </div>
        <div class="content" v-html="item.content"></div>
        </div>
        <comment-info :parentId="this.id"></comment-info>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
    data() {
        return {
            id:this.$route.params.id,
            photoInfo:[],
            imgs:[]
        }
    },
    created() {
        this.getPhotoInfo();
        this.getPreviewPic()
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/'+this.id)
            .then(res=>{
                if(res.body.status==0) {
                    // console.log(res.body.message);
                    this.photoInfo=res.body.message
                }
            })
        },
        getPreviewPic() {
            this.$http.get('api/getthumimages/'+this.id)
            .then(res=>{
                console.log(res.body);
                if(res.body.status==0) {
                    // 给每个图片对象追加3条属性，都是必须添加的
                    res.body.message.forEach(item=>{
                        item.w=600; //缩略图的大小
                        item.h=400;
                        item.msrc = item.src
                    })
                    this.imgs = res.body.message
                }
            })
        }
    },
    components:{
        'comment-info' : comment
    }
}
</script>
<style lang="less">
    .photoinfo-con {
        padding:5px;
        .title {
            color:#26a2ff;
            font-size:15px;
            text-align:center;
            margin:15px 0;
        }
        .tips {
            color: #226aff;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }
        .content{
            padding:0 10px;
            font-size:13px;
            line-height:28px;
        }
    }
    .thumbs .my-gallery {
        display: flex;
        flex-flow: row wrap;
        justify-content:flex-start;
        width:94%;
        margin: 0 auto;
        figure {
            width:33.3333%;
            margin:0;
            padding:0 3px;
            img {
                width:100%;
            }
        }
    }
</style>