'use strict';

function addTodoList() {
  /*
  textContents は、書式設定のみを目的とする要素およびその子要素に含まれるすべてのテキストです。
  innerText は、要素およびその子要素に含まれるすべてのテキストを返します。
  innerHtml は、要素に含まれるすべてのテキスト（html タグも含む）を返します。
  */
  var newTodo = document.getElementById("newTodo").value;


  // li 要素の作成
  var newLi = document.createElement('li');
  newLi.innerText=newTodo;

  // リストに追加
  var list = document.getElementById('TodoList');
  list.appendChild(newLi);
}
const addTodo = document.getElementById('addTodo');
addTodo.addEventListener('click',()=>{
  addTodoList();
})


