var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'dark',
	buttonSize: '20px'
};
importScriptPage('SocialIcons/code.js','dev');
 
// Written by User:Rappy_4187, Aion Wiki
// Added support for Special:Contributions by Foodbandlt
 
/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
importScriptPage('AjaxRC/code.js', 'dev');
 
 
/**********************/
/* Back to top button by Loleil */
/**********************/
 
importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:GlobalEditcount/code.js'
        // ...
    ]
});