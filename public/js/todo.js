'use strict';
const TodoList = document.getElementById('TodoList');
window.onload = (()=>{
  //user情報取得(session)
  const data = JSON.parse(sessionStorage.getItem('data'));
  console.log('[todo.js] user_id = ' + data.user_id + ', user_name = ' + data.user_name);
  console.log();

  //todoを取得する
  fetch('/todoAll', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      user_id: data.user_id,
    })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('[todo.js](/todoAll) 200 success');
      response.json().then(jsonParse =>{
        // console.table(jsonParse.data)
        let value = [];
        for (let i of jsonParse.data){
          value.push(i);
          // 画面にDBのtodoを表示
          displayTodoList(i.todo,0);
        }


      })
    } else if (response.status === 403) {
      console.log('[todo.js](/todoAll) 403 ');
    } else {
      console.log('[todo.js](/todoAll) error occurres');
    }
  })
  .catch(err => {
    console.log('[todo.js] Error Orrurred');
    console.log('[todo.js] Error is' + err);
  })
})

//ボタンが押された際、TODOを追加
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click',()=>{
  displayTodoList('',1);
})

// todo削除処理
function completeTodo(e){
  var elem = e.parentNode;
  elem.remove();
}


/*
todoの内容を引数に、li要素を作成
todo : todo文
num : 初期表示 0, 追加 1
*/
function displayTodoList (todo, num){
  var li = document.createElement('li');
  // li 要素の作成
  if(num === 0){
    li.innerText = todo;
  } else {
    var newTodo = document.getElementById("newTodo").value;
    var li = document.createElement('li');
    li.innerText = newTodo;
  }
  // 日時情報の取得と記載
  var span = document.createElement('span');
  var now = new Date();
  var Year = now.getFullYear();
  var Month = now.getMonth()+1;
  var date = now.getDate();
  var Hour = now.getHours();
  var Min = now.getMinutes();
  var Sec =now.getSeconds();
  var time = Year+'-'+Month+'-'+date+' '+Hour+':'+Min+':'+Sec;
  span.innerHTML = time
  li.appendChild(span);
  li.setAttribute('value', time);

  // input 要素の作成
  var completeButton = document.createElement('input');
  completeButton.setAttribute('type', 'button');
  completeButton.setAttribute('class','complete-todo')
  completeButton.setAttribute('value', 'complete');
  completeButton.setAttribute('onclick','completeTodo(this)')
  li.appendChild(completeButton);
  // input hidden要素の作成
  var hidden = document.createElement('input');
  hidden.setAttribute('type', 'hidden');
  hidden.setAttribute('value', time);
  li.appendChild(hidden);
  // リストに追加
  var ul = document.getElementById('TodoList');
  ul.appendChild(li);
}










  /*
  textContents は、書式設定のみを目的とする要素およびその子要素に含まれるすべてのテキストです。
  innerText は、要素およびその子要素に含まれるすべてのテキストを返します。
  innerHtml は、要素に含まれるすべてのテキスト（html タグも含む）を返します。
  */