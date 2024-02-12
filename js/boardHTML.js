function templateHTMLTodoContainer(element, index) {
    return /*HTML*/ `
    <div class="todo-content" onclick="showDetailView(${index})" draggable="true" ondragstart="startDragging(${element.id})" id="todo-container${index}">
        <div class="space-between position-relative" id="position-relative${index}">
          <span class="category-span" id="category-span${index}">${element.todoCategory}</span>
          <img id="dropdown-status" onclick="openDropDownStatus(event, ${index})" src="./assets/img/more.svg">
        </div>
        <div id="show-dropdown-menu"></div>
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <div id="progress-content${index}"></div>
        <div class="space-between">
          <div class="style-contacticon" id="assigned-contacts${index}"></div>
          <img id="prio-img${index}" src="">
        </div>
    </div>
`;
}

function templateProgressbar(index) {
   return `
      <div class="space-between align-items">
        <div id="progress${index}" id="progress-container" class="progress-container">
          <div id="progress-bar${index}" class="progress-bar"></div>
        </div>
        <div id="subtask-content">
          <span id="subtask-counter${index}">X</span> / <span id="subtask-maxlength${index}">X</span> Subtasks
        </div>
      </div>
    `;
}

function templateContactIcons(resultInitials ,indexIcons, index) {
  return `<div id="contactsIcon-${index}-${indexIcons}" class="contactsIcon margin-left">${resultInitials}</div>`
}

function templateMoreContactIcon(differenceLength) {
  return `<div class="moreContactsIcon margin-left">+${differenceLength}</div>`
}


// HTML Code for Pop-Up Windows

function templateHTMLDetailView(index) { 
  return /* HTML */ `
      <div class="detail-todo-container">
      <div onclick="doNotClose(event)" id="detail-todo-content">
          <div class="space-between">
              <span class="category-span" id="category-span-detail${index}">${todos[index].todoCategory}</span>
              <img class="close-img" onclick="closeDetailView()" src="./assets/img/close.svg" alt="">
          </div>
          <h1 class="headline-detailview">${todos[index].title}</h1>
          <p>${todos[index].description}</p>
          <div class="task-info">
            <div>
              <span class="label">Due Date:</span>
              <span class="value">${todos[index].dueDate}</span>
            </div>
            <div>
              <span class="label">Priority:</span>
              <span class="value">${todos[index].priority}</span>
              <img id="prio-img-detail${index}" src="">
            </div>
          </div>
          <div class="assigned-contacts-container" id="assigned-contacts-detailview${index}"></div>
          <div class="checkbox-subtask-container" id="checkbox-subtask${index}"></div> 
          <div class="btn-container">
            <div class="delete-btn" onclick="deleteTask(${index})"></div>
            <img src="./assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
            <div class="edit-btn" onclick="editTask(${index})"></div>
          </div>
        </div>
      </div>
  `;
}

async function templateHTMLEditTask(index) {
  return /* HTML */ `
  <div onclick="doNotClose(event)" id="detail-todo-content">
      <div class="space-end">
        <img class="close-img" onclick="closeDetailView(${index})" src="./assets/img/close.svg" alt="">
      </div>
      <p class="edit-p">Title:</p>
      <input class="inputField editViewInput" id="new-title" type="text" value="${todos[index].title}">
      <p class="edit-p">Description:</p>
      <textarea class="descriptionTextArea editViewTextarea" id="new-description" type="text" value="">${todos[index].description}</textarea>
      <p class="edit-p">Due Date:</p>
      <input class="inputField editViewInput" id="new-date" type="date" value="${todos[index].dueDate}">
      <p class="edit-p">Priority:</p>
      <div class="prioButtonConatainer priobutton-editview" id="priobutton-container${index}"></div>
      <div class="inputContainer assingnedToConatiner">
          <p class="edit-p-m0">Assingned to</p>
            <div>
                <div class="inputField dropdown">
                  <input type="text" id="contactInput" onkeyup="filterAssingnedToDropdownListEditview()" />
                  <img onclick="contactDropdown()" class="dropDownIcon" id="assignedToDropdownIconEditview" src="./assets/img/arrow_drop_down.svg" alt="" />
                </div>
                <div class="dropdownContentAssignedTo" id="dropdownContentAssignedToEditview"></div> <!-- hier wird über die function renderAssingnedToDropdownList() eingefügt-->
              </div>
         <div class="contactesIconsContainer mb-16" id="showSelectedDropdownContactEditview"></div> <!-- hier wird über die function renderSelectedContactsIcons() eingefügt-->
         <div class="inputContainer">
              <p class="edit-p-m0">Subtasks</p>
              <div class="inputField" id="subtaskField">
                <input type="text" id="subtasksInputEditview" onkeyup="showSubtasksDoneAndCancelEditview(${index})" placeholder="Add new subtask" />
                <div class="subtasksInputMenu" id="subtasksInputMenuEditview">
                  <img src="./assets/img/subtasks_add_icon.svg" alt="add_icon" />
                </div>
              </div>
              <div>
                <div class="subtasksList" id="subtasksListEditview"></div>
              </div>
            </div>
      <div class="btn-container">
          <button id="ok-button" class="buttonDarg" onclick="changeTask(${index})" href="#">OK <img src="./assets/img/check-icon-white.svg" alt=""></button>
      </div>
  </div>
  `;
}

function renderPrioButton(index) {
    let prioButtonConatainer = document.getElementById(`priobutton-container${index}`);
    prioButtonConatainer.innerHTML = `
      <div class="prioButton" id="prioButtonHighEditview" onclick="setPrioBtn('high', ${index})">
          <p>Urgent</p>
          <img id="change-img-high" src="./assets/img/prio-urgent.svg">
      </div>
      <div class="prioButton" id="prioButtonMediumEditview" onclick="setPrioBtn('medium', ${index})">
          <p>Medium</p>
          <img id="change-img-medium" src="./assets/img/prio-medium.svg">
      </div>
      <div class="prioButton" id="prioButtonLowEditview" onclick="setPrioBtn('low', ${index})">
          <p>Low</p>
          <img id="change-img-low" src="./assets/img/prio-low.svg">
      </div>
    `;
}

function addHeadlineAssignedToContacts() {
  return `<span class="label">Assigned To:</span>`;
}

function assignedContactsContainerHTML(contact, resultInitials, i) {
  return `
    <div class="contact-detailview">
      <div id="contactIconDetailview${i}" class="contactsIcon">${resultInitials}</div>
      <span>${contact.name}</span>    
    </div>
  `;
}

function addHeadlineSubtasks() {
  return `<span class="label">Subtasks</span>`;
}

function subtasksContainerHTML(index, i, currentIndexSubtask) {
  return `
    <div class="subtask-detailview">
       <input onclick="subtaskCounter(${index}, ${i})" id="subtask${index}-${i}" type="checkbox">
       <label for="subtask${index}-${i}">${currentIndexSubtask}</label>
    </div>
  `
}

function templateAddTaskHeadline() {
  return `
    <div onclick="doNotClose(event)" class="space-between">
      <h1 class="headline">Add Task</h1>
      <img class="close-img" onclick="closeAddTask()" src="./assets/img/close.svg" alt="">
    </div>
  `
}

function templateAddTaskFooter() {
  return `
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
        <button id="createTaskButton" class="buttonDarg" onclick="addTask()">Create Task<img src="./assets/img/check_icon.svg" alt="" /></button>
        </div>
      </div>
    </footer>
  `
}