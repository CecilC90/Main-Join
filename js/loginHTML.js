function renderStartPageHTML() {
  return `
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
            <input type="password" placeholder="password" id="password" required />
            <img src="./assets/img/lock.svg" alt="" />
          </div>
        </div>
        <p class="wrongPasswordText" id="wrongPasswordText"></p>
        <div class="rememberMeContainer">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
      </div>
      <div class="loginButtonContainer">
        <button class="buttonDarg" id="logInButton">Log in</button>
        <button class="buttonLight" onclick="openPage('summary')">Guest Log in</button>
      </div>
    </form> 
  `;
}

function renderSingUpButtonHTML() {
  return `
      <p>Not a Join user?</p>
      <button class="buttonDarg" onclick="renderRegistrationPage()">Sign up</button>
    `;
}

function renderRegistrationPageHTML() {
  return `
   <form class="loginMask" onsubmit="addUser(); return false;">
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
           <input type="email" placeholder="Email" id="email" required />
           <img src="./assets/img/mail.svg" alt="" />
         </div>
         <div class="inputField">
           <input type="password" placeholder="Password" id="password" required />
           <img src="./assets/img/lock.svg" alt="" />
         </div>
         <div class="inputField" id="inputPasswordField">
           <input type="password" placeholder="Confirm Password" id="confirmPasswort" required />
           <img src="./assets/img/lock.svg" alt="" />
         </div>
       </div>
       <p class="passwordNotConfirmText" id="passwordNotConfirmText"></p>
       <div class="acceptPrivacyPolicContainer">
         <input type="checkbox" />
         <p>I accept the <a href="">Privacy Polic</a></p>
       </div>
     </div>
     <div class="loginButtonContainer">
       <button class="buttonDarg" id="registrationButton">Sign up</button>
     </div>
   </form>
  `;
}
