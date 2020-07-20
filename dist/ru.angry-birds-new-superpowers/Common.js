/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
 // **************************************************
 //  Разное
 // **************************************************
 
MastRights = {};
MastRights["Стелли"] = ["Император"];

importScriptPage("MediaWiki:Masthead.js", "ru.c");
 
importArticles({
	type:'script',
	articles: [
        'w:dev:TopEditors/code.js',
        'u:dev:TimedSlider/code.js',
        'u:dev:ExtendedNavigation/code.js'
	]
});