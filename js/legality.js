async function initializeLegalityPage() {
    await includesHTML();
    await loadLoggedInUser();
    showFooterButton('legalNoticeButton');
}