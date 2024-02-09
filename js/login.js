let backgroundColors = [
  '#ff0000', // Rot
  '#00ff00', // Grün
  '#0000ff', // Blau
  '#ffff00', // Gelb
  '#ff00ff', // Magenta
  '#00ffff', // Cyan
  '#ff9900', // Orange
  '#9900ff', // Lila
  '#009900', // Dunkelgrün
  '#990000', // Dunkelrot
  '#ffcc00', // Goldgelb
  '#cc66ff', // Flieder
  '#0099cc', // Türkis
  '#ff6699', // Rosa
  '#663300', // Braun
  '#99cc00', // Olivgrün
  '#6600cc', // Indigo
  '#ff9966', // Pfirsich
  '#336600', // Dunkelgrün
  '#cc0000', // Dunkelrot
];
let contacts = [];
let privacyPolic = false;
let rememberMe = false;

document.addEventListener("DOMContentLoaded", function () {
  var slideImage = document.getElementById("slideImage");
  var content = document.getElementById("content");
  var loginMaskContainer = document.getElementById("loginMaskContainer");
  var initialTop = window.innerHeight / 2 - slideImage.clientHeight / 2;
  var initialLeft = window.innerWidth / 2 - slideImage.clientWidth / 2;
  var slideImageColors = document.querySelectorAll(".slideImageColor");
  if (window.innerWidth >= 750) {
    slideImage.style.top = initialTop + "px";
    slideImage.style.left = initialLeft + "px";
    slideImageColors.forEach(function (path) {
      path.setAttribute("fill", "#2A3647");
    });
    setTimeout(function () {
      slideImage.style.top = "80px";
      slideImage.style.left = "77px";
      slideImage.style.transform = "translate(0, 0) scale(1)";
      slideImage.style.width = "100.03px";
      slideImage.style.height = "121.97px";
      content.style.opacity = 1;
      loginMaskContainer.style.opacity = 1;
    }, 500);
  } else {
    slideImage.style.top = initialTop + "px";
    slideImage.style.left = initialLeft + "px";
    setTimeout(function () {
      slideImage.style.top = "37px";
      slideImage.style.left = "38px";
      slideImage.style.transform = "translate(0, 0) scale(1)";
      slideImage.style.width = "64px";
      slideImage.style.height = "78.03px";
      content.style.opacity = 1;
      loginMaskContainer.style.opacity = 1;
      document.body.style.backgroundColor = "#F6F7F8";
      slideImageColors.forEach(function (path) {
        path.setAttribute("fill", "#2A3647");
      });
    }, 500);
  }
});

function renderStartPage() {
  let content = document.getElementById("loginMaskContainer");
  content.innerHTML = renderStartPageHTML();
  let singUpButton = document.getElementById("signUpButtonContainer");
  singUpButton.innerHTML = renderSingUpButtonHTML();
}

function renderRegistrationPage() {
  document.getElementById("signUpButtonContainer").innerHTML = "";
  let content = document.getElementById("loginMaskContainer");
  content.innerHTML = renderRegistrationPageHTML();
}

window.addEventListener("resize", setLogoPosition);

function setLogoPosition() {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 750) {
    slideImage.style.top = "37px";
    slideImage.style.left = "38px";
    slideImage.style.transform = "translate(0, 0) scale(1)";
    slideImage.style.width = "64px";
    slideImage.style.height = "78.03px";
    document.body.style.backgroundColor = "#F6F7F8";
  } else {
    slideImage.style.top = "80px";
    slideImage.style.left = "77px";
    slideImage.style.transform = "translate(0, 0) scale(1)";
    slideImage.style.width = "100.03px";
    slideImage.style.height = "121.97px";
    document.body.style.backgroundColor = "#F6F7F8";
  }
}

async function login() {
  document.getElementById("logInButton").disable = true;
  showEmailNotExisting(false);
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let respons = await getItem(email.value);
  let userInfos;
  if (respons != undefined) {
    userInfos = JSON.parse(respons);
    let userPassword = userInfos.password;
    if (password.value == userPassword) {
      window.location.href = "summary.html?msg=Login erfolgreich";   
      addLoggedInUser(userInfos);
    } else {
      showLoginWorngPassword();
    }
    document.getElementById("logInButton").disable = false;
  } else {
    showEmailNotExisting(true);
  }
}

async function addUser() {
  showEmailAlreadyUsed(false);
  document.getElementById("registrationButton").disable = true;
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let password = document.getElementById("password");
  let checkPasswort = document.getElementById("confirmPasswort");
  let userInfos = { name: name.value, password: password.value, email: email.value, id: new Date().getTime() };
  let respons = await getItem(email.value);
  let loadUserEmail;
  if (respons != undefined) {
    loadUserEmail = JSON.parse(respons);
  }
  if (!loadUserEmail) {
    if (password.value == checkPasswort.value) {
      if(privacyPolic){
        showSignUpfinished();
        await setItem(email.value, userInfos);
        await addContact();
        setTimeout(goToStart, 500);
      }
    } else {
      showPasswordNotConfirm();
      document.getElementById("registrationButton").disable = false;
    }
  } else {
    showEmailAlreadyUsed(true);
    document.getElementById("registrationButton").disable = false;
  }
}

async function addContact() {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  await loadContacts();
  contacts.push({
      id: Date.now(),
      name: formatName(),
      email: document.getElementById("email").value,
      phone: '',
      color: backgroundColors[randomIndex],
      active: true,
  });
  await setItem('contacts', JSON.stringify(contacts));
}

async function loadContacts() {
  contacts = JSON.parse(await getItem('contacts'));
}

function formatName() {
  let name = document.getElementById("name");
  name = name.value.split(/[,.]/);
  for (var i = 0; i < name.length; i++) {
      name[i] = name[i].trim();
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
  }
  var formattedname = name.join(' ');
  return formattedname;
}

function goToStart(){
  dontshowSignUpfinished();
  renderStartPage();
}

function showLoginWorngPassword() {
  let textField = document.getElementById("wrongPasswordText");
  textField.innerHTML = "Wrong password Ups! Try again.";
  document.getElementById("inputPasswordField").classList.add("wrongInput");
}

function showPasswordNotConfirm() {
  let textField = document.getElementById("passwordNotConfirmText");
  textField.innerHTML = "Ups! your password don’t match";
  document.getElementById("inputPasswordField").classList.add("wrongInput");
}

function showEmailAlreadyUsed(email) {
  if (email == true) {
    document.getElementById("inputEmailField").classList.add("wrongInput");
  } else {
    document.getElementById("inputEmailField").classList.remove("wrongInput");
  }
}

function showEmailNotExisting(email) {
  if (email == true) {
    document.getElementById("inputEmailField").classList.add("wrongInput");
  } else {
    document.getElementById("inputEmailField").classList.remove("wrongInput");
  }
}

function setRememberMe(){
  let content = document.getElementById('rememberMeCheckbox');
  if(rememberMe){
    content.src = '/assets/img/checkbox_unchecked.svg'
    rememberMe = false;
  } else {
    content.src = '/assets/img/checkbox_checked.svg'
    rememberMe = true;
  }
}

function setPrivacyPolic(){
  let content = document.getElementById('privacyPolicCheckbox');
  if(privacyPolic){
    content.src = '/assets/img/checkbox_unchecked.svg'
    privacyPolic = false;
  } else {
    content.src = '/assets/img/checkbox_checked.svg'
    privacyPolic = true;
  }
}

function showSignUpfinished() {
  var conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "flex";
  conatiner.style.bottom = "calc(50% - " + conatiner.clientHeight / 2 + "px)";
}

function dontshowSignUpfinished() {
  var conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "none";
}

