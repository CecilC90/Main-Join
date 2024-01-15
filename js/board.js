let todos = [
    {
        id: 0,
        title: 'Todo1',
        todoCategory: 'Test Category',
        description: 'Ths is the first Todo.',
        category: 'open',
        dueDate: '10/05/2023',
        priority: 'low',
        subtasks: {
            firstTask: 'This is the first task',
            secondTask: 'This is the secons task'
        },
        assignedTo: {
            // Kontake reinpushen
        },
    },
    {
        id: 1,
        title: 'Todo2',
        todoCategory: 'Test Category',
        description: 'Ths is the second Todo.',
        category: 'done'
    },
    {
        id: 2,
        title: 'Todo3',
        todoCategory: 'Test Category',
        description: 'Ths is the third Todo.',
        category: 'progress'
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

   detailViewContainer.innerHTML += templateHTMLDetailView(index)

}   

function templateHTMLDetailView(index) { 
    return `
        <div id="detail-todo-content">${todos[index]['title']}</div>
    `;
}

function renderTodos() {
    let boardContentTodo = document.getElementById('board-content-todo');
    let boardContentProgress = document.getElementById('board-content-progress');
    let boardContentFeedback = document.getElementById('board-content-feedback');
    let boardContentDone = document.getElementById('board-content-done');

    boardContentTodo.innerHTML = '';
    boardContentProgress.innerHTML = '';
    boardContentFeedback.innerHTML = '';
    boardContentDone.innerHTML = '';

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if(todo['category'] == 'open') {
            boardContentTodo.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'progress') {
            boardContentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'feedback') {
            boardContentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
        }
        if(todo['category'] == 'done') {
            boardContentDone.innerHTML += templateHTMLTodoContainer(todo, i);
        }
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




// Code der demnächst gelöscht wird.
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
        const element = done[i];
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
        boardContentProgress.innerHTML = 'No tasks in progress';
    }
    progressContent.innerHTML = '';
    for(let i = 0; i < progress.length; i++) {
        const element = done[i];
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
        const element = done[i];
        feedbackContent.innerHTML += templateHTMLTodoContainer(feedback[i], );
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
}
