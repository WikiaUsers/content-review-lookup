/* Any JavaScript here will be loaded for all users on every page load. */

/* TEMPLATE:USERNAME */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* FIRSTEDITDATE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FirstEditDate.js',
    ]
});