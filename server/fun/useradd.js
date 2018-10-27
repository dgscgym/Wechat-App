var express = require('express'); // express模块 可以使用 npm install -g express  
var qs = require("querystring"); // querystring模块 可以使用 npm install -g express 用于处理传来的参数串  
var mysql = require('mysql'); // mysql模块 同样可以使用 npm install -g mysql 来全局下载  
var app = express();  
var pool = require("./pool.js")
// 创建 mysql 连接池资源
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'test'
});

var  sql = 'SELECT * FROM users';
exports.useradd = function(username, password, fn) {
    app.use(express.static('public'));
      console.log(username);
      console.log(password);
      if(username) { // 输出提交的数据  
        // 插入数据  
        pool.getConnection(function (err,connection) { // 使用连接池  
            if(err){  
                console.log('与MySQL数据库建立连接失败！');  
                console.log('错误信息为：' + err);  
            }  
            else{  
                console.log('与MsSQL数据库建立连接成功！');  
                connection.query('INSERT INTO users SET ?',{  
                    username:  username, //  username 则是 由qs解析过的  
                    password:  password //  firstname 则是 由qs解析过的  
                },function (err,result) {  
                    if(err){  
                        console.log('插入数据失败');  
                        fn('{code:2}'); // 同时要注意返回的数据要是json对象，以下同  
                        connection.release(); // 释放连接池的连接，因为连接池默认最大连接数是10，如果点击数超过10 则不会与客户端连接，客户端的请求也会因为长时间无反应报错，下面会粘出报错的图  
                    }  
                    else{  
                        console.log('插入数据成功');  
                        fn('{code:1}');  
                        connection.release(); // 释放连接池的连接  
                    }  
                })  
            }  
        });  
    } else {   
        fn('{code:0}'); // 传入的值为空时，不执行插入操作  
    }  
}