var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'black',
	buttonSize: '25px',
        wikitwitteraccount: 'TolkienWiki'
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js',
        'MediaWiki:Wikia.js/Sidebar.js'
    ]
});