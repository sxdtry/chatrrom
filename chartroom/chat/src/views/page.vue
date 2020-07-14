<template>
  <div class="page">
    <el-container>
      <el-header>
        <div class="header-container">
          <h1>呱呱聊天室</h1>
          <div class="welcome">
            <div>
              <p>欢迎</p>
              <p>{{ userData.nickname }}同学</p>
            </div>
            <img :src="userData.portrait" />
            <el-button type="info" circle size="mini" @click="exit"
              >注销</el-button
            >
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="aside-container">
            <el-menu
              default-active="0"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="select"
            >
              <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">聊天室</span>
              </el-menu-item>
              <el-menu-item index="1">
                <i class="el-icon-setting"></i>
                <span slot="title">个人信息</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="main-container">
            <!-- keepalive缓存聊天记录 -->
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      header: {
        nickname: "",
        portrait: "",
      },
    };
  },
  computed: {
    userData() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    select(index) {
      switch (index) {
        case "0":
          //避免冗余导航
          if (this.$route.path !== "/page/chart") {
            this.$router.push({ path: "/page/chart" });
          }
          break;
        case "1":
          if (this.$route.path !== "/page/info") {
            this.$router.push({ path: "/page/info" });
          }
          break;
      }
    },
    exit() {
      this.$router.replace({ name: "login" });
      sessionStorage.clear();
    },
  },
  created() {
    this.$socket.open();
  },
  mounted() {
    //页面刷新重新执行用户信息解析
    this.$store.commit("userInfo");
  },
  beforeDestroy() {
    this.$socket.close()
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
  .main-container {
    height: 100%;
  }
}
.page {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.header-container {
  display: flex;
  justify-content: space-between;
  .welcome {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 170px;
    div:first-child {
      display: flex;
      height: 40px;
      line-height: 20px;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
