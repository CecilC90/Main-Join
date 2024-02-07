let contacts = [];

let openContactOptionsMobile = false;
let openUserOverview = false;

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

//--------------------------------------------
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }; //wenn key und key gleich sind kann man es aus weg lassen { key, value, token:STORAGE_TOKEN}
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) });
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value).catch(function (err) {
        console.log('fetch konnte nicht aufgeührt werden');
    });;
}
//--------------------------------------

async function initContacts() {
    await includesHTML();
    
    await loadContacts();
    renderContacts();
    loadLoggedInUser();
    showSelectedButton("contactButton");
}

async function loadContacts() {
    contacts = JSON.parse(await getItem('contacts'));
}

//Eventuelle probleme beim Sortieren der User???

async function renderContacts() {
    sortedContacts = contacts;
    sortedContactList();
    renderContactList(sortedContacts);
}

function sortedContactList() {
    contacts.sort((a, b) => {
        let nameA = a.name.split(' ');
        let nameB = b.name.split(' ');
        let firstLetterA = nameA[0].charAt(0).toUpperCase();
        let firstLetterB = nameB[0].charAt(0).toUpperCase();

        if (firstLetterA < firstLetterB) {
            return -1;
        }
        if (firstLetterA > firstLetterB) {
            return 1;
        }

        return sortSecondName(nameA, nameB);
    });
}

function sortSecondName(nameA, nameB) {
    let secondLetterA = nameA.length > 1 ? nameA[1].charAt(0).toUpperCase() : '';
    let secondLetterB = nameB.length > 1 ? nameB[1].charAt(0).toUpperCase() : '';

    if (secondLetterA < secondLetterB) {
        return -1;
    }
    if (secondLetterA > secondLetterB) {
        return 1;
    }

    return 0;
}

function renderContactList(sortedContacts) {
    let contactlist = document.getElementById('contactsList');
    contactlist.innerHTML = "";
    let currentInitial = null;

    for (let i = 0; i < sortedContacts.length; i++) {
        let sortedContact = sortedContacts[i];
        
        // Überprüfen, ob der Kontakt aktiv ist
        if (sortedContact.active) {
            let firstLetter = getFirstLetter(sortedContacts, i);

            if (firstLetter !== currentInitial) {
                contactlist.innerHTML += renderFirstLetterHTML(firstLetter);
                currentInitial = firstLetter;
            }

            let initials = getMemberInitials(sortedContacts, i);
            contactlist.innerHTML += renderContactsHTML(sortedContacts, i, initials);
        }
    }
}


function getFirstLetter(sortedContacts, i) {
    return sortedContacts[i].name.charAt(0);
}

function getMemberInitials(sortedContacts, i) {
    return sortedContacts[i].name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
}

function renderFirstLetterHTML(firstLetter) {
    return `
    <div class="first-letter">${firstLetter}</div>
    <div class="underline"></div>
    `;
}

function renderContactsHTML(sortedContacts, i, initials) {
    return `
    <div id="userCard${i}" class="user-card" onclick="toggleUserInformation(${i}, sortedContacts, '${initials}')">
        <div class="contact-icon" id="initials" style= background-color:${contacts[i]['color']}>${initials}</div>
        <div class=contact-container>
            <span>${sortedContacts[i].name}</span>
            <span class="email">${sortedContacts[i].email}</span>
        </div>
    <div>
    `;
}

function toggleUserInformation(i, sortedContacts, initials) {
    resetUserCardStyles();
    highlightUsercard(i);
    openUserInformation(i, sortedContacts, initials);
    handleScreenWidth();
    document.getElementById('menuContactMobile').onclick = function () { openContatOptions(i); };
    openUserOverview = true;
}

function handleScreenWidth() {
    if (window.innerWidth < 1280) {
        document.getElementById('contactsContainer').style.display = "none";
        document.getElementById('infoContainer').style.display = "block";
        document.getElementById('menuContactMobile').classList.remove('d-none');
    }
}

function highlightUsercard(i) {
    let mainCard = document.getElementById('userOverview');
    let userCard = document.getElementById(`userCard${i}`);
    userCard.style.backgroundColor = '#2A3647';
    userCard.style.color = 'white';
}

function resetUserCardStyles() {
    let allUserCards = document.querySelectorAll('.user-card');
    allUserCards.forEach(userCard => {
        userCard.style.backgroundColor = '';
        userCard.style.color = '';
    });
}

function closeUserInformation(i) {
    let mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
    openUserOverview = false;
}

function openUserInformation(i, sortedContacts, initials) {
    mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
    mainCard.innerHTML = userInformationHTML(i, sortedContacts, initials);
    document.getElementById('initialsPopUp').innerHTML = `${initials}`;
    document.getElementById('initialsPopUp').style.backgroundColor = contacts[i]['color'];
}

function deleteContact(i, sortedContacts) {
    contacts[i].active = false;
    //sortedContacts.splice(i, 1);
    //setItem('contacts', JSON.stringify(contacts));
    renderContactList(sortedContacts);
    closeUserInformation();
    document.getElementById('contactOptionsMobile').style.display = "none";
    document.getElementById('contactsContainer').style.display = "flex";
    document.getElementById('infoContainer').style.display = "none";
}

function closeMainContact() {
    resetUserCardStyles();
    document.getElementById('contactsContainer').style.display = "flex";
    document.getElementById('infoContainer').style.display = "none";
    document.getElementById('menuContactMobile').style.display = "none";
    document.getElementById('userOverview').innerHTML = "";
}

function userInformationHTML(i, sortedContacts, initials) {
    return `
    <div class="main-head-container">
        <div>
            <div class="main-contact-icon" style= background-color:${contacts[i]['color']}>${initials}</div>
        </div>
        <div>
            <div class="name-container">${sortedContacts[i].name}</div>
            <div class="action-icons-container">
                <div class="edit-delete-container" onclick ="openEditContactPopUp(${i})">
                    <img src="./assets/img/contacts-edit.svg" alt="Edit icon">
                    <span>Edit</span>
                </div>
                <div class="edit-delete-container" onclick="deleteContact(${i}, sortedContacts)">
                    <img src="./assets/img/delete.svg" alt="Delete icon">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
    <div class="contact-info-container">
        <div class="information-headline">Contact Information</div>
        <div class="contact-detail">
            <div class="detail-title">Email</div>
            <div class="detail-email">${sortedContacts[i].email}</div>
        </div>
        <div>
            <div class="detail-title">Phone</div>
            <div class="detail-info">number</div>
        </div>
    </div>
    `;
}

function openAddContactPopUp() {
    popUp = document.getElementById('popupContainer');
    popUp.style.display = "flex";
    editPopUp = document.getElementById('editContactPopUp');
    editPopUp.classList.add('d-none');
    resetAddInput();
}

function closeAddContactPopUp(event) {
    if (event) {
        event.preventDefault();
    }

    popUp = document.getElementById('popupContainer');
    popUp.style.display = "none";
    editPopUp = document.getElementById('editContactPopUp');
    editPopUp.classList.remove('d-none');
}

function openEditContactPopUp(i) {
    popUp = document.getElementById('popupContainer');
    popUp.style.display = "flex";
    addPopUp = document.getElementById('addContactPopUp');
    addPopUp.classList.add('d-none');
    document.getElementById('editButton').onclick = function () { updateContactInfo(i, event); };
    document.getElementById('deleteButton').onclick = function () { deleteContact(i, sortedContacts); };
    loadMemberInfo(i);
    document.getElementById('contactOptionsMobile').style.display = "none";
}

function closeEditContactPopUp() {
    popUp = document.getElementById('popupContainer');
    popUp.style.display = "none";
    addPopUp = document.getElementById('addContactPopUp');
    addPopUp.classList.remove('d-none');
}

function resetAddInput() {
    let name = document.getElementById('addName');
    let email = document.getElementById('addEmail');
    let phone = document.getElementById('addPhone');
    name.value = "";
    email.value = "";
    phone.value = "";
}

function loadMemberInfo(i) {
    let name = document.getElementById('editName');
    let email = document.getElementById('editEmail');
    let phone = document.getElementById('editPhone');
    name.value = contacts[i].name;
    email.value = contacts[i].email;
    phone.value = contacts[i].phone;
}

function updateContactsInfo(i, event) {
    event.preventDefault();

    contacts[i] = {
        id: contacts[i]['id'],
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        color: contacts[i]['color'],
        active: true,
    };

    setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    renderContacts();
    closeEditContactPopUp();
    mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
}

async function addContact() {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);

    contacts.push({
        id: Date.now(),
        name: addName.value,
        email: addEmail.value,
        phone: addPhone.value,
        color: backgroundColors[randomIndex],
        active: true,
    });

    await setItem('contacts', JSON.stringify(contacts));
    renderContacts()
    closeAddContactPopUp();
}

function openContatOptions(i) {
    document.getElementById('contactOptionsMobile').style.display = 'flex';
    document.getElementById('openEditMobile').onclick = function () { openEditContactPopUp(`${i}`); };
    document.getElementById('deleteMobile').onclick = function () { deleteContact(i, sortedContacts); };
    openContactOptionsMobile = true;
    event.stopPropagation();
    //window.addEventListener("click", windowClick);
}

document.addEventListener('click', function (event) {
    if (openContactOptionsMobile) {
        let contactOptionsMobile = document.getElementById('contactOptionsMobile');
        if (!contactOptionsMobile.contains(event.target)) {
            contactOptionsMobile.style.display = 'none';
        }
        openContactOptionsMobile = false;
    }
});



