const todoList = document.querySelector('#todo-list');

function renderTodo(todo) {
	const liElement = document.createElement('li');
	liElement.innerText = todo.title;
  if (todo.completed) {
    liElement.setAttribute('class', 'completed')
  }
  todoList.append(liElement);
}

function renderTodoList(todos) {
  todos.forEach(todo => renderTodo(todo));
}

function getTodos() {
  todoList.innerHTML = ''
  fetch('http://localhost:3000/todos')
  .then(function (response) {
    return response.json();
  })
  .then(function (todos) {
    renderTodoList(todos);
  });
}

getTodos()