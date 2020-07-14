const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("./socket/socket")(io)
//监听3000
server.listen(3000, (_) => {
  console.log("服务器已启动");
});
//启动数据库
mongoose
  .connect("mongodb://127.0.0.1:27017/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败",err);
  });
//解析前台数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//配置接口
//注册
app.use("/api/regist",require("./route/regist"))
//登陆
app.use("/api/login",require("./route/login"))
//重置密码
app.use("/api/reset",require("./route/reset"))
//更新头像
app.use("/api/updata",require("./route/updata"))

