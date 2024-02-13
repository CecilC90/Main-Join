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
async function filterTodos() {
    let searchDestop = document.getElementById('search').value.toLowerCase();
    let searachMobile = document.getElementById('search-mobile').value.toLowerCase();
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let visibility = {
        'open': false,
        'progress': false,
        'feedback': false,
        'done': false
    };
    let search = searchDestop || searachMobile;

    document.getElementById('search').addEventListener('input', function() {
        if(this.value === '') {
            document.getElementById('board-content-open').style.display = 'block';
            document.getElementById('board-content-progress').style.display = 'block';
            document.getElementById('board-content-feedback').style.display = 'block';
            document.getElementById('board-content-done').style.display = 'block';
            let contentOpen = document.getElementById('content-open');
            let contentProgress = document.getElementById('content-progress');
            let contentFeedback = document.getElementById('content-feedback');
            let contentDone = document.getElementById('content-done');
            contentOpen.classList.remove('board-content');
            contentProgress.classList.remove('board-content');
            contentFeedback.classList.remove('board-content');
            contentDone.classList.remove('board-content');
            contentOpen.innerHTML = '';
            contentProgress.innerHTML = '';
            contentFeedback.innerHTML = '';
            contentDone.innerHTML = '';
        }
    });
    document.getElementById('search-mobile').addEventListener('input', function() {
        if(this.value === '') {
            document.getElementById('board-content-open').style.display = 'block';
            document.getElementById('board-content-progress').style.display = 'block';
            document.getElementById('board-content-feedback').style.display = 'block';
            document.getElementById('board-content-done').style.display = 'block';
        }
    });

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let todoContent = document.getElementById(`todo-container${i}`);
        let title = todo['title'];
        let category = todo['category'];
        if(title.toLowerCase().includes(search)) {
            todoContent.style.display = 'block';
            visibility[category] = true;
        } else {
            todoContent.style.display = 'none';
        }
    }

    for(let category in visibility) {
        let content = document.getElementById(`content-${category}`);
        let boardContent = document.getElementById(`board-content-${category}`);
        if(!visibility[category]) {
            content.classList.add('board-content');
            content.innerHTML = 'No task found';
            boardContent.style.display = 'none';
        } else {
            content.classList.remove('board-content');
            content.innerHTML = '';
            if(screenWidth > 1440) {
                boardContent.style.display = 'block';
            } else {
                boardContent.style.display = 'flex';
            }
        }
    }

}