/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});