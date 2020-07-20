/* Any JavaScript here will be loaded for all users on every page load. */
$('.username').text(mw.config.get('wgUserName'));
/* WikiaNotification*/
var WikiaNotificationMessage = "Hey Guys! <a href='/wiki/Doraemon_Fanon_Wiki:Featured_Article'>Please vote for the Featured Article</a> and <a href='/wiki/Thread:2696'>nominate an article</a>";
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');
/* TopEditors by Bobogoobo-san ^^*/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});
/* Testing*/
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});
/* Testing*/
importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js"
    ]
});