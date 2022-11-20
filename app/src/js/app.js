/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const axiosBase = require('axios');
const router = express.Router();
const app = express();
const { Pool } = require('pg');
const db = require('./db.js');
// パス指定用モジュール
const path = require('path');
const { validateSchema } = require('webpack');


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
/**
 * DB(PostgreSQL)接続
 */
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'postgres',
  port: 5432,
})

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

router.post('/', function (req, res, next) {
  Pool.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return
    }
    console.log('success');
  });
  const todo = req.body.add;
  res.redirect('/');
});
//module.exports = router;



// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, '.../public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
// 8080番ポートで待ちうける
app.listen(8080, () => {
  console.log('Running at Port 8080...');
});


