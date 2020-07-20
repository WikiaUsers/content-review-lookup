/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */



/* Скрипт добавляющий кнопку Показать/Скрыть для таблиц и Div */
/* Инфо: http://dev.wikia.com/wiki/ShowHide */
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');


importArticles({
	type: 'script',
	articles: [
		// Adds a Clock above Contribute Button
		'u:dev:DisplayClock/code.js',
		// Extends Navigation to Level 4 & 5
        'u:dev:ExtendedNavigation/code.js',
        /* Adds Purge Button under Edit */
        'u:dev:PurgeButton/code.js',
        /* A Script for Collapsible Tables and Divs */
        'u:dev:ShowHide/code.js',
        /* Adds Back to Top Button to Oasis Footer*/
        'u:dev:BackToTopButton/code.js'
	]
});
 
/* Renames Purge Button */
PurgeButtonText = 'Обновить (Сбросить cookies)';

/*************************************************/
/* Prevents tooltips from going off side of page */
/*************************************************/

$( '#mw-content-text' ).on( {
	mouseenter: function() {
		var $tooltipContainer = $( this );
		var $tooltip = $tooltipContainer.find( '.tooltipin' );
		// Make sure it's on the page so it's not being squished
		// before getting width
		$tooltip.css( 'right', 0 );
		var tooltipWidth = $tooltip.outerWidth();
		$tooltip.css( 'right', '' );
		
		if ( $tooltip.offset().left + tooltipWidth > $( window ).width() ) {
			$tooltip.css(
				'margin-left',
				-( tooltipWidth - $tooltipContainer.width() - 1 )
			);
		}
	},
	mouseleave: function() {
		$( this ).find( '.tooltipin' ).css( 'margin-left', '' );
	}
}, '.tooltipskill' );

/************************************************************/
/* Removes 'title' attr from 'a' tag with '.tooltip' parent */
/************************************************************/

$( '#mw-content-text' ).on( 'mouseenter', '.tooltipskill', function() {
	$( this ).find( 'a[title]' ).removeAttr( 'title' );
} );


// AJAX-обновление некоторых страниц(выбор страниц)
var ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
];
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
var PurgeButtonText = 'Обновить'; //Отображаемое название
 
/*Показ IP анонимов в комментариях*/
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};