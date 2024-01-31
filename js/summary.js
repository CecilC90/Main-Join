async function render() {
    await includesHTML();
    greeting();
    loadTasks();
    loadLoggedInUser();
}

function greeting() {
    let time = new Date().getHours();
    let greeting;

    if (time >= 5 && time < 12) {
        greeting = 'Good morning';
    } else if (time >= 12 && time < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    document.getElementById('greeting').innerHTML = greeting;

    showName();
}

function showName() {
    if (loggedInUser === 'Guest') {
        document.getElementById('name').innerHTML = '';
    } else {
        document.getElementById('name').innerHTML = `${loggedInUser}`;
    }
}

function loadTasks() {
    todoCount();
    finished();
    urgent();
    tasks();
    progressCount();
    awaitCount();
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


