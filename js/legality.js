async function initializeLegalityPage() {
    await includesHTML();
    await loadLoggedInUser();
    await checkloggedinIcon();
    showFooterButton('legalNoticeButton');
}

async function checkloggedinIcon() {
    let iconContainer = document.getElementById('iconContainer');
    if (loggedInUser&&iconContainer) {
        iconContainer.style.display="none";
    }
}