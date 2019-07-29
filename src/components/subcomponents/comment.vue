<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}</div>
        <div class="cmt-body">{{item.content == 'undefined' ? '此用户很懒，嘛都没说' : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论数据
    getComments() {
      this.$http
        .get(
          "api/getcomments/" + this.parentId + "?pageindex=" + this.pageindex
        )
        .then(res => {
          // console.log(res.body);
          if (res.body.status == 0) {
            // this.comments = res.body.message
            this.comments = this.comments.concat(res.body.message);
          } else {
            Toast("获取失败");
          }
        });
    },
    // 点击加载更多
    getMore() {
      this.pageindex++;
      this.getComments();
    },
    // 发表评论功能
    postComment() {
      // 校验评论数据
      if (this.msg.trim().length == 0) {
        return Toast("评论内容不能为空");
      }
      // 这里的id可以从url地址获取this.$route.params.id，也可以用props中的传过来的
      this.$http
        .post("api/postcomment/" + this.parentId, { content: this.msg })
        .then(res => {
          // console.log(res.body);
          if (res.body.status == 0) {
            let info = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(info);
            this.msg = "";
          } else {
              Toast("提交失败")
          }
        });
    }
  },
  props: ["parentId"]
};
</script>
<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
