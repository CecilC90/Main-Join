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
    }
    )
};

function renderContactList(sortedMembers) {
    let contactlist = document.getElementById('contactsList');
    contactlist.innerHTML = "";
    for (let i = 0; i < sortedMembers.length; i++) {
        let sortedMember = sortedMembers[i];
        let initials = sortedMembers[i].name.split(' ')
            .map(word => word.charAt(0))
            .join('');
        contactlist.innerHTML += renderContactsHTML(sortedMembers, i, initials);
    }
}

function renderInitialsHTML(initials, i) {
    letters = document.getElementById('initials');
    letters.innerHTML += `
    <div>
    ${initials}
    </div>
    `;
}

function renderContactsHTML(sortedMembers, i, initials) {
    return `

        <div class=contact-icon id="initials">${initials}</div>
        <div class=contact-container>
            <span>${sortedMembers[i].name}</span>
            <span>${sortedMembers[i].email}</span>
        </div>
    <div>
    `;
}