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
}

function loadTasks() {
    todoCount();
    finished();
    //urgent();
    tasks();
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