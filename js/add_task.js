let selectedPrio = 'medium';
let contacts = ['julian, weishaar', 'Max, Mustermann', 'Laura, Musterfrau', 'Hans, Wurst'];
let category = ['Arbeit', 'Privat', 'Anderes']


async function init() {
  await includesHTML();
  showSelectedButton('addTaskButton');
  setPrioButton('medium');
  renderAssingnedToDropdownList();
  renderCategoryDropdownList();
}

function addTask(){
    console.log('add Task');
}

function setPrioButton(prio){
  let selectedOldPrioID = 'prioButton' + selectedPrio.charAt(0).toUpperCase() + selectedPrio.slice(1);
  let selectedPrioID = 'prioButton' + prio.charAt(0).toUpperCase() + prio.slice(1);
  document.getElementById(selectedOldPrioID).classList.replace(selectedOldPrioID, 'prioButton');
  document.getElementById(selectedPrioID).classList.replace('prioButton', selectedPrioID);
  selectedPrio = prio;
}

function renderAssingnedToDropdownList(){
  let content = document.getElementById('dropdownContentAssignedTo');
  content.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    content.innerHTML += renderAssingnedToDropdownListHTML(i); 
  }
}

function renderCategoryDropdownList(){
  let content = document.getElementById('dropdownContenCategory');
  content.innerHTML = '';
  for (let i = 0; i < category.length; i++) {
    content.innerHTML += renderCategoryDropdownListHTML(i); 
  }
}

function toggleDropdownIcon(id, dispayStatus){
  if(dispayStatus == 'block'){
    document.getElementById(id).src = "/assets/img/arrow_drop_down_up.svg";
  } else {
    document.getElementById(id).src = "/assets/img/arrow_drop_down.svg";
  }
}


document.addEventListener('DOMContentLoaded', function () {
  // Toggle dropdown visibility
  let contactDropdown = document.getElementById('assignedToDropdownIcon');
  contactDropdown.addEventListener('click', function () {
    dropdownContentAssignedTo.style.display = (dropdownContentAssignedTo.style.display === 'block') ? 'none' : 'block';
    let dispayStatus = dropdownContentAssignedTo.style.display;
    toggleDropdownIcon('assignedToDropdownIcon', dispayStatus);
  });

  let categoryDropdown = document.getElementById('categoryDropdownIcon');
  categoryDropdown.addEventListener('click', function () {
    dropdownContenCategory.style.display = (dropdownContenCategory.style.display === 'block') ? 'none' : 'block';
    let dispayStatus = dropdownContenCategory.style.display
    toggleDropdownIcon('categoryDropdownIcon', dispayStatus);
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', function (event) {
    let assignedToConatiner = this.document.getElementById('dropdownContentAssignedTo');
    if (!contactDropdown.contains(event.target) && !assignedToConatiner.contains(event.target)) {
      dropdownContentAssignedTo.style.display = 'none';
      toggleDropdownIcon('assignedToDropdownIcon', 'none');
    }
  });

  window.addEventListener('click', function (event) {
    let categoryConatiner = this.document.getElementById('dropdownContenCategory');
    if (!categoryDropdown.contains(event.target) && !categoryConatiner.contains(event.target)) {
      dropdownContenCategory.style.display = 'none';
      toggleDropdownIcon('categoryDropdownIcon', 'none');
    }
  });
  
});
