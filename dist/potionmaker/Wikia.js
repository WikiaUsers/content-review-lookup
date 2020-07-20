// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
 
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('AjaxPatrol/code.js', 'dev' );
InactiveUsers = { months: 4 };

importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:fang:AJAX Auto-refresh/code.js',
        'w:c:dev:SpoilerAlert/code.js',
    ]
});
 
// Opens chat in new tab instead of new window
 
$("div.chat-join button").remove();
$("div.chat-join").append('<a href="http://animalcrossing.wikia.com/wiki/Special:Chat" target="_blank"><button type="button">Join the Chat</button></a>');
$("#WikiaRail > section.ChatModule.module > div > div.chat-join > button").remove();
$("#WikiaRail > section.ChatModule.module > div > div.chat-join").append('<a href="http://animalcrossing.wikia.com/wiki/Special:Chat" target="_blank"><button type="button" data-msg-id="chat-join-the-chat">Join the Chat</button></a>');