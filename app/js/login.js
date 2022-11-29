const form = document.getElementById('loginForm');
const loginButton =document.getElementById('loginButton');

loginButton.addEventListener('click',function() {
  const password =document.getElementById('password');
  const loginId = document.getElementById("loginId");
  fetch('/login', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      id: loginId.value,
      password: password.value
    }),
  })
  .then(function (response) {
      if (response.status !== 200) {
        console.log('Bad');
        return;
      }
      console.log('OK');
  })
  .catch(function (err) {
      console.log('Error Occurred');
  });
});

/*
const url = '/router';
const parameter = {
  method: 'POST',
  headers: new Headers({'Content-type' : 'application/x-www-form-urlencoded' }),
    body: {
      'id':loginId.value,
      'password':password.value
    }
}

const result = fetch(url,parameter).then((response)=>{
  return response.json();
})
console.log("result");
console.log(result);
*/

/*
const xhr = new XMLHttpRequest();
const url = 'http://localhost:8080/router'
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {

      console.log( xhr.responseText );
  }
}
xhr.open('GET', url);
xhr.send();
*/