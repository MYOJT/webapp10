const form = document.getElementById('loginForm');
const loginButton =document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');

loginButton.addEventListener('click',function(event) {
  const password =document.getElementById('password');
  const loginId = document.getElementById("loginId");
  event.preventDefault()
  fetch('/login', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      user_name: loginId.value,
      password: password.value
    })
  })
  .then(response => {
      if (response.status === 200) {
        response.json().then(jsonParse =>{
          console.log('[login.js](/login)  200 success');
          let data = {
            user_id:jsonParse.data.user_id,
            user_name:jsonParse.data.user_name
          }
          console.log('[login.js](/login) ' + jsonParse.data.id  + ' '+ jsonParse.data.user_id);
          // sessionに格納
          sessionStorage.setItem('data',JSON.stringify(data));
          let url = 'html/todo.html';
          window.location.href = url;

        })
      } else if (response.status === 403) {
        console.log('[login.js](/login) 403 success');
        errorMessage.innerText = 'Incorrect id or password';
      }
  })
  .catch(err => {
      console.log('[login.js](/login) Error Occurred');
  });
});



