<template>
  <div class="chart">
    <div class="content" ref="chatContent">
      <bubble
        v-for="(item, index) in list"
        :key="index"
        :nickname="item.nickname"
        :status="item.status"
        :portrait="item.portrait"
        >{{ item.content }}</bubble
      >
    </div>
    <div class="inputContent">
      <div class="tool"></div>
      <div class="input">
        <textarea v-model="content"></textarea>
      </div>
      <div class="submitBtn">
        <el-button type="primary" @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import bubble from "@/components/page/bubble";
export default {
  name: "chart",
  data() {
    return {
      list: [],
      content: "",
    };
  },
  sockets: {
    broadcast(data) {
      if (data.nickname === this.$store.state.userInfo.nickname) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      this.list.push(data);
    },
  },
  methods: {
    send() {
      let data = {
        nickname: this.$store.state.userInfo.nickname,
        portrait: this.$store.state.userInfo.portrait,
        content: this.content,
      };
      this.$socket.emit("send", data);
      this.content = "";
    },
    scrollToBottom() {
            this.$nextTick(() =>{
                this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
            })
        }   
  },
  updated() {
    this.scrollToBottom()
  },
  components: {
    bubble,
  },
};
</script>
<style lang="scss" scoped>
.chart {
  height: 100%;
  background-color: #f60;
}
.content {
  overflow: auto;
  height: 601px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.inputContent {
  height: 257px;
  .tool {
    height: 15%;
    background-color: #444;
  }
  .input {
    height: 65%;
    background-color: #999;
    textarea {
      width: 100%;
      height: 100%;
      resize: none;
      outline: 0;
      border: none;
      font-size: 16px;
    }
  }
  .submitBtn {
    height: 20%;
    background-color: #666;
    text-align: right;
    padding-right: 10px;
    line-height: 46.88px;
  }
}
</style>
