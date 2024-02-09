function doNotClose(event) { // General Function for closing Pop-Up Windows
    event.stopPropagation();
}

// Detailview functions

function showDetailView(index) {
   let detailViewContainer = document.getElementById('show-detail-todo');
   detailViewContainer.style.display = 'flex';

   detailViewContainer.innerHTML = templateHTMLDetailView(index);

   document.getElementById('detail-todo-content').style.animationPlayState = 'running';

   renderColorForCategory(index);
   renderPrioImg(index);
   renderSubtask(index);
   renderContactsDetailView(index);
   renderCheckboxAfterClose(index);
}

function renderSubtask(index) {
    let subtasks = document.getElementById(`checkbox-subtask${index}`);
    if(todos[index].subtask.length > 0) {
        subtasks.innerHTML = addHeadlineSubtasks();
        for(let i = 0; i < todos[index].subtask.length; i++) {
            let currentIndexSubtask = todos[index].subtask[i].title;
            subtasks.innerHTML += subtasksContainerHTML(index, i, currentIndexSubtask);
        }
    }
}

function renderContactsDetailView(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts-detailview${index}`);
    if(todos[index].assignedContacts.length > 0) {
        assignedContactsContainer.innerHTML = addHeadlineAssignedToContacts();
        for(let i = 0; i < todos[index].assignedContacts.length; i++) {
            const contactId = todos[index].assignedContacts[i];
            const contact = findContactById(contactId);
            let splitName = contact.name.split(" ");
            let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
            let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
            let resultInitials = firstLetter + secondLetter;
            assignedContactsContainer.innerHTML += assignedContactsContainerHTML(contact, resultInitials, i);
            renderContactColor(contact, i);
        }
    }
}

function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    renderTodos();
}

function renderCheckboxAfterClose(index) {
    for(let i = 0; i < todos[index].subtask.length; i++) {
        let checkboxSubtask = document.getElementById(`subtask${index}-${i}`);

        const isChecked = todos[index].subtask[i].subtaskDone;
        checkboxSubtask.checked = isChecked;
    }
}

async function deleteTask(index) {
    todos.splice(index);

    await setItem('allTasks', JSON.stringify(todos));
    closeDetailView();
    renderTodos;
}

// Editview functions

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
  
    prioBtnLow(low, changeImgLow, prioValue);
    prioBtnMedium(medium, changeImgMedium, prioValue);
    prioBtnHigh(high, changeImgHigh, prioValue);
}

function prioBtnLow(low, changeImgLow, prioValue) {
    if(prioValue == 'low') {
        low.style.background = '#7ae229';
        low.style.color = '#fff';
        changeImgLow.src = 'assets/img/prio-low-white.png';
      } else {
        low.style.background = '#fff';
        low.style.color = 'black';
        changeImgLow.src = 'assets/img/prio-low.svg';
      }
}

function prioBtnMedium(medium, changeImgMedium, prioValue) {
    if(prioValue == 'medium') {
        medium.style.background = '#ffa800';
        medium.style.color = '#fff';
        changeImgMedium.src = 'assets/img/prio-medium-white.png';
      } else {
        medium.style.background = '#fff';
        medium.style.color = 'black';
        changeImgMedium.src = 'assets/img/prio-medium.svg';
      }
}

function prioBtnHigh(high, changeImgHigh, prioValue) {
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

function closeAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "none";
}

function emptyInput() {
    document.getElementById('search-mobile').value = '';
    document.getElementById('search').value = '';
    renderTodos();
    document.getElementById('change-img').src = 'assets/img/search.svg';
    document.getElementById('change-img-mobile').src = './assets/img/search.svg';
}

// Addtask function

function showAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "flex";
    showAddTodoContainer.innerHTML = `<div onclick="doNotClose(event)" id="add-todo-content"></div>`;
    document.getElementById('add-todo-content').innerHTML = templateAddTaskHeadline();
    document.getElementById('add-todo-content').innerHTML += renderAddTaskHTML();
    document.getElementById('add-todo-content').innerHTML += templateAddTaskFooter();

    setPrioButton("medium");
    renderAssingnedToDropdownList();
    renderCategoryDropdownList();
    renderSelectedContactsIcons();
    renderSubtasks();
    loadEventListner();
    mobileAddTask();
}

function renderAssingnedToDropdownListEditview() {
    let content = document.getElementById("dropdownContentAssignedToEditview");
    content.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      let firstAndSecondLetter = getFirstAndSecondLetterEditview(i);
      content.innerHTML += renderAssingnedToDropdownListHTMLEditview(i, firstAndSecondLetter);
      showSelectedDropdownContactEditview(i);
    }
  }
  
  function filterAssingnedToDropdownListEditview(){
    let contactInput = document.getElementById('contactInput').value;
    contactInput = contactInput.toLowerCase();
    let content = document.getElementById("dropdownContentAssignedToEditview");
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
      if(contacts[i]['name'].toLowerCase().includes(contactInput)){
        let firstAndSecondLetter = getFirstAndSecondLetterEditview(i);
        content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter);
        showSelectedDropdownContactEditview(i);
        dropdownContentAssignedToEditview.style.display = "flex";
        toggleDropdownIconEditview("assignedToDropdownIconEditview", "flex");
      }
    }
    if(contactInput.length == 0){
      renderAssingnedToDropdownListEditview();
      dropdownContentAssignedToEditview.style.display = "none";
      toggleDropdownIconEditview("assignedToDropdownIconEditview", "none");
    }
  }
  
  function getFirstAndSecondLetterEditview(i) {
    let name = contacts[i]["name"];
    let splitName = name.split(" ");
    let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
    let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
    let result = firstLetter + secondLetter;
    return result;
  }
  
  function setContactSelectedEditview(i) {
    if (contacts[i]["selected"]) {
      contacts[i]["selected"] = false;
      showSelectedDropdownContactEditview(i);
    } else {
      contacts[i]["selected"] = true;
      showSelectedDropdownContactEditview(i);
    }
    renderSelectedContactsIconsEditview();
  }
  
  function showSelectedDropdownContactEditview(i) {
    let dropdownContact = document.getElementById("dropdownContactEditview" + i);
    let dropdownContactImg = document.getElementById("dropdownContactImgEditview" + i);
    if (contacts[i]["selected"]) {
      dropdownContact.classList.replace("dropdownContacts", "dropdownContactsSelected");
      dropdownContactImg.src = "/assets/img/checkbox_checked_white.svg";
    } else {
      dropdownContact.classList.replace("dropdownContactsSelected", "dropdownContacts");
      dropdownContactImg.src = "/assets/img/checkbox_unchecked.svg";
    }
  }
  
  function renderSelectedContactsIconsEditview() {
    let content = document.getElementById("showSelectedDropdownContactEditview");
    content.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i]["selected"]) {
        content.innerHTML += /* html */ `
          <div class="contactsIcon">${getFirstAndSecondLetter(i)}</div>
        `;
      }
    }
  }
  
  function contactDropdown() {
      // Toggle dropdown visibility
        dropdownContentAssignedToEditview.style.display = dropdownContentAssignedToEditview.style.display === "flex" ? "none" : "flex";
        let dispayStatus = dropdownContentAssignedToEditview.style.display;
        toggleDropdownIconEditview("assignedToDropdownIconEditview", dispayStatus);
      };
  
  function toggleDropdownIconEditview(id, dispayStatus) {
    if (dispayStatus == "flex") {
        document.getElementById(id).src = "/assets/img/arrow_drop_down_up.svg";
    } else {
        document.getElementById(id).src = "/assets/img/arrow_drop_down.svg";
    }
  }
      
  function renderAssingnedToDropdownListHTMLEditview(i, firstAndSecondLetter) {
    return /*html */ `
      <div class="dropdownContacts" id="dropdownContactEditview${i}" onclick="setContactSelectedEditview(${i})">
        <div class="dropdownContactNameConatiner">
          <div class="contactsIcon">${firstAndSecondLetter}</div>
          <p>${contacts[i]['name']}</p>
        </div>
        <img id="dropdownContactImgEditview${i}" src="/assets/img/checkbox_unchecked.svg" alt="checkbox_unchecked">
      </div>
    `;
  }

  function renderSubtasksEditview(index) {
    let subtasksList = document.getElementById("subtasksListEditview");
    subtasksList.innerHTML = "";
    for (let i = 0; i < todos[index].subtask.length; i++) {
      let subtasks = todos[index].subtask[i].title;  
      subtasksList.innerHTML += renderSubtasksHTMLEditview(i, subtasks, index);
    }
  }

  function renderSubtasksHTMLEditview(i, subtasks, index) {
    return /* html */ `
    <div id="subtaskEditview${i}" ondblclick="editSubtaskEditview(${i})">
      <div class="subtask">
        <div class="subtaskText">
          <p>&bull;</p>
          <P>${subtasks}</P>
        </div>
        <div class="subtaskMenu">
          <img src="/assets/img/subtasks_edit_icon.svg" onclick="editSubtaskEditview(${i}, '${subtasks}', ${index})" alt="edit_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtaskEditview(${i}, ${index})" alt="delete_icon">
        </div>
      </div>
    </div>
    `;
  }
  
  function editSubtaskEditview(i, editSubtask, index) {
    let content = document.getElementById("subtaskEditview" + i);
    content.innerHTML = /* html */ `
      <div class="subtaskEdit" id="subtaskEdit">
        <input type="text" id="editSubtask${i}" value="${editSubtask}">
        <div>
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtaskEditview(${i}, ${index})" alt="delete_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_done_icon.svg" onclick="editSubtaskDoneEditview(${i}, ${index})" alt="done_icon">
        </div>
      </div>
    `;
  }
  
  function editSubtaskDoneEditview(i, index) {
    let content = document.getElementById("editSubtask" + i);
    if(content.value !== '') {
        todos[index].subtask[i].title = content.value;
        renderSubtasksEditview(index);
    }
  }
  
  async function deleteSubtaskEditview(i, index) {
    if(todos[index].subtask[i].subtaskDone == true) {
      todos[index].counter--;
    }
    todos[index].subtask.splice(i, 1);
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtasksEditview(index);
  }

  function showSubtasksDoneAndCancelEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let content = document.getElementById("subtasksInputMenuEditview");
    if (subtasksInput.value.length != 0) {
      content.innerHTML = /* html */ `
        <img class="subtasksInputMenuimg" onclick="clearSubtaskInputFieldEditview()" src="/assets/img/subtasks_cancel_icon.svg" alt="cancel_icon">
        <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
        <img class="subtasksInputMenuimg" onclick="addSubtaskEditview(${index})" src="/assets/img/subtasks_done_icon.svg" alt="done_icon">
     `;
    } else {
      content.innerHTML = '<img src="/assets/img/subtasks_add_icon.svg" alt="add_icon">';
    }
  }
  
  function clearSubtaskInputFieldEditview() {
    let content = document.getElementById("subtasksInputEditview");
    content.value = "";
    showSubtasksDoneAndCancelEditview();
    setBlueBorder('subtasksInput', 'subtaskField');
  }

  async function addSubtaskEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let addSubtask = todos[index].subtask;
    addSubtask.push(
        {
            title: subtasksInput.value,
            selected: false
        }
    );
    
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtasksEditview(index);
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