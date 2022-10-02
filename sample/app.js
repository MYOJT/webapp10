/**
 * /app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const mysql = require('mysql');
const app = express();
// パス指定用モジュール
const path = require('path');

// DB接続
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nujabes654852',
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






