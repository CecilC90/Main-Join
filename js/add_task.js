let selectedPrio = 'medium';

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