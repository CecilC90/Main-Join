 function renderSubtasks(index) {
    let subtasksList = document.getElementById("subtasksList");
    subtasksList.innerHTML = "";
    for (let i = 0; i < todos[index].subtask.length; i++) {
      let subtasks = todos[index].subtask[i].title;  
      subtasksList.innerHTML += renderSubtasksHTML(i, subtasks);
    }
  }
  
  function renderSubtasksHTML(i, subtasks) {
    return /* html */ `
    <div id="subtask${i}" ondblclick="editSubtask(${i})">
      <div class="subtask">
        <div class="subtaskText">
          <p>&bull;</p>
          <P>${subtasks}</P>
        </div>
        <div class="subtaskMenu">
          <img src="/assets/img/subtasks_edit_icon.svg" onclick="editSubtask(${i})" alt="edit_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtask(${i})" alt="delete_icon">
        </div>
      </div>
    </div>
    `;
  }
  
  function editSubtask(i) {
    let content = document.getElementById("subtask" + i);
    content.innerHTML = /* html */ `
      <div class="subtaskEdit" id="subtaskEdit">
        <input type="text" id="editSubtask${i}" value="${subtasks[i]}">
        <div>
          <img src="/assets/img/subtasks_delete_icon.svg" onclick="deleteSubtask(${i})" alt="delete_icon">
          <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
          <img src="/assets/img/subtasks_done_icon.svg" onclick="editSubtaskDone(${i})" alt="done_icon">
        </div>
      </div>
    `;
  }
  
  function editSubtaskDone(i) {
    let content = document.getElementById("editSubtask" + i);
    subtasks[i] = content.value;
    renderSubtasks();
  }
  
  function deleteSubtask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
  }

  function showSubtasksDoneAndCancel(index) {
    let subtasksInput = document.getElementById("subtasksInput");
    let content = document.getElementById("subtasksInputMenu");
    if (subtasksInput.value.length != 0) {
      content.innerHTML = /* html */ `
        <img class="subtasksInputMenuimg" onclick="clearSubtaskInputField()" src="/assets/img/subtasks_cancel_icon.svg" alt="cancel_icon">
        <img src="/assets/img/subtasks_seperator.svg" alt="subtasks_seperator">
        <img class="subtasksInputMenuimg" onclick="addSubtask(${index})" src="/assets/img/subtasks_done_icon.svg" alt="done_icon">
     `;
    } else {
      content.innerHTML = '<img src="/assets/img/subtasks_add_icon.svg" alt="add_icon">';
    }
  }
  
  function clearSubtaskInputField() {
    let content = document.getElementById("subtasksInput");
    content.value = "";
    showSubtasksDoneAndCancel();
    setBlueBorder('subtasksInput', 'subtaskField');
  }