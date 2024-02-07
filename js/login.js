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
      document.body.style.backgroundColor = "#FFF";
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

window.addEventListener("resize", checkScreenWidth);

function checkScreenWidth() {
  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth <= 750) {
    slideImage.style.top = "37px";
    slideImage.style.left = "38px";
    slideImage.style.transform = "translate(0, 0) scale(1)";
    slideImage.style.width = "64px";
    slideImage.style.height = "78.03px";
    document.body.style.backgroundColor = "#FFF";
  } else {
    slideImage.style.top = "80px";
    slideImage.style.left = "77px";
    slideImage.style.transform = "translate(0, 0) scale(1)";
    slideImage.style.width = "100.03px";
    slideImage.style.height = "121.97px";
    document.body.style.backgroundColor = "#FFF";
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
      console.log("login erfolgreich");
      window.location.href = "summary.html?msg=Login erfolgreich";      //Weiterleitung zur summary mit msg
      //funktion um den User nach erfolgreichen Login zu speichern
      addLoggedInUser(userInfos);
      //openPage("summary");                                            // Wird nicht benötigt aufgrund von Zeile 88
    } else {
      console.log("passwort ist nicht korrekt");
      showLoginWorngPassword();
    }
    document.getElementById("logInButton").disable = false;
  } else {
    showEmailNotExisting(true);
    console.log("Email noch nicht vorhanden");
  }
}

/*function greetingMobile() {
  if (window.innerWidth < 608) {
    document.getElementById('greetingContainer').classList.remove('d-none');
  }
}*/


async function addUser() {
  showEmailAlreadyUsed(false);
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
      document.getElementById("registrationButton").disable = true;
      await setItem(email.value, userInfos);
      console.log("User wurde angelegt und der Fehler kommt weil die Email noch nicht in der Datenbank war!");
      document.getElementById("registrationButton").disable = false;
      renderStartPage();
    } else {
      showPasswordNotConfirm();
    }
  } else {
    console.log("E-Mail wurde schon verwendet");
    showEmailAlreadyUsed(true);
  }
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

// function clearLogInFilds(){
//   let email = document.getElementById('email');
//   email.value = '';
// }
