/* Any JavaScript here will be loaded for all users on every page load. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);


importArticles({
    type: "script",
    articles: [
        "w:c:dev:EditcountTag/code.js",
        'w:c:dev:UserTags/code.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YoutubePlayer/code.js'
    ]
});