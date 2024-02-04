function renderAssingnedToDropdownListEditview() {
  let content = document.getElementById("dropdownContentAssignedToEditview");
  content.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let firstAndSecondLetter = getFirstAndSecondLetterEditview(i);
    content.innerHTML += renderAssingnedToDropdownListHTMLEditview(i, firstAndSecondLetter);
    showSelectedDropdownContactEditview(i);
  }
}

function filterAssingnedToDropdownListEditview(){
  let contactInput = document.getElementById('contactInput').value;
  contactInput = contactInput.toLowerCase();
  let content = document.getElementById("dropdownContentAssignedToEditview");
  content.innerHTML = '';
  for (let i = 0; i < contacts.length; i++) {
    if(contacts[i]['name'].toLowerCase().includes(contactInput)){
      let firstAndSecondLetter = getFirstAndSecondLetterEditview(i);
      content.innerHTML += renderAssingnedToDropdownListHTML(i, firstAndSecondLetter);
      showSelectedDropdownContactEditview(i);
      dropdownContentAssignedToEditview.style.display = "flex";
      toggleDropdownIconEditview("assignedToDropdownIconEditview", "flex");
    }
  }
  if(contactInput.length == 0){
    renderAssingnedToDropdownListEditview();
    dropdownContentAssignedToEditview.style.display = "none";
    toggleDropdownIconEditview("assignedToDropdownIconEditview", "none");
  }
}

function getFirstAndSecondLetterEditview(i) {
  let name = contacts[i]["name"];
  let splitName = name.split(" ");
  let firstLetter = splitName[0].trim().charAt(0).toUpperCase();
  let secondLetter = splitName[1] ? splitName[1].trim().charAt(0).toUpperCase() : "";
  let result = firstLetter + secondLetter;
  return result;
}

function setContactSelectedEditview(i) {
  if (contacts[i]["selected"]) {
    contacts[i]["selected"] = false;
    showSelectedDropdownContactEditview(i);
  } else {
    contacts[i]["selected"] = true;
    showSelectedDropdownContactEditview(i);
  }
  renderSelectedContactsIconsEditview();
}

function showSelectedDropdownContactEditview(i) {
  let dropdownContact = document.getElementById("dropdownContactEditview" + i);
  let dropdownContactImg = document.getElementById("dropdownContactImgEditview" + i);
  if (contacts[i]["selected"]) {
    dropdownContact.classList.replace("dropdownContacts", "dropdownContactsSelected");
    dropdownContactImg.src = "/assets/img/checkbox_checked_white.svg";
  } else {
    dropdownContact.classList.replace("dropdownContactsSelected", "dropdownContacts");
    dropdownContactImg.src = "/assets/img/checkbox_unchecked.svg";
  }
}

function renderSelectedContactsIconsEditview() {
  let content = document.getElementById("showSelectedDropdownContactEditview");
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
      dropdownContentAssignedToEditview.style.display = dropdownContentAssignedToEditview.style.display === "flex" ? "none" : "flex";
      let dispayStatus = dropdownContentAssignedToEditview.style.display;
      toggleDropdownIconEditview("assignedToDropdownIconEditview", dispayStatus);
    };

function toggleDropdownIconEditview(id, dispayStatus) {
  if (dispayStatus == "flex") {
      document.getElementById(id).src = "/assets/img/arrow_drop_down_up.svg";
  } else {
      document.getElementById(id).src = "/assets/img/arrow_drop_down.svg";
  }
}
    
function renderAssingnedToDropdownListHTMLEditview(i, firstAndSecondLetter) {
  return /*html */ `
    <div class="dropdownContacts" id="dropdownContactEditview${i}" onclick="setContactSelectedEditview(${i})">
      <div class="dropdownContactNameConatiner">
        <div class="contactsIcon">${firstAndSecondLetter}</div>
        <p>${contacts[i]['name']}</p>
      </div>
      <img id="dropdownContactImgEditview${i}" src="/assets/img/checkbox_unchecked.svg" alt="checkbox_unchecked">
    </div>
  `;
}
