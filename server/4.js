var express = require('express');
var app = express();
var pool = require("./fun/pool.js");
var fun = require("./fun/useradd.js");
var fun1 = require("./fun/list.js");

app.use(express.static('public'));
 
 app.get('/login', function (req, res) {
   // 输出 JSON 格式
   var response = {
       "username":req.query.username,
       "password":req.query.password
   };
   console.log(response);
   fun.useradd(req.query.username, req.query.password, function(data) { res.send(data)});
   //res.end(JSON.stringify(response));
})

 app.get('/newuser', function (req, res) {
   // 输出 JSON 格式
   var response = {
       "username":req.query.username,
       "password":req.query.password,
	   "phonenumber":req.query.phonenumber
   };
   console.log(response);
   fun1.list();
   res.end(JSON.stringify(response));
})


var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})