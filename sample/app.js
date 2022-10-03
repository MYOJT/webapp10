/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const mysql = require('mysql');
const axiosBase = require('axios');
const router = express.Router();
const app = express();
// パス指定用モジュール
const path = require('path');

/**
 * axios通信
 */
const axios = axiosBase.create({
  baseURL: 'http://localhost:4000',
  headers:{
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

// フロントエンドからのリクエストを受付け
router.get('/',function(req,res,next){
  axios.get('title')
  .then(function(response){
    res.render('index',response.data);
  })
  .catch(function(error){
    console.log('ERROR!! occurred in Backend.')
  });
});
module.exports = router;


/**
 * DB接続
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ToCreateProductOfOjt',
  database: 'tododata'
});
connection.connect((err)=>{
  if (err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connect success');
});


// 8080番ポートで待ちうける
app.listen(8080, () => {
  console.log('Running at Port 8080...');
});
// http://localhost:8080/

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});






