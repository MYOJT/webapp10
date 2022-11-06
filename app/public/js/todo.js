'use strict';


//ボタンが押された際、TODOを追加
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click',function addTodoList() {
  var newTodo = document.getElementById("newTodo").value;

  // li 要素の作成
  var li = document.createElement('li');
  li.innerText = newTodo;

  // 日時情報の取得と記載
  var span = document.createElement('span');
  var now = new Date();
  var Year = now.getFullYear();
  var Month = now.getMonth()+1;
  var date = now.getDate();
  var Hour = now.getHours();
  var Min = now.getMinutes();
  var Sec =now.getSeconds();
  var time = Year+'/'+Month+'/'+date+' '+Hour+':'+Min+':'+Sec;
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

});
// todo削除処理

function completeTodo(e){
  var elem = e.target.val();
  console.log(elem);
}











  /*
  textContents は、書式設定のみを目的とする要素およびその子要素に含まれるすべてのテキストです。
  innerText は、要素およびその子要素に含まれるすべてのテキストを返します。
  innerHtml は、要素に含まれるすべてのテキスト（html タグも含む）を返します。
  */