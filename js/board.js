let todos = [];
let randomColorsForCategory = ['#003366', '#004D40', '#1B5E20', '#B71C1C', '#4A148C'];

let startDragginId;

//--------------------------------------------
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }; //wenn key und key gleich sind kann man es aus weg lassen { key, value, token:STORAGE_TOKEN}
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) });
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value).catch(function (err) {
        console.log('fetch konnte nicht aufgeührt werden');
    });;
}
//--------------------------------------

function initBoard() {
    includesHTML();
    renderHTML();
}

async function renderHTML() {
    await loadTasks();
    await loadContacts();
    await loadLoggedInUser();
    pushColorForCategory();
    renderTodos();
    addIdToTasks();
    showSelectedButton("boardButton");
}

async function loadTasks() {
    todos = JSON.parse(await getItem('allTasks'));
    console.log(todos);
}

async function loadContacts() {
    contacts = JSON.parse(await getItem('contacts'));
}

function pushColorForCategory() {
    let randomColorIndex = Math.floor(Math.random() * randomColorsForCategory.length);

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const todoCategory = todo.todoCategory; 
        if (todoCategory == 'Arbeit') {
            todo.categoryColor = '#0038FF';
        } else if (todoCategory == 'Privat') {
            todo.categoryColor = '#1FD7C1';
        } else if (todoCategory == 'Anderes') {
            todo.categoryColor = '#E63946';
        } else {
            todo.categoryColor = randomColorsForCategory[randomColorIndex];
        }
    }
}

function renderTodos() {

    let contentTodo = document.getElementById('board-content-todo');
    let contentProgress = document.getElementById('board-content-progress');
    let contentFeedback = document.getElementById('board-content-feedback');
    let contentDone = document.getElementById('board-content-done');

    checkOpenTodo();
    checkProgressTodo();
    checkFeedbackTodo();
    checkDoneTodo();

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        renderCategoryOpen(todo, i, contentTodo);
        renderCategoryProgress(todo, i, contentProgress);
        renderCategoryFeedback(todo, i, contentFeedback);
        renderCategoryDone(todo, i, contentDone);
    }
}

function renderCategoryOpen(todo, i, contentTodo) {
    if(todo.category == 'open') {
        contentTodo.innerHTML += templateHTMLTodoContainer(todo, i);
        renderColorForCategory(i);
        renderSubtaskProgressbar(i);
        renderPrioImg(i);
        renderContact(i);
        renderCounterAfterClose(i);
        changeProgressbar(i);
    }
}

function renderCategoryProgress(todo, i, contentProgress) {
    if(todo['category'] == 'progress') {
        contentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
        renderColorForCategory(i);
        renderSubtaskProgressbar(i);
        renderPrioImg(i);
        renderContact(i);
        renderCounterAfterClose(i);
        changeProgressbar(i);
    }
}

function renderCategoryFeedback(todo, i, contentFeedback) {
    if(todo['category'] == 'feedback') {
        contentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
        renderColorForCategory(i);
        renderSubtaskProgressbar(i);
        renderPrioImg(i);
        renderContact(i);
        renderCounterAfterClose(i);
        changeProgressbar(i);
    }
}

function renderCategoryDone(todo, i, contentDone) {
    if(todo['category'] == 'done') {
        contentDone.innerHTML += templateHTMLTodoContainer(todo, i);
        renderColorForCategory(i);
        renderSubtaskProgressbar(i);
        renderPrioImg(i);
        renderContact(i);
        renderCounterAfterClose(i);
        changeProgressbar(i);
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
        contentFeedback.innerHTML = 'No tasks await for feedback';
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
        contentDone.innerHTML = 'No tasks are done';
    } else {
        contentDone.classList.remove('board-content');
        contentDone.innerHTML = '';
    }
}

function addIdToTasks() {
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}

function renderColorForCategory(index) {
    let categoryContainer = document.getElementById(`category-span${index}`);
    let categoryContainerDetailView = document.getElementById(`category-span-detail${index}`);
    if (categoryContainer) {
        categoryContainer.style.backgroundColor = todos[index].categoryColor;
    }
    if (categoryContainerDetailView) {
        categoryContainerDetailView.style.backgroundColor = todos[index].categoryColor; 
    }
}

function renderSubtaskProgressbar(index) {
    let progressbarContent = document.getElementById(`progress-content${index}`);
    if(todos[index].subtask.length > 0) {
      progressbarContent.innerHTML = templateProgressbar(index); 
    }
  
    subtaskMaxLength(index);
}

function subtaskMaxLength(index) {
    let showMaxLength = document.getElementById(`subtask-maxlength${index}`);
    let maxLength = todos[index].subtask.length;

    if(todos[index].subtask.length > 0) {
      showMaxLength.innerHTML = maxLength;
    }
}

function renderPrioImg(index) {
    let prioImg = document.getElementById(`prio-img${index}`);
    let prioImgDetail = document.getElementById(`prio-img-detail${index}`);
    prioLow(prioImg, prioImgDetail, index);
    prioMedium(prioImg, prioImgDetail, index);
    prioHigh(prioImg, prioImgDetail, index);
}

function prioLow(prioImg, prioImgDetail, index) {
    if(todos[index].priority == 'low') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-low.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-low.svg';
        }
    }
}

function prioMedium(prioImg, prioImgDetail, index) {
    if(todos[index].priority == 'medium') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-medium.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-medium.svg';
        }
    }
}

function prioHigh(prioImg, prioImgDetail, index) {
    if(todos[index].priority == 'high') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-urgent.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-urgent.svg';
        }
    }
}

function renderContact(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts${index}`);
    if(todos[index].assignedContacts.length > 0) {
        let limit = Math.min(4, todos[index].assignedContacts.length);
        for(let i = 0; i < limit; i++) {
            const contactId = todos[index].assignedContacts[i];
            const contact = findContactById(contactId);
            let splitName = contact.name.split(" ");
            let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
            let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
            let resultInitials = firstLetter + secondLetter;
            assignedContactsContainer.innerHTML += templateContactIcons(resultInitials, i);
            renderContactColor(contact, i);
        }
    }

    renderMoreContactsIcon(index);
}

function renderContactColor(contact, i) {
    let contactIcon = document.getElementById(`contactsIcon${i}`);
    let contactIconDetailview = document.getElementById(`contactIconDetailview${i}`);

    if(contactIcon) {
        contactIcon.style.backgroundColor += contact.color;
    }
    if(contactIconDetailview) {
        contactIconDetailview.style.backgroundColor += contact.color;
    }
}

function findContactById(contactId) {
    return contacts.find(contact => contact.id === contactId);
}


function renderMoreContactsIcon(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts${index}`);
    if(todos[index].assignedContacts.length > 4) {
        let differenceLength = todos[index].assignedContacts.length - 4;
        assignedContactsContainer.innerHTML += templateMoreContactIcon(differenceLength);
    }
}

async function subtaskCounter(index, i) {
    let showCounter = document.getElementById(`subtask-counter${index}`);
    let checkboxSubtask = document.getElementById(`subtask${index}-${i}`);
    todos[index].subtask[i].subtaskDone = checkboxSubtask.checked;

    if(todos[index].subtask[i].subtaskDone) {
        todos[index].counter++;
    } else {
        todos[index].counter--;
    }

    await setItem('allTasks', JSON.stringify(todos));
    showCounter.innerHTML = todos[index].counter;
    changeProgressbar(index);
}

function changeProgressbar(index) {
    let progressBar = document.getElementById(`progress-bar${index}`);
    let maxLength = todos[index].subtask.length; 
    let counter = todos[index].counter;
    
    if(progressBar) {
        let result = (counter / maxLength) * 100;
        progressBar.style.width = result + '%';
    }
}

function renderCounterAfterClose(index) {
    let showCounter = document.getElementById(`subtask-counter${index}`);

    if(showCounter) {
        const counter = todos[index].counter;
        showCounter.innerHTML = counter;
    }
}

// Filter Function
function filterTodos() {
    let searchDestop = document.getElementById('search').value.toLowerCase();
    let searachMobile = document.getElementById('search-mobile').value.toLowerCase();

    let search = searchDestop || searachMobile;

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
    document.getElementById('change-img-mobile').src = './assets/img/close.svg';
}

// Dragging Function
async function moveTo(category) {
    todos[startDragginId]['category'] = category;
    renderTodos();
    await setItem('allTasks', JSON.stringify(todos));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    startDragginId = id;
}