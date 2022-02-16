const todoList = document.querySelector('#todo-list');
const addTodoForm = document.querySelector('.add-todo');

function renderTodo(todo) {
	const liElement = document.createElement('li');
	const deleteBtnEl = document.createElement('button')

	deleteBtnEl.setAttribute('class', 'delete-btn');

	liElement.innerText = todo.title;
	deleteBtnEl.innerText = 'Delete';
	if (todo.completed) {
		liElement.setAttribute('class', 'completed');
	}
	todoList.append(liElement);
	liElement.append(deleteBtnEl);
}

function renderTodoList(todos) {
	todos.forEach((todo) => renderTodo(todo));
}

function listenToAddTodo() {
	addTodoForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const todo = {
			title: addTodoForm.title.value,
      completed: false
		};
		fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (todo) {
				renderTodo(todo);
			});
		addTodoForm.reset();
	});
}

function init() {
  listenToAddTodo()
  getTodos()
}

function getTodos() {
	todoList.innerHTML = '';
	fetch('http://localhost:3000/todos')
		.then(function (response) {
			return response.json();
		})
		.then(function (todos) {
			renderTodoList(todos);
		});
}

init();
