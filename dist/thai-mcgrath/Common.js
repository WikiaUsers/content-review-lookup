/* Any JavaScript here will be loaded for all users on every page load. */
/* Switch */
switch (mw.config.get('wgPageName')) {
    case 'page name':
        // JS here will be applied to "page name"
        break;
    case 'some other page':
        // JS here will be applied to "some other page"
        break;
}
/* End Switch */

/* Any JavaScript here will be loaded for all users on every page load. */
//* Countdown timer */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* LockOldComments */

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;
window.lockOldComments.addNoteAbove = true;