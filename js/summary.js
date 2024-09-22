/**
 * An array to store todo items.
 * @type {Array<Object>}
 */
let todos = [];

/**
 * Renders the summary page by including HTML, loading the logged-in user, and rendering various summary components.
 * 
 * @returns {Promise<void>}
 */
async function renderSummary() {
    await includesHTML();
    showSelectedButton("summaryButton");
    await loadLoggedInUser();
    await loadTasks();
    await checkIsMsgAvailable();
    renderSummaryHTML();
    greeting();
    renderTasks();
}

/**
 * Renders the summary page by including HTML and loading the logged-in user.
 * 
 * @returns {Promise<void>}
 */
async function render() {
    await includesHTML();
    showSelectedButton("summaryButton");
    await loadLoggedInUser();
}

/**
 * Checks if a message is available in the URL parameters and shows a greeting if it exists.
 */
function checkIsMsgAvailable() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get("msg");

    if (msg) {
        showGreetingMobile();
    }
}

/**
 * Shows the greeting message on mobile devices.
 */
function showGreetingMobile() {
    if (window.innerWidth < 608) {
        document.getElementById('greetingMobile').classList.add('d-flex');
        document.getElementById('greetingMobile').classList.add('hidden');
        document.getElementById('greetingMobile').classList.add('hidden-overlay');
        document.getElementById('greetingMobile').classList.remove('d-none');
    }
}

/**
 * Generates a greeting message based on the current time and displays it.
 */
async function greeting() {
    let time = new Date().getHours();
    let greetingContent;

    if (time >= 5 && time < 12) {
        greetingContent = 'Good morning';
    } else if (time >= 12 && time < 18) {
        greetingContent = 'Good afternoon';
    } else {
        greetingContent = 'Good evening';
    }

    document.querySelectorAll('.greeting-content').forEach(element => {
        element.innerHTML = greetingContent;
    });

    if (!loggedInUser.name.includes("Guest")) {
        showName();
    }
}

/**
 * Checks the current time and sets the greeting message accordingly.
 * @param {number} time - The current hour.
 * @param {string} greetingContent - The content of the greeting message.
 */
function checkTime(time, greetingContent) {
    if (time >= 5 && time < 12) {
        greetingContent = 'Good morning';
    } else if (time >= 12 && time < 18) {
        greetingContent = 'Good afternoon';
    } else {
        greetingContent = 'Good evening';
    }
}

/**
 * Displays the user's name if available and not "Guest".
 */
function showName() {
    let nameContainers = document.querySelectorAll('.name');
    if (loggedInUser.name && typeof loggedInUser.name === 'string') {
        if (loggedInUser.name === 'Guest') {
            nameContainers.forEach(container => {
                container.innerHTML = '';
            });
        } else {
            let names = loggedInUser.name.split(' ');
            if (names.length >= 2) {
                let firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
                let lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();
                nameContainers.forEach(container => {
                    container.innerHTML = `${firstName} ${lastName}`;
                });
            } 
        }
    } 
}

/**
 * Renders various task-related components on the summary page.
 */
function renderTasks() {
    todoCount();
    finished();
    urgent();
    tasks();
    progressCount();
    awaitCount();
    feedback();
}

/**
 * Counts the number of open todos and updates the corresponding display.
 */
function todoCount() {
    numberOftodos = document.getElementById('toDo');
    let countToDos = 0
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.category === "open") {
            countToDos++;
        }
    }
    if (countToDos < 1) {
        numberOftodos.innerHTML = `0`;
    } else {
        numberOftodos.innerHTML = `${countToDos}`;
    }
}

/**
 * Counts the number of urgent tasks and updates the corresponding display.
 */
function urgent() {
    let numberOfUrgent = document.getElementById('high');
    let highPriorityCount = 0;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].priority === 'high') {
            deadlineHTML(i);
            highPriorityCount++;
        }
    }

    if (highPriorityCount < 1) {
        numberOfUrgent.innerHTML = `0`;
    } else {
        numberOfUrgent.innerHTML = `${highPriorityCount}`;
    }
}

/**
 * Generates HTML for displaying the next due date and updates the corresponding display.
 */
function deadlineHTML() {
    let deadline = document.getElementById('deadline');
    let dueDate = returnNextDueDate(); 
    deadline.innerHTML = dueDate;
}

/**
 * Determines the next due date among the tasks.
 * @returns {string} - The formatted next due date.
 */
function returnNextDueDate() {
    let dueDate = new Date(Math.min(...todos.map((e) => new Date(e.dueDate).getTime())));    
        let dueDateString = dueDate.toLocaleString("default", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        return dueDateString;
}

/**
 * Counts the number of completed tasks and updates the corresponding display.
 */
function finished() {
    numberOfDone = document.getElementById('done');
    let countofDone = 0
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.category === "done") {
            countofDone++;
        }
    }
    if (countofDone < 1) {
        numberOfDone.innerHTML = `0`;
    } else {
        numberOfDone.innerHTML = `${countofDone}`;
    }
}

/**
 * Counts the number of tasks awaiting feedback and updates the corresponding display.
 */
function feedback() {
    numberOfFeedback = document.getElementById('await');
    let countofFeedback = 0
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.category === "feedback") {
            countofFeedback++;
        }
    }
    if (countofFeedback < 1) {
        numberOfFeedback.innerHTML = `0`;
    } else {
        numberOfFeedback.innerHTML = `${countofFeedback}`;
    }
}

/**
 * Counts the total number of tasks and updates the corresponding display.
 */
function tasks() {
    boardTasks = document.getElementById('boardTasks');
    if (todos.length < 1) {
        boardTasks.innerHTML = `0`;
    } else {
        boardTasks.innerHTML = `${todos.length}`;
    }
}

/**
 * Counts the number of tasks in progress and updates the corresponding display.
 */
function progressCount() {
    numberOfProgress = document.getElementById('progress');
    let countProgress = 0
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.category === "progress") {
            countProgress++;
        }
    }
    if (countProgress < 1) {
        numberOfProgress.innerHTML = `0`;
    } else {
        numberOfProgress.innerHTML = `${countProgress}`;
    }
}

/**
 * Counts the number of tasks awaiting action and updates the corresponding display.
 */
function awaitCount() {
    numberOfAwait = document.getElementById('await');
    let countAwait = 0
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (todo.category === "await") {
            countAwait++;
        }
    }
    if (countAwait < 1) {
        numberOfAwait.innerHTML = `0`;
    } else {
        numberOfAwait.innerHTML = `${countAwait}`;
    }
}


