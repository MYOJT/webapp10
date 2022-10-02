'use strict';

// リスト追加
function addTodoList() {
  /*
  textContents は、書式設定のみを目的とする要素およびその子要素に含まれるすべてのテキストです。
  innerText は、要素およびその子要素に含まれるすべてのテキストを返します。
  innerHtml は、要素に含まれるすべてのテキスト（html タグも含む）を返します。
  */
  var newTodo = document.getElementById("newTodo").value;


  // li 要素の作成
  var li = document.createElement('li');
  li.innerText=newTodo;

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
  completeButton.setAttribute('id','complete-todo')
  completeButton.setAttribute('value', 'complete');
  li.appendChild(completeButton);

  // リストに追加
  var ul = document.getElementById('TodoList');
  ul.appendChild(li);

}

// 削除処理
function completeTodoList(completeTodo){
  const completeItem = completeTodo.target;
  console.log(completeItem);
  completeItem.parentNode.remove();
}


//ボタンが押された際、TODOを追加
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click',()=>{
  addTodoList();
})

const completeTodo = document.getElementById('complete-todo');
  completeTodo.addEventListener('click',(completeTodo)=>{
  completeTodoList(completeTodo);
})






