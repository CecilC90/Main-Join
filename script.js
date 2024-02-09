const STORAGE_TOKEN = "4EFBXYBGE7QJD8SZ3C5H1CD589HBSZGJ38CGAPOM";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let loggedInUser = [];


function init() {
  renderStartPage();
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
  const payload = { key, value, token: STORAGE_TOKEN }; //wenn key und key gleich sind kann man es aus weg lassen { key, value, token:STORAGE_TOKEN}
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) });
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json()).then(res => res.data.value).catch(function (err) {
    console.log('fetch konnte nicht aufgeührt werden');
  });;
}

function addLoggedInUser(userInfos) {
  let name = userInfos.name;
  loggedInUser.push(name);
  console.log(name);
  saveLoggedInUser();
}

function addLoggedInGuest() {
  let guest = "Guest";
  loggedInUser.push(guest);
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
  showUserInitials();
}

function showUserInitials() {
  let userIcon = document.getElementById('Initial');
  if (loggedInUser) {
    if (loggedInUser.includes("Guest")) {
      let initials = "Guest";
      userIcon.innerHTML = `${initials.charAt(0).toUpperCase()}`;
    } else {
      let splitName = loggedInUser[0].split(" ");
      let initials = splitName[0].charAt(0) + splitName[1].charAt(0);
      userIcon.innerHTML = `${initials.toUpperCase()}`;
    }
  }
}

function logoutUser() {
  logoutUser = loggedInUser.splice(0, 1);
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

function showFooterButton(selected){
  document.getElementById(selected).classList.replace('menuFooterButton', 'selectedFooterButton');
}

function openPage(page) {
  window.location.href = page + ".html";
}

function userNavbar() {
  let navbar = document.getElementById('popUpUser');

  // Überprüfe, ob das Element aktuell sichtbar ist
  if (navbar.style.display === 'flex') {
    // Wenn sichtbar, setze den Stil auf 'none' (versteckt)
    navbar.style.display = 'none';
  } else {
    // Wenn nicht sichtbar, setze den Stil auf 'flex' (sichtbar)
    navbar.style.display = 'flex';
  }
}
