/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
importArticles({
	type: 'script',
	articles: [
        'u:dev:AjaxRC/code.js',
		'u:dev:DisplayClock/code.js',   // Wikia Active Clock
	]
});

/* Display title Magic Word*/
importArticles({
    type: 'script',
    articles: [
        //...
        'w:c:dev:DISPLAYTITLE/code.js',
        //...
    ]
});