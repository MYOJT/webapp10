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

const createTableUsers = 'create table if not exists public.users (id int not null primary key, password varchar(10) not null)';
const createTableTodos = 'create table if not exists public.todos (id int not null primary key, text varchar(128) not null, create_date_time date, update_date_time date, delete_date_time date)';
pool.connect()
  .then(()=>pool.query(createTableUsers))
  .catch((e => console.log(e)));
pool.connect()
  .then(()=>pool.query(createTableTodos))
  .catch((e => console.log(e)));
pool.connect()
  .then(() => pool.query("select * from public.users"))
  .then(results => console.table(results.rows));
/*
pool.connect()
  .then(()=>pool.query('insert into public.users values ($1, $2)', [1, "kenny"]))
  .then(()=>pool.query('insert into public.users values ($1, $2)', [2, "mac"]))
  .then(()=>pool.query('insert into public.users values ($1, $2)', [3, "tommy"]))
  .then(()=>pool.query('insert into public.users values ($1, $2)', [4, "jack"]))
  .then(() => pool.query("select * from public.users"))
  .then(results => console.table(results.rows))
  .catch((e => console.log(e)));
*/

//user
//select
/*
const selectUser = {
  text:'select * from public.users where id = $1',
  values:[2]
};
pool.query(selectUser)
  .then(results => console.table(results.rows));
*/
/*
const deleteAll = 'delete from public.users';
pool.connect()
  .then(()=>pool.query(deleteAll))
  .then(results => console.table(results.rows));
  */
module.exports = pool;
//export default pool;