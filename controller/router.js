/**
 * 项目路由
 * 2018年4月1日11:45:6
 * liu
 * v1.0
 * @param req
 * @param res
 */
var files = require("../models");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");

// 显示首页
exports.showIndex = function (req, res, next) {

    files.getAllAlbums(function (err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render("index", {
            "albums": allAlbums
        });
    });
};

// 显示目录中的照片
exports.showAlbum = function (req, res, next) {
    var albumName = req.params.albumName;

    files.getAllImagesByAlbumName(albumName, function (err, imagesArray) {
        if (err) {
            next();
            return;
        }
        res.render("album", {
            "albumName": albumName,
            "images": imagesArray
        });

    });

};

// 上传文件页面
exports.uploadFiles = function (req, res, next) {
    files.getAllAlbums(function (err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render("uploadFiles", {
            albums: allAlbums,
        });
    })
};

// 上传文件
exports.doPost = function (req, res, next) {

    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempFiles/");

    form.parse(req, function (err, fields, files, next) {
        if (err) {
            next();
            return;
        }

        // 判断文件尺寸
        var size = files.file.size;
        if (size > 1024*1024*2) {
            res.send("图片太大");
            // 删除临时目录中的文件
            fs.unlink(files.file.path);
            return;
        }

        // 改名
        var extName = path.extname(files.file.name);
        // 获得要上传的目录名
        var uploadDirectory = fields.uploadDirectory;
        var oldPath = files.file.path;
        var newPath = path.normalize(__dirname + "/../uploads/" + uploadDirectory + "/" + (new Date().getTime()) + extName);

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                res.send("改名失败");
                return;
            }
            res.send("<p>上传成功</p><br><a href='/' class='btn'>点击返回首页</a>");
        });
    });
};


