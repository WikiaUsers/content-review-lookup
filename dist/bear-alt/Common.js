window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = false;
// Function to remove footer elements
function removeFooterElements() {
    const selectors = [
        '#WikiaArticleFooter',      // Legacy skin
        '.page-footer__revision',   // Modern skin
        '.page-footer__actions'     // Footer buttons
    ];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
    });
}

// Run immediately in case elements exist
removeFooterElements();

// Observe for dynamically added elements
const observer = new MutationObserver(removeFooterElements);
observer.observe(document.body, { childList: true, subtree: true });