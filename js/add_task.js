let selectedPrio = "medium";
let contacts = [];
let category = ["Technical Task", "User Story"];
let subtasks = [];
let mobileVersionIsOn;
let selectedCategory = "open";

/**
 * Starts the page and launches all content functions
 *
 */
async function init() {
  await includesHTML();
  showSelectedButton("addTaskButton");
  await loadContacts();
  setMobileVersionIsOn();
  checkScreenWidth();
  loadLoggedInUser();
}

/**
 * all standard settings and dropdown elements
 *
 */
function loadContent() {
  setPrioButton("medium");
  renderAssingnedToDropdownList();
  renderCategoryDropdownList();
  renderSelectedContactsIcons();
  renderSubtasks();
  loadEventListner();
  window.addEventListener("click", handleWindowClick);
}

/**
 * /**
 * starts the function checkScreenWidth when changing the page width
 *
 */
window.addEventListener("resize", checkScreenWidth);

/**
 * sets the variable mobileVersionIsOn to true if the width is below 1220px
 *
 */
function setMobileVersionIsOn() {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (screenWidth <= 1220) {
    mobileVersionIsOn = false;
  } else {
    mobileVersionIsOn = true;
  }
}

/**
 * renders the desktop or mobile version of HTML code depending on the width of the screen
 *
 */
function checkScreenWidth() {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
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

/**
 * changes the HTML code of the Prio buttons depending on the rollout
 *
 * @param {string} prio the value high medium or low
 */
function setPrioButton(prio) {
  let selectedOldPrioID =
    "prioButton" + selectedPrio.charAt(0).toUpperCase() + selectedPrio.slice(1);
  let selectedPrioID =
    "prioButton" + prio.charAt(0).toUpperCase() + prio.slice(1);
  document
    .getElementById(selectedOldPrioID)
    .classList.replace(selectedOldPrioID, "prioButton");
  document
    .getElementById(selectedPrioID)
    .classList.replace("prioButton", selectedPrioID);
  selectedPrio = prio;
}

/**
 * creates the list of contacts that can be selected
 *
 */
function renderAssingnedToDropdownList() {
  let content = document.getElementById("dropdownContentAssignedTo");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let firstAndSecondLetter = getFirstAndSecondLetter(i);
    content.innerHTML += renderAssingnedToDropdownListHTML(
      i,
      firstAndSecondLetter,
      contacts[i]["color"]
    );
    showSelectedDropdownContact(i);
  }
}

/**
 * filters the list of contacts that can be selected
 *
 */
function filterAssingnedToDropdownList() {
  debugger;
  let contactInput = document.getElementById("contactInput").value;
  contactInput = contactInput.toLowerCase();
  let content = document.getElementById("dropdownContentAssignedTo");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(contactInput)) {
      let firstAndSecondLetter = getFirstAndSecondLetter(i);
      content.innerHTML += renderAssingnedToDropdownListHTML(
        i,
        firstAndSecondLetter,
        contacts[i]["color"]
      );
      showSelectedDropdownContact(i);
      dropdownContentAssignedTo.style.display = "flex";
      toggleDropdownIcon("assignedToDropdownIcon", "flex");
    }
  }
  if (contactInput.length == 0) {
    renderAssingnedToDropdownList();
    dropdownContentAssignedTo.style.display = "none";
    toggleDropdownIcon("assignedToDropdownIcon", "none");
  }
}

/**
 * creates a string with the first letter of each contact
 *
 * @param {number} i number from the array contacts
 * @returns {string} first and second letter
 */
function getFirstAndSecondLetter(i) {
  let name = contacts[i]["name"];
  let splitName = name.split(" ");
  let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
  let secondLetter = splitName[1]
    ? splitName[1].trim().charAt(0).toUpperCase()
    : "";
  let result = firstLetter + secondLetter;
  return result;
}

/**
 * sets the contact to selected
 *
 * @param {number} i number from the array contacts
 */
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

/**
 * changes the classe of the selected contacte
 *
 * @param {number} i umber from the array contacts
 */
function showSelectedDropdownContact(i) {
  let dropdownContact = document.getElementById("dropdownContact" + i);
  let dropdownContactImg = document.getElementById("dropdownContactImg" + i);
  if (contacts[i]["selected"]) {
    dropdownContact.classList.replace(
      "dropdownContacts",
      "dropdownContactsSelected"
    );
    dropdownContactImg.src = "./assets/img/checkbox_checked_white.svg";
  } else {
    dropdownContact.classList.replace(
      "dropdownContactsSelected",
      "dropdownContacts"
    );
    dropdownContactImg.src = "./assets/img/checkbox_unchecked.svg";
  }
}

/**
 * creates the icons below the input field assigned To
 *
 */
function renderSelectedContactsIcons() {
  let content = document.getElementById("showSelectedDropdownContact");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["selected"]) {
      content.innerHTML += renderSelectedContactsIconsHTML(
        i,
        contacts[i]["color"]
      );
    }
  }
}

/**
 * creates the dropdown list of the category
 *
 */
function renderCategoryDropdownList() {
  let content = document.getElementById("dropdownContenCategory");
  content.innerHTML = "";
  for (let i = 0; i < category.length; i++) {
    content.innerHTML += renderCategoryDropdownListHTML(i);
  }
}

/**
 * inserts the selected category into the field
 *
 * @param {number} i number from the array category
 */
function setSelectedCategory(i) {
  let content = document.getElementById("inputFieldCategory");
  content.value = category[i];
  dropdownContenCategory.style.display = "none";
  toggleDropdownIcon("categoryDropdownIcon", "none");
}

/**
 * change the arrow in the dropdown menu
 *
 * @param {string} id id of the icon to be changed
 * @param {string} dispayStatus flex or none what the dropdown currently has
 */
function toggleDropdownIcon(id, dispayStatus) {
  if (dispayStatus == "flex") {
    document.getElementById(id).src = "./assets/img/arrow_drop_down_up.svg";
  } else {
    document.getElementById(id).src = "./assets/img/arrow_drop_down.svg";
  }
}

/**
 * displays the add or cancel icons for the subtask
 *
 * @param {number} index number of the subtask
 */
function showSubtasksDoneAndCancel(index) {
  let subtasksInput = document.getElementById("subtasksInput");
  let content = document.getElementById("subtasksInputMenu");
  if (subtasksInput.value.length != 0) {
    content.innerHTML = showSubtasksDoneAndCancelIcons(index);
  } else {
    content.innerHTML = showSubtasksAddIcon();
  }
}

/**
 * clears the input field subtask
 *
 */
function clearSubtaskInputField() {
  let content = document.getElementById("subtasksInput");
  content.value = "";
  showSubtasksDoneAndCancel();
  setBlueBorder("subtasksInput", "subtaskField");
}

/**
 * checks that the date is not in the past
 *
 * @returns {boolean} returns whether it is in the past
 */
function checkDueDateNotInPast() {
  let currentDate = new Date();
  let inputDate = document.getElementById("duedateInputField").value;
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let currentDateString = year + "-" + month + "-" + day;
  if (currentDateString > inputDate) {
    setRedBorder("duedateField");
    document.getElementById("requiredTextDuedate").innerHTML =
      "Due date is in the Past!";
    return false;
  } else {
    return true;
  }
}

/**
 * adds the subtask to the list
 *
 */
function addSubtask() {
  let subtasksInput = document.getElementById("subtasksInput");
  subtasks.push(subtasksInput.value);
  clearSubtaskInputField();
  setBlueBorder("subtasksInput", "subtaskField");
  renderSubtasks();
}

/**
 * adds the subtask to the list when pressing enter
 *
 * @param {event} event the key that is pressed is taken out
 */
function addSubtaskOnEnter(event) {
  let subtasksInput = document.getElementById("subtasksInput").value;
  if (event.key === "Enter" && subtasksInput.length > 0) {
    addSubtask();
  }
}

/**
 * creates the list of subtasks
 *
 */
function renderSubtasks() {
  let subtasksList = document.getElementById("subtasksList");
  subtasksList.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += renderSubtasksHTML(i);
  }
}

/**
 * creates the field to change the subtask
 *
 * @param {number} i nummber of the subtask id
 */
function editSubtask(i) {
  let content = document.getElementById("subtask" + i);
  content.innerHTML = editSubtaskHTML(i);
}

/**
 * changes the substak in the arry and displays it
 *
 * @param {number} i nummber of the subtask id
 */
function editSubtaskDone(i) {
  let content = document.getElementById("editSubtask" + i).value;
  if (content.length > 0) {
    subtasks[i] = content;
    renderSubtasks();
  } else {
    deleteSubtask(i);
  }
}

/**
 * deletes the subtask
 *
 * @param {number} i nummber of the subtask id
 */
function deleteSubtask(i) {
  subtasks.splice(i, 1);
  renderSubtasks();
}

/**
 * checks whether the input field is filled
 *
 * @param {string} id id of the input field
 * @returns {boolean} filled yes or no
 */
function checkIsFieldFilled(id) {
  let content = document.getElementById(id);
  if (content.value.length > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * creates a blue border around the input field
 *
 * @param {string} id id of the input field
 * @param {string} conatiner id of the container where the input field is located
 */
function setBlueBorder(id, conatiner) {
  if (checkIsFieldFilled(id)) {
    document.getElementById(conatiner).classList.add("correctInput");
    document.getElementById(conatiner).classList.remove("wrongInput");
  } else {
    document.getElementById(conatiner).classList.remove("correctInput");
  }
}

/**
 * creates a red border around the input field
 *
 * @param {string} id id of the input field
 * @param {string} conatiner id of the container where the input field is located
 */
function setRedBorder(id, requiredConatiner) {
  document.getElementById(id).classList.add("wrongInput");
  if (requiredConatiner) {
    document.getElementById(requiredConatiner).innerHTML =
      "This fild is required";
  }
}

/**
 * clears the text field with the error message
 *
 * @param {string} requiredConatiner id of the text field
 */
function clearRequiredText(requiredConatiner) {
  document.getElementById(requiredConatiner).innerHTML = "";
}

/**
 * removes the border
 *
 * @param {string} id id of the conteiner
 */
function removeBorader(id) {
  document.getElementById(id).classList.remove("wrongInput");
  document.getElementById(id).classList.remove("correctInput");
}

/**
 * changes the text color of dueDate
 *
 */
function changeColorDuedate() {
  let content = document.getElementById("duedateInputField");
  if (content.value) {
    content.classList.add("duedateColorBlack");
  } else {
    content.classList.remove("duedateColorBlack");
  }
}

/**
 * load the selected contacts into an extra array
 *
 * @returns {Array} returns the selected contacte as an array
 */
function loadSelectedContacts() {
  let selectedContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["selected"]) {
      selectedContacts.push(contacts[i]["id"]);
    }
  }
  return selectedContacts;
}

/**
 * load the subtasks into an extra array
 *
 * @returns {Array} returns the selected subtasks as an array
 */
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

/**
 * Load all tasks from the backend
 *
 * @returns {JSON} Returns all tasks
 */
async function loadAllTasks() {
  let respons = await getItem("allTasks");
  return JSON.parse(respons);
}
/**
 * Saves all data to the backend
 *
 * @param {JSON} allTasks All data from Add Task
 */
async function saveAllTasks(allTasks) {
  await setItem("allTasks", allTasks);
}

/**
 * shows the message that the task has been added
 *
 */
function showAddTaskToBoard() {
  var conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "flex";
  conatiner.style.bottom = "calc(50% - " + conatiner.clientHeight / 2 + "px)";
}

/**
 * adds the EventListner for the dropdowns
 *
 */
function loadEventListner() {
  let contactDropdown = document.getElementById("assignedToDropdownIcon");
  contactDropdown.addEventListener("click", function () {
    dropdownContentAssignedTo.style.display =
      dropdownContentAssignedTo.style.display === "flex" ? "none" : "flex";
    let dispayStatus = dropdownContentAssignedTo.style.display;
    toggleDropdownIcon("assignedToDropdownIcon", dispayStatus);
  });

  let categoryDropdown = document.getElementById("categoryDropdownIcon");
  categoryDropdown.addEventListener("click", function () {
    dropdownContenCategory.style.display =
      dropdownContenCategory.style.display === "flex" ? "none" : "flex";
    let dispayStatus = dropdownContenCategory.style.display;
    toggleDropdownIcon("categoryDropdownIcon", dispayStatus);
  });

  window.addEventListener("click", handleWindowClick);
}

/**
 * adds the functions for the dropdown
 *
 * @param {event} event where the mouse clicks on the screen
 */
function handleWindowClick(event) {
  let contactDropdown = document.getElementById("assignedToDropdownIcon");
  let categoryDropdown = document.getElementById("categoryDropdownIcon");
  let assignedToConatiner = document.getElementById(
    "dropdownContentAssignedTo"
  );
  if (
    !contactDropdown.contains(event.target) &&
    !assignedToConatiner.contains(event.target)
  ) {
    dropdownContentAssignedTo.style.display = "none";
    toggleDropdownIcon("assignedToDropdownIcon", "none");
  }
  let categoryConatiner = document.getElementById("dropdownContenCategory");
  if (
    !categoryDropdown.contains(event.target) &&
    !categoryConatiner.contains(event.target)
  ) {
    dropdownContenCategory.style.display = "none";
    toggleDropdownIcon("categoryDropdownIcon", "none");
  }
}

/**
 * adds the task through ender
 *
 * @param {event} event the key that is pressed is taken out
 */
function addTaskOnEnter(event) {
  if (event.key === "Enter") {
    addTask();
  }
}
/**
 * checks whether all fields for adding the task are filled in and displays fields that are not filled in
 *
 */
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
  } else {
    if (checkDueDateNotInPast() == false) {
      allInputsFilled = false;
    }
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

/**
 * Prepares all data for saving to the backend
 *
 */
async function addToTaskBackend() {
  let title = document.getElementById("titleInputField").value;
  let description = document.getElementById("descriptionTextArea").value;
  let category = document.getElementById("inputFieldCategory").value;
  let dueDate = document.getElementById("duedateInputField").value;
  let selectedContacts = loadSelectedContacts();
  let allSubtasks = loadAllSubtasks();
  //let allTasks = await loadAllTasks();
  let currentTask = {
    title: title,
    description: description,
    todoCategory: category,
    category: "open",
    dueDate: dueDate,
    priority: selectedPrio,
    assignedContacts: selectedContacts,
    subtask: allSubtasks.length > 0 ? allSubtasks : [],
    counter: 0,
  };
  console.log(currentTask);

  await postData("/tasks", currentTask);
  
}

/**
 * clears all fields
 *
 */
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
