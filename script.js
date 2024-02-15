const STORAGE_TOKEN = "8XAOGSERHAHOR91S5HD7SD3UXKY6BFJ9FGXIYEQ7";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let loggedInUser = {};
let userNavbarOpen = false;

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

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) });
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json()).then(res => res.data.value).catch(function (err) {
    console.log('fetch konnte nicht aufgeührt werden');
  });;
}

function addLoggedInUser(userInfos) {
  let email = userInfos.email;
  let name = userInfos.name;
  loggedInUser.name = name;
  loggedInUser.email = email;
  saveLoggedInUser();
}

function addLoggedInGuest() {
  loggedInUser.name = "Guest";
  saveLoggedInUser();
  window.location.href = "summary.html?msg=Login erfolgreich";
}



function saveLoggedInUser() {
  let loggedInUserAsText = JSON.stringify(loggedInUser);
  localStorage.setItem('loggedInUser', loggedInUserAsText);
}

function loadLoggedInUser() {
  let loggedInUserAsText = localStorage.getItem('loggedInUser');
  if (loggedInUserAsText) {
    loggedInUser = JSON.parse(loggedInUserAsText);
  }
  checkloggedInUser();
  showUserInitials();
}

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

function logoutUser() {
  loggedInUser = {};
  saveLoggedInUser();
  openPage('index');
}

function goBack() {
  window.history.back();
}

function showSelectedButton(selected) {
  document.getElementById(selected).classList.replace('menuButton', 'selectedMenuButton');
  document.getElementById(selected + 'Mobile').classList.add('selectedMobileMenuButton');
}

function showFooterButton(selected) {
  document.getElementById(selected).classList.replace('menuFooterButton', 'selectedFooterButton');
}

function openPage(page) {
  window.location.href = page + ".html";
}

function userNavbar() {
  let navbar = document.getElementById('popUpUser');
  navbar.style.display = 'flex';
  userNavbarOpen = true;
  event.stopPropagation();
}

document.addEventListener('click', function (event) {
  if (userNavbarOpen) {
    let navbar = document.getElementById('popUpUser');
    if (!navbar.contains(event.target)) {
      navbar.style.display = 'none';
    }
    userNavbarOpen = false;
  }
});