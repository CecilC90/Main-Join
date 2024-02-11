let selectedPrio = "medium";
let contacts = [];
let category = ["Arbeit", "Privat", "Anderes"];
let subtasks = [];
let mobileVersionIsOn;
let selectedCategory = 'open';

async function init() {
  loadAddTaskContent();
  await includesHTML();
  showSelectedButton("addTaskButton");
  await loadContacts();
  setMobileVersionIsOn();
  checkScreenWidth();
  loadLoggedInUser();
}

function loadAddTaskContent() {
  let content = document.getElementById("addTask");
  content.innerHTML = renderAddTaskHTML();
}

function loadContent() {
  setPrioButton("medium");
  renderAssingnedToDropdownList();
  renderCategoryDropdownList();
  renderSelectedContactsIcons();
  renderSubtasks();
  loadEventListner();
  window.addEventListener("click", handleWindowClick);
}

window.addEventListener("resize", checkScreenWidth);

function setMobileVersionIsOn() {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 1220) {
    mobileVersionIsOn = false;
  } else {
    mobileVersionIsOn = true;
  }
}

function checkScreenWidth() {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let content = document.getElementById("addTask");
  if (screenWidth <= 1220 && mobileVersionIsOn == false) {
    window.removeEventListener("click", handleWindowClick);
    mobileVersionIsOn = true;
    content.innerHTML = renderAddTaskMobileHTML();
    loadContent();
  }
  if (screenWidth > 1220 && mobileVersionIsOn == true) {
    window.removeEventListener("click", handleWindowClick);
    mobileVersionIsOn = false;
    content.innerHTML = renderAddTaskHTML();
    loadContent();
  }
}

async function loadContacts() {
  let respons = await getItem("contacts");
  contacts = JSON.parse(respons);
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
    if (contacts[i]["active"]) {
      let firstAndSecondLetter = getFirstAndSecondLetter(i);
      content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter, contacts[i]["color"]);
      showSelectedDropdownContact(i);
    }
  }
}

function filterAssingnedToDropdownList() {
  let contactInput = document.getElementById("contactInput").value;
  contactInput = contactInput.toLowerCase();
  let content = document.getElementById("dropdownContentAssignedTo");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(contactInput)) {
      if (contacts[i]["active"]) {
        let firstAndSecondLetter = getFirstAndSecondLetter(i);
        content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter);
        showSelectedDropdownContact(i);
        dropdownContentAssignedTo.style.display = "flex";
        toggleDropdownIcon("assignedToDropdownIcon", "flex");
      }
    }
  }
  if (contactInput.length == 0) {
    renderAssingnedToDropdownList();
    dropdownContentAssignedTo.style.display = "none";
    toggleDropdownIcon("assignedToDropdownIcon", "none");
  }
}

function getFirstAndSecondLetter(i) {
  let name = contacts[i]["name"];
  let splitName = name.split(" ");
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
      content.innerHTML += renderSelectedContactsIconsHTML(i, contacts[i]["color"]);
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
  let content = document.getElementById("inputFieldCategory");
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
    content.innerHTML = showSubtasksDoneAndCancelIcons(index);
  } else {
    content.innerHTML = showSubtasksAddIcon();
  }
}

function clearSubtaskInputField() {
  let content = document.getElementById("subtasksInput");
  content.value = "";
  showSubtasksDoneAndCancel();
  setBlueBorder("subtasksInput", "subtaskField");
}

function addSubtask() {
  let subtasksInput = document.getElementById("subtasksInput");
  subtasks.push(subtasksInput.value);
  clearSubtaskInputField();
  setBlueBorder("subtasksInput", "subtaskField");
  renderSubtasks();
}

function addSubtaskOnEnter(event){
  let subtasksInput = document.getElementById("subtasksInput");
  if (event.key === "Enter" && subtasksInput.value > 0){
    addSubtask();
  }
}

function renderSubtasks() {
  let subtasksList = document.getElementById("subtasksList");
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += renderSubtasksHTML(i);
  }
}

function editSubtask(i) {
  let content = document.getElementById("subtask" + i);
  content.innerHTML = editSubtaskHTML(i);
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

function checkIsFieldFilled(id) {
  let content = document.getElementById(id);
  if (content.value.length > 0) {
    return true;
  } else {
    return false;
  }
}

function setBlueBorder(id, conatiner) {
  if (checkIsFieldFilled(id)) {
    document.getElementById(conatiner).classList.add("correctInput");
    document.getElementById(conatiner).classList.remove("wrongInput");
  } else {
    document.getElementById(conatiner).classList.remove("correctInput");
  }
}

function setRedBorder(id, requiredConatiner) {
  document.getElementById(id).classList.add("wrongInput");
  if (requiredConatiner) {
    document.getElementById(requiredConatiner).innerHTML = "This fild is required";
  }
}

function clearRequiredText(requiredConatiner) {
  document.getElementById(requiredConatiner).innerHTML = "";
}

function removeBorader(id) {
  document.getElementById(id).classList.remove("wrongInput");
  document.getElementById(id).classList.remove("correctInput");
}

function changeColorDuedate() {
  let content = document.getElementById("duedateInputField");
  if (content.value) {
    content.classList.add("duedateColorBlack");
  } else {
    content.classList.remove("duedateColorBlack");
  }
}

function loadSelectedContacts() {
  let selectedContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["selected"]) {
      selectedContacts.push(contacts[i]["id"]);
    }
  }
  return selectedContacts;
}

function loadAllSubtasks() {
  let allSubtasks = [];
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = {
      title: subtasks[i],
      subtaskDone: false,
    };
    allSubtasks.push(subtask);
  }
  return allSubtasks;
}

async function loadAllTasks() {
  let respons = await getItem("allTasks");
  return JSON.parse(respons);
}

async function saveAllTasks(allTasks) {
  await setItem("allTasks", allTasks);
}

function showAddTaskToBoard() {
  var conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "flex";
  conatiner.style.bottom = "calc(50% - " + conatiner.clientHeight / 2 + "px)";
}

function loadEventListner() {
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

  window.addEventListener("click", handleWindowClick);
}

function handleWindowClick(event) {
  let contactDropdown = document.getElementById("assignedToDropdownIcon");
  let categoryDropdown = document.getElementById("categoryDropdownIcon");
  let assignedToConatiner = document.getElementById("dropdownContentAssignedTo");
  if (!contactDropdown.contains(event.target) && !assignedToConatiner.contains(event.target)) {
    dropdownContentAssignedTo.style.display = "none";
    toggleDropdownIcon("assignedToDropdownIcon", "none");
  }
  let categoryConatiner = document.getElementById("dropdownContenCategory");
  if (!categoryDropdown.contains(event.target) && !categoryConatiner.contains(event.target)) {
    dropdownContenCategory.style.display = "none";
    toggleDropdownIcon("categoryDropdownIcon", "none");
  }
}

function addTaskOnEnter(event){
  if (event.key === "Enter"){
    addTask();
  }
}

async function addTask() {
  document.getElementById("createTaskButton").disabled = true;
  let allInputsFilled = true;
  if (checkIsFieldFilled("titleInputField") == false) {
    setRedBorder("titleField", "requiredTextTitle");
    allInputsFilled = false;
  }
  if (checkIsFieldFilled("duedateInputField") == false) {
    setRedBorder("duedateField", "requiredTextDuedate");
    allInputsFilled = false;
  }
  if (checkIsFieldFilled("inputFieldCategory") == false) {
    setRedBorder("categoryField");
    allInputsFilled = false;
  }
  if (allInputsFilled) {
    showAddTaskToBoard();
    await addToTaskBackend();
    openPage("board");
  }
  document.getElementById("createTaskButton").disabled = false;
}

async function addToTaskBackend() {
  let title = document.getElementById("titleInputField").value;
  let description = document.getElementById("descriptionTextArea").value;
  let category = document.getElementById("inputFieldCategory").value;
  let dueDate = document.getElementById("duedateInputField").value;
  let selectedContacts = loadSelectedContacts();
  let allSubtasks = loadAllSubtasks();
  let allTasks = await loadAllTasks();
  let currentTask = {
    id: new Date().getTime(),
    title: title,
    description: description,
    todoCategory: category,
    category: selectedCategory,
    dueDate: dueDate,
    priority: selectedPrio,
    assignedContacts: selectedContacts,
    subtask: allSubtasks,
    counter: 0,
  };
  allTasks.push(currentTask);
  await saveAllTasks(allTasks);
}

function clearTask() {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i]["selected"] = false;
  }
  subtasks = [];
  renderSubtasks();
  renderAssingnedToDropdownList();
  renderSelectedContactsIcons();
  document.getElementById("inputFieldCategory").value = "";
  document.getElementById("titleInputField").value = "";
  document.getElementById("duedateInputField").value = "";
  document.getElementById("descriptionTextArea").value = "";
  document.getElementById("requiredTextTitle").innerHTML = "";
  document.getElementById("requiredTextDuedate").innerHTML = "";
  removeBorader("titleField");
  removeBorader("duedateField");
  removeBorader("categoryField");
  removeBorader("descriptionTextArea");
  changeColorDuedate();
}