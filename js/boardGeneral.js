// Dragging Function

/**
 * Called when a task is dropped
 * 
 * @param {string} category - Change the Status of the task.
 */
async function moveTo(category) {
    todos[startDragginId]['category'] = category;
    updatedCategory= category,
    todos[startDragginId] = {
        ...todos[startDragginId],
        category: updatedCategory
    }
    highlightOut(category);
    allTaskAreDisplayed();
    await updateData("/tasks", todos[startDragginId].id, todos[startDragginId]);
    renderTodos();
}

/**
 * Guarantees that all tasks are displayed when released.
 * 
 */
function allTaskAreDisplayed() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(screenWidth > 1440) {
        contentDisplayBlock();
        clearNoTaskFound();
    } else {
        contentDisplayFlex();
        clearNoTaskFound();
    }
}

/**
 * The default behavior is reset so that the task can be released.
 * 
 * @param {event} ev - Event to drop the task.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * The task is dragged and the function begins.
 * 
 * @param {number} index  - Each task has an id to identify which task is being pulled.
 */
function startDragging(index) {
    startDragginId = index;
}

/**An ID is added to the task.
 * 
 * 
 */
function addIdToTasks() {
    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        todo.id = i;
    }
}

/**
 * Highlight a container when you move over it.
 * 
 * @param {number} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('dragging-over');
}

/**
 * Highlight out a container when you move over it.
 * 
 * @param {*} id 
 */
function highlightOut(id) {
    document.getElementById(id).classList.remove('dragging-over');
}

// Filter Function

/**
 * Is called as soon as you look for a task in the search bar
 * 
 */
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

    ifNoTextInSearchbarDesktop(screenWidth);
    ifNoTextInSearchbarMobile();

    filterTitlesOfTodos(search, visibility, screenWidth);
}

/**
 * Filters all tasks by the specified title.
 * 
 * @param {string} search - Value from the search bar.
 * @param {boolean} visibility - True or False whether a task is in a status.
 * @param {number} screenWidth - Returns the width of a screen.
 */
function filterTitlesOfTodos(search, visibility, screenWidth) {

    for(let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let todoContent = document.getElementById(`todo-container${i}`);
        let title = todo['title'];
        let category = todo['category'];
        if(title.toLowerCase().startsWith(search)) {
            todoContent.style.display = 'block';
            visibility[category] = true;
        } else {
            todoContent.style.display = 'none';
        }
    }

    filterCategorys(category, visibility, screenWidth)
}

/**
 * Filters by category and checks whether a task already exists
 * 
 * @param {string} category - Passes a status
 * @param {boolean} visibility - True or False whether a task is in a status.
 * @param {number} screenWidth - Returns the width of a screen.
 */
function filterCategorys(category, visibility, screenWidth) {
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

/**
 * If there is no value in the search bar then all tasks will be displayed again
 *
 * @param {number} screenWidth - Returns the width of a screen.
 */
function ifNoTextInSearchbarDesktop(screenWidth) {
    document.getElementById('search').addEventListener('input', function() {
        if(this.value === '') {
            if(screenWidth > 1430) {
                contentDisplayBlock();
            } else {
                contentDisplayFlex();
            }
            clearNoTaskFound();
        }
    });
}
/**
 * If there is no value in the search bar then all tasks will be displayed again (Mobile Searchbar)
 * 
 */

function ifNoTextInSearchbarMobile() {
    document.getElementById('search-mobile').addEventListener('input', function() {
        if(this.value === '') {
            contentDisplayFlex();
            clearNoTaskFound();
        }
    });
}

/**
 * Sets elements to display block
 * 
 */
function contentDisplayBlock() {
    document.getElementById('board-content-open').style.display = 'block';
    document.getElementById('board-content-progress').style.display = 'block';
    document.getElementById('board-content-feedback').style.display = 'block';
    document.getElementById('board-content-done').style.display = 'block';
}

/**
 * Sets elements to display flex
 * 
 */
function contentDisplayFlex() {
    document.getElementById('board-content-open').style.display = 'flex';
    document.getElementById('board-content-progress').style.display = 'flex';
    document.getElementById('board-content-feedback').style.display = 'flex';
    document.getElementById('board-content-done').style.display = 'flex';
}

/**
 * Reset the values back
 * 
 */
function clearNoTaskFound() {
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

