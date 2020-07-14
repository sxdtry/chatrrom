<template>
  <div class="bubble">
    <div class="container" :class="{ left: !status, right: status }">
      <img :src="portrait" />
      <div class="info">
        <p>{{ nickname }}</p>
        <p><slot></slot></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bubble",
  //nickname:昵称；portrait:头像;status:信息对象身份
  props: {
    nickname: {
      type: String,
      required: true,
    },
    portrait: {
      type: String,
    },
    status: {
      type: Number,
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .info {
    p:first-child {
      line-height: 10px;
      color: #ccc;
      margin-bottom: 7px;
    }
    p:last-child {
      line-height: 1.5;
      border: 1px solid skyblue;
      padding: 5px;
      border-radius: 5px;
      word-break: break-all;
    }
  }
}
.left {
  img {
    margin-right: 10px;
  }
}
.right {
  flex-direction: row-reverse;
  img {
    margin-left: 10px;
  }
  .info {
    p:first-child {
      text-align: right;
    }
  }
}
</style>
