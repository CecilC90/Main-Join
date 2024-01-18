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

async function init() {
  await includesHTML();
  showSelectedButton("addTaskButton");
  setPrioButton("medium");
  renderAssingnedToDropdownList();
  renderCategoryDropdownList();
  renderSelectedContactsIcons();
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

function setSelectedCategory(i){
  let content = document.getElementById('inputFiedCategory');
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
});

function addTask() {
  console.log("add Task");
}

function clearTask() {
  for (let i = 0; i < contacts.length; i++) {
    contacts[i]['selected'] = false;
  }
  renderAssingnedToDropdownList();
  renderSelectedContactsIcons();
  document.getElementById('inputFiedCategory').value = "";
}
