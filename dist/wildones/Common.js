/* Any JavaScript here will be loaded for all users on every page load. */

importScript('MediaWiki:Common.js/usertags.js');

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
}
addOnloadHook(UserNameReplace);

importScriptPage('ShowHide/code.js', 'dev');

AjaxRCRefreshText = 'Check Me!';
AjaxRCRefreshHoverText = 'Check the box to auto-refresh the wiki activity.';
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


importScriptPage('AjaxBatchDelete/code.js', 'dev');

importScriptPage('FastDelete/code.js', 'dev');

var fdButtons = [];

fdButtons[fdButtons.length] = {
    'summary': 'spam',
        'label': 'spam'
};
fdButtons[fdButtons.length] = {
    'summary': 'vandalism',
        'label': 'vandal'
};

/* add "view source" link to edit dropdown */
importScriptPage('View_Source/code.js', 'dev');

importScriptPage('ListAdmins/code.js', 'dev');

importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

importScriptPage('DupImageList/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'staff']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:wildones:RevealAnonIP/code.js"
    ]
});