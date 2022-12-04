/**
 * app.js
 */
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
const log4js = require('./log_env').log4js;
const systemLogger = require('./log_env').systemLogger;
const accessLogger = require('./log_env').accessLogger;
const pool = require('./db/db').pool;
const authUser = require('./db/db').authUser;
const slectAllUser = require('./db/db').slectAllUser;
const slectAllTodo = require('./db/db').slectAllTodo;
const insertTodo = require('./db/db').insertTodo;
const deleteTodo = require('./db/db').deleteTodo;
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
app.use(log4js.connectLogger(accessLogger));


// 8080番ポートで待ちうける
app.listen(app.get('port'), () => {
  console.log('[app.js] Running at Port '+ app.get('port') +'...');
});
systemLogger.info("Express start");
app.get('/', function(req, res) {
  res.sendFile('./public/html/login.html', { root: __dirname });
});

/*****************************************************************************************/
/* from  login.js */
/*****************************************************************************************/
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
        console.log('[app.js](/login) success');
        res.status(200).send({
          code:200,
          success:'200 success login',
          data:{
            user_id:results.rows[0].user_id,
            user_name:results.rows[0].user_name,
            password:results.rows[0].password,
          }
        });
        line();
      } else if(err){
        console.log('[app.js](/login) error');
          res.status(400).send({
            code:400,
            failed:'400 error occurred',
            data:{
              user_id:null,
              user_name:null,
              password:null,
            }
          });
          line();
      } else {
        console.log('[app.js](/login) can`t auth');
        res.status(403).send({
          code:403,
          failed:'403 nauthorized',
          data:{
            user_id:null,
            user_name:null,
            password:null,
          }
        });
        line();
      }
    }
  );
});

/*****************************************************************************************/
/* from  todo.js */
/*****************************************************************************************/
// select all todo
app.post('/todoAll', function(req, res) {
  console.log('[app.js](/todoAll)');
  let user_id = req.body.user_id;
  pool.query(slectAllTodo,[user_id],
    (err,results)=>{
      console.log('[app.js](/todoAll) before res.rows');
      console.table(results.rows);
      console.log('[app.js](/todoAll) before res.rowCount');
      console.log(results.rowCount);
      if(err){
        console.log('[app.js](/todoAll) err orrurred');
        res.status(400).send({
          code:400,
          success:'400 error occurred',
          data:null
        });
        line();
      } else {
        console.log('[app.js](/todoAll) success');
        res.status(200).send({
          code:200,
          success:'200 success take data from todos',
          data:results.rows
        });
        line();
      }
    })
});
// insert todo
app.post('/addTodo', function(req, res, next){
  console.log('[app.js](/addTodo)');
  let user_id = req.body.user_id;
  let todo = req.body.todo;
  let create_date_time = req.body.create_date_time;
  pool.query(insertTodo,[user_id, todo, create_date_time],
    (err,results)=>{
      console.log('[app.js](/addTodo) results.rowCount = ' + results.rowCount);
      if(err){
        console.log('[app.js](/addTodo) err orrurred');
        res.status(400).send({
          code:400,
          success:'400 error occurred',
          data:null
        });
        line();
      } else {
        console.log('[app.js](/addTodo) success');
        res.status(200).send({
          code:200,
          success:'200 success insert todo',
          data:results
        });
        line();
      }
    })
})

// delete todo
app.post('/deleteTodo',function(req, res, next){
  console.log('[app.js](/deleteTodo)');
  let user_id = req.body.user_id;
  let todo_id = req.body.todo_id;
  let delete_id = req.body.user_id;
})

function line(){
  console.log('************************************************************');
}

module.exports = app;