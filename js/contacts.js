let members = [
    {
        backgroundColor: '#663300',
        name: 'Anton Mayer',
        email: 'antom@gmail.com',
    },
    {
        backgroundColor: '#99cc00',
        name: 'Emmanuel Mauer',
        email: 'antom@gmail.com',
    },
    {
        backgroundColor: '#9900ff',
        name: 'Benedikt Ziegler',
        email: 'benedikt@gmail.com',
    },
    {
        backgroundColor: '#00ffff',
        name: 'Anja Schulz',
        email: 'schulz@hotmail.com',
    },
    {
        backgroundColor: '#ffcc00',
        name: 'David Eisenberg',
        email: 'davidberg@gmail.com',
    },
    {
        backgroundColor: '#ff9966',
        name: 'Eva Fischer',
        email: 'eva@gmail.com',
    },
    {
        backgroundColor: '#cc0000',
        name: 'Tatjana Wolf',
        email: 'wolf@gmail.com',
    },
]

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
            contactlist.innerHTML += renderFirstLetterHTML(firstLetter);
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

function renderFirstLetterHTML(firstLetter) {
    return `
    <div class="first-letter">${firstLetter}</div>
    <div class="underline"></div>
    `;
}

function renderContactsHTML(sortedMembers, i, initials) {
    return `
    <div id="userCard${i}" class="user-card" onclick="toggleUserInformation(${i}, sortedMembers, '${initials}')">
        <div class="contact-icon" id="initials" style= background-color:${members[i]['backgroundColor']}>${initials}</div>
        <div class=contact-container>
            <span>${sortedMembers[i].name}</span>
            <span class="email">${sortedMembers[i].email}</span>
        </div>
    <div>
    `;
}

function toggleUserInformation(i, sortedMembers, initials) {
    resetUserCardStyles()
    highlightUsercard(i);
    openUserInformation(i, sortedMembers, initials);
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
            <div class="main-contact-icon" style= background-color:${members[i]['backgroundColor']}>${initials}</div>
        </div>
        <div>
            <div class="name-container">${sortedMembers[i].name}</div>
            <div class="action-icons-container">
                <div class="edit-delete-container" onclick ="openEditContactPopUp(${i})">
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
    document.getElementById('editButton').onclick = function () { updateMemberInfo(i, event); };
    loadMemberInfo(i);
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
    name.value = members[i].name;
    email.value = members[i].email;
    phone.value = members[i].phone;
}

function updateMemberInfo(i, event) {
    event.preventDefault();

    members[i] = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
    };

    renderContacts();
    closeEditContactPopUp();
    mainCard = document.getElementById('userOverview');
    mainCard.innerHTML = '';
}

function addContact() {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);

    let newContact = {
        name: document.getElementById('addName').value,
        email: document.getElementById('addEmail').value,
        phone: document.getElementById('addPhone').value,
        backgroundColor: backgroundColors[randomIndex],
    };
    console.log(newContact);
    sortedMembers.push(newContact);
    renderContacts()
    closeAddContactPopUp();
}

