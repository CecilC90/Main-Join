function renderAssingnedToDropdownListHTML(i) {
  return `
    <div class="dropdownContacts">
      <p>${contacts[i]}</p>
      <input type="checkbox" />
    </div>
  `;
}

function renderCategoryDropdownListHTML(i){
  return `
    <div class="dropdownCategory">
      <p>${category[i]}</p>
    </div>
  `;
}
