//引入express路由
const router = require("express").Router();
//引入用户表
const user = require("../mongod/user");
const jwt = require("jsonwebtoken")

router.post("/",(req,res)=>{
    let userUpdata = req.body;
    user.updateOne({user:userUpdata.user},{$set:{portrait:userUpdata.portrait}}).then(data=>{})
    user.findOne({user:userUpdata.user}).then(data=>{
        //重新生产token令牌
        jwt.sign({
            data:{nickname:data.nickname,portrait:data.portrait,user:data.user}
          }, 'secret',{expiresIn:"24h"},(err,token)=>{
            //发送token
            res.send({ code: 1, msg: "登陆成功",token:"Bearer "+token});
          });
    })
})

module.exports = router