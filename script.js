const STORAGE_TOKEN = "4EFBXYBGE7QJD8SZ3C5H1CD589HBSZGJ38CGAPOM";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

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