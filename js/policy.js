/**
 * Initializes the policy page by including HTML, loading the logged-in user, and showing the footer button for privacy policy.
 * @returns {Promise<void>}
 */
async function initializePolicyPage() {
    await includesHTML();
    await loadLoggedInUser();
    await checkloggedinIcon();
    showFooterButton('privacyPolicyButton');
}

async function checkloggedinIcon() {
    let iconContainer = document.getElementById('iconContainer');
    if (loggedInUser&&iconContainer) {
        iconContainer.style.display="none";
    }
}