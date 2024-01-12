const STORAGE_TOKEN = "4EFBXYBGE7QJD8SZ3C5H1CD589HBSZGJ38CGAPOM";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

function init() {
  renderStartPage();
}

async function includesHTML() {
<<<<<<< HEAD
    let includeElements = document.querySelectorAll("[w3-include-html]"); // holt sich alle Elemete mit dem Attribute w3-include-html
    for (let i = 0; i < includeElements.length; i++) { // geht durch alle Attribute durch
      const element = includeElements[i]; 
      let file = element.getAttribute("w3-include-html"); // setzt den Pfad in die Variabel File "includes/header.html"
      let resp = await fetch(file); // läde das File in die Variabel resp
      if (resp.ok) { // wenn das laden ok war
        element.innerHTML = await resp.text(); // setzt er den resp in text um und fügt im in das elemet mit dem Attribute
      } else 
        element.innerHTML = `<b>"${file}"</b> not found!`; // wenn die datei nicht gefunden wurde wird das angezeigt
    }
=======
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
>>>>>>> 905756547507ff25705befc336fd53d0c56b4341
}