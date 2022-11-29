/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
const pool = require('./db/db');
const selectUser = require('./db/db');
const router = require("./router/event");
const bodyParser = require('body-parser');
const path = require('path');

app.set('port',process.env.PORT || 8080);
// 静的ファイルのルーティング
app.use(express.static('app'));
app.use('/router', router);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile('./app/html/login.html', { root: __dirname });
});

app.post('/login',function(req, res){
  console.log(req.body);
  let user_id = req.body.id;
  let password = req.body.password;
  let selectQuery = "select * from public.users where user_id = $1 and password = $2";
  const result = pool.query(selectQuery,[user_id,password]);
  console.table(result.rows);

  //var count = pool.selectUser(req.body.id, req.body.password);
  //pool.selectUser(req.body.id, req.body.password);
  //console.log('count = '+ count);
  //if(count !== 1){
    //console.log('failed to selectUser');
    //return;
  //}
  //console.log('success to selectUser');
  res.json();
});

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
  console.log('Running at Port '+ app.get('port') +'...');
});

module.exports = app;