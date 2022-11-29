const { Pool } = require('pg');

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
const createTableUsers = 'create table if not exists public.users (id int not null primary key, user_id varchar(20) not null, password varchar(20) not null)';
const createTableTodos = 'create table if not exists public.todos (id int not null primary key, user_id int not null, text varchar(128) not null, create_date_time date, update_date_time date, delete_date_time date)';
pool.connect()
  .then(()=>pool.query(createTableUsers))
  .catch((e => console.log(e)));
pool.connect()
  .then(()=>pool.query(createTableTodos))
  .catch((e => console.log(e)));
/*
pool.connect()
  .then(() => pool.query("select * from public.users"))
  .then(results => console.table(results.rows));
  pool.connect()
  .then(() => pool.query("select * from public.todos"))
  .then(results => console.table(results.rows));
*/
/*****************************************************************************************/
/* USER TABLE */
/*****************************************************************************************/
// Select
const selectUser = function(user_id, password){
  pool.query("select * from public.users where user_id = $1 and password = $2",[user_id,password],(err,res)=>{
    console.table(res.rows);
    //count = res.rowCount;
  })
}
// Select count rows
const selectCountRows = function(user_id, password){
  selectUser(user_id, password)
}

// _old select
const selectUser2 = function(user_id, password){
  // const user_id = '\'' + _user_id + '\'';
  //const password = '\'' + _password + '\'';
  pool.connect()
  .then(pool.query('select * from public.users where user_id = $1 and password = $2',[user_id,password]))
  .then(results => console.table(results.rows))
  .catch((e => console.log(e)));
}

//insert
const insertUser = function(id, name){
  pool.connect()
  .then(()=>pool.query('insert into public.users values ($1, $2)', [id, name]))
  .then(() => pool.query("select * from public.users"))
  .then(results => console.table(results.rows))
  .catch((e => console.log(e)));
}
//delete
const deleteUser = function(id){
  pool.connect()
  .then(()=>pool.query('delete from public.users where id = $1',[id]))
  .then(results => console.table(results.rows));
}

module.exports.pool = pool;
module.exports.selectUser = selectUser;
module.exports.insertUser = insertUser;
module.exports.deleteUser = deleteUser;





// demo data
/*
pool.connect()
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [1, 'maria', 'password1']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [2, 'juanna', 'password2']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [3, 'kenny', 'password3']))
  .then(()=>pool.query('insert into public.users values ($1, $2, $3)', [4, 'johon', 'password4']))
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
