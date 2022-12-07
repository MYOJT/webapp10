'use strict';
const TodoList = document.getElementById('TodoList');
let sdata;
let nowTodoId = 0;
window.onload = (()=>{
  //user情報取得(session)
  sdata = JSON.parse(sessionStorage.getItem('data'));
  console.log('[todo.js] user_id = ' + sdata.user_id + ', user_name = ' + sdata.user_name);
  console.log();

  //todoを取得する
  fetch('/todoAll', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      user_id: sdata.user_id,
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
          nowTodoId = i.todo_id;
          // 画面にDBのtodoを表示
          initialDispTodo(i.todo, i.todo_id, i.create_date_time);
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
const addTodoButton = document.getElementById('addTodo');
addTodoButton.addEventListener('click',()=>{
  addTodo((nowTodoId + 1));
  window.location.reload();

})

// todo削除処理
function completeTodo(e){
  let elem = e.parentNode;
  let deleteTodoId = e.getAttribute('id');

  fetch('/deleteTodo', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      user_id: sdata.user_id,
      todo_id: deleteTodoId,
    })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('[todo.js](/deleteTodo) 200 success');
    } else if (response.status === 403) {
      console.log('[todo.js](/deleteTodo) 403 ');
    } else {
      console.log('[todo.js](/deleteTodo) error occurres');
    }
  })
  .catch(err => {
    console.log('[todo.js] Error Orrurred');
    console.log('[todo.js] Error is' + err);
  })



  elem.remove();
}
// どこかでtodo_idを保持しなければならない

/*
  todoの内容を引数に、li要素を作成する関数
  todo    : todo文
  todo_id : todoのID
  num     : 初期表示 0 DBの内容を取得、表示
          追加     1 DBに追加し、表示
*/

function initialDispTodo (todo, todo_id, todo_time){
  /* 要素作成 */
  // li
  let li = document.createElement('li');
  // input 完了ボタン
  let completeButton = document.createElement('input');
  // span
  let span = document.createElement('span');
  // input 隠し設定
  let hidden = document.createElement('input');

  // li span 設定
  li.innerText = todo;
  li.setAttribute('id', todo_id);
  li.appendChild(span);
  span.innerHTML = todo_time
  li.setAttribute('value', todo_time);

  // input 完了ボタン 設定
  completeButton.setAttribute('type', 'button');
  completeButton.setAttribute('id', todo_id);
  completeButton.setAttribute('class','complete-todo')
  completeButton.setAttribute('value', 'complete');
  completeButton.setAttribute('onclick','completeTodo(this)')
  li.appendChild(completeButton);
  hidden.setAttribute('type', 'hidden');
  hidden.setAttribute('value', todo_time);
  li.appendChild(hidden);
  // リストに追加
  let ul = document.getElementById('TodoList');
  ul.appendChild(li);
}


// todoを追加する関数
function addTodo(nowTodoId){
  let newTodo = document.getElementById("newTodo").value;
  let time = makeTimeData();
  fetch('/addTodo', {
    method: 'POST',
    headers: new Headers({'Content-type' : 'application/json' }),
    body: JSON.stringify({
      user_id: sdata.user_id,
      todo: newTodo,
      create_date_time: time
    })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('[todo.js](/addTodo) success add new todo');
      /* 要素作成 */
      // li
      let li = document.createElement('li');
      // input 完了ボタン
      let completeButton = document.createElement('input');
      // span
      let span = document.createElement('span');
      // input 隠し設定
      let hidden = document.createElement('input');
      // li span 設定
      li.innerText = newTodo;
      li.setAttribute('id', nowTodoId);
      li.setAttribute('value', time);
      span.innerHTML = time
      li.appendChild(span);
      // input 完了ボタン 設定
      completeButton.setAttribute('type', 'button');
      completeButton.setAttribute('id', todo_id);
      completeButton.setAttribute('class','complete-todo')
      completeButton.setAttribute('value', 'complete');
      completeButton.setAttribute('onclick','completeTodo(this)')
      li.appendChild(completeButton);
      hidden.setAttribute('type', 'hidden');
      hidden.setAttribute('value', time);
      li.appendChild(hidden);
      // リストに追加
      let ul = document.getElementById('TodoList');
      ul.appendChild(li);
    } else {
      console.log('[todo.js](/addTodo) failed add new todo');
    }
  })
  .catch(err => {
    console.log('[todo.js](/addTodo) Error Occurred');
  })

}



// 現在時刻を取得する関数
function makeTimeData(){
  let now = new Date();
  let Year = now.getFullYear();
  let Month = now.getMonth()+1;
  let date = now.getDate();
  let Hour = now.getHours();
  let Min = now.getMinutes();
  let Sec =now.getSeconds();
  let time = Year+'-'+Month+'-'+date+' '+Hour+':'+Min+':'+Sec;
  return time;
}





  /*
  textContents は、書式設定のみを目的とする要素およびその子要素に含まれるすべてのテキストです。
  innerText は、要素およびその子要素に含まれるすべてのテキストを返します。
  innerHtml は、要素に含まれるすべてのテキスト（html タグも含む）を返します。
  */