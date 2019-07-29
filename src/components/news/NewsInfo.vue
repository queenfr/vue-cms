<template>
  <div class="newsinfo-content">
    <div v-for="item in newsInfo" :key="item.id">
      <h3 class="title">{{item.title}}</h3>
      <p class="tips">
        <span>发表时间：{{item.add_time | dataFormat}}</span>
        <span>点击{{item.click}} 次</span>
      </p>
      <hr />
      <div class="content" v-html="item.content"></div>
    </div>
    <comment-box :parentId="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: []
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status == 0) {
          //   console.log(res.body);
          this.newsInfo = res.body.message;
        } else {
          Toast("获取数据失败");
        }
      });
    }
  },
  components: {
    "comment-box": comment,
    
  }
};
</script>
<style lang="less">
.newsinfo-content {
  padding: 4px;
  .title {
    font-size: 14px;
    text-align: center;
    margin: 12px 0;
    color: red;
  }
  .tips {
    color: #226aff;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
