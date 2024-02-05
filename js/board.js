let todos = [];

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
    await renderTodos();
    addIdToTasks();
    showSelectedButton("boardButton");
}

async function loadTasks() {
    todos = JSON.parse(await getItem('allTasks'));
}

async function loadContacts() {
    contacts = JSON.parse(await getItem('contacts'));
}

function addIdToTasks() {
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}

function showDetailView(index) {
   let detailViewContainer = document.getElementById('show-detail-todo');
   detailViewContainer.style.display = 'flex';

   detailViewContainer.innerHTML = templateHTMLDetailView(index);

   document.getElementById('detail-todo-content').style.animationPlayState = 'running';

   changeColorForCategory(index);
   renderPrioImg(index);
   renderSubtask(index);
   renderContactsDetailView(index);
   renderCheckboxAfterClose(index);
}

function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    renderTodos();
}

function doNotClose(event) {
    event.stopPropagation();
}

function renderContactsDetailView(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts-detailview${index}`);
    if(todos[index].assignedContacts.length > 0) {
        assignedContactsContainer.innerHTML = `
            <span class="label">Assigned To:</span>
        `;
        for(let i = 0; i < todos[index].assignedContacts.length; i++) {
            const contactId = todos[index].assignedContacts[i];
            const contact = findContactById(contactId);
            let splitName = contact.name.split(" ");
            let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
            let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
            let resultInitials = firstLetter + secondLetter;
            
            assignedContactsContainer.innerHTML += `
                <div class="contact-detailview">
                    <div class="contactsIcon">${resultInitials}</div>
                    <span>${contact.name}</span>    
                </div>
            `;
        }
    }
}

function renderSubtask(index) {
    let subtasks = document.getElementById(`checkbox-subtask${index}`);
    if(todos[index].subtask.length > 0) {
        subtasks.innerHTML = `
            <span class="label">Subtasks</span>
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

async function deleteTask(index) {
    todos.splice(index);

    await setItem('allTasks', JSON.stringify(todos));
    closeDetailView();
    renderTodos;
}

async function editTask(index) {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.innerHTML = await templateHTMLEditTask(index);

    renderPrioButton(index);
    changeSelectedContacts(index);
    renderAssingnedToDropdownListEditview();
    renderSelectedContactsIconsEditview();
    renderSubtasksEditview(index);
    loadPrioButton(index);
}

function loadPrioButton(index) {
    let prioValue = todos[index].priority;

    setPrioBtn(prioValue, index);
}

function setPrioBtn(prioValue, index) {
    todos[index] = {
      ...todos[index],
      priority: prioValue
    }
  
    let low = document.getElementById('prioButtonLowEditview');
    let medium = document.getElementById('prioButtonMediumEditview');
    let high = document.getElementById('prioButtonHighEditview');
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
  
function changeSelectedContacts(index) {

    for (let i = 0; i < todos[index].assignedContacts.length; i++) {
        let todosContact = todos[index].assignedContacts[i];

        for (let j = 0; j < contacts.length; j++) {
            let contact = contacts[j];

            if (todosContact === contact.id) {
                contact.selected = true;
            }
        }
    }
}

function pushSelecetedContactsToTodos(index) {
    for(let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].id;
        if(contact.selected == true){
            todos[index].assignedContacts.push(contact);
        }
    }
}

async function changeTask(index) {
    let newTitle = document.getElementById('new-title');
    let newDescription = document.getElementById('new-description');
    let newDate = document.getElementById('new-date');

    todos[index].assignedContacts = [];

    for(let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];

        if(contact.selected) {
            todos[index].assignedContacts.push(contact.id);
        }
    }

    todos[index] = {
        ...todos[index],
        title: newTitle.value,
        description: newDescription.value,
        dueDate: newDate.value,
    }

    await setItem('allTasks', JSON.stringify(todos));

    showDetailView(index);
    renderTodos();
}


async function renderTodos() {

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
            changeColorForCategory(i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContact(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'progress') {
            contentProgress.innerHTML += templateHTMLTodoContainer(todo, i);
            changeColorForCategory(i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContact(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'feedback') {
            contentFeedback.innerHTML += templateHTMLTodoContainer(todo, i);
            changeColorForCategory(i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContact(i);
            renderCounterAfterClose(i);
            changeProgressbar(i);
        }
        if(todo['category'] == 'done') {
            contentDone.innerHTML += templateHTMLTodoContainer(todo, i);
            changeColorForCategory(i);
            renderSubtaskProgressbar(i);
            renderPrioImg(i);
            renderContact(i);
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

function changeColorForCategory(index) {
    let categoryContainer = document.getElementById(`category-span${index}`);
    let categoryContainerDetailView = document.getElementById(`category-span-detail${index}`);
    let todoCategory = todos[index].todoCategory; 

    let backgroundColor = '';
    if (todoCategory == 'Arbeit') {
        backgroundColor = '#0038FF'
    } else if (todoCategory == 'Privat') {
        backgroundColor = '#1FD7C1';
    } else if (todoCategory == 'Anderes') {
        backgroundColor = '#E63946';
    }

    if (categoryContainer) {
        categoryContainer.style.backgroundColor = backgroundColor;
    }
    if (categoryContainerDetailView) {
        categoryContainerDetailView.style.backgroundColor = backgroundColor; 
    }
}

function findContactById(contactId) {
    return contacts.find(contact => contact.id === contactId);
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
            assignedContactsContainer.innerHTML += `
                <div class="contactsIcon margin-left">${resultInitials}</div>
            `;
        }
    }

    renderMoreContactsIcon(index);
}

function renderMoreContactsIcon(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts${index}`);
    if(todos[index].assignedContacts.length > 4) {
        let differenceLength = todos[index].assignedContacts.length - 4;
        assignedContactsContainer.innerHTML += `
            <div class="moreContactsIcon margin-left">+${differenceLength}</div>
        `;
    }
}

function renderPrioImg(index) {
    let prioImg = document.getElementById(`prio-img${index}`);
    let prioImgDetail = document.getElementById(`prio-img-detail${index}`);

    if(todos[index].priority == 'low') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-low.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-low.svg';
        }
    }
    if(todos[index].priority == 'medium') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-medium.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-medium.svg';
        }
    }
    if(todos[index].priority == 'high') {
        if(prioImg) {
            prioImg.src = 'assets/img/prio-urgent.svg';
        }
        if(prioImgDetail) {
            prioImgDetail.src = 'assets/img/prio-urgent.svg';
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

function closeAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "none";
}

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

function emptyInput() {
    document.getElementById('search-mobile').value = '';
    document.getElementById('search').value = '';
    renderTodos();
    document.getElementById('change-img').src = 'assets/img/search.svg';
    document.getElementById('change-img-mobile').src = './assets/img/search.svg';
}

function showAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "flex";
    showAddTodoContainer.innerHTML = `<div id="add-todo-content"></div>`;
    document.getElementById('add-todo-content').innerHTML = `
        <div onclick="doNotClose(event)" class="space-between">
            <h1 class="headline">Add Task</h1>
            <img class="close-img" onclick="closeAddTask()" src="/assets/img/close.svg" alt="">
        </div>
    `;
    document.getElementById('add-todo-content').innerHTML += renderAddTaskHTML();
    document.getElementById('add-todo-content').innerHTML += `
    <footer onclick="doNotClose(event)">
    <p><span style="color: #ff8190">*</span>This field is required</p>
    <div class="createTaskButtonConatiner">
      <div>
        <button class="buttonLight taskClearButton" onclick="clearTask()">
          Clear<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path
              d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z"
              stroke="#2A3647"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div>
        <button id="createTaskButton" class="buttonDarg" onclick="addTask()">Create Task<img src="/assets/img/check_icon.svg" alt="" /></button>
      </div>
    </div>
    </footer>
    `;

    setPrioButton("medium");
    renderAssingnedToDropdownList();
    renderCategoryDropdownList();
    renderSelectedContactsIcons();
    renderSubtasks();
    loadEventListner();
    mobileAddTask();
}

function closeAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "none";

    renderTodos();
}

function mobileAddTask() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 750) {
        document.getElementById('todo-link').href = 'add_task.html';
        document.getElementById('progress-link').href = 'add_task.html';
        document.getElementById('feedback-link').href = 'add_task.html';
    } 
  }
