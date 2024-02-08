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
            
            assignedContactsContainer.innerHTML += assignedContactsContainerHTML(contact, resultInitials);
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

function findContactById(contactId) {
    return contacts.find(contact => contact.id === contactId);
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
    showAddTodoContainer.innerHTML = `<div id="add-todo-content"></div>`;
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