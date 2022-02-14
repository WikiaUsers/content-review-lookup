/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('Tooltips/code.js', 'dev');

//Tooltips (copied from https://zero-game.fandom.com/wiki/MediaWiki:Common.js)
window.BackToTopModern = true;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
        'u:dev:MediaWiki:Tooltips.js',
    ]
});