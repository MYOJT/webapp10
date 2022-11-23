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
pool.connect()
  .then(()=>pool.query(selectUser))
  .then(results => console.table(results.rows));
/*
pool.query(selectUser, [],
  function(req, res){
    for(var i = 0;i<res.rows.length;i++){
      console.log(row.id + row.password);
    }
  })
*/

router.get('/login',function(req,res,next){
  axios.get('title')
  .then(function(response){
    res.render('index',response.data);
  })
  .catch(function(error){
    console.log('ERROR!! occurred in Backend.')
  });
});

