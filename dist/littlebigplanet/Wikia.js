importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});


PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');