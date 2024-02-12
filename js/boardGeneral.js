// Dragging Function
async function moveTo(category) {
    todos[startDragginId]['category'] = category;
    highlightOut(category);
    renderTodos();
    await setItem('allTasks', JSON.stringify(todos));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    startDragginId = id;
}

function addIdToTasks() {
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}

function highlight(id) {
    document.getElementById(id).classList.add('dragging-over');
}

function highlightOut(id) {
    document.getElementById(id).classList.remove('dragging-over');
}

// Filter Function
function filterTodos() {
    let searchDesktop = document.getElementById('search').value.toLowerCase();
    let searachMobile = document.getElementById('search-mobile').value.toLowerCase();

    let search = searchDesktop || searachMobile;

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let todoContent = document.getElementById(`todo-container${i}`);
        let title = todo['title'];
        let description = todo['description'];
        let category = todo['category'];
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        filterCategoryOpen(search, todoContent, title, description, category, screenWidth);
        filterCategoryProgress(search, todoContent, title, description, category, screenWidth);
        filterCategoryFeedback(search, todoContent, title, description, category, screenWidth);
        filterCategoryDone(search, todoContent, title, description, category, screenWidth);
    }
}

function filterCategoryOpen(search, todoContent, title, description, category, screenWidth) {
    let contentOpen = document.getElementById('content-todo');
    let boardContentOpen = document.getElementById('board-content-todo');
    if(category === 'open') {
        if(title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
            contentOpen.classList.remove('board-content');
            contentOpen.innerHTML = '';
            if(screenWidth > 1440) {
                boardContentOpen.style.display = 'block';
            } else {
                boardContentOpen.style.display = 'flex';
            }
        } else {
            todoContent.style.display = 'none';
            contentOpen.classList.add('board-content');
            contentOpen.innerHTML = 'No tasks in To do';
            boardContentOpen.style.display = 'none';
        }
    }
}

function filterCategoryProgress(search, todoContent, title, description, category, screenWidth) {
    let contentProgress = document.getElementById('content-progress');
    let boardContentProgress = document.getElementById('board-content-progress');
    if(category === 'progress') {
        if(title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
            contentProgress.classList.remove('board-content');
            contentProgress.innerHTML = '';
            if(screenWidth > 1440) {
                boardContentProgress.style.display = 'block';
            } else {
                boardContentProgress.style.display = 'flex';
            }
        } else {
            todoContent.style.display = 'none';
            contentProgress.classList.add('board-content');
            contentProgress.innerHTML = 'No tasks in Progress';
            boardContentProgress.style.display = 'none';
        }
    }
}

function filterCategoryFeedback(search, todoContent, title, description, category, screenWidth) {
    let contentFeedback = document.getElementById('content-feedback');
    let boardContentFeedback = document.getElementById('board-content-feedback');
    if(category === 'feedback') {
        if(title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
            contentFeedback.classList.remove('board-content');
            contentFeedback.innerHTML = '';
            if(screenWidth > 1440) {
                boardContentFeedback.style.display = 'block';
            } else {
                boardContentFeedback.style.display = 'flex';
            }
        } else {
            todoContent.style.display = 'none';
            contentFeedback.classList.add('board-content');
            contentFeedback.innerHTML = 'No tasks in Feedback';
            boardContentFeedback.style.display = 'none';
        } 
    }
}

function filterCategoryDone(search, todoContent, title, description, category, screenWidth) {
    let contentDone = document.getElementById('content-done');
    let boardContentDone = document.getElementById('board-content-done');

    if(category === 'done') {
        if(title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
            contentDone.classList.remove('board-content');
            contentDone.innerHTML = '';
            if(screenWidth > 1440) {
                boardContentDone.style.display = 'block';
            } else {
                boardContentDone.style.display = 'flex';
            }
        } else {
            todoContent.style.display = 'none';
            contentDone.classList.add('board-content');
            contentDone.innerHTML = 'No tasks in Done';
            boardContentDone.style.display = 'none';
        } 
    }
}