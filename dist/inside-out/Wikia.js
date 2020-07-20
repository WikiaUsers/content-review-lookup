/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    if (!wgUserName) return;
    $('span.insertusername').html(wgUserName);
});
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:AutoEditDropdown/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:SignatureCheck/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserRightsRecord/code.js',
        'u:dev:Tooltips/code.js',
    ]
});
//User Page Tabs
$().log("MediaWiki:Wikia.js loaded");
$().log("updated");
 
mediaWiki.loader.using('mediawiki.util', function() {
"use strict";
jQuery(function($) {
    var $tabs = $('#WikiaUserPagesHeader ul.tabs');
    if (!$tabs.length) return;
    var newTabs = {
        'Sandbox': '/Sandbox',
    };
    var name = $('#UserProfileMasthead .masthead-info hgroup > h1');
    if (!name.length) return;
    name = name.text();
    var tabs = document.createDocumentFragment(), li, a;
    for (var tab in newTabs) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.title = 'User:' + name + newTabs[tab];
        a.href = mw.util.wikiGetlink(a.title);
        a.appendChild(document.createTextNode(tab));
        li.appendChild(a);
        tabs.appendChild(li);
    }
    $tabs.append(tabs);
});
});
//Clock
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
}); 
//AJAX Refresh 
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');