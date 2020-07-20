/*  Social Icons */
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '30px'
	wikiTwitterAccount: "iSCPedia"
};
importScriptPage('SocialIcons/code.js','dev');

/* SpoilerAlert */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});

/* ExtendedNavigation */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});