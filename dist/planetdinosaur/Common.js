/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

importScriptPage('ListAdmins/code.js', 'dev');
if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}
//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('CollapsibleInfobox/code.js', 'dev');
importScriptPage('DisableArchiveEdit/code.js', 'dev');


importArticles({
    type: 'script',
    articles: [
        'u:dev:Message/code.js'
    ]
});

importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});