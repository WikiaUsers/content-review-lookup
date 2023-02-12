/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Staat je toe om sjablonen te maken die je in/uit kan klappen */
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "weergeef",
	hide: "verberg",
	showAll: "alle weergeven",
	hideAll: "alle verbergen"
    }
};

/* Automatisch verversen */
AjaxRCRefreshText = 'Automatisch verversen';
AjaxRCRefreshHoverText = 'Automatisch de pagina verversen';
ajaxPages = ["Speciaal:RecenteWijzigingen","Speciaal:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


/* Countdown */
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

/* Imports */
importArticles({
    type: "script",
    articles: [
        // Countdown long dates
        "w:c:dev:Countdown/code.js",
        // Back to top button
        "w:c:dev:BackToTopButton/code.js"
    ]
});

/* SearchSuggest */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});

/* Adds cancel button above edit screen */
 
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');

// Adding "My Contributions" to user menu. 
// Function: Adds "My Contributions" to the UserDropdownMenu.
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">Mijn bijdragen</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
  }
}


//Message Wall Posts Tags
var messageWallUserTags = {
    'Re_coded_NL': 'Admin',
    '2Actimv': 'Admin'
};
window.messageWallTagColor = '#034001';
 
var messageWallTagColor = window.messageWallTagColor || '#034001';
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Message_Wall:' + name + '"]').after('<span style="color:' + messageWallTagColor + ';margin-left:-2px;font-size:10px;vertical-align:top;">(' + messageWallUserTags[name] + ')</span>');
    }
}(jQuery));
//