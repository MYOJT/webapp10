/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
const pool = require('./db/db').pool;
const authUser = require('./db/db').authUser;
const slectAllUser = require('./db/db').slectAllUser;
const slectAllTodo = require('./db/db').slectAllTodo;
const router = require("./router/event");
const bodyParser = require('body-parser');
const path = require('path');

app.set('port',process.env.PORT || 8080);
// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, '/public')));
app.use('/router', router);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
  console.log('[app.js] Running at Port '+ app.get('port') +'...');
});

app.get('/', function(req, res) {
  res.sendFile('./public/html/login.html', { root: __dirname });
});

app.post('/login',function(req, res, next){
  console.log('[app.js](/login)');
  let user_name = req.body.user_name;
  let password = req.body.password;
  // auth
  pool.query(authUser,[user_name,password],
    (err,results)=>{
      console.log('[app.js](/login) before res.rows');
      console.table(results.rows);
      console.log('[app.js](/login) before res.rowCount');
      console.log(results.rowCount);
      if (results.rowCount === 1) {
        console.log('[app.js](/login) 200');
        res.status(200).send({
          code:200,
          success:'200 success login',
          data:{
            user_id:results.rows[0].user_id,
            user_name:results.rows[0].user_name,
            password:results.rows[0].password,
          }
        });
        console.log('************************************************************');
      } else if(err){
        console.log('[app.js](/login) 400');
          res.status(400).send({
            code:400,
            failed:'400 error occurred',
            data:{
              user_id:null,
              user_name:null,
              password:null,
            }
          });
        console.log('************************************************************');
      } else {
        console.log('[app.js](/login) 403');
        res.status(403).send({
          code:403,
          failed:'403 nauthorized',
          data:{
            user_id:null,
            user_name:null,
            password:null,
          }
        });
        console.log('************************************************************');
      }
    }
  );
});

app.post('/todoAll', function(req, res) {
  console.log('[app.js](/todoAll)');
  let user_id = req.body.user_id;
  /*
  let todo = {
    todo:[{todo_id:results.rows[0].todo_id,
      user_id:results.rows[0].user_id,
      todo:results.rows[0].todo,create_date_time,}]
  }
  */
  pool.query(slectAllTodo,[user_id],
    (err,results)=>{
      console.log('[app.js](/todoAll) user_id = ' + user_id);
      console.log('[app.js](/todoAll) before res.rows');
      console.table(results.rows);
      console.log('[app.js](/todoAll) before res.rowCount');
      console.log(results.rowCount);
      if(err){
        console.log('[app.js](/todoAll) err orrurred');
      } else {
        console.log('[app.js](/todoAll) success');
        res.status(200).send({
          code:200,
          success:'200 success login',
          data:results
        });
      }
    })
});



module.exports = app;