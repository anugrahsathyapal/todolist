
const todoInput = document.querySelector('input[type="text"]');
const todoButton = document.querySelector('button[type="submit"]');
const todoList = document.querySelector('.todo-list');


document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


function addTodo(event) {
    event.preventDefault();
    if (todoInput.value === '') {
        alert('Please enter a task!');
        return;
    }
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('check-btn');
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('delete-btn');
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }
    if (item.classList.contains('check-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function saveLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('check-btn');
        todoDiv.appendChild(completedButton);
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('delete-btn');
        todoDiv.appendChild(trashButton);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
