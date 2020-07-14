<template>
  <div class="info">
    <div class="container">
      <img :src="userInfo.portrait" @click="dialog" />
      <p><span>昵称:</span>{{ userInfo.nickname }}</p>
      <p><span>账号:</span>{{ userInfo.user }}</p>
    </div>
    <el-dialog width="30%" :visible.sync="flag">
      <div class="content">
        <img :src="portrait" />
        <el-button size="small" type="primary" @click="file"
          >点击上传</el-button
        >
        <input type="file" @change="change" style="display:none" ref="file" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      flag: false,
      portrait:""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    dialog() {
      this.flag = !this.flag;
    },
    uploding(file, filelist) {
      this.portrait = URL.createObjectURL(filelist.raw);
    },
    file() {
      this.$refs.file.click();
    },
    change() {
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.file.files[0])
      reader.onload = (e)=>{
        this.portrait = e.target.result;
        console.log(e)
      }

    },
    updata() {
      this.dialog();
      let userUpdata = {
        portrait: this.portrait,
        user: this.$store.state.userInfo.user
      };
      this.$axios.post("/updata", userUpdata).then((req) => {
        sessionStorage.clear();
        sessionStorage.setItem("token",req.data.token)
        this.$store.commit("userInfo")
      });
    },
  },
  mounted(){
    this.portrait = this.$store.state.userInfo.portrait
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 300px;
  background-color: #f60;
  margin: 100px auto 0;
  text-align: center;
  padding: 10px;
  img {
    width: 100px;
    height: 100px;
    border: 10px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    &:hover {
      border-color: skyblue;
    }
  }
  p {
    text-align: left;
    text-indent: 60px;
    padding: 10px 0;
    font-size: 20px;
    span {
      font-size: 25px;
      font-weight: bold;
      margin-right: 5px;
    }
  }
}
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    border: 10px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
  }
}
</style>
