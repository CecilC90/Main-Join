function renderStartPageHTML() {
  return /* html */ `
    <form class="loginMask" onsubmit="login(); return false;">
      <div class="loginHeadline">
        <h1>Log in</h1>
        <img src="./assets/img/underlin_login.svg" alt="underlined" />
      </div>
      <div class="inputFieldsContainer">
        <div class="inputFieldsLogin">
          <div class="inputField" id="inputEmailField">
            <input type="email" placeholder="Email" id="email" required />
            <img src="./assets/img/mail.svg" alt="" />
          </div>
          <div class="inputField" id="inputPasswordField">
            <input type="password" placeholder="password" id="password" onkeyup="changePasswordIcon('passwordIconContainer', 'password', 'loginPassword')" required />
            <div id="passwordIconContainer">
              <img id="passwordIcon" src="./assets/img/lock.svg" alt="" />
            </div>
          </div>
        </div>
        <p class="wrongPasswordText" id="wrongPasswordText"></p>
        <div class="rememberMeContainer">
          <img onclick="setRememberMe()" class="checkbox" id="rememberMeCheckbox" src="/assets/img/checkbox_unchecked.svg" alt="checkbock">
          <p>Remember me</p>
        </div>
      </div>
      <div class="loginButtonContainer">
        <button class="buttonDarg" id="logInButton">Log in</button>
        <button class="buttonLight" onclick="addLoggedInGuest()">Guest Log in</button>
      </div>
    </form> 
  `;
}

function passwordLockIcon() {
  return /* html */ `
    <img id="passwordIcon" src="./assets/img/lock.svg" alt="lock Icon" />
  `;
}

function passwordVisibilityOffIcon(iconId, inputField){
  return /* html */ `
    <img id="passwordIcon" class="passwordIcon" onclick="showPasswordClearText('${iconId}', '${inputField}')" src="./assets/img/password_visibility_off.svg" alt="" />
  `;
}

function passwordVisibilityOnIcon(iconId, inputField){
  return /* html */ `
    <img id="passwordIcon" class="passwordIcon" onclick="showPasswordClearText('${iconId}', '${inputField}')" src="./assets/img/password_visibility_on.svg" alt="" />
  `;
}

function renderSingUpButtonHTML() {
  return `
      <p>Not a Join user?</p>
      <button class="buttonDarg" onclick="renderRegistrationPage()">Sign up</button>
    `;
}

function renderRegistrationPageHTML() {
  return /* html */ `
   <form class="registrationMask" onsubmit="addUser(); return false;">
     <div class="registrationHeadlineContainer">
       <img class="registrationBackIcon" src="./assets/img/arrow-left-line.svg" alt="" onclick="renderStartPage()">
       <div class="registrationHeadline">
         <h1>Sing Up</h1>
         <img src="./assets/img/underlin_login.svg" alt="underlined" />
       </div>
     </div>
     <div class="inputFieldsContainer">
       <div class="inputFieldsRegistration">
         <div class="inputField">
           <input type="text" placeholder="Name" id="name" required />
           <img src="./assets/img/person.svg" alt="" />
         </div>
         <div class="inputField" id="inputEmailField">
           <input type="email" placeholder="Email" id="email" onkeyup="showEmailAlreadyUsed(false)" required />
           <img src="./assets/img/mail.svg" alt="" />
         </div>
         <div class="inputField">
           <input type="password" placeholder="Password" id="password" onkeyup="changePasswordIconRegistration('passwordIconContainer', 'password')" required />
           <div id="passwordIconContainer">
            <img src="./assets/img/lock.svg" alt="" />
           </div>
         </div>
         <div class="inputField" id="inputPasswordField">
           <input type="password" placeholder="Confirm Password" id="confirmPasswort" onkeyup="changePasswordIconRegistrationConfirm('confirmPasswordIconContainer', 'confirmPasswort')" required />
           <div id="confirmPasswordIconContainer">
            <img src="./assets/img/lock.svg" alt="" />
           </div>
         </div>
       </div>
       <p class="passwordNotConfirmText" id="passwordNotConfirmText"></p>
       <div class="acceptPrivacyPolicContainer">
         <img onclick="setPrivacyPolic()" class="checkbox" id="privacyPolicCheckbox" src="/assets/img/checkbox_unchecked.svg" alt="checkbock">
         <p>I accept the <a href="">Privacy Polic</a></p>
       </div>
     </div>
     <div class="loginButtonContainer">
       <button class="buttonDarg" id="registrationButton">Sign up</button>
     </div>
   </form>
  `;
}
