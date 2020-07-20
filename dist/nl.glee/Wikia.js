importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Get rid of popup image uploader */
$(".upphotos").click(function linkToUploader() {
   window.location.href='http://nl.glee.wikia.com/wiki/Special:Upload';
});