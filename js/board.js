let todos = [
    {
        id: 0,
        title: 'Todo1',
        description: 'Ths is the first Todo.',
        category: 'open'
    },
    {
        id: 1,
        title: 'Todo2',
        description: 'Ths is the second Todo.',
        category: 'open'
    },
    {
        id: 2,
        title: 'Todo3',
        description: 'Ths is the third Todo.',
        category: 'done'
    }
]

let startDragginId;

function init() {
    renderHTML();
}

function renderHTML() {

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
        const element = open[i];
        openContent.innerHTML += templateHTMLTodoContainer(element);
    }



    let progress = todos.filter(t => t['category'] == 'progress');
    let boardContentProgress = document.getElementById('board-content-progress');
    let progressContent = document.getElementById('content-progress');
    if(!progress.length == 0) {
        boardContentProgress.classList.remove('board-content');
        boardContentProgress.innerHTML = '';
    } else {
        boardContentProgress.classList.add('board-content');
        boardContentProgress.innerHTML = 'No task in progress';
    }
    progressContent.innerHTML = '';
    progressContent.classList.remove('board-content');
    for(let i = 0; i < progress.length; i++) {
        const element = progress[i];
        progressContent.innerHTML += templateHTMLTodoContainer(element);
    }



    let feedback = todos.filter(t => t['category'] == 'feedback');
    let boardContentFeedback = document.getElementById('board-content-feedback');
    let feedbackContent = document.getElementById('content-feedback');
    if(!feedback.length == 0) {
        boardContentFeedback.classList.remove('board-content');
        boardContentFeedback.innerHTML = '';
    } else {
        boardContentFeedback.classList.add('board-content');
        boardContentFeedback.innerHTML = 'No tasks await for feedback';
    }
    feedbackContent.innerHTML = '';
    feedbackContent.classList.remove('board-content');
    for(let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        feedbackContent.innerHTML += templateHTMLTodoContainer(element);
    }



    let done = todos.filter(t => t['category'] == 'done');
    let boardContentDone = document.getElementById('board-content-done');
    let doneContent = document.getElementById('content-done');
    if(!done.length == 0) {
        boardContentDone.classList.remove('board-content');
        boardContentDone.innerHTML = '';
    } else {
        boardContentDone.classList.add('board-content');
        boardContentDone.innerHTML = 'No tasks are done';
    }
    doneContent.innerHTML = '';
    doneContent.classList.remove('board-content');
    for(let i = 0; i < done.length; i++) {
        const element = done[i];
        doneContent.innerHTML += templateHTMLTodoContainer(element);
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

function templateHTMLTodoContainer(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element.id})" id="todo-container">
        <h2>${element.title}</h2>
        <p>${element.description}</p>
    </div>
`;
}