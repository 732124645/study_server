const express = require("express");
const Mock = require("mockjs");
const fs = require("fs");
const axios = require("axios");

const app = express();
const port = 3000;

const pyq = require("./mock/pyq");
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/pyq", (req, res) => {
  console.log(req.query);
  setTimeout(() => {
    return res.send(pyq(Number(req.query.page), Number(req.query.limit)));
  }, 1000);
});

/*readdir读取目录下所有文件*/
fs.readdir("./testData", function (err, files) {
  if (err) {
    console.log(err);
  } else {
    /*成功读取文件，取得文件名，拼接生成对应action，监听对应接口并返回对应文件数据*/
    files.forEach(function (v, i) {
      app.all(`/${v.replace(/.json/, "")}`, function (req, res) {
        fs.readFile(`./testData/${v}`, "utf-8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            var tempList = JSON.parse(data);
            res.json(Mock.mock(tempList));
          }
        });
      });
    });
  }
});

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(port, () =>
  console.log(`Server running at  http://127.0.0.1:${port}`)
);
