var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
    
    type: 'script',
    articles: [
        'u:dev:ModernBackToTopButton/code.js',
    ]
    
});
window.BackToTopSpeed = number; 100
window.BackToTopStart = number; 1
window.BackToTopFade = 1;

importArticle({type: 'script', article: 'w:c:dev:VisualSpellCheck/code.js'});