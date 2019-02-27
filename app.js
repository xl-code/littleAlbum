/**
 * 实战项目：网络相册
 * date：2018年4月1日11:41:29
 * author：liu
 * version：v1.0
 * @type {createApplication|*}
 */
var express = require("express");
var router = require("./controller");

var app = express();

// 设置ejs模板
app.set("view engine", "ejs");

// 静态目录路由
app.use(express.static("./public"));
app.use(express.static("./uploads"));

// 项目首页路由
app.get("/", router.showIndex);
// 指定相册名路由
app.get("/:albumName", router.showAlbum);
// 进入上传文件页面
app.get("/uploadFiles", router.uploadFiles);
// 上传文件
app.post("/uploadFiles", router.doPost);


// 404
app.use(function (req, res) {
    res.render("error");
});


app.listen(8088);
