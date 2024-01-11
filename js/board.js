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

    let progressContent = document.getElementById('content-todo');
    progressContent.innerHTML = '';
    for(let i = 0; i < open.length; i++) {
        const element = open[i];
        progressContent.innerHTML += templateHTMLTodoContainer(element);
    }



    let progress = todos.filter(t => t['category'] == 'progress');

    let todoContent = document.getElementById('content-progress');
    todoContent.innerHTML = '';
    todoContent.classList.remove('board-content');
    for(let i = 0; i < progress.length; i++) {
        const element = progress[i];
        todoContent.innerHTML += templateHTMLTodoContainer(element);
    }

    let feedback = todos.filter(t => t['category'] == 'feedback');

    let feedbackContent = document.getElementById('content-feedback');
    feedbackContent.innerHTML = '';
    feedbackContent.classList.remove('board-content');
    for(let i = 0; i < feedback.length; i++) {
        const element = feedback[i];
        feedbackContent.innerHTML += templateHTMLTodoContainer(element);
    }

    let done = todos.filter(t => t['category'] == 'done');

    let doneContent = document.getElementById('content-done');
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