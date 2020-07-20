
"w:dev:ShowHide/code.js", /* Collapsible elements and tables */

importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');

importScriptPage('InactiveUsers/code.js', 'dev');

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/addnavlinks.js", /* Add "about us" and IRC links to "On the Wiki" menu */
                "MediaWiki:Common.js/filluploadform.js", /* Fills the summary field in upload form with imagebox */
        ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});


SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importScriptPage('AjaxRC/code.js', 'dev');

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});