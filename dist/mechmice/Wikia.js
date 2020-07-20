importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:DisplayClock/code.js',
		// ...
	]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:SexyUserPage/code.js'
    ]
});