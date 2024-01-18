let todos = [
    {
        id: 0,
        title: 'Todo1',
        todoCategory: 'Test Category',
        description: 'Ths is the first Todo.',
        category: 'open',
        dueDate: '10/05/2023',
        priority: 'low'
    },
    {
        id: 1,
        title: 'Todo2',
        todoCategory: 'Test Category',
        description: 'Ths is the second Todo.',
        category: 'done',
        dueDate: '10/05/2023',
        priority: 'low'
    },
    {
        id: 2,
        title: 'Todo3',
        todoCategory: 'Test Category',
        description: 'Ths is the third Todo.',
        category: 'progress',
        dueDate: '10/05/2023',
        priority: 'low'
    }
]

let startDragginId;

function init() {
    includesHTML();
    renderHTML();
}

// Styles width JavaScript

function renderHTML() {
    renderTodos();
}

function showDetailView(index) {
   let detailViewContainer = document.getElementById('show-detail-todo');
   detailViewContainer.style.display = 'flex';

   detailViewContainer.innerHTML = templateHTMLDetailView(index);
}   

function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    renderTodos();
}

function templateHTMLDetailView(index) { 
    return `
        <div id="detail-todo-content">
            <div class="space-between">
                <span id="category-span">${todos[index].todoCategory}</span>
                <span onclick="closeDetailView()">X</span>
            </div>
            <h2>${todos[index].title}</h2>
            <p>${todos[index].description}</p>
            <p>Due Date: ${todos[index].dueDate}</p>
            <p>Priority: ${todos[index].priority}</p>
            <a onclick="editTask(${index})" href="#">Edit</a>
        </div>
    `;
}

function editTask(index) {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.innerHTML = templateHTMLEditTask(index);
}

function changeTask(index) {
    let newTitle = document.getElementById('new-title');
    let newDescription = document.getElementById('new-description');
    let newDate = document.getElementById('new-date');
    let newPriority = document.getElementById('new-priority');

    todos[index] = {
        ...todos[index],
        title: newTitle.value,
        description: newDescription.value,
        dueDate: newDate.value,
        priority: newPriority.value
    }

    showDetailView(index);
}

function templateHTMLEditTask(index) {
    return `
    <div id="detail-todo-content">
        <div class="space-end">
            <span onclick="closeDetailView()">X</span>
        </div>
        <p>Title:</p>
        <input id="new-title" type="text" value="${todos[index].title}">
        <p>Description:</p>
        <input id="new-description" type="text" value="${todos[index].description}">
        <p>Due Date:</p>
        <input id="new-date" type="text" value="${todos[index].dueDate}">
        <p>Priority:</p>
        <input id="new-priority" type="text" value="${todos[index].priority}">
        <a onclick="changeTask(${index})" href="#">OK</a>
    </div>
    `;
}

function renderTodos() {

    let contentTodo = document.getElementById('board-content-todo');
    let contentProgress = document.getElementById('board-content-progress');
    let contentFeedback = document.getElementById('board-content-feedback');
    let contentDone = document.getElementById('board-content-done');

    contentTodo.innerHTML = '';
    contentProgress.innerHTML = '';
    contentFeedback.innerHTML = '';
    contentDone.innerHTML = '';

    checkOpenTodo(contentTodo);
    checkProgressTodo(contentProgress);
    checkFeedbackTodo(contentFeedback);
    checkDoneTodo(contentDone);

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if(todo.category == 'open') {
            contentTodo.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'progress') {
            contentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'feedback') {
            contentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'done') {
            contentDone.innerHTML += templateHTMLTodoContainer(todo, i);
        }
    }
}

function checkOpenTodo(contentTodo) {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'open') ;

    if(filteredOpenCategory.length === 0) {
        contentTodo.classList.add('board-content');
        contentTodo.innerHTML = 'No tasks To do';
    } else {
        contentTodo.classList.remove('board-content');
        contentTodo.innerHTML = '';
    }
}

function checkProgressTodo(contentProgress) {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'progress') ;

    if(filteredOpenCategory.length === 0) {
        contentProgress.classList.add('board-content');
        contentProgress.innerHTML = 'No tasks in progress';
    } else {
        contentProgress.classList.remove('board-content');
        contentProgress.innerHTML = '';
    }
}

function checkFeedbackTodo(contentFeedback) {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'feedback') ;

    if(filteredOpenCategory.length === 0) {
        contentFeedback.classList.add('board-content');
        contentFeedback.innerHTML = 'No tasks in progress';
    } else {
        contentFeedback.classList.remove('board-content');
        contentFeedback.innerHTML = '';
    }
}

function checkDoneTodo(contentDone) {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'done') ;

    if(filteredOpenCategory.length === 0) {
        contentDone.classList.add('board-content');
        contentDone.innerHTML = 'No tasks in progress';
    } else {
        contentDone.classList.remove('board-content');
        contentDone.innerHTML = '';
    }
}

function moveTo(category) {
    todos[startDragginId]['category'] = category;
    renderHTML();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    startDragginId = id;
}

function showAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "flex";
    showAddTodoContainer.innerHTML = templateHTMLAddTask();
}

function closeAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "none";
}

function filterTodos() {
    let search = document.getElementById('search').value;
    search.toLowerCase();
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let todoContent = document.getElementById(`todo-container${i}`);
        let title = todo['title'];
        if(title.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
        } else {
            todoContent.style.display = 'none';
        }
    }
}