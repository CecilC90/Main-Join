async function initializePolicyPage() {
    await includesHTML();
    await loadLoggedInUser();
    showFooterButton('privacyPolicyButton');
}