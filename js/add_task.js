let selectedPrio = 'medium';
let contacts = ['julian, weishaar', 'Max, Mustermann', 'Laura, Musterfrau'];
let category = ['Arbeit', 'Privat', 'Anderes']


async function init() {
  await includesHTML();
  showSelectedButton('addTaskButton');
  setPrioButton('medium')
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
  console.log(selectedPrio);
}







document.addEventListener('DOMContentLoaded', function () {
  // Populate dropdown content
  // const dropdownContent = document.getElementById('dropdownContent');
  // contacts.forEach(contact => {
  //   const checkbox = document.createElement('input');
  //   checkbox.type = 'checkbox';
  //   checkbox.value = contact;
  //   dropdownContent.appendChild(checkbox);
    
  //   const label = document.createElement('label');
  //   label.textContent = contact;
  //   dropdownContent.appendChild(label);

  //   // Add line break for better spacing
  //   dropdownContent.appendChild(document.createElement('br'));
  // });

  // Toggle dropdown visibility
  const contactDropdown = document.getElementById('assignedToDropdown');
  contactDropdown.addEventListener('click', function () {
    dropdownContentAssignedTo.style.display = (dropdownContentAssignedTo.style.display === 'block') ? 'none' : 'block';
  });

  const categoryDropdown = document.getElementById('categoryDropdown');
  categoryDropdown.addEventListener('click', function () {
    dropdownContenCategory.style.display = (dropdownContenCategory.style.display === 'block') ? 'none' : 'block';
    console.log('category wurde gedrückt')
  });

  // Handle checkbox selection
  // dropdownContent.addEventListener('change', function (event) {
  //   const selectedContacts = Array.from(dropdownContent.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
  //   document.getElementById('contactInput').value = selectedContacts.join(', ');
  // });

  // Close dropdown when clicking outside
  // window.addEventListener('click', function (event) {
  //   if (!contactDropdown.contains(event.target)) {
  //     dropdownContent.style.display = 'none';
  //   }
  // });
});