/* Any JavaScript here will be loaded for all users on every page load. */

/* Media icons tooltip. Adapted from Attack on Titan Wiki*/
$('#media-icons a').tooltip();

/* Auto-update scripts for file and page renaming */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PageRenameAuto-update/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
    ]
});

/* Turns back-to-top button to the modern version */
window.BackToTopModern = true;

/* Changes number of days on locked comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 100;