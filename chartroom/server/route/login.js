//引入express路由
const router = require("express").Router();
//引入用户表
const user = require("../mongod/user");
const util = require("../util/util");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

router.post("/", (req, res) => {
  let userInfo = req.body;
  user.findOne({ user: userInfo.user }).then((data) => {
    //判断是否已注册
    if (data) {
      if (!util.rules.user.test(userInfo.user)) {
        res.send({ code: 0, msg: "账号格式错误" });
      }
      if (!util.rules.password.test(userInfo.password)) {
        res.send({ code: 0, msg: "密码格式错误" });
      }
      //bcrypt验证密码是否正确
      bcrypt.compare(userInfo.password, data.password, function (err, result) {
        if (err) throw err;
        if (result) {
          //生成token令牌
          jwt.sign({
            data:{nickname:data.nickname,portrait:data.portrait,user:data.user}
          }, 'secret',{expiresIn:"24h"},(err,token)=>{
            //发送token
            res.send({ code: 1, msg: "登陆成功",token:"Bearer "+token});
          });
        } else {
          res.send({ code: 0, msg: "密码错误" });
        }
      });
    } else {
      res.send({ code: 0, msg: "该用户未注册" });
    }
  });
});

module.exports = router;
