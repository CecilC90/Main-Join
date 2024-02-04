function templateHTMLTodoContainer(element, index) {
    return /*HTML*/ `
    <div class="todo-content" onclick="showDetailView(${index})" draggable="true" ondragstart="startDragging(${element.id})" id="todo-container${index}">
        <span id="category-span">${element.todoCategory}</span>
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

function renderSubtaskProgressbar(index) {
  let progressbarContent = document.getElementById(`progress-content${index}`);
  if(todos[index].subtask.length > 0) {
    progressbarContent.innerHTML = `
    <div class="space-between align-items">
      <div id="progress${index}" class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <div id="progress-bar${index}" class="progress-bar"></div>
      </div>
      <div id="subtask-content">
        <span id="subtask-counter${index}">X</span> / <span id="subtask-maxlength${index}">X</span> Subtasks
      </div>
    </div>
  `; 
  }

  subtaskMaxLength(index);
}

function templateHTMLDetailView(index) { 
  return /* HTML */ `
      <div id="detail-todo-content">
          <div class="space-between">
              <span id="category-span">${todos[index].todoCategory}</span>
              <img class="close-img" onclick="closeDetailView()" src="/assets/img/close.svg" alt="">
          </div>
          <h1 class="headline">${todos[index].title}</h1>
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
            <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
            <div class="edit-btn" onclick="editTask(${index})"></div>
          </div>
      </div>
  `;
}

async function templateHTMLEditTask(index) {
  return /* HTML */ `
  <div id="detail-todo-content">
      <div class="space-end">
        <img class="close-img" onclick="closeDetailView()" src="/assets/img/close.svg" alt="">
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
                  <img onclick="contactDropdown()" class="dropDownIcon" id="assignedToDropdownIconEditview" src="/assets/img/arrow_drop_down.svg" alt="" />
                </div>
                <div class="dropdownContentAssignedTo" id="dropdownContentAssignedToEditview"></div> <!-- hier wird über die function renderAssingnedToDropdownList() eingefügt-->
              </div>
         <div class="contactesIconsContainer mb-16" id="showSelectedDropdownContactEditview"></div> <!-- hier wird über die function renderSelectedContactsIcons() eingefügt-->
         <div class="inputContainer">
              <p class="edit-p-m0">Subtasks</p>
              <div class="inputField" id="subtaskField">
                <input type="text" id="subtasksInputEditview" onkeyup="showSubtasksDoneAndCancelEditview(${index})" placeholder="Add new subtask" />
                <div class="subtasksInputMenu" id="subtasksInputMenuEditview">
                  <img src="/assets/img/subtasks_add_icon.svg" alt="add_icon" />
                </div>
              </div>
              <div>
                <div class="subtasksList" id="subtasksListEditview"></div>
              </div>
            </div>
      <div class="btn-container">
          <button id="ok-button" class="buttonDarg" onclick="changeTask(${index})" href="#">OK <img src="/assets/img/check-icon-white.svg" alt=""></button>
      </div>
  </div>
  `;
}

function renderPrioButton(index) {
    let prioButtonConatainer = document.getElementById(`priobutton-container${index}`);
    prioButtonConatainer.innerHTML = `
      <div class="prioButton" id="prioButtonHighEditview" onclick="setPrioBtn('high', ${index})">
          <p>Urgent</p>
          <img id="change-img-high" src="assets/img/prio-urgent.svg">
      </div>
      <div class="prioButton" id="prioButtonMediumEditview" onclick="setPrioBtn('medium', ${index})">
          <p>Medium</p>
          <img id="change-img-medium" src="assets/img/prio-medium.svg">
      </div>
      <div class="prioButton" id="prioButtonLowEditview" onclick="setPrioBtn('low', ${index})">
          <p>Low</p>
          <img id="change-img-low" src="assets/img/prio-low.svg">
      </div>
    `;
}