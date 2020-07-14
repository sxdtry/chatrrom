<template>
  <div class="reset">
    <el-form :model="resetForm" :rules="resetRules" ref="resetForm">
      <el-form-item prop="user">
        <el-input
          v-model="resetForm.user"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="oldpassword">
        <el-input
          type="password"
          v-model="resetForm.oldpassword"
          placeholder="请输入原密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input
          type="password"
          v-model="resetForm.newpassword"
          placeholder="请输入新密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="verify">
        <el-input
          type="password"
          v-model="resetForm.verify"
          placeholder="请再次输入新密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="reset"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "reset",
  data() {
    //自定义验证规则
    let verify = (rule, value, callback) => {
      if (value !== this.resetForm.newpassword) {
        callback(new Error("两次输入密码不一致"));
      } else if (value === this.resetForm.oldpassword) {
        callback(new Error("原密码与新密码一致，请重新修改"));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        user: "",
        oldpassword: "",
        newpassword: "",
        verify: "",
      },
      resetRules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /[0-9]{7,10}/,
            message: "账号格式应为数字，且长度为7-10",
            trigger: "blur",
          },
        ],
        oldpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z]\S{5,}/,
            message: "密码格式应为字母开头且长度至少为6位以上",
            trigger: "blur",
          },
        ],
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z]\S{5,}/,
            message: "密码格式应为字母开头且长度至少为6位以上",
            trigger: "blur",
          },
        ],
        verify: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: verify, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.$axios.post("/reset", this.resetForm).then((req) => {
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
                  password: this.resetForm.newpassword,
                },
              });
              //表单重置
              this.$refs.resetForm.resetFields()
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
