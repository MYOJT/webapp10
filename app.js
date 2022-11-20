/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const axiosBase = require('axios');
const router = require("./route/event");
const Pool = require("./db/db");
const app = express();
// パス指定用モジュール
const path = require('path');
const { validateSchema } = require('webpack');
const { nextTick } = require('process');

/**
 * axios通信
 */
const axios = axiosBase.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

app.set('port',process.env.PORT || 8080);
// 静的ファイルのルーティング
//app.use(express.static(__dirname, + '/app'));
app.use("/", express.static(__dirname, + '/app'));

app.get('/', function(req, res) {
  res.sendFile('./app/src/html/todo.html', { root: __dirname });
});



// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
  console.log('Running at Port '+ app.get('port') +'...');
});



module.exports = app;