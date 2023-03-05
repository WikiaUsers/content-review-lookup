$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* Imports */
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:ListUsers/code.js',
        // ...
    ]
});