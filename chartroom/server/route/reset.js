//引入express路由
const router = require("express").Router();
//引入用户表
const user = require("../mongod/user");
//引入随机账号
const util = require("../util/util");
router.post("/", (req, res) => {
  let userInfo = req.body;
  user.findOne({ user: userInfo.user }).then((data) => {
    //判断是否已注册
    if (data) {
      if (!util.rules.user.test(userInfo.user)) {
        res.send({ code: 0, msg: "账号格式错误" });
      } else if (
        !util.rules.password.test(userInfo.password) ||
        !util.rules.password.test(userInfo.newpassword)
      ) {
        res.send({ code: 0, msg: "密码格式错误" });
      } else if (data.password !== userInfo.oldpassword) {
        res.send({ code: 0, msg: "密码错误" });
      } else if (userInfo.newpassword !== userInfo.verify) {
        res.send({ code: 0, msg: "两次密码不一样" });
      } else {
        //加密
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(userInfo.newpassword, salt, function (err, hash) {
            if (err) throw err;
            let newpassword = hash;
            //数据存储
            user
              .updateOne(
                { user: userInfo.user },
                { $set: { password: newpassword } }
              )
              .then(() => {
                res.send({
                  code: 1,
                  msg: "密码重置成功",
                  user: userInfo.user,
                });
              });
          });
        });
      }
    } else {
      res.send({ code: 0, mgs: "该账号未注册" });
    }
  });
});

module.exports = router;
