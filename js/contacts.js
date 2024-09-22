/**
 * Array containing contact information objects.
 * @type {Array<Object>}
 */
let contacts = [];

/**
 * Flag indicating whether the contact options for mobile are open.
 * @type {boolean}
 */
let openContactOptionsMobile = false;

/**
 * Flag indicating whether the add contact popup container is open.
 * @type {boolean}
 */
let openAddPopupContainer = false;

/**
 * Flag indicating whether the edit contact popup container is open.
 * @type {boolean}
 */
let openEditPopupContainer = false;

/**
 * Flag indicating whether the user overview is open.
 * @type {boolean}
 */
let openUserOverview = false;

/**
 * Array containing background color codes.
 * @type {Array<string>}
 */
let backgroundColors = [
  "#ff0000", // Rot
  "#00ff00", // Grün
  "#0000ff", // Blau
  "#ffff00", // Gelb
  "#ff00ff", // Magenta
  "#00ffff", // Cyan
  "#ff9900", // Orange
  "#9900ff", // Lila
  "#009900", // Dunkelgrün
  "#990000", // Dunkelrot
  "#ffcc00", // Goldgelb
  "#cc66ff", // Flieder
  "#0099cc", // Türkis
  "#ff6699", // Rosa
  "#663300", // Braun
  "#99cc00", // Olivgrün
  "#6600cc", // Indigo
  "#ff9966", // Pfirsich
  "#336600", // Dunkelgrün
  "#cc0000", // Dunkelrot
];

/**
 * Initializes contacts by loading data and rendering the contact list.
 * @returns {Promise<void>}
 */
async function initContacts() {
  await includesHTML();
  await loadLoggedInUser();
  await loadContacts();
  renderContacts();
  loadLoggedInUser();
  showSelectedButton("contactButton");
}



/**
 * Renders the contact list.
 */
async function renderContacts() {
  sortedContacts = contacts;
  sortedContactList();
  renderContactList(sortedContacts);
}

/**
 * Sorts the contacts list.
 */
function sortedContactList() {
  contacts.sort((a, b) => {
    let nameA = a.name.split(" ");
    let nameB = b.name.split(" ");
    let firstLetterA = nameA[0].charAt(0).toUpperCase();
    let firstLetterB = nameB[0].charAt(0).toUpperCase();

    if (firstLetterA < firstLetterB) {
      return -1;
    }
    if (firstLetterA > firstLetterB) {
      return 1;
    }

    return sortSecondName(nameA, nameB);
  });
}

/**
 * Sorts the contacts by the second name if the first names are the same.
 * @param {string[]} nameA - First name split by space.
 * @param {string[]} nameB - Second name split by space.
 * @returns {number} - Comparison result.
 */
function sortSecondName(nameA, nameB) {
  let secondLetterA = nameA.length > 1 ? nameA[1].charAt(0).toUpperCase() : "";
  let secondLetterB = nameB.length > 1 ? nameB[1].charAt(0).toUpperCase() : "";

  if (secondLetterA < secondLetterB) {
    return -1;
  }
  if (secondLetterA > secondLetterB) {
    return 1;
  }

  return 0;
}

/**
 * Renders the contact list.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 */
function renderContactList(sortedContacts) {
  let contactlist = document.getElementById("contactsList");
  contactlist.innerHTML = "";
  let currentInitial = null;
  sortingContacts(sortedContacts, contactlist, currentInitial);
}

/**
 * Sorts and renders the contacts.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {HTMLElement} contactlist - HTML element for the contact list.
 * @param {string} currentInitial - Current initial being processed.
 */
function sortingContacts(sortedContacts, contactlist, currentInitial) {
  for (let i = 0; i < sortedContacts.length; i++) {
    let sortedContact = sortedContacts[i];

    if (sortedContact) {
      let firstLetter = getFirstLetter(sortedContacts, i);

      if (firstLetter !== currentInitial) {
        contactlist.innerHTML += renderFirstLetterHTML(firstLetter);
        currentInitial = firstLetter;
      }
      renderInitials(sortedContacts, i);
      markLoggedinContact(sortedContacts, i);
    }
  }
}

/**
 * Marks the logged-in contact in the contact list.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {number} i - Index of the contact being processed.
 */
function markLoggedinContact(sortedContacts, i) {
  if (sortedContacts[i].email.includes(loggedInUser.email)) {
    document.getElementById(`userCard${i}`).classList.add("markUserCard");
  }
}

/**
 * Renders initials of the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {number} i - Index of the contact being processed.
 */
function renderInitials(sortedContacts, i) {
  let contactlist = document.getElementById("contactsList");
  let initials = getMemberInitials(sortedContacts, i);
  contactlist.innerHTML += renderContactsHTML(sortedContacts, i, initials);
}

/**
 * Retrieves the first letter of the contact's name.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {number} i - Index of the contact being processed.
 * @returns {string} - First letter of the name.
 */
function getFirstLetter(sortedContacts, i) {
  return sortedContacts[i].name.charAt(0).toUpperCase(0);
}

/**
 * Retrieves the initials of the contact's name.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {number} i - Index of the contact being processed.
 * @returns {string} - Initials of the name.
 */
function getMemberInitials(sortedContacts, i) {
  return sortedContacts[i].name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

/**
 * Renders HTML for the first letter section in the contact list.
 * @param {string} firstLetter - First letter of the name.
 * @returns {string} - HTML string for the first letter section.
 */
function renderFirstLetterHTML(firstLetter) {
  return `
    <div class="first-letter">${firstLetter}</div>
    <div class="underline"></div>
    `;
}

/**
 * Renders HTML for the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {number} i - Index of the contact being processed.
 * @param {string} initials - Initials of the name.
 * @returns {string} - HTML string for the contact.
 */
function renderContactsHTML(sortedContacts, i, initials) {
  return `
    <div id="userCard${i}" class="user-card" onclick="toggleUserInformation(${i}, sortedContacts, '${initials}')">
        <div class="contact-icon" id="initials" style= background-color:${contacts[i].color}>${initials}</div>
        <div class=contact-container>
            <span>${sortedContacts[i].name}</span>
            <span class="email">${sortedContacts[i].email}</span>
        </div>
    <div>
    `;
}

/**
 * Toggles user information display.
 * @param {number} i - Index of the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {string} initials - Initials of the name.
 */
function toggleUserInformation(i, sortedContacts, initials) {
  resetUserCardStyles();
  highlightUsercard(i);
  openUserInformation(i, sortedContacts, initials);
  handleScreenWidth();
  document.getElementById("menuContactMobile").onclick = function () {
    openContatOptions(i);
  };
  openUserOverview = true;
}

/**
 * Handles the screen width for responsive design.
 */
function handleScreenWidth() {
  if (window.innerWidth < 1280) {
    document.getElementById("contactsContainer").style.display = "none";
    document.getElementById("infoContainer").style.display = "block";
    document.getElementById("menuContactMobile").classList.remove("d-none");
  }
}

/**
 * Highlights the selected user card.
 * @param {number} i - Index of the contact.
 */
function highlightUsercard(i) {
  let mainCard = document.getElementById("userOverview");
  let userCard = document.getElementById(`userCard${i}`);
  userCard.style.backgroundColor = "#2A3647";
  userCard.style.color = "white";
}

/**
 * Resets styles for all user cards.
 */
function resetUserCardStyles() {
  let allUserCards = document.querySelectorAll(".user-card");
  allUserCards.forEach((userCard) => {
    userCard.style.backgroundColor = "";
    userCard.style.color = "";
  });
}

/**
 * Closes the user information section.
 * @param {number} i - Index of the contact.
 */
function closeUserInformation(i) {
  let mainCard = document.getElementById("userOverview");
  mainCard.innerHTML = "";
  openUserOverview = false;
}

/**
 * Opens the user information section.
 * @param {number} i - Index of the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {string} initials - Initials of the name.
 */
function openUserInformation(i, sortedContacts, initials) {
  mainCard = document.getElementById("userOverview");
  mainCard.innerHTML = "";
  mainCard.innerHTML = userInformationHTML(i, sortedContacts, initials);
  document.getElementById("initialsPopUp").innerHTML = `${initials}`;
  document.getElementById("initialsPopUp").style.backgroundColor =
    sortedContacts[i].color;
}

/**
 * Deletes a contact.
 * @param {number} i - Index of the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 */
async function deleteContact(i, sortedContacts) {
  await deleteData("/contacts/" + sortedContacts[i].id);
  await loadContacts();
  renderContacts();
  closeUserInformation();
  document.getElementById("contactOptionsMobile").style.display = "none";
  document.getElementById("contactsContainer").style.display = "flex";
  document.getElementById("infoContainer").style.display = "none";
}

/**
 * Cancels input operation.
 */
function cancelInput() {
  let name = document.getElementById("addName");
  let email = document.getElementById("addEmail");
  let phone = document.getElementById("addPhone");
  name.value = "";
  email.value = "";
  phone.value = "";
}

/**
 * Closes the main contact section.
 */
function closeMainContact() {
  resetUserCardStyles();
  document.getElementById("contactsContainer").style.display = "flex";
  document.getElementById("infoContainer").style.display = "none";
  document.getElementById("menuContactMobile").style.display = "none";
  document.getElementById("userOverview").innerHTML = "";
}

/**
 * Generates HTML for displaying user information.
 * @param {number} i - Index of the contact.
 * @param {Array<Object>} sortedContacts - Sorted array of contact objects.
 * @param {string} initials - Initials of the name.
 * @returns {string} - HTML string for user information display.
 */
function userInformationHTML(i, sortedContacts, initials) {
  return `
    <div class="main-head-container">
        <div>
            <div class="main-contact-icon" style= background-color:${sortedContacts[i].color}>${initials}</div>
        </div>
        <div>
            <div class="name-container">${sortedContacts[i].name}</div>
            <div class="action-icons-container">
                <div class="edit-delete-container" onclick ="openEditContactPopUp(${i})">
                    <img src="./assets/img/contacts-edit.svg" alt="Edit icon">
                    <span>Edit</span>
                </div>
                <div class="edit-delete-container" onclick="deleteContact(${i}, sortedContacts)">
                    <img src="./assets/img/delete.svg" alt="Delete icon">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    <div class="contact-info-container">
        <div class="information-headline">Contact Information</div>
        <div class="contact-detail">
            <div class="detail-title">Email</div>
            <div class="detail-email">${sortedContacts[i].email}</div>
        </div>
        <div>
            <div class="detail-title">Phone</div>
            <div class="detail-info">${sortedContacts[i].phone}</div>
        </div>
    </div>
    `;
}

/**
 * Opens the add contact popup.
 */
function openAddContactPopUp() {
  popUp = document.getElementById("popupContainer");
  popUp.classList.remove("d-none");
  popUp.classList.add("flex");
  addPopUp = document.getElementById("addContactPopUp");
  addPopUp.classList.remove("d-none");

  editPopUp = document.getElementById("editContactPopUp");
  editPopUp.classList.add("d-none");
  resetAddInput();
  openAddPopupContainer = true;
  event.stopPropagation();
}

/**
 * Closes the add contact popup.
 * @param {Event} event - The event triggering the function.
 */
function closeAddContactPopUp(event) {
  if (event) {
    event.preventDefault();
  }

  popUp = document.getElementById("popupContainer");
  popUp.style.display = "none";
  editPopUp = document.getElementById("editContactPopUp");
  editPopUp.classList.remove("d-none");
}

/**
 * Opens the edit contact popup.
 * @param {number} i - Index of the contact.
 */
function openEditContactPopUp(i) {
  loadContacts();
  renderContacts();
  popUp = document.getElementById("popupContainer");
  popUp.classList.add("flex");
  addPopUp = document.getElementById("addContactPopUp");
  addPopUp.classList.add("d-none");
  editPopUp = document.getElementById("editContactPopUp");
  editPopUp.classList.remove("d-none");
  document.getElementById("editButton").onclick = function () {
    updateContactsInfo(i, event);
  };
  document.getElementById("deleteButton").onclick = function () {
    deleteContact(i, sortedContacts);
  };
  loadMemberInfo(i);
  document.getElementById("contactOptionsMobile").style.display = "none";
  openEditPopupContainer = true;
  event.stopPropagation();
}

/**
 * Closes the popup container.
 */
function closePopUp() {
  popUp = document.getElementById("popupContainer");
  popUp.classList.add("d-none");
  addPopUp = document.getElementById("addContactPopUp");
  addPopUp.classList.add("d-none");
  editPopUp = document.getElementById("editContactPopUp");
  addPopUp.classList.add("d-none");
  popUp.classList.remove("flex");
  loadContacts();
}

/**
 * Resets input fields in the add contact popup.
 */
function resetAddInput() {
  let name = document.getElementById("addName");
  let email = document.getElementById("addEmail");
  let phone = document.getElementById("addPhone");
  name.value = "";
  email.value = "";
  phone.value = "";
}

/**
 * Loads information of a member into the edit contact popup.
 * @param {number} i - Index of the contact.
 */
function loadMemberInfo(i) {
  loadContacts();
  let name = document.getElementById("editName");
  let email = document.getElementById("editEmail");
  let phone = document.getElementById("editPhone");
  name.value = contacts[i].name;
  email.value = contacts[i].email;
  phone.value = contacts[i].phone;
}

/**
 * Updates contact information.
 * @param {number} i - Index of the contact.
 * @param {Event} event - The event triggering the function.
 */
async function updateContactsInfo(i, event) {
  event.preventDefault();
  let contactId = sortedContacts[i].id;
  let updatedContact = {
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    color: contacts[i]["color"],
  };
  await updateContactData("/contacts", contactId, updatedContact);
  await loadContacts();
  renderContacts();
  closePopUp();
  openUserInformation(i, sortedContacts, getMemberInitials(sortedContacts, i));
  highlightUsercard(i);
}

async function updateContactData(path = "", contactId, updatedContact) {
  const response = await fetch(`${BASE_URL}${path}/${contactId}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  });
}

async function addContact() {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  let contacts = {
    name: addName.value,
    email: addEmail.value,
    phone: addPhone.value,
  };
  contacts.color = backgroundColors[randomIndex];
  await postData("/contacts", contacts);
  await loadContacts();
  renderContacts();
  closePopUp();
}


/**
 * Opens contact options for mobile.
 * @param {number} i - Index of the contact.
 */
function openContatOptions(i) {
  document.getElementById("contactOptionsMobile").style.display = "flex";
  document.getElementById("openEditMobile").onclick = function () {
    openEditContactPopUp(`${i}`);
  };
  document.getElementById("deleteMobile").onclick = function () {
    deleteContact(i, sortedContacts);
  };
  openContactOptionsMobile = true;
  event.stopPropagation();
}

/**
 * Event listener for closing the contact options for mobile.
 * Closes the mobile contact options when clicking outside.
 * @param {Event} event - The event triggering the function.
 */
document.addEventListener("click", function (event) {
  if (openContactOptionsMobile) {
    let contactOptionsMobile = document.getElementById("contactOptionsMobile");
    if (!contactOptionsMobile.contains(event.target)) {
      contactOptionsMobile.style.display = "none";
    }
    openContactOptionsMobile = false;
  }
});

/**
 * Event listener for closing the add contact popup.
 * Closes the add contact popup when clicking outside.
 * @param {Event} event - The event triggering the function.
 */
document.addEventListener("click", function (event) {
  if (openAddPopupContainer) {
    let popUp = document.getElementById("popupContainer");
    let addpopUp = document.getElementById("addContactPopUp");
    let editpopUp = document.getElementById("editContactPopUp");
    if (!addpopUp.contains(event.target)) {
      addpopUp.classList.add("d-none");
      popUp.classList.add("d-none");
      editpopUp.classList.add("d-none");
      popUp.classList.remove("flex");
      openAddPopupContainer = false;
    }
  }
});

/**
 * Event listener for closing the edit contact popup.
 * Closes the edit contact popup when clicking outside.
 * @param {Event} event - The event triggering the function.
 */
document.addEventListener("click", function (event) {
  if (openEditPopupContainer) {
    let popUp = document.getElementById("popupContainer");
    let addpopUp = document.getElementById("addContactPopUp");
    let editpopUp = document.getElementById("editContactPopUp");
    if (!editpopUp.contains(event.target)) {
      addpopUp.classList.add("d-none");
      popUp.classList.add("d-none");
      editpopUp.classList.add("d-none");
      popUp.classList.remove("flex");
      openEditPopupContainer = false;
    }
  }
});
