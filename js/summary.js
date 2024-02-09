let todos = [];

async function renderSummary() {
    await includesHTML();
    showSelectedButton("summaryButton");
    await loadLoggedInUser();
    
    await loadAllTasks();
    await checkIsMsgAvailable();
    renderSummaryHTML();   
    greeting();
    renderTasks();  
}

async function render() {
    await includesHTML();
    showSelectedButton("summaryButton");
    await loadLoggedInUser();
}

function checkIsMsgAvailable() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get("msg");

    if (msg) {
        showGreetingMobile();
    }
}

function showGreetingMobile() {
    if (window.innerWidth < 608) {
        document.getElementById('greetingMobile').classList.add('d-flex');
        document.getElementById('greetingMobile').classList.add('hidden');
        document.getElementById('greetingMobile').classList.add('hidden-overlay');
        document.getElementById('greetingMobile').classList.remove('d-none');
    }
}

async function loadAllTasks() {
    let respons = await getItem("allTasks");
    todos = JSON.parse(respons);
}

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

    if (!loggedInUser.includes("Guest")) {
        showName();
    }
}

function showName() {
    let nameContainers = document.querySelectorAll('.name');
    if (loggedInUser === 'Guest') {
        nameContainers.forEach(container => {
            container.innerHTML = '';
        });
    } else {
        let names = loggedInUser[0].split(' ');
        let firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
        let lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();
        nameContainers.forEach(container => {
            container.innerHTML = `${firstName} ${lastName}`;
        });
    }
}

function renderTasks() {
    todoCount();
    finished();
    urgent();
    tasks();
    progressCount();
    awaitCount();
    feedback();
}

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

function deadlineHTML(i) {
    deadline = document.getElementById('deadline');
    deadline.innerHTML = `${todos[i].dueDate}`;
}

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

function tasks() {
    boardTasks = document.getElementById('boardTasks');
    if (todos.length < 1) {
        boardTasks.innerHTML = `0`;
    } else {
        boardTasks.innerHTML = `${todos.length}`;
    }
}

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


