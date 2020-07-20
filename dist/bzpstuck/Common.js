/* Any JavaScript here will be loaded for all users on every page load. */
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:DISPLAYTITLE/code.js',
        'u:dev:SearchSuggest/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:DisplayClock/code.js',
        'u:dev:SearchSuggest/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:UserTags/code.js',
    ]
});
importScriptPage('AjaxRC/code.js', 'dev');