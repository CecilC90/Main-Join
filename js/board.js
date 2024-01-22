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
            {
                title: 'title1',
                subtaskDone: false,
            }
        ],
        counter: 0
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
        assignedContacts: [
            'Benedikt Ziegler', 'Laura Musterfrau', 'Hans Wurst'
        ],
        subtask: [],
        counter: 0
    },
    {
        id: 2,
        title: 'Todo3',
        todoCategory: 'Test Category',
        description: 'Ths is the third Todo.',
        category: 'progress',
        dueDate: '10/05/2023',
        priority: 'high',
        assignedContacts: [
            'Max Mustermann', 'Laura Musterfrau', 'Hans Wurst'
        ],
        subtask: [
            {
                title: 'title3',
                subtaskDone: false,
            },
            {
                title: 'title4',
                subtaskDone: false,
            },
            {
                title: 'title5',
                subtaskDone: false,
            }
        ],
        counter: 0
    }
]

let startDragginId;

function init() {
    includesHTML();
    renderHTML();
}

function renderHTML() {
    renderTodos();
}

function showDetailView(index) {
   let detailViewContainer = document.getElementById('show-detail-todo');
   detailViewContainer.style.display = 'flex';

   detailViewContainer.innerHTML = templateHTMLDetailView(index);

   renderSubtasks(index);
   renderContactsDetailView(index);
   renderCheckboxAfterClose(index);
}

function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    renderTodos();
}

function renderContactsDetailView(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts-detailview${index}`);
    if(todos[index].assignedContacts.length > 0) {
        assignedContactsContainer.innerHTML = `
            <p>Assigned To:</p>
        `;
        for(let i = 0; i < todos[index].assignedContacts.length; i++) {
            const assignedContact = todos[index].assignedContacts[i];
            let splitName = assignedContact.split(" ");
            let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
            let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
            let resultInitials = firstLetter + secondLetter;
            assignedContactsContainer.innerHTML += `
                <div class="contact-detailview">
                    <div class="contactsIcon">${resultInitials}</div>
                    <span>${assignedContact}</span>    
                </div>
            `;
        }
    }
}

function renderSubtasks(index) {
    let subtasks = document.getElementById(`checkbox-subtask${index}`);
    if(todos[index].subtask.length > 0) {
        subtasks.innerHTML = `
            <p>Subtasks</p>
        `;
        for(let i = 0; i < todos[index].subtask.length; i++) {
            let currentIndexSubtask = todos[index].subtask[i].title;
            subtasks.innerHTML += `
                <div class="subtask-detailview">
                    <input onclick="subtaskCounter(${index}, ${i})" id="subtask${index}-${i}" type="checkbox">
                    <label for="subtask${index}-${i}">${currentIndexSubtask}</label>
                </div>
            `;
        }
    }
}

function editTask(index) {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.innerHTML = templateHTMLEditTask(index);
    renderPrioButton(index);
}

function setPrioButton(prioValue, index) {
    todos[index] = {
      ...todos[index],
      priority: prioValue
    }
  
    let low = document.getElementById('prioButtonLow');
    let medium = document.getElementById('prioButtonMedium');
    let high = document.getElementById('prioButtonHigh');
    let changeImgLow = document.getElementById('change-img-low');
    let changeImgMedium = document.getElementById('change-img-medium');
    let changeImgHigh = document.getElementById('change-img-high');
  
    if(prioValue == 'low') {
      low.style.background = '#7ae229';
      low.style.color = '#fff';
      changeImgLow.src = 'assets/img/prio-low-white.png';
    } else {
      low.style.background = '#fff';
      low.style.color = 'black';
      changeImgLow.src = 'assets/img/prio-low.svg';
    }
  
    if(prioValue == 'medium') {
      medium.style.background = '#ffa800';
      medium.style.color = '#fff';
      changeImgMedium.src = 'assets/img/prio-medium-white.png';
    } else {
      medium.style.background = '#fff';
      medium.style.color = 'black';
      changeImgMedium.src = 'assets/img/prio-medium.svg';
    }
  
    if(prioValue == 'high') {
      high.style.background = '#ff3d00';
      high.style.color = '#fff';
      changeImgHigh.src = 'assets/img/prio-urgent-white.png';
    } else {
      high.style.background = '#fff';
      high.style.color = 'black';
      changeImgHigh.src = 'assets/img/prio-urgent.svg';
    }
  
  }
  

function changeTask(index) {
    let newTitle = document.getElementById('new-title');
    let newDescription = document.getElementById('new-description');
    let newDate = document.getElementById('new-date');

    todos[index] = {
        ...todos[index],
        title: newTitle.value,
        description: newDescription.value,
        dueDate: newDate.value,
    }

    showDetailView(index);
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
        if(todo.category == 'open') {
            contentTodo.innerHTML += templateHTMLTodoContainer(todo, i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContacts(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'progress') {
            contentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContacts(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'feedback') {
            contentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContacts(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'done') {
            contentDone.innerHTML += templateHTMLTodoContainer(todo, i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContacts(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
    }
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
  
function subtaskCounter(index, i) {
    let showCounter = document.getElementById(`subtask-counter${index}`);
    let checkboxSubtask = document.getElementById(`subtask${index}-${i}`);

        todos[index].subtask[i].subtaskDone = checkboxSubtask.checked;
  
        if(todos[index].subtask[i].subtaskDone) {
          todos[index].counter++;
        } else {
          todos[index].counter--;
        }
  
        showCounter.innerHTML = todos[index].counter;
        changeProgressbar(index);
  }

function renderCheckboxAfterClose(index) {

    for(let i = 0; i < todos[index].subtask.length; i++) {
        let checkboxSubtask = document.getElementById(`subtask${index}-${i}`);

        const isChecked = todos[index].subtask[i].subtaskDone;
        checkboxSubtask.checked = isChecked;
    }
}

function renderCounterAfterClose(index) {
    let showCounter = document.getElementById(`subtask-counter${index}`);

    if(showCounter) {
        const counter = todos[index].counter;
        showCounter.innerHTML = counter;
    }
}

  
function subtaskMaxLength(index) {
      let showMaxLength = document.getElementById(`subtask-maxlength${index}`);
      let maxLength = todos[index].subtask.length;
  
      if(todos[index].subtask.length > 0) {
        showMaxLength.innerHTML = maxLength;
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
                <div class="contactsIcon margin-left">${resultInitials}</div>
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
    if(todos[index].priority == 'high') {
        prioImg.src = 'assets/img/prio-urgent.svg';
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


function load() {
    let taskAsText = JSON.stringify(todos);
    localStorage.setItem('task', taskAsText);
}

function save() {
    let taskAsText = localStorage.getItem('task');

    if (taskAsText) {
        todos = JSON.parse(taskAsText);
    }
}
