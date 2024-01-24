let selectedPrio = "medium";
let contacts = [
  {
    name: "julian, weishaar",
    selected: true,
  },
  {
    name: "Laura, Musterfrau",
    selected: true,
  },
  {
    name: "Max, Mustermann",
    selected: false,
  },
  {
    name: "Hans, Wurst",
    selected: false,
  },
];
let category = ["Arbeit", "Privat", "Anderes"];
let subtasks = [];

async function init() {
  await includesHTML();
  showSelectedButton("addTaskButton");
  setPrioButton("medium");
  renderAssingnedToDropdownList();
  renderCategoryDropdownList();
  renderSelectedContactsIcons();
  renderSubtasks();
}

function setPrioButton(prio) {
  let selectedOldPrioID = "prioButton" + selectedPrio.charAt(0).toUpperCase() + selectedPrio.slice(1);
  let selectedPrioID = "prioButton" + prio.charAt(0).toUpperCase() + prio.slice(1);
  document.getElementById(selectedOldPrioID).classList.replace(selectedOldPrioID, "prioButton");
  document.getElementById(selectedPrioID).classList.replace("prioButton", selectedPrioID);
  selectedPrio = prio;
}

function renderAssingnedToDropdownList() {
  let content = document.getElementById("dropdownContentAssignedTo");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let firstAndSecondLetter = getFirstAndSecondLetter(i);
    content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter);
    showSelectedDropdownContact(i);
  }
}

function filterAssingnedToDropdownList(){
  let contactInput = document.getElementById('contactInput').value;
  contactInput = contactInput.toLowerCase();
  let content = document.getElementById("dropdownContentAssignedTo");
  content.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    if(contacts[i]['name'].toLowerCase().includes(contactInput)){
      let firstAndSecondLetter = getFirstAndSecondLetter(i);
      content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter);
      showSelectedDropdownContact(i);
      dropdownContentAssignedTo.style.display = "flex";
      toggleDropdownIcon("assignedToDropdownIcon", "flex");
    }
  }
  if(contactInput.length == 0){
    renderAssingnedToDropdownList();
    dropdownContentAssignedTo.style.display = "none";
    toggleDropdownIcon("assignedToDropdownIcon", "none");
  }
}

function getFirstAndSecondLetter(i) {
  let name = contacts[i]["name"];
  let splitName = name.split(",");
  let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
  let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
  let result = firstLetter + secondLetter;
  return result;
}

function setContactSelected(i) {
  if (contacts[i]["selected"]) {
    contacts[i]["selected"] = false;
    showSelectedDropdownContact(i);
  } else {
    contacts[i]["selected"] = true;
    showSelectedDropdownContact(i);
  }
  renderSelectedContactsIcons();
}

function showSelectedDropdownContact(i) {
  let dropdownContact = document.getElementById("dropdownContact" + i);
  let dropdownContactImg = document.getElementById("dropdownContactImg" + i);
  if (contacts[i]["selected"]) {
    dropdownContact.classList.replace("dropdownContacts", "dropdownContactsSelected");
    dropdownContactImg.src = "/assets/img/checkbox_checked_white.svg";
  } else {
    dropdownContact.classList.replace("dropdownContactsSelected", "dropdownContacts");
    dropdownContactImg.src = "/assets/img/checkbox_unchecked.svg";
  }
}

function renderSelectedContactsIcons() {
  let content = document.getElementById("showSelectedDropdownContact");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["selected"]) {
      content.innerHTML += /* html */ `
        <div class="contactsIcon">${getFirstAndSecondLetter(i)}</div>
      `;
    }
  }
}

function renderCategoryDropdownList() {
  let content = document.getElementById("dropdownContenCategory");
  content.innerHTML = "";
  for (let i = 0; i < category.length; i++) {
    content.innerHTML += renderCategoryDropdownListHTML(i);
  }
}

function setSelectedCategory(i) {
  let content = document.getElementById("inputFiedCategory");
  content.value = category[i];
  dropdownContenCategory.style.display = "none";
  toggleDropdownIcon("categoryDropdownIcon", "none");
}

function toggleDropdownIcon(id, dispayStatus) {
  if (dispayStatus == "flex") {
    document.getElementById(id).src = "/assets/img/arrow_drop_down_up.svg";
  } else {
    document.getElementById(id).src = "/assets/img/arrow_drop_down.svg";
  }
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

function addSubtask() {
  let subtasksInput = document.getElementById("subtasksInput");
  subtasks.push(subtasksInput.value);
  clearSubtaskInputField();
  setBlueBorder('subtasksInput', 'subtaskField');
  renderSubtasks();
}

function renderSubtasks() {
  let subtasksList = document.getElementById("subtasksList");
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += renderSubtasksHTML(i);
  }
}

function renderSubtasksHTML(i) {
  return /* html */ `
  <div id="subtask${i}" ondblclick="editSubtask(${i})">
    <div class="subtask">
      <div class="subtaskText">
        <p>&bull;</p>
        <P>${subtasks[i]}</P>
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

document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown visibility
  let contactDropdown = document.getElementById("assignedToDropdownIcon");
  contactDropdown.addEventListener("click", function () {
    dropdownContentAssignedTo.style.display = dropdownContentAssignedTo.style.display === "flex" ? "none" : "flex";
    let dispayStatus = dropdownContentAssignedTo.style.display;
    toggleDropdownIcon("assignedToDropdownIcon", dispayStatus);
  });

  let categoryDropdown = document.getElementById("categoryDropdownIcon");
  categoryDropdown.addEventListener("click", function () {
    dropdownContenCategory.style.display = dropdownContenCategory.style.display === "flex" ? "none" : "flex";
    let dispayStatus = dropdownContenCategory.style.display;
    toggleDropdownIcon("categoryDropdownIcon", dispayStatus);
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", function (event) {
    let assignedToConatiner = this.document.getElementById("dropdownContentAssignedTo");
    if (!contactDropdown.contains(event.target) && !assignedToConatiner.contains(event.target)) {
      dropdownContentAssignedTo.style.display = "none";
      toggleDropdownIcon("assignedToDropdownIcon", "none");
    }
  });

  window.addEventListener("click", function (event) {
    let categoryConatiner = this.document.getElementById("dropdownContenCategory");
    if (!categoryDropdown.contains(event.target) && !categoryConatiner.contains(event.target)) {
      dropdownContenCategory.style.display = "none";
      toggleDropdownIcon("categoryDropdownIcon", "none");
    }
  });

  // window.addEventListener("click", function (event) {
  //   let subtaskEdit = this.document.getElementById("subtask");
  //   if(subtaskEdit){
  //     if (subtaskEdit.contains(event.target)) {
  //       // renderSubtasks();
  //       console.log("ich wurde gedrückt")
  //     } else {
  //       console.log('ich wurde nicht gedrückt');
  //     }
  //   }
  // });
});

// function setDisplayStyleDropDown(id, dispayStatus){
//   dropdownContentAssignedTo.style.display = dispayStatus;
//   toggleDropdownIcon(id, dispayStatus);
// }

function checkIsFieldFilled(id){
  let content = document.getElementById(id);
  if(content.value.length > 0){
    return true;
  } else {
    return false;
  }
}

function setBlueBorder(id, conatiner){
  if(checkIsFieldFilled(id)){
    document.getElementById(conatiner).classList.add('correctInput');
  } else {
    document.getElementById(conatiner).classList.remove('correctInput');
  }
}

function setBorderRed(id, requiredConatiner){
  document.getElementById(id).classList.add('wrongInput');
  document.getElementById(requiredConatiner).innerHTML = 'This fild is required'
}

function removeBorader(id){
  document.getElementById(id).classList.remove('wrongInput');
  document.getElementById(id).classList.remove('correctInput');
}

function addTask() {
  let allInputsFilled = true;

  if(checkIsFieldFilled('titleInputField')){
    console.log('ich bin ausgefüllt');
  } else {
    setBorderRed('titleField', 'requiredTextTitle');
    allInputsFilled = false;
  }
  if(checkIsFieldFilled('duedateInputField')){
    console.log('ich bin ausgefüllt');
  } else {
    setBorderRed('duedateField', 'requiredTextDuedate');
    allInputsFilled = false;
  }
}

function clearTask() {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i]["selected"] = false;
  }
  subtasks = [];
  renderSubtasks();
  renderAssingnedToDropdownList();
  renderSelectedContactsIcons();
  document.getElementById("inputFiedCategory").value = "";
  document.getElementById("titleInputField").value = "";
  document.getElementById("duedateInputField").value = "";
  document.getElementById("requiredTextTitle").innerHTML = "";
  document.getElementById("requiredTextDuedate").innerHTML = "";
  removeBorader('titleField');
  removeBorader('duedateField');
}
