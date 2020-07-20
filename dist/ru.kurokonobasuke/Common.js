/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* importScriptPages-start */
 
importScriptPage('Countdown/code.js', 'dev');
importScriptPage('PurgeButton/code.js', 'dev' ); // Кнопка очистки кэша страницы 
importScriptPage('ShowHide/code.js', 'dev');
 
//importScriptPage('MediaWiki:Search_Fix.js', 'dantest');
 
importArticles({
    type: 'script',
    articles: [
        // 'u:dantest:MediaWiki:Search_Fix.js',

        'u:dev:MediaWiki:AjaxRC/code.js',           // Ajax auto-refresh
        'u:dev:MediaWiki:Countdown/code.js',        // Countdown
        'u:dev:MediaWiki:ReferencePopups/code.js',  // ReferencePopups
        'u:dev:MediaWiki:ShowHide/code.js',         // ShowHide
        'u:dev:MediaWiki:Toggler.js',               // Toggler
        'u:dev:DisplayClock/code.js',               // Display Clock
    ]
});

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    'Special:RecentChanges', 
    'Special:WikiActivity',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:NewFiles',
    'Special:AbuseLog'
];

/* Автоматическое всплывание кнопки  "наверх" */
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Наверх" onClick="goToTop();">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

/* Для шаблона "В этот день" */
var TodayIs = new Date().getDate().toString() + '-' + (new Date().getMonth() + 1).toString();
$('.this-day').css('display', 'none');
$('#' + TodayIs).css('display', 'block');


// ============================================================
// displayTimer
// ============================================================
 
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the server cache and update the contents of this page'
};