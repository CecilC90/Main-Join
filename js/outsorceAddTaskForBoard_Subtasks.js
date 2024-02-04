 function renderSubtasksEditview(index) {
    let subtasksList = document.getElementById("subtasksListEditview");
    subtasksList.innerHTML = "";
    for (let i = 0; i < todos[index].subtask.length; i++) {
      let subtasks = todos[index].subtask[i].title;  
      subtasksList.innerHTML += renderSubtasksHTMLEditview(i, subtasks, index);
    }
  }
  
  function renderSubtasksHTMLEditview(i, subtasks, index) {
    return /* html */ `
    <div id="subtaskEditview${i}" ondblclick="editSubtaskEditview(${i})">
      <div class="subtask">
        <div class="subtaskText">
          <p>&bull;</p>
          <P>${subtasks}</P>
        </div>
        <div class="subtaskMenu">
          <img src="/assets/img/subtasks_edit_icon.svg" onclick="editSubtaskEditview(${i}, '${subtasks}', ${index})" alt="edit_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtaskEditview(${i}, ${index})" alt="delete_icon">
        </div>
      </div>
    </div>
    `;
  }
  
  function editSubtaskEditview(i, editSubtask, index) {
    let content = document.getElementById("subtaskEditview" + i);
    content.innerHTML = /* html */ `
      <div class="subtaskEdit" id="subtaskEdit">
        <input type="text" id="editSubtask${i}" value="${editSubtask}">
        <div>
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtaskEditview(${i}, ${index})" alt="delete_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_done_icon.svg" onclick="editSubtaskDoneEditview(${i}, ${index})" alt="done_icon">
        </div>
      </div>
    `;
  }
  
  function editSubtaskDoneEditview(i, index) {
    let content = document.getElementById("editSubtask" + i);
    if(content.value !== '') {
        todos[index].subtask[i].title = content.value;
        renderSubtasksEditview(index);
    }
  }
  
  async function deleteSubtaskEditview(i, index) {
    todos[index].subtask.splice(i, 1);
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtasksEditview(index);
  }

  function showSubtasksDoneAndCancelEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let content = document.getElementById("subtasksInputMenuEditview");
    if (subtasksInput.value.length != 0) {
      content.innerHTML = /* html */ `
        <img class="subtasksInputMenuimg" onclick="clearSubtaskInputFieldEditview()" src="/assets/img/subtasks_cancel_icon.svg" alt="cancel_icon">
        <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
        <img class="subtasksInputMenuimg" onclick="addSubtaskEditview(${index})" src="/assets/img/subtasks_done_icon.svg" alt="done_icon">
     `;
    } else {
      content.innerHTML = '<img src="/assets/img/subtasks_add_icon.svg" alt="add_icon">';
    }
  }
  
  function clearSubtaskInputFieldEditview() {
    let content = document.getElementById("subtasksInputEditview");
    content.value = "";
    showSubtasksDoneAndCancelEditview();
    setBlueBorder('subtasksInput', 'subtaskField');
  }

  async function addSubtaskEditview(index) {
    let subtasksInput = document.getElementById("subtasksInputEditview");
    let addSubtask = todos[index].subtask;
    addSubtask.push(
        {
            title: subtasksInput.value,
            selected: false
        }
    );
    
    await setItem('allTasks', JSON.stringify(todos));
    renderSubtasksEditview(index);
}