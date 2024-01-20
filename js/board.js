let todos = [
    {
        id: 0,
        title: 'Todo1',
        todoCategory: 'Test Category',
        description: 'Ths is the first Todo.',
        category: 'open',
        dueDate: '10/05/2023',
        priority: 'low',
        assignedContacts: [
            'Max Mustermann', 'Laura Musterfrau', 'Hans Wurst'
        ],
        subtask: [
            'Test', 'Test1'
        ],
    },
    {
        id: 1,
        title: 'Todo2',
        todoCategory: 'Test Category',
        description: 'Ths is the second Todo.',
        category: 'done',
        dueDate: '10/05/2023',
        priority: 'medium',
        assignedContacts: [],
        subtask: [
            'Here is a Subtask'
        ],
    },
    {
        id: 2,
        title: 'Todo3',
        todoCategory: 'Test Category',
        description: 'Ths is the third Todo.',
        category: 'progress',
        dueDate: '10/05/2023',
        priority: 'urgent',
        assignedContacts: [],
        subtask: [],
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

   renderSubtasks(index);
}   

function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    renderTodos();
}

function renderSubtasks(index) {
    let subtasks = document.getElementById('checkbox-subtask');
    if(todos[index].subtask.length > 0) {
        subtasks.innerHTML = 'Subtasks';
        for(let i = 0; i < todos[index].subtask.length; i++) {
            let currentIndexSubtask = todos[index].subtask[i];
            subtasks.innerHTML += `
                <input onclick="counterSubtask(${index})" id="subtask${index}" type="checkbox">
                <label for="subtask${index}">${currentIndexSubtask}</label>
            `;
        }
    }
}

function counterSubtask(index) {
    let checkboxSubtask = document.getElementById(`subtask${index}`);
    let counterSubtask = document.getElementById(`subtask-counter${index}`)
    let counter = 0;
    
    if(checkboxSubtask.checked) {
        counter++;
    } else {
        counter--;
    }

    counterSubtask.innerHTML = counter;
    todos[index].subtaskCounter = counter;
}

function maxLengthSubtask(index) {
    let maxLengthTask = document.getElementById(`subtask-maxlength${index}`);
    let taskLength = todos[index].subtask.length;
    if(taskLength > 0) {
        maxLengthTask.innerHTML = taskLength;
    }
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

function renderTodos() {

    let contentTodo = document.getElementById('board-content-todo');
    let contentProgress = document.getElementById('board-content-progress');
    let contentFeedback = document.getElementById('board-content-feedback');
    let contentDone = document.getElementById('board-content-done');

    contentTodo.innerHTML = '';
    contentProgress.innerHTML = '';
    contentFeedback.innerHTML = '';
    contentDone.innerHTML = '';

    checkOpenTodo();
    checkProgressTodo();
    checkFeedbackTodo();
    checkDoneTodo();

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if(todo.category == 'open') {
            contentTodo.innerHTML += templateHTMLTodoContainer(todo, i);
            renderProgressbar(i);
            maxLengthSubtask(i);
            renderPrioImg(i);
            renderContacts(i);
        }
        if(todo['category'] == 'progress') {
            contentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
            renderProgressbar(i);
            maxLengthSubtask(i);
            renderPrioImg(i);
            renderContacts(i);
        }
        if(todo['category'] == 'feedback') {
            contentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
            renderProgressbar(i);
            maxLengthSubtask(i);
            renderPrioImg(i);
            renderContacts(i);
        }
        if(todo['category'] == 'done') {
            contentDone.innerHTML += templateHTMLTodoContainer(todo, i);
            renderProgressbar(i);
            maxLengthSubtask(i);
            renderPrioImg(i);
            renderContacts(i);
        }
    }
}

function renderContacts(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts${index}`);
    if(todos[index].assignedContacts.length > 0) {
        for(let i = 0; i < todos[index].assignedContacts.length; i++) {
            const assignedContact = todos[index].assignedContacts[i];
            let splitName = assignedContact.split(" ");
            let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
            let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
            let resultInitials = firstLetter + secondLetter;
            assignedContactsContainer.innerHTML += `
                <div class="contactsIcon">${resultInitials}</div>
            `;
        }
    }
}

function renderPrioImg(index) {
    let prioImg = document.getElementById(`prio-img${index}`);
    if(todos[index].priority == 'low') {
        prioImg.src = 'assets/img/prio-low.svg';
    }
    if(todos[index].priority == 'medium') {
        prioImg.src = 'assets/img/prio-medium.svg';
    }
    if(todos[index].priority == 'urgent') {
        prioImg.src = 'assets/img/prio-urgent.svg';
    }
}

function renderProgressbar(index) {
    let progressbar = document.getElementById(`progress-content${index}`);
        for(let i = 0; i < todos.length; i++) {
            const todo = todos[i];
            if(todos[index].subtask.length > 0) {
                progressbar.innerHTML = `
                    <div class="space-between">
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar w-50"></div>
                    </div>
                    <div id="subtask-content">
                        <span id="subtask-counter${index}">X</span> / <span id="subtask-maxlength${index}">X</span> Subtasks
                    </div>
            `;   
        }
    } 
}

function checkOpenTodo() {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'open') ;
    let contentTodo = document.getElementById('board-content-todo');

    if(filteredOpenCategory.length === 0) {
        contentTodo.classList.add('board-content');
        contentTodo.innerHTML = 'No tasks To do';
    } else {
        contentTodo.classList.remove('board-content');
        contentTodo.innerHTML = '';
    }
} 

function checkProgressTodo() {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'progress') ;
    let contentProgress = document.getElementById('board-content-progress');

    if(filteredOpenCategory.length === 0) {
        contentProgress.classList.add('board-content');
        contentProgress.innerHTML = 'No tasks in progress';
    } else {
        contentProgress.classList.remove('board-content');
        contentProgress.innerHTML = '';
    }
}

function checkFeedbackTodo() {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'feedback') ;
    let contentFeedback = document.getElementById('board-content-feedback');

    if(filteredOpenCategory.length === 0) {
        contentFeedback.classList.add('board-content');
        contentFeedback.innerHTML = 'No tasks in progress';
    } else {
        contentFeedback.classList.remove('board-content');
        contentFeedback.innerHTML = '';
    }
}

function checkDoneTodo() {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'done');
    let contentDone = document.getElementById('board-content-done');

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

    document.getElementById('change-img').src = './assets/img/close.svg';
}

function emptyInput() {
    document.getElementById('search').value = '';
    renderTodos();
    document.getElementById('change-img').src = 'assets/img/search.svg';
}