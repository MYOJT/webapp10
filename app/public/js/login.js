//const pool = require('../../src/db.js');
//import {pool} from '../../src/db.js';

const form = document.getElementById('loginForm');
const loginButton =document.getElementById('loginButton');
const password =document.getElementById('password');

const loginId = document.getElementById("loginId");
loginButton.addEventListener('click',function() {
  //loginButton.setAttribute('value', '');
  console.log('clicked');
  console.log(loginId.value);
  console.log(password.value);
});


const selectUser = 'select * from public.users';
pool.query(selectUser, [],
  function(req, res){
    for(var i = 0;i<res.rows.length;i++){
      console.log(row.id + row.password);
    }
  })




