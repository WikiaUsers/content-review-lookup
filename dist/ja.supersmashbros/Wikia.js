var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js'
    ]
});

$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });