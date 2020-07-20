/* Any JavaScript here will be loaded for all users on every page load. */ 

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'}); 

importArticles({
    type: 'script',
    articles: [
        'u:dev:Message/code.js'
    ]
}); 

importScriptPage('Voice_Dictation/voice.js', 'dev'); 

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');