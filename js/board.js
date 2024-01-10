let todos = [
    {
        title: 'Todo1',
        description: 'Ths is the first Todo.'
    },
    {
        title: 'Todo2',
        description: 'Ths is the second Todo.'
    }
]

let progress = [];
let feedback = [];
let done = [];

function init() {
    renderHTML();
}

function renderHTML() {
    let todoContent = document.getElementById('content-todo');
    todoContent.innerHTML = '';
    todoContent.classList.remove('board-content');
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todoContent.innerHTML += `
            <div id="todo-container">
                <h2>${todo.title}</h2>
                <p>${todo.description}</p>
            </div>
        `;
    }
}