<template>
  <div class="regist">
    <el-form :model="registForm" :rules="registRules" ref="registForm">
      <el-form-item prop="nickname">
        <el-input
          v-model="registForm.nickname"
          placeholder="请输入名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="registForm.password"
          placeholder="请输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="verify">
        <el-input
          type="password"
          v-model="registForm.verify"
          placeholder="请再次输入密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="regist"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "regist",
  data() {
    //自定义验证规则
    let verify = (rule, value, callback) => {
      if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registForm: {
        nickname: "",
        password: "",
        verify: "",
      },
      registRules: {
        nickname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5]{2,8}/,
            message: "名称为中文且长度为2-8",
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
        verify: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: verify, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    regist() {
      this.$refs.registForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/regist", this.registForm).then((req) => {
            if (req.data.code) {
              this.$message({
                type: "success",
                message: req.data.msg,
                center: true,
              });
              this.$router.replace({
                name: "login",
                params: {
                  user: req.data.user,
                  password: this.registForm.password,
                },
              });
              //表单重置
              this.$refs.registForm.resetFields()
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
};
</script>
<style lang="scss" scoped></style>
