//const STORAGE_TOKEN = "8XAOGSERHAHOR91S5HD7SD3UXKY6BFJ9FGXIYEQ7";
//const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
const BASE_URL = "https://joinstorage-4b6b8-default-rtdb.europe-west1.firebasedatabase.app/";

let loggedInUser = {};
let userNavbarOpen = false;


async function getData(path="") {
  let response = await fetch(BASE_URL + path + ".json");
  let responsToJason = await response.json();
  console.log(responsToJason);
}

/**
 * the function checks whether you are authorized to go to the page and if not you are taken back to index.html
 * 
 */
async function checkloggedInUser() {
  if (loggedInUser['name'] == undefined && (window.location.pathname.includes("policy.html") || window.location.pathname.includes("legality.html"))) {
    document.getElementById('menuButtonContainer').style.display = "none";
    document.getElementById('mobile-navbar').innerHTML= "";
  } else {
    if (loggedInUser['name'] == undefined) {
      window.location.href = "index.html";
    }
  }
}

/**
 * the function downloads html templates
 * 
 */
async function includesHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else element.innerHTML = `<b>"${file}"</b> not found!`;
  }
}


/**
 * the function reads data from the backend
 * 
 * @param {string} key the key is for which data should be loaded from the backend
 * @returns {string} gives the content from the back
 */
async function getItem(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}


/**
 * the function prepares the data for saving
 * 
 * @param {JSON} userInfos contains the data email and name
 */
function addLoggedInUser(userInfos) {
  let email = userInfos.email;
  let name = userInfos.name;
  loggedInUser.name = name;
  loggedInUser.email = email;
  saveLoggedInUser();
}

/**
 * prepares data for guest access
 * 
 */
function addLoggedInGuest() {
  loggedInUser.name = "Guest";
  saveLoggedInUser();
  window.location.href = "summary.html?msg=Login erfolgreich";
}

/**
 * Saves the data in the local storage
 * 
 */
function saveLoggedInUser() {
  let loggedInUserAsText = JSON.stringify(loggedInUser);
  localStorage.setItem('loggedInUser', loggedInUserAsText);
}

/**
 * loads the data from the local storage
 * 
 */
function loadLoggedInUser() {
  let loggedInUserAsText = localStorage.getItem('loggedInUser');
  if (loggedInUserAsText) {
    loggedInUser = JSON.parse(loggedInUserAsText);
  }
  checkloggedInUser();
  showUserInitials();
}

async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return (responseToJson = await response.json());
}

/**
 * shows the logged in user in header 
 * 
 */
function showUserInitials() {
  let userIcon = document.getElementById('Initial');
  if (loggedInUser.name) {
    if (loggedInUser.name.includes("Guest")) {
      let initials = "Guest";
      userIcon.innerHTML = `${initials.charAt(0).toUpperCase()}`;
    } else {
      let splitName = loggedInUser.name.split(" ");
      if (splitName.length >= 2) {
        let initials = splitName[0].charAt(0) + splitName[1].charAt(0);
        userIcon.innerHTML = `${initials.toUpperCase()}`;
      }
    }
  } else {
    userIcon.innerHTML = '';
  }
}

/**
 * Logs the user out and redirects to index.html
 * 
 */
function logoutUser() {
  loggedInUser = {};
  saveLoggedInUser();
  openPage('index');
}

/**
 * goes back one page
 * 
 */
function goBack() {
  window.history.back();
}

/**
 * Shows which menu item is selected in the menu on the left
 * 
 * @param {string} selected the ID of the button must be inserted at the start of the respective page.
 */
function showSelectedButton(selected) {
  document.getElementById(selected).classList.replace('menuButton', 'selectedMenuButton');
  document.getElementById(selected + 'Mobile').classList.add('selectedMobileMenuButton');
}

/**
 * Shows which menu item is selected in the menu on the bottom
 * 
 * @param {string} selected the ID of the button must be inserted at the start of the respective page.
 */
function showFooterButton(selected) {
  document.getElementById(selected).classList.replace('menuFooterButton', 'selectedFooterButton');
}
/**
 * opens a url
 * 
 * @param {string} page must include the url without .html
 */
function openPage(page) {
  window.location.href = page + ".html";
}

/**
 * opens the menu in the header
 * 
 */
function userNavbar() {
  let navbar = document.getElementById('popUpUser');
  navbar.style.display = 'flex';
  userNavbarOpen = true;
  event.stopPropagation();
}
/**
 * closes the menu in the header
 * 
 */
document.addEventListener('click', function (event) {
  if (userNavbarOpen) {
    let navbar = document.getElementById('popUpUser');
    if (!navbar.contains(event.target)) {
      navbar.style.display = 'none';
    }
    userNavbarOpen = false;
  }
});

/**
 * Loads contacts from storage.
 * @returns {Promise<void>}
 */
async function loadContacts(path = "/contacts") {
  let response = await fetch(BASE_URL + path + ".json");
  let data = await response.json();

  contacts = Object.keys(data).map((key) => {
    let contact = data[key];
    contact.id = key;
    return contact;
  });
  console.log(contacts);
}

async function loadTasks(path = "/tasks") {
  let response = await fetch(BASE_URL + path + ".json");
  let data = await response.json();

  todos = Object.keys(data).map((key) => {
    let todo = data[key];
    todo.id = key;
    console.log(todo.id);
    todo.subtask = todo.subtask || [];
    todo.assignedContacts = todo.assignedContacts || [];
    return todo;
  });
  console.log(todos);
}

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}