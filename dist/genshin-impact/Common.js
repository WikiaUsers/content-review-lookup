/* Any JavaScript here will be loaded for all users on every page load. */
window.listUsers = {
    talk: true,
}
window.listUsers.customgroups = ['content-moderator','threadmoderator'];
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ListUsers/code.js',
        'u:dev:MediaWiki:ListUsers/code2.js',
        'MediaWiki:LoopOgv.js'
    ]
});