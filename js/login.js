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
let contacts = [];
let privacyPolic = false;
let rememberMe = false;
let saveRememberMeJson = [];
let loadRememberMeJson = [];
let loginPassword = false;
let registrationPassword = false;
let registrationConfirmPassword = false;
/**
 * launches the page
 *
 */
function init() {
  renderStartPage();
  changePasswordIconLogin("passwordIconContainer", "password");
}
/**
 * Load the start page to log in
 *
 */
function renderStartPage() {
  let content = document.getElementById("loginMaskContainer");
  content.innerHTML = renderStartPageHTML();
  let singUpButton = document.getElementById("signUpButtonContainer");
  singUpButton.innerHTML = renderSingUpButtonHTML();
  loadRememberedUser();
}

/**
 * change the login page to the registration page
 *
 */
function renderRegistrationPage() {
  document.getElementById("signUpButtonContainer").innerHTML = "";
  let content = document.getElementById("loginMaskContainer");
  content.innerHTML = renderRegistrationPageHTML();
}

/**
 * triggers the logo slide in the desktop and mobile version
 *
 */
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
  } else if (window.innerHeight <= 700) {
    slideImage.style.top = initialTop + "px";
    slideImage.style.left = initialLeft + "px";
    setTimeout(function () {
      slideImage.style.top = "8px";
      slideImage.style.left = "16px";
      slideImage.style.transform = "translate(0, 0) scale(1)";
      slideImage.style.width = "54px";
      slideImage.style.height = "68.03px";
      content.style.opacity = 1;
      loginMaskContainer.style.opacity = 1;
      document.body.style.backgroundColor = "#F6F7F8";
      slideImageColors.forEach(function (path) {
        path.setAttribute("fill", "#2A3647");
      });
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

/**
 * starts the function setLogoPosition when changing the page width
 *
 */
window.addEventListener("resize", setLogoPosition);

/**
 * changes the position of the logo when changing the page width
 *
 */
function setLogoPosition() {
  let screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
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

/**
 * checks the login input data with the backend
 *
 */
async function login() {
  document.getElementById("logInButton").disable = true;
  showEmailNotExisting(false);
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let userInfosData = await getItem(`/userInfos`);

  CheckInfoData(userInfosData, email, password);
}

function CheckInfoData(userInfosData, email, password) {
  for (let key in userInfosData) {
    if (userInfosData[key].email === email) {
      userInfos = userInfosData[key];
      break;
    }
  }

  processLogin(email, password, userInfos);
}

function processLogin(email, password, userInfos) {
  if (userInfos) {
    if (password === userInfos.password) {
      handleRememberMe(email, password);
      window.location.href = "summary.html?msg=Login erfolgreich";
      addLoggedInUser(userInfos);
    } else {
      showLoginWorngPassword();
    }
  } else {
    showEmailNotExisting(true);
  }
}

/**
 * change the icon of the password if one is entered and make it visible when clicking on it
 *
 * @param {string} iconId the id of the conatiner with the icon
 * @param {string} inputField the id of the conatiner with the password
 */
function changePasswordIconLogin(iconId, inputField) {
  let content = document.getElementById(iconId);
  let inputfield = document.getElementById(inputField).value;
  if (inputfield.length == 0) {
    document.getElementById(inputField).type = "password";
    loginPassword = false;
    content.innerHTML = passwordLockIcon();
  }
  if (inputfield.length > 0 && loginPassword == false) {
    loginPassword = true;
    content.innerHTML = passwordVisibilityOffIcon(iconId, inputField);
  }
}

/**
 * change the icon of the password if one is entered and make it visible when clicking on it
 *
 * @param {string} iconId the id of the conatiner with the icon
 * @param {string} inputField the id of the conatiner with the password
 */
function changePasswordIconRegistration(iconId, inputField) {
  let content = document.getElementById(iconId);
  let inputfield = document.getElementById(inputField).value;
  if (inputfield.length == 0) {
    document.getElementById(inputField).type = "password";
    registrationPassword = false;
    content.innerHTML = passwordLockIcon();
  }
  if (inputfield.length > 0 && registrationPassword == false) {
    registrationPassword = true;
    content.innerHTML = passwordVisibilityOffIcon(iconId, inputField);
  }
}

/**
 * change the icon of the password if one is entered and make it visible when clicking on it
 *
 * @param {string} iconId the id of the conatiner with the icon
 * @param {string} inputField the id of the conatiner with the password
 */
function changePasswordIconRegistrationConfirm(iconId, inputField) {
  let content = document.getElementById(iconId);
  let inputfield = document.getElementById(inputField).value;
  if (inputfield.length == 0) {
    document.getElementById(inputField).type = "password";
    registrationConfirmPassword = false;
    content.innerHTML = passwordLockIcon();
  }
  if (inputfield.length > 0 && registrationConfirmPassword == false) {
    registrationConfirmPassword = true;
    content.innerHTML = passwordVisibilityOffIcon(iconId, inputField);
  }
}

/**
 * displays the password in plain text
 *
 * @param {string} iconId the id of the conatiner with the icon
 * @param {string} inputField the id of the conatiner with the password
 */
function showPasswordClearText(iconId, inputField) {
  let content = document.getElementById(iconId);
  let inputfield = document.getElementById(inputField);
  if (inputfield.type == "password") {
    inputfield.type = "text";
    content.innerHTML = passwordVisibilityOnIcon(iconId, inputField);
  } else {
    inputfield.type = "password";
    content.innerHTML = passwordVisibilityOffIcon(iconId, inputField);
  }
}

/**
 * writes the data for the remember me in the local storage
 *
 * @param {HTMLElement} email
 * @param {HTMLElement} password
 */
function handleRememberMe(email, password) {
  let rememberMeInfos = {
    email: email,
    password: password,
    rememberMe: rememberMe,
  };
  saveRememberMeJson.push(rememberMeInfos);
  let rememberMeAsText = JSON.stringify(saveRememberMeJson);
  localStorage.setItem("rememberMe", rememberMeAsText);
}

/**
 * load the data for the remember me from the local storage
 *
 */
function loadRememberedUser() {
  let rememberMeAsText = localStorage.getItem("rememberMe");
  if (rememberMeAsText) {
    loadRememberMeJson = JSON.parse(rememberMeAsText);
    if (loadRememberMeJson[0]["rememberMe"]) {
      fillInputFieldsFromUser();
    }
  }
}

/**
 * because the data for the remember me is available, the function enters it in the appropriate fields
 *
 */
function fillInputFieldsFromUser() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  emailInput.value = loadRememberMeJson[0]["email"];
  passwordInput.value = loadRememberMeJson[0]["password"];
  setRememberMe();
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

/**
 * the function writes the data of a new user to the backend and checks the correctness beforehand
 *
 */
async function addUser() {
  showEmailAlreadyUsed(false);
  document.getElementById("registrationButton").disable = true;
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let password = document.getElementById("password");
  let checkPasswort = document.getElementById("confirmPasswort");
  let userInfos = {
    name: name.value,
    password: password.value,
    email: email.value,
  };
  let contactInfos = { name: name.value, email: email.value };
  let userInfosData = await getItem(`/userInfos`);

  CheckSignup(checkPasswort, userInfos, userInfosData, contactInfos);
}

async function CheckSignup(
  checkPasswort,
  userInfos,
  userInfosData,
  contactInfos
) {
  let emailExists = false;

  for (let key in userInfosData) {
    if (userInfosData[key].email === userInfos.email) {
      emailExists = true;
      break;
    }
  }
  if (!emailExists) {
    if (password.value === checkPasswort.value) {
      if (privacyPolic) {
        await postData("/userInfos", userInfos);
        showSignUpfinished();
        await addContact(contactInfos);
        setTimeout(goToStart, 500);
      } else {
        setColorPrivacyPolicRed();
        document.getElementById("registrationButton").disabled = false;
      }
    } else {
      showPasswordNotConfirm();
      document.getElementById("registrationButton").disabled = false;
    }
  } else {
    showEmailAlreadyUsed(true);
    document.getElementById("registrationButton").disabled = false;
  }
}

/**
 * writes the data of a new user into the backend for the contact
 *
 */
async function addContact(userInfos) {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  userInfos.phone = "";
  userInfos.color = backgroundColors[randomIndex];
  //await loadContacts();
  await postData("/contacts", userInfos);
}

/**
 * Loads contacts from the memory and adds them to the global contacts variable.
 * @returns {Promise<void>}
 */
async function loadContacts() {
  let contactsData = await getData("/contacts");
  if (contactsData) {
    contacts.push(...Object.values(contactsData));
  }
  console.log(contacts);
}
/**
 * change the entered name so that it is correctly present in the backend
 *
 * @returns {string}
 */
function formatName() {
  let name = document.getElementById("name");
  name = name.value.split(/[,.]/);
  for (let i = 0; i < name.length; i++) {
    name[i] = name[i].trim();
    name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
  }
  let formattedname = name.join(" ");
  return formattedname;
}

/**
 * goes back to the start page
 *
 */
function goToStart() {
  dontshowSignUpfinished();
  renderStartPage();
}

/**
 * change the border of the login password
 *
 */
function showLoginWorngPassword() {
  let textField = document.getElementById("wrongPasswordText");
  textField.innerHTML = "Wrong password Ups! Try again.";
  document.getElementById("inputPasswordField").classList.add("wrongInput");
}

/**
 * changes the border of the confirm password
 *
 */
function showPasswordNotConfirm() {
  let textField = document.getElementById("passwordNotConfirmText");
  textField.innerHTML = "Ups! your password don’t match";
  document.getElementById("inputPasswordField").classList.add("wrongInput");
}

/**
 * changes the border of the email field when registering
 *
 * @param {boolean} email yes or no whether the border is added or removed
 */
function showEmailAlreadyUsed(email) {
  if (email == true) {
    document.getElementById("inputEmailField").classList.add("wrongInput");
    document.getElementById("errMessageMail").innerHTML = `Email already used`;
  } else {
    document.getElementById("inputEmailField").classList.remove("wrongInput");
  }
}

/**
 * changes the border of the email field when logging in
 *
 * @param {boolean} email yes or no whether the border is added or removed
 */
function showEmailNotExisting(email) {
  if (email == true) {
    document.getElementById("inputEmailField").classList.add("wrongInput");
  } else {
    document.getElementById("inputEmailField").classList.remove("wrongInput");
  }
}

/**
 * checks if privacyPolic is true and if not makes the text red
 *
 */
function setColorPrivacyPolicRed() {
  let content = document.getElementById("acceptPrivacyPolicContainer");
  if (privacyPolic) {
    content.classList.remove("setColorPrivacyPolicRed");
  } else {
    content.classList.add("setColorPrivacyPolicRed");
  }
}

/**
 * changes the checkbox Remember Me
 *
 */
function setRememberMe() {
  let content = document.getElementById("rememberMeCheckbox");
  if (rememberMe) {
    content.src = "./assets/img/checkbox_unchecked.svg";
    rememberMe = false;
  } else {
    content.src = "./assets/img/checkbox_checked.svg";
    rememberMe = true;
  }
}

/**
 * changes the checkbox Privacy Polic
 *
 */
function setPrivacyPolic() {
  let content = document.getElementById("privacyPolicCheckbox");
  if (privacyPolic) {
    content.src = "./assets/img/checkbox_unchecked.svg";
    privacyPolic = false;
  } else {
    content.src = "./assets/img/checkbox_checked.svg";
    privacyPolic = true;
    setColorPrivacyPolicRed();
  }
}

/**
 * lets the message regestrirung fly in successfully
 *
 */
function showSignUpfinished() {
  let conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "flex";
  conatiner.style.bottom = "calc(50% - " + conatiner.clientHeight / 2 + "px)";
}

/**
 * removes the message regestrirung successfully fly in
 *
 */
function dontshowSignUpfinished() {
  var conatiner = document.getElementById("finishedMessageContainer");
  conatiner.style.display = "none";
}
