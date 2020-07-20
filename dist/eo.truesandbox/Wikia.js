// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:UserRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 4 };
 
window.SpoilerAlert = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes, I am',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:fang:AJAX Auto-refresh/code.js',
        'w:c:dev:SpoilerAlert/code.js',
        'w:c:dev:ChatTags/code.js', ,
    ]
});