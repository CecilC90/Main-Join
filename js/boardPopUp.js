/**
 * Event to stop the Propagation (Edit and Detailview).
 * 
 * @param {event} event 
 */
function doNotClose(event) { 
    event.stopPropagation();
}

/**
 * Regulates the z-index of the header and the menu (If Popup open).
 * 
 */
function regulateZIndexMenuAndHeader() {
  let header = document.getElementById('header');
  let menu = document.getElementById('menu');
  let mobileMenu = document.getElementById('mobile-navbar');

  header.style.zIndex = 0;
  menu.style.zIndex = 0;
  mobileMenu.style.zIndex = 0;
}

/**
 * Regulates the z-index of the header and the menu (If Popup close).
 * 
 */
function regulateZIndexMenuAndHeaderAfterClose() {
  let header = document.getElementById('header');
  let menu = document.getElementById('menu');
  let mobileMenu = document.getElementById('mobile-navbar');

  header.style.zIndex = 99;
  menu.style.zIndex = 99;
  mobileMenu.style.zIndex = 99;
}

/**
 * Regulate Position to static.
 * 
 */
function regulatePositionStatic() {
  let positionRelative = document.querySelectorAll('.position-relative');

  positionRelative.forEach(element => {
    element.style.position = 'static';
  });
}

/**
 * Regulate Position to relative.
 * 
 */
function regulatePositionRelative() {
  let positionRelative = document.querySelectorAll('.position-relative');

  positionRelative.forEach(element => {
    element.style.position = 'relative';
  });
}

// Detailview functions

/**
 * Displays the detail view of a task based on its index.
 * 
 * @param {number} index - The index of the todo to display in detail view.
 */
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
   regulateZIndexMenuAndHeader();
   regulatePositionStatic();
}

/**
 * Displays the subtasks of a task based on its index.
 * 
 * @param {number} index - The index of the todo to display in detail view.
 */
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

/**
 * Displays the contacts of a task based on its index.
 * 
 * @param {number} index - The index of the todo to display in detail view.
 */
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

/**
 * To close the detail View width a onclick-event.
 * 
 */
function closeDetailView() {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.style.display = 'none';

    regulateZIndexMenuAndHeaderAfterClose();
    regulatePositionRelative();
    renderTodos();
}

/**
 * Displays a Checkbox if the subtask is done.
 * 
 * @param {number} index - The index of the todo to display in detail view.
 */
function renderCheckboxAfterClose(index) {
    for(let i = 0; i < todos[index].subtask.length; i++) {
        let checkboxSubtask = document.getElementById(`subtask${index}-${i}`);

        const isChecked = todos[index].subtask[i].subtaskDone;
        checkboxSubtask.checked = isChecked;
    }
}

/**
 * Delete a task with a onclick-event
 * 
 * @param {number} index - The index of the todo to display in detail view.
 */
async function deleteTask(index) {
    //todos.splice(index);
    console.log(todos[index].id);
    //await setItem('allTasks', JSON.stringify(todos));
    await deleteData("/tasks/" + todos[index].id);
    await loadTasks();
    closeDetailView();
    renderTodos;
    
}

// Editview functions

/**
 * Displays the edit view of a task based on its index.
 * 
 * @param {number} index - The index of the todo to display in edit view.
 */
async function editTask(index) {
    let detailViewContainer = document.getElementById('show-detail-todo');
    detailViewContainer.innerHTML = await templateHTMLEditTask(index);

    checkDueDateNotInPastEditview();
    renderPrioButton(index);
    changeSelectedContacts(index);
    renderAssingnedToDropdownListEditview(index);
    renderSelectedContactsIconsEditview(index);
    renderSubtasksEditview(index);
    loadPrioButton(index);
    regulateZIndexMenuAndHeader();
    regulatePositionStatic();
}

/**
 * Displays the prio button based on its index.
 * 
 * @param {number} index - The index of the todo to display in edit view.
 */
function loadPrioButton(index) {
    let prioValue = todos[index].priority;

    setPrioBtn(prioValue, index);
}

/**
 * 
 * @param {string} prioValue - The value of the priority 
 * @param {number} index - The index of the todo to display in edit view.
 */
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

/**
 * Change the background color, font color, and the image width with an `onclick` event. (Prio: Low)
 * 
 * @param {HTMLElement} low - HTML Element to change the characteristics for the Priority 'Low' Btn.
 * @param {HTMLElement} changeImgLow - HTML Element to change the IMG for the Priority 'Low'.
 * @param {string} prioValue - Passes the value 'Low'.
 */
function prioBtnLow(low, changeImgLow, prioValue) {
    if(prioValue == 'low') {
        low.style.background = '#7ae229';
        low.style.color = '#fff';
        changeImgLow.src = './assets/img/prio-low-white.png';
      } else {
        low.style.background = '#fff';
        low.style.color = 'black';
        changeImgLow.src = './assets/img/prio-low.svg';
      }
}

/**
 * Change the background color, font color, and the image width with an `onclick` event. (Prio: Medium)
 * 
 * @param {HTMLElement} medium - HTML Element to change the characteristics for the Priority 'Medium' Btn.
 * @param {HTMLElement} changeImgMedium - HTML Element to change the IMG for the Priority 'Medium'.
 * @param {string} prioValue - Passes the value 'Medium'.
 */
function prioBtnMedium(medium, changeImgMedium, prioValue) {
    if(prioValue == 'medium') {
        medium.style.background = '#ffa800';
        medium.style.color = '#fff';
        changeImgMedium.src = './assets/img/prio-medium-white.png';
      } else {
        medium.style.background = '#fff';
        medium.style.color = 'black';
        changeImgMedium.src = './assets/img/prio-medium.svg';
      }
}

/**
 * Change the background color, font color, and the image width with an `onclick` event. (Prio: High)
 * 
 * @param {HTMLElement} high - HTML Element to change the characteristics for the Priority 'High' Btn.
 * @param {HTMLElement} changeImgHigh - HTML Element to change the IMG for the Priority 'High'.
 * @param {string} prioValue - Passes the value 'High'.
 */
function prioBtnHigh(high, changeImgHigh, prioValue) {
    if(prioValue == 'high') {
        high.style.background = '#ff3d00';
        high.style.color = '#fff';
        changeImgHigh.src = './assets/img/prio-urgent-white.png';
      } else {
        high.style.background = '#fff';
        high.style.color = 'black';
        changeImgHigh.src = './assets/img/prio-urgent.svg';
      }
}

/**
 * Ensures that no date in the past can be displayed.
 * 
 */
function checkDueDateNotInPastEditview() {
  let currentDate = new Date();
  let inputDate = document.getElementById("new-date");
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let currentDateString = year + "-" + month + "-" + day;
  inputDate.setAttribute("min", currentDateString);
}

/**
 * Function to change the assigned contacts
 * 
 * @param {number} index - The index of the todo to display in edit view.
 */
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

/**
 * Push the selected contacts to the backend.
 * 
 * @param {number} index - The index of the todo to display in edit view.
 */
function pushSelecetedContactsToTodos(index) {
    for(let i = 0; i < contacts.length; i++) {
        const contact = contacts[i].id;
        if(contact.selected == true){
            todos[index].assignedContacts.push(contact);
        }
    }
}

// Assigned Contacts editview

/**
 * Creates the list of contacts that can be selected.
 * 
 */
function renderAssingnedToDropdownListEditview() {
    let content = document.getElementById("dropdownContentAssignedToEditview");
    content.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
      let firstAndSecondLetter = getFirstAndSecondLetter(i);
      content.innerHTML += renderAssingnedToDropdownListHTMLEditview(i, firstAndSecondLetter, contacts[i]["color"]);
      showSelectedDropdownContactEditview(i);
    }
  }
  
  /**
   * Filters the list of contacts that can be selected.
   * 
   */
  function filterAssingnedToDropdownListEditview(){
    let contactInput = document.getElementById('contactInput').value;
    contactInput = contactInput.toLowerCase();
    let content = document.getElementById("dropdownContentAssignedToEditview");
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
      if(contacts[i]['name'].toLowerCase().includes(contactInput)){
        let firstAndSecondLetter = getFirstAndSecondLetter(i);
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
  
  /**
   * Creates a string with the first letter of each contact.
   * 
   * @param {number} i - Number from the array contacts.
   * @returns {string} - First and second letter.
   */
  function getFirstAndSecondLetterEditview(i, index) {
    let assignedContact = todos[index].assignedContacts[i];
    const contact = findContactById(assignedContact);
    let name = contact.name;
    let splitName = name.split(" ");
    let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
    let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
    let result = firstLetter + secondLetter;
    return result;
  }
  
  /**
   * Sets the contact to selected
   * 
   * @param {number} i - Number from the array contacts.
   */
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
  
  /**
   * Changes the classe of the selected contacte
   * 
   * @param {number} i - Number from the array contacts.
   */
  function showSelectedDropdownContactEditview(i) {
    let dropdownContact = document.getElementById("dropdownContactEditview" + i);
    let dropdownContactImg = document.getElementById("dropdownContactImgEditview" + i);
    if (contacts[i]["selected"]) {
      dropdownContact.classList.replace("dropdownContacts", "dropdownContactsSelected");
      dropdownContactImg.src = "./assets/img/checkbox_checked_white.svg";
    } else {
      dropdownContact.classList.replace("dropdownContactsSelected", "dropdownContacts");
      dropdownContactImg.src = "./assets/img/checkbox_unchecked.svg";
    }
  }
  
  /**
   * Creates the icons below the input field assigned To
   * 
   */
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
  
  /**
   * Toggle dropdown visibility
   * 
   */
  function contactDropdown() {
        dropdownContentAssignedToEditview.style.display = dropdownContentAssignedToEditview.style.display === "flex" ? "none" : "flex";
        let dispayStatus = dropdownContentAssignedToEditview.style.display;
        toggleDropdownIconEditview("assignedToDropdownIconEditview", dispayStatus);
      };
  
  /**
   * Change the arrow in the dropdown menu.
   * 
   * @param {string} id - Id of the icon to be changed.
   * @param {string} dispayStatus - Flex or none what the dropdown currently has.
   */
  function toggleDropdownIconEditview(id, dispayStatus) {
    if (dispayStatus == "flex") {
        document.getElementById(id).src = "./assets/img/arrow_drop_down_up.svg";
    } else {
        document.getElementById(id).src = "./assets/img/arrow_drop_down.svg";
    }
  }


  // Subtask Editview

  /**
   * Creates the list of subtasks
   * 
   * @param {number} index - The index of the todo to display in edit view.
   */
  function renderSubtasksEditview(index) {
    let subtasksList = document.getElementById("subtasksListEditview");
    subtasksList.innerHTML = "";
    for (let i = 0; i < todos[index].subtask.length; i++) {
      let subtasks = todos[index].subtask[i].title;  
      subtasksList.innerHTML += renderSubtasksHTMLEditview(i, subtasks, index);
    }
  }
  
  /**
   * creates the field to change the subtask.
   * 
   * @param {number} i - The index of the subtask.
   * @param {string} editSubtask - The current Value of the Subtask.
   * @param {number} index - The index of the todo to display in edit view.
   */
  function editSubtaskEditview(i, editSubtask, index) {
    let content = document.getElementById("subtaskEditview" + i);
    content.innerHTML = /* html */ `
      <div class="subtaskEdit" id="subtaskEdit">
        <input type="text" id="editSubtask${i}" value="${editSubtask}">
        <div>
          <img src="./assets/img/subtasks_delete_icon.svg" onclick="deleteSubtaskEditview(${i}, ${index})" alt="delete_icon">
          <img src="./assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="./assets/img/subtasks_done_icon.svg" onclick="editSubtaskDoneEditview(${i}, ${index})" alt="done_icon">
        </div>
      </div>
    `;
  }
  
  /**
   * changes the substak in the arry and displays it.
   * 
   * @param {number} i - The index of the subtask.
   * @param {number} index - The index of the todo to display in edit view.
   */
  async function editSubtaskDoneEditview(i, index) {
    let content = document.getElementById("editSubtask" + i);
    if(content.value !== '') {
      todos[index].subtask[i].title = content.value;
      renderSubtasksEditview(index);
    } else {
      deleteSubtaskEditview(i, index);
    }
  }
  
  /**
   * delete the subtask 
   * 
   * @param {number} i - The index of the subtask.
   * @param {number} index - The index of the todo to display in edit view.
   */
  async function deleteSubtaskEditview(i, index) {
    if(todos[index].subtask[i].subtaskDone == true) {
      todos[index].counter--;
    }
    todos[index].subtask.splice(i, 1);
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtasksEditview(index);
  }

  /**
   * displays the add or cancel icons for the subtask
   * 
   * @param {number} index - The index of the todo to display in edit view.
   */
  function showSubtasksDoneAndCancelEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let content = document.getElementById("subtasksInputMenuEditview");
    if (subtasksInput.value.length != 0) {
      content.innerHTML = /* html */ `
        <img class="subtasksInputMenuimg" onclick="clearSubtaskInputFieldEditview()" src="./assets/img/subtasks_cancel_icon.svg" alt="cancel_icon">
        <img src="./assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
        <img class="subtasksInputMenuimg" onclick="addSubtaskEditview(${index})" src="./assets/img/subtasks_done_icon.svg" alt="done_icon">
     `;
    } else {
      content.innerHTML = '<img src="./assets/img/subtasks_add_icon.svg" alt="add_icon">';
    }
  }
  
  /**
   * Clear the input field for Subtask
   * 
   */
  function clearSubtaskInputFieldEditview() {
    let content = document.getElementById("subtasksInputEditview");
    content.value = "";
    showSubtasksDoneAndCancelEditview();
  }

  /**
   * Add the edit Subtask to the Backend
   * 
   * @param {number} index - The index of the todo to display in edit view.
   */
  async function addSubtaskEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let addSubtask = todos[index].subtask;
    addSubtask.push(
        {
            title: subtasksInput.value,
            selected: false
        }
    );
    
    clearSubtaskInputFieldEditview();
    renderSubtasksEditview(index);
}

/**
 * Function to change the task and load it into the backend
 * 
 * @param {number} index - The index of the todo to display in edit view. 
 */
async function changeTask(index) {
  let taskId = todos[index].id;
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
    console.log(todos[index]);

    await updateData("/tasks", taskId, todos[index]);

    showDetailView(index);
    renderTodos();
}



// Addtask function

/**
 * Function to load all Functions from the add_task.js
 * 
 * @param {string} category - Task becomes the passed status
 */
function showAddTask(category) {
    selectedCategory = category;
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
    regulatePositionStatic();
    regulateZIndexMenuAndHeader();
}

/**
 * Function to close add Task
 * 
 */
function closeAddTask() {
    let showAddTodoContainer = document.getElementById('show-add-todo');
    showAddTodoContainer.style.display = "none";

    renderTodos();
    regulateZIndexMenuAndHeaderAfterClose();
    regulatePositionRelative();
}

/**
 * Linking from a width of 750px to addTask.html
 * 
 */
function mobileAddTask() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (screenWidth < 750) {
        document.getElementById('todo-link').href = 'add_task.html';
        document.getElementById('progress-link').href = 'add_task.html';
        document.getElementById('feedback-link').href = 'add_task.html';
    } 
}