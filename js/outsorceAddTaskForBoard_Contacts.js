let contacts = [
    {
        name: 'Anton Mayer',
        email: 'antom@gmail.com',
        selected: false
    },
    {
        name: 'Emmanuel Mauer',
        email: 'antom@gmail.com',
        selected: false
    },
    {
        name: 'Benedikt Ziegler',
        email: 'benedikt@gmail.com',
        selected: false
    },
    {
        name: 'Anja Schulz',
        email: 'schulz@hotmail.com',
        selected: false
    },
    {
        name: 'David Eisenberg',
        email: 'davidberg@gmail.com',
        selected: false
    },
    {
        name: 'Eva Fischer',
        email: 'eva@gmail.com',
        selected: false
    },
    {
        name: 'Tatjana Wolf',
        email: 'wolf@gmail.com',
        selected: false
    },
]
  
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


function contactDropdown() {
  // Toggle dropdown visibility
    dropdownContentAssignedTo.style.display = dropdownContentAssignedTo.style.display === "flex" ? "none" : "flex";
    let dispayStatus = dropdownContentAssignedTo.style.display;
    toggleDropdownIcon("assignedToDropdownIcon", dispayStatus);
};

function toggleDropdownIcon(id, dispayStatus) {
    if (dispayStatus == "flex") {
        document.getElementById(id).src = "/assets/img/arrow_drop_down_up.svg";
    } else {
        document.getElementById(id).src = "/assets/img/arrow_drop_down.svg";
    }
}
      
  function renderAssingnedToDropdownListHTML(i, firstAndSecondLetter) {
    return /*html */ `
      <div class="dropdownContacts" id="dropdownContact${i}" onclick="setContactSelected(${i})">
        <div class="dropdownContactNameConatiner">
          <div class="contactsIcon">${firstAndSecondLetter}</div>
          <p>${contacts[i]['name']}</p>
        </div>
        <img id="dropdownContactImg${i}" src="/assets/img/checkbox_unchecked.svg" alt="checkbox_unchecked">
      </div>
    `;
  }
