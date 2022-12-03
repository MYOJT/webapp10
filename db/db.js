const { Pool } = require('pg');
const util = require('util');
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

//create table
const createTableUsers = 'create table if not exists public.users (user_id int not null primary key, user_name varchar(20) not null, password varchar(20) not null)';
const createTableTodos = 'create table if not exists public.todos (todo_id int not null primary key, user_id int not null, todo varchar(128) not null, create_date_time date, update_date_time date, delete_date_time date)';
pool.connect()
  .then(()=>pool.query(createTableUsers))
  .catch((e => console.log(e)));
pool.connect()
  .then(()=>pool.query(createTableTodos))
  .catch((e => console.log(e)));
pool.query = util.promisify(pool.query);

/*****************************************************************************************/
/* USERS TABLE */
/*****************************************************************************************/
// Auth user
const authUser = 'select * from public.users where user_name = $1 and password = $2 ';
// select all users
const slectAllUser = 'select * from public.users';
// Insert user
const insertUser = 'insert into public.users values ($1, $2)';
// delete user
const deleteUser = 'delete from public.users where id = $1';
/*****************************************************************************************/
/* TODOS TABLE */
/*****************************************************************************************/
// select all todos
const slectAllTodo = 'select * from public.todos where user_id = $1 AND delete_date_time is null order by todo_id';
// Insert todo
const insertTodo = 'insert into public.todos values ($1, $2)';
// delete todo
const deleteTodo = 'update public.todos set delete_date_time = ($1) where id = ($2)';


module.exports.pool = pool ;
module.exports.authUser = authUser;
module.exports.slectAllUser = slectAllUser;
module.exports.insertUser = insertUser;
module.exports.deleteUser = deleteUser;
module.exports.slectAllTodo = slectAllTodo;





// demo data
/*
pool.connect()
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [1, 'maria', 'password1']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [2, 'juanna', 'password2']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [3, 'kenny', 'password3']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [4, 'johon', 'password4']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [5, 'ui', 'pw']))
  .then(() => pool.query("select * from public.users"))
  .then(results => console.table(results.rows))
  .catch((e => console.log(e)));
*/
/*
pool.connect()
  .then(()=>pool.query('insert into public.users values ($1, $2, $3, $4, $5)', [1, 'get up', '', '', '']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3, $4, $5)', [2, 'do job', '', '', '']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3, $4, $5)', [3, 'go home', '', '', '']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3, $4, $5)', [4, 'sleep', '', '', '']))
  .then(() => pool.query("select * from public.todos"))
  .then(results => console.table(results.rows))
  .catch((e => console.log(e)));
*/
/*
insert into public.users values (1, 'maria', 'password1');
insert into public.users values (2, 'juanna', 'password2');
insert into public.users values (3, 'kenny', 'password3');
insert into public.users values (4, 'johon', 'password4');

insert into public.todos values (1, 1, 'get up', null, null, null);
insert into public.todos values (2, 1, 'do job', null, null, null);
insert into public.todos values (3, 2, 'go home', null, null, null);
insert into public.todos values (4, 3, 'sleep', null, null, null);
*/
/*
const selectUser = (user_id, password)=>{
  let user;
  pool.query("select * from public.users where user_id = $1 and password = $2",[user_id,password],
    (err,res)=>{
      console.log('[db.js] before res.rows');
      console.table(res.rows);
      console.log('[db.js] before res.rowCount');
      console.log(res.rowCount);
      user = res;
    }
  );
  return user;
}
*/
/*
const selectUser = function(user_id, password){
  pool.query("select * from public.users where user_id = $1 and password = $2",[user_id,password], (err,res)=>{
    console.log('[db.js] before res.rows');
    console.table(res.rows);
    console.log('[db.js] before res.rowCount');
    console.log(res.rowCount);
  })
}
*/
