let todos = [
    {
        id: 0,
        title: 'Todo1',
        todoCategory: 'Test Category',
        description: 'Ths is the first Todo.',
        category: 'open',
        
    },
    {
        id: 1,
        title: 'Todo2',
        todoCategory: 'Test Category',
        description: 'Ths is the second Todo.',
        category: 'open'
    },
    {
        id: 2,
        title: 'Todo3',
        todoCategory: 'Test Category',
        description: 'Ths is the third Todo.',
        category: 'done'
    }
]

let startDragginId;

function init() {
    includesHTML();
    renderHTML();
}

// Styles width JavaScript

function renderHTML() {
    renderCategoryOpen();
    renderCategoryProgress();
    renderCategorFeedback();
    renderCategoryDone();
}

function renderCategoryOpen() {
    let open = todos.filter(t => t['category'] == 'open');
    let boardContentTodo = document.getElementById('board-content-todo');
    let openContent = document.getElementById('content-todo');
    if(!open.length == 0) {
        boardContentTodo.classList.remove('board-content');
        boardContentTodo.innerHTML = '';
    } else {
        boardContentTodo.classList.add('board-content');
        boardContentTodo.innerHTML = 'No tasks To Do';
    }
    openContent.innerHTML = '';
    for(let i = 0; i < open.length; i++) {
        openContent.innerHTML += templateHTMLTodoContainer(open[i], i);
    }
}

function renderCategoryProgress() {
    let progress = todos.filter(t => t['category'] == 'progress');
    let boardContentProgress = document.getElementById('board-content-progress');
    let progressContent = document.getElementById('content-progress');
    document.getElementById('drag-progress').style.display = "none";
    if(!progress.length == 0) {
        boardContentProgress.classList.remove('board-content');
        boardContentProgress.innerHTML = '';
    } else {
        boardContentProgress.classList.add('board-content');
        boardContentProgress.innerHTML = 'No task in progress';
    }
    progressContent.innerHTML = '';
    for(let i = 0; i < progress.length; i++) {
        progressContent.innerHTML += templateHTMLTodoContainer(progress[i], i);
    }
}

function renderCategorFeedback() {
    let feedback = todos.filter(t => t['category'] == 'feedback');
    let boardContentFeedback = document.getElementById('board-content-feedback');
    let feedbackContent = document.getElementById('content-feedback');
    document.getElementById('drag-feedback').style.display = "none";
    if(!feedback.length == 0) {
        boardContentFeedback.classList.remove('board-content');
        boardContentFeedback.innerHTML = '';
    } else {
        boardContentFeedback.classList.add('board-content');
        boardContentFeedback.innerHTML = 'No tasks await for feedback';
    }
    feedbackContent.innerHTML = '';
    for(let i = 0; i < feedback.length; i++) {
        feedbackContent.innerHTML += templateHTMLTodoContainer(feedback[i], i);
    }
}

function renderCategoryDone() {
    let done = todos.filter(t => t['category'] == 'done');
    let boardContentDone = document.getElementById('board-content-done');
    let doneContent = document.getElementById('content-done');
    document.getElementById('drag-done').style.display = "none";
    if(!done.length == 0) {
        boardContentDone.classList.remove('board-content');
        boardContentDone.innerHTML = '';
    } else {
        boardContentDone.classList.add('board-content');
        boardContentDone.innerHTML = 'No tasks are done';
    }
    doneContent.innerHTML = '';
    for(let i = 0; i < done.length; i++) {
        doneContent.innerHTML += templateHTMLTodoContainer(done[i], i);
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

function showDetailView(index) {
    renderCategoryOpenDetailView(index);
    renderCategoryProgressDetailView(index);
    renderCategoryFeedbackDetailView(index);
    renderCategoryDoneDetailView(index);
}

function renderCategoryOpenDetailView(index) {
    let filteredTodos = todos.filter(t => t['category'] == 'open');
    let element = filteredTodos[index];
    let showDetailTodoContainer = document.getElementById('show-detail-todo');
    showDetailTodoContainer.style.display = "flex";
    showDetailTodoContainer.innerHTML = templateHTMLDetailView(element);
}

function renderCategoryProgressDetailView(index) {
    let filteredTodos = todos.filter(t => t['category'] == 'feedback');
    let element = filteredTodos[index];
    let showDetailTodoContainer = document.getElementById('show-detail-todo');
    showDetailTodoContainer.style.display = "flex";
    showDetailTodoContainer.innerHTML = templateHTMLDetailView(element);
}

function renderCategoryFeedbackDetailView(index) {
    let filteredTodos = todos.filter(t => t['category'] == 'feedback');
    let element = filteredTodos[index];
    let showDetailTodoContainer = document.getElementById('show-detail-todo');
    showDetailTodoContainer.style.display = "flex";
    showDetailTodoContainer.innerHTML = templateHTMLDetailView(element);
}

function renderCategoryDoneDetailView(index) {
    let filteredTodos = todos.filter(t => t['category'] == 'done');
    let element = filteredTodos[index];
    let showDetailTodoContainer = document.getElementById('show-detail-todo');
    showDetailTodoContainer.style.display = "flex";
    showDetailTodoContainer.innerHTML = templateHTMLDetailView(element);
}

function templateHTMLDetailView(element, index) { 
        return `
            <div id="detail-todo-content">
                <span id="category-span">${element.todoCategory}</span>
                <h2>${element.title}</h2>
                <p>${element.description}</p>
            </div>
        `;
}
