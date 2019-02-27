/**
 * 读取数据
 * 2018年4月1日12:47:29
 * liu
 * v1.0
 */
var fs = require("fs");

// 获得相册目录
exports.getAllAlbums = function (callback) {

    fs.readdir("./uploads", function (err, files) {
        if (err) {
            callback("没有这个目录", null) ;
            return;
        }

        var allAlbums = [];

        (function iterate(i) {
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }

            fs.stat("./uploads/" + files[i], function (err, stats) {
                if (err) {
                    callback("没有"+files[i]+"这个目录", null);
                }
                if (stats.isDirectory) {
                    allAlbums.push(files[i]);
                }
                iterate(i + 1);
            });
        })(0);
    });
};

// 获得相册图片
exports.getAllImagesByAlbumName = function (albumName, callback) {
    fs.readdir("./uploads/" + albumName, function (err, files) {
        if (err) {
            callback("没有这个目录", null) ;
            return;
        }

        var allImages = [];

        (function iterate(i) {
            if (i == files.length) {
                callback(null, allImages);
                return;
            }

            fs.stat("./uploads/" + albumName + "/" + files[i], function (err, stats) {
                if (err) {
                    callback("没有"+files[i]+"这个目录", null);
                    return;
                }
                if (stats.isFile) {
                    allImages.push(files[i]);
                }
                iterate(i + 1);
            });
        })(0);
    });

}