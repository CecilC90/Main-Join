let members = [
    {
        name: 'Anton Mayer',
        email: 'antom@gmail.com',
    },
    {
        name: 'Emmanuel Mauer',
        email: 'antom@gmail.com',
    },
    {
        name: 'Benedikt Ziegler',
        email: 'benedikt@gmail.com',
    },
    {
        name: 'Anja Schulz',
        email: 'schulz@hotmail.com',
    },
    {
        name: 'David Eisenberg',
        email: 'davidberg@gmail.com',
    },
    {
        name: 'Eva Fischer',
        email: 'eva@gmail.com',
    },
    {
        name: 'Tatjana Wolf',
        email: 'wolf@gmail.com',
    },
]

//Eventuelle probleme beim Sortieren der User???

function renderContacts() {
    sortedMembers = members;
    sortedContactList(sortedMembers);
    renderContactList(sortedMembers);
}

function sortedContactList(sortedMembers) {
    sortedMembers.sort((a, b) => {
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

function renderContactList(sortedMembers) {
    let contactlist = document.getElementById('contactsList');
    contactlist.innerHTML = "";
    let currentInitial = null;

    for (let i = 0; i < sortedMembers.length; i++) {
        let sortedMember = sortedMembers[i];
        let firstLetter = getFirstLetter(sortedMembers, i);

        if (firstLetter !== currentInitial) {
            contactlist.innerHTML += renderFirstLetter(firstLetter);
            currentInitial = firstLetter;
        }

        let initials = getMemberInitials(sortedMembers, i);
        contactlist.innerHTML += renderContactsHTML(sortedMembers, i, initials);
    }
}

function getFirstLetter(sortedMembers, i) {
    return sortedMembers[i].name.charAt(0);
}

function getMemberInitials(sortedMembers, i) {
    return sortedMembers[i].name.split(' ')
        .map(word => word.charAt(0))
        .join('');
}

function renderFirstLetter(firstLetter) {
    return `
    <div class="first-letter">${firstLetter}</div>
    <div class="underline"></div>
    `;
}

function renderContactsHTML(sortedMembers, i, initials) {
    return `
    <div id="userCard${i}" class="user-card" onclick="toggleUserInformation(${i}, sortedMembers, '${initials}')">
        <div class="contact-icon" id="initials">${initials}</div>
        <div class=contact-container>
            <span>${sortedMembers[i].name}</span>
            <span class="email">${sortedMembers[i].email}</span>
        </div>
    <div>
    `;
}

function toggleUserInformation(i, sortedMembers, initials) {
    let mainCard = document.getElementById('userOverview');
    let userCard = document.getElementById(`userCard${i}`);

    if (mainCard.innerHTML === "") {
        openUserInformation(i, sortedMembers, initials);
        userCard.style.backgroundColor = '#2A3647';
        userCard.style.color = 'white';
    } else {
        closeUserInformation();
        userCard.style.backgroundColor = '';
        userCard.style.color = '';
    }
}

function closeUserInformation(i) {
    let mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
}

function openUserInformation(i, sortedMembers, initials) {
    mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
    mainCard.innerHTML = userInformationHTML(i, sortedMembers, initials);
}

function deleteUser(i, sortedMembers) {
    sortedMembers.splice(i, 1);
    renderContactList(sortedMembers);
    closeUserInformation();
}

function userInformationHTML(i, sortedMembers, initials) {
    return `
    <div class="main-head-container">
        <div>
            <div class="main-contact-icon">${initials}</div>
        </div>
        <div>
            <div class="name-container">${sortedMembers[i].name}</div>
            <div class="action-icons-container">
                <div class="edit-delete-container">
                    <img src="./assets/img/contacts-edit.svg" alt="Edit icon">
                    <span>Edit</span>
                </div>
                <div class="edit-delete-container" onclick="deleteUser(${i}, sortedMembers)">
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
            <div class="detail-email">${sortedMembers[i].email}</div>
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
    popUp.style.display ="flex";
    popUp.innerHTML = addContactPopUpHTML();
    resetAddInput();
}

function closeAddContactPopUp() {
    popUp = document.getElementById('popupContainer');
    popUp.style.display ="none";
}

function resetAddInput() {
    let name = document.getElementById('addName');
    let email = document.getElementById('addEmail');
    let phone = document.getElementById('addPhone');
    name.innerHTML = "";
    email.innerHTML = "";
    phone.innerHTML = "";
}

function addContactPopUpHTML() {
    return `
    <div class="contact-popup">
            <div class="let-container">
                <img src="./assets/img/join_logo_white.svg" alt="">
                <div class="fs-61 fw-700">Add contact</div>
                <div class="fs-27 fw-400">Tasks are better with a Team!</div>
                <div class="seperator-popUp"></div>
            </div>
            <div class="right-container">
                <div class="close-icon" onclick="closeAddContactPopUp()">
                    <img src="./assets/img/close.svg" alt="">
                </div>
                <div class="person-icon">
                    <img src="./assets/img/person.svg" alt="">
                </div>
                <div class="form-container">
                    <div class="input-container">
                        <div class="inputFieldsRegistration">
                            <div class="inputField">
                                <input type="text" placeholder="Name" id="addName" required />
                                <img src="./assets/img/person.svg" alt="" />
                            </div>
                            <div class="inputField" id="inputEmailField">
                                <input type="email" placeholder="Email" id="addEmail" required />
                                <img src="./assets/img/mail.svg" alt="" />
                            </div>
                            <div class="inputField">
                                <input type="tel" placeholder="Phone" id="addPhone" required />
                                <img src="./assets/img/call.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="addContactContainer">
                        <button class="buttonLight" onclick="closeAddContactPopUp()">Cancel</button>
                        <button class="buttonDarg">Create contact</button>
                    </div>
                </div>
            </div>
        </div>
    `
}