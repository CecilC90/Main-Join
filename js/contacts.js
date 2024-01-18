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
]

function renderContacts() {
    sortedMembers = members;
    sortedContactList(sortedMembers);
    renderContactList(sortedMembers);
}

function sortedContactList(sortedMembers) {
    sortedMembers.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
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
                <div class="edit-delete-container">
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