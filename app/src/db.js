const { Pool } = require('pg');
/**
 * DB接続
 */
//postgres
// PostgreSQLの設定
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

pool.connect((err)=>{
  if (err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('connect success');
});


module.exports = pool;