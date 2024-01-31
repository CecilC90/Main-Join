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

function addLoggedInUser(userInfos) {
  let name = userInfos.name;
  loggedInUser.push(name);
  console.log(name);
  saveLoggedInUser();
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
    let splitName = loggedInUser[0].split(" ");
    let initials = splitName[0].charAt(0)+splitName[1].charAt(0);
    userIcon.innerHTML = `${initials}`;
  }
}

function logoutUser() {
  let logoutUser = loggedInUser.splice(0, 1); 
  saveLoggedInUser();
  openPage('index');
}

function showSelectedButton(selected){
  document.getElementById(selected).classList.replace('menuButton', 'selectedMenuButton');
}

function openPage(page){
  window.location.href = page + ".html";
}

function userNavbar() {
  let navbar = document.getElementById('popUpUser');
        navbar.classList.toggle('d-none');
}