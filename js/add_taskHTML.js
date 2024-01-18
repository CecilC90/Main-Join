function renderAssingnedToDropdownListHTML(i, firstAndSecondLetter) {
  return /*html */ `
    <div class="dropdownContacts" id="dropdownContact${i}" onclick="setContactSelected(${i})">
      <div class="dropdownContactNameConatiner">
        <div class="contactsIcon">${firstAndSecondLetter}</div>
        <p>${contacts[i]['name']}</p>
      </div>
      <img id="dropdownContactImg${i}" src="/assets/img/checkbox_unchecked.svg" alt="checkbox_unchecked">
    </div>
  `;
}

function renderCategoryDropdownListHTML(i){
  return /* html */ `
    <div class="dropdownCategory" onclick="setSelectedCategory(${i})">
      <p>${category[i]}</p>
    </div>
  `;
}
