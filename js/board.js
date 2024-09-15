let todos = [];
let randomColorsForCategory = ['#003366', '#004D40', '#1B5E20', '#B71C1C', '#4A148C'];

let startDragginId;

/**
 * This function is called to get all the data when the page loads
 * 
 */
async function initBoard() {
    await includesHTML();
    loadLoggedInUser();
    renderHTML();
}

/**
 * This function is called to render all the data
 * 
 */
async function renderHTML() {
    await loadTasks();
    await loadContacts();
    pushColorForCategory();
    renderTodos();
    addIdToTasks();
    showSelectedButton("boardButton");
}



/**
 * This function generate a color (random color if the category don't declared) for all categorys in a Task.
 * 
 */
function pushColorForCategory() {
    let randomColorIndex = Math.floor(Math.random() * randomColorsForCategory.length);
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const todoCategory = todo.todoCategory; 
        if (todoCategory == 'User Story') {
            todo.categoryColor = '#0038FF';
        } else if (todoCategory == 'Technical Task') {
            todo.categoryColor = '#1FD7C1';
        } else {
            todo.categoryColor = randomColorsForCategory[randomColorIndex];
        }
    }
}

/**
 * This function calls 4 possible states to render existing tasks appropriately
 * 
 */
function renderTodos() {
    let contentTodo = document.getElementById('board-content-open');
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

/**
 * This function render all important data for the task in the category 'open'
 * 
 * @param {todo[]} todo - An array of Task objects.
 * @param {number} i - The current Index of Task
 * @param {HTMLElement} contentTodo - The HTML element in which the tasks are rendered (category: open)
 */
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

/**
 * This function render all important data for the task in the category 'progress'
 * 
 * @param {todo[]} todo - An array of Task objects
 * @param {number} i - The current Index of Task
 * @param {HTMLElement} contentProgress - The HTML element in which the tasks are rendered (category: progress)
 */
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

/**
 * This function render all important data for the task in the category 'feedback'
 * 
 * @param {todo[]} todo - An array of Task objects
 * @param {number} i - The current Index of Task
 * @param {HTMLElement} contentFeedback - The HTML element in which the tasks are rendered (category: feedback)
 */
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

/**
 * Checks whether a task is available in the status 'open', if not then the message is displayed: 'No tasks To Do'
 * 
 */
function checkOpenTodo() {
    let filteredOpenCategory = todos.filter(t => t['category'] === 'open') ;
    let contentTodo = document.getElementById('board-content-open');
    if(filteredOpenCategory.length === 0) {
        contentTodo.classList.add('board-content');
        contentTodo.innerHTML = 'No tasks To do';
    } else {
        contentTodo.classList.remove('board-content');
        contentTodo.innerHTML = '';
    }
} 

/**
 * Checks whether a task is available in the status 'progress', if not then the message is displayed: 'No tasks in progress'
 * 
 */
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

/**
 * Checks whether a task is available in the status 'feedback', if not then the message is displayed: 'No task sin feedback'
 * 
 */
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

/**
 * Checks whether a task is available in the status 'done', if not then the message is displayed: 'No tasks ars done'
 * 
 */
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

/**
 * This function render all important data for the task in the category 'feedback'
 * 
 * @param {todo[]} todo - An array of Task objects
 * @param {number} i - The current Index of Task
 * @param {HTMLElement} contentDone - The HTML element in which the tasks are rendered (category: feedback) 
 */
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

/**
 * Render for every Category an background Color
 * 
 * @param {number} index - The current index of the task
 */
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

/**
 * A function that displays a drop-down menu in the mobile view to switch between states
 * 
 * @param {event} event - Event to stop propagation
 * @param {number} index - The current index of the task
 */
function openDropDownStatus(event, index) {
    event.stopPropagation(); 
    let parentDiv = event.target.closest('.position-relative');
    let dropDown = parentDiv.querySelector('.dropdown-change-status');
    let categorys = {
        open: 'open',
        progress: 'progress',
        feedback: 'feedback',
        done: 'done'
    }

    if (!dropDown) {
        dropDown = document.createElement('div');
        dropDown.className = 'dropdown-change-status';
        dropDown.innerHTML = `
            <span id="category-open" onclick="changeTo('open', ${index}, event)">To Do</span>
            <span id="category-progress" onclick="changeTo('progress', ${index}, event)">In progress</span>
            <span id="category-feedback" onclick="changeTo('feedback', ${index}, event)">Await feedback</span>
            <span id="category-done" onclick="changeTo('done', ${index}, event)">Done</span>
        `;
        parentDiv.appendChild(dropDown);
        hideCurrentCategory(index, categorys);
    } else {
        parentDiv.removeChild(dropDown);
    }
}

/**
 * Function that hides and grays out the current status
 * 
 * @param {number} index - The current index of the task
 * @param {JSON} categorys - A JSON that has all the states in it
 */
function hideCurrentCategory(index, categorys) {
    let todoCategory = todos[index].category;
    for(let category in categorys) {
        let linkToCategory = document.getElementById(`category-${category}`);
        if(category === todoCategory) {
            linkToCategory.style.pointerEvents = 'none';
            linkToCategory.style.color = 'grey';
        }
    }
}

/**
 * Function that changes the current state and loads it into the backend
 * 
 * @param {string} newStatus - The current State
 * @param {number} index - The current index of the task
 * @param {event} event - Event to stop propagation
 */
async function changeTo(newStatus, index, event) {
    event.stopPropagation();
    todos[index].category = newStatus;

    await setItem('allTasks', JSON.stringify(todos));
    renderTodos();
}

/**
 * Function that show the progressbar the task
 * 
 * @param {number} index 
 */
function renderSubtaskProgressbar(index) {
    let progressbarContent = document.getElementById(`progress-content${index}`);
    if(todos[index].subtask.length > 0) {
        console.log(todos[index].subtask.length);
      progressbarContent.innerHTML = templateProgressbar(index); 
    }
  
    subtaskMaxLength(index);
}

/**
 * Function to check how many subtaks are in the current task and show the Number
 * 
 * @param {number} index 
 */
function subtaskMaxLength(index) {
    let showMaxLength = document.getElementById(`subtask-maxlength${index}`);
    let maxLength = todos[index].subtask.length;

    if(todos[index].subtask.length > 0) {
      showMaxLength.innerHTML = maxLength;
    }
}

/**
 * Displays the current priority of the task
 * 
 * @param {number} index - The current index of the task
 */
function renderPrioImg(index) {
    let prioImg = document.getElementById(`prio-img${index}`);
    let prioImgDetail = document.getElementById(`prio-img-detail${index}`);
    prioLow(prioImg, prioImgDetail, index);
    prioMedium(prioImg, prioImgDetail, index);
    prioHigh(prioImg, prioImgDetail, index);
}

/**
 * Indicates priority 'low'
 * 
 * @param {HTMLElement} prioImg - To show the Icon ('low') on the Board
 * @param {HTMLElement} prioImgDetail - To show the Icon ('low') on the Detailview
 * @param {number} index - The current index of the task
 */
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

/**
 * Indicates priority 'medium'
 * 
 * @param {HTMLElement} prioImg - To show the Icon ('low') on the Board
 * @param {HTMLElement} prioImgDetail - To show the Icon ('low') on the Detailview
 * @param {number} index - The current index of the task
 */
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

/**
 * Indicates priority 'high'
 * 
 * @param {HTMLElement} prioImg - To show the Icon ('low') on the Board
 * @param {HTMLElement} prioImgDetail - To show the Icon ('low') on the Detailview
 * @param {number} index - The current index of the task
 */
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

/**
 * Displays the selected contacts for a task
 * 
 * @param {number} index - The current index of the task
 */
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
            assignedContactsContainer.innerHTML += templateContactIcons(resultInitials, i, index);
            renderContactColor(contact, i, index);
        }
    }

    renderMoreContactsIcon(index);
}

/**
 * This function searches for all IDs in the contacts and compares them with the passed ID
 * 
 * @param {number} contactId - returns an ID assigned to each contact
 */
function findContactById(contactId) {
    return contacts.find(contact => contact.id === contactId);
}

function renderContactColor(contact, i, index) {
    let contactIcon = document.getElementById(`contactsIcon-${index}-${i}`);
    let contactIconDetailview = document.getElementById(`contactIconDetailview${i}`);

    if(contactIcon) {
        contactIcon.style.backgroundColor += contact.color;
    }
    if(contactIconDetailview) {
        contactIconDetailview.style.backgroundColor += contact.color;
    }
}

/**
 * If more than 4 contacts are selected, a 'More' Icon
 * 
 * @param {number} index - The current index of the task
 */
function renderMoreContactsIcon(index) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts${index}`);
    if(todos[index].assignedContacts.length > 4) {
        let differenceLength = todos[index].assignedContacts.length - 4;
        assignedContactsContainer.innerHTML += templateMoreContactIcon(differenceLength);
    }
}

/**
 * 
 * @param {number} index - The current index of the task
 * @param {number} i - The current index of the subtask
 */
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

/**
 * Adjusts the progress bar according to the number of selected subtasks
 * 
 * @param {number} index - The current index of the task
 */
function changeProgressbar(index) {
    let progressBar = document.getElementById(`progress-bar${index}`);
    let maxLength = todos[index].subtask.length; 
    let counter = todos[index].counter;
    
    if(progressBar) {
        let result = (counter / maxLength) * 100;
        progressBar.style.width = result + '%';
    }
}

/**
 * Shows the number of selected subtasks even after closing various views
 * 
 * @param {number} index 
 */
function renderCounterAfterClose(index) {
    let showCounter = document.getElementById(`subtask-counter${index}`);

    if(showCounter) {
        const counter = todos[index].counter;
        showCounter.innerHTML = counter;
    }
}

