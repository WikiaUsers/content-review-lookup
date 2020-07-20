/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*Автообновления*/
importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';
/*Кнопка Наверх; Код из Темы:52936 на Ру-Централке*/
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('#WikiaBarWrapper .arrow').before('<button id="backtotop" type="button" value="Наверх" onClick="goToTop();" style="position:absolute; right:25px; top:2px; z-index:200;">Наверх</button>');
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true;
 
/*Быстрый просмотр изменений*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:QuickDiff/code.js',
    ]
});
 
/*Похожие названия*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:SearchSuggest/code.js'
    ]
});