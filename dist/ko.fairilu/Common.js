/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
importScriptPage('ShowHide/code.js', 'dev');

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