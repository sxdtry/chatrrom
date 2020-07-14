//引入express路由
const router = require("express").Router();
//引入用户表
const user = require("../mongod/user");
//引入随机账号
const util = require("../util/util");
//加密
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  let userInfo = req.body;
  user.findOne({ nickname: userInfo.nickname }).then((data) => {
    //判断是否已注册
    if (!data) {
      if (!util.rules.nickname.test(userInfo.nickname)) {
        res.send({ code: 0, msg: "昵称格式错误" });
      } else if (!util.rules.password.test(userInfo.password)) {
        res.send({ code: 0, msg: "密码格式错误" });
      } else if (userInfo.password !== userInfo.verify) {
        res.send({ code: 0, msg: "两次密码不一样" });
      } else {
        let registInfo = {
          user: util.random(),
          nickname: userInfo.nickname,
          password: userInfo.password,
        };
        //加密
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(registInfo.password, salt, function(err, hash) {
            if(err) throw err;
            registInfo.password = hash;
            //数据存储
            user.create(registInfo).then(_=>{
                res.send({code:1,msg:"用户注册成功，账号为:"+registInfo.user+"",user:registInfo.user})
            });
          });
      });

      }
    } else {
      res.send({ code: 0, msg: "该昵称已注册" });
    }
  });
});

module.exports = router;
