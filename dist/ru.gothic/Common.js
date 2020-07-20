/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */ 

importArticles({ 
type: "script", 
articles: [ 
"u:pl.tes:MediaWiki:Change.js" 
] 
});

// AJAX-обновление некоторых страниц(выбор страниц) 
var ajaxPages = [ 
"Служебная:Watchlist", 
"Служебная:Contributions", 
"Служебная:WikiActivity", 
"Служебная:RecentChanges" 
]; 
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название 

var PurgeButtonText = 'Обновить'; //Отображаемое название