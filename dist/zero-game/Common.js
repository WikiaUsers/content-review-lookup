/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:MediaWiki:GalleryCaptions/code.js',
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:Tooltips.js',
    ]
});
window.railWAM = {
    logPage:"Project:WAM Log"
};