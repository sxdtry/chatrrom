<template>
  <div class="login">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
      <el-form-item prop="user">
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.user"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          prefix-icon="el-icon-suitcase"
          v-model="loginForm.password"
          placeholder="请输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submit"
          >登陆</el-button
        >
      </el-form-item>
      <div class="changeInfo">
        <router-link to="/user/reset">忘记密码</router-link>
        <router-link to="/user/regist">注册</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        user: "",
        password: "",
      },
      loginRules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /[0-9]{7,10}/,
            message: "账号格式应为数字，且长度为7-10",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z]\S{5,}/,
            message: "密码格式应为字母开头且长度至少为6位以上",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/login", this.loginForm).then((req) => {
            if (req.data.code) {
              this.$message({
                type: "success",
                message: req.data.msg,
                center: true,
              });
              //保存token,注：先保存再跳转
              sessionStorage.setItem("token", req.data.token);
              //解析token
              this.$store.commit("userInfo");
              //跳转page页
              this.$router.replace({ name: "page" });
              //表单重置
              this.$refs.loginForm.resetFields();
            } else {
              this.$message({
                type: "error",
                message: req.data.msg,
                center: true,
              });
            }
          });
        }
      });
    },
  },
  mounted() {
    this.loginForm.user = this.$route.params.user;
    this.loginForm.password = this.$route.params.password;
  },
};
</script>
<style lang="scss" scoped>
.changeInfo {
  text-align: right;
  a {
    margin-right: 10px;
  }
}
</style>
