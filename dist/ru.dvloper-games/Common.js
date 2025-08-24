/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* AjaxRC */
window.ajaxSpecialPages = [
    "Recentchanges",
    "WikiActivity",
    "NewFiles"
];
window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу';

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}
 
/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
   var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
   var appTo = ($('#WikiaPageHeader').length ) ? $('#WikiaPageHeader > h1') : $('.firstHeading');
 
   appTo.append('&#160;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="' + refreshHover + '">' + refreshText + ':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="' + ajaxIndicator + '" style="vertical-align: baseline;" border="0" alt="Refreshing page" /></span></span>');
 
   $('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).show();
      }
   } ).ajaxComplete(function(event, xhr, settings) {
      if (location.href == settings.url) {
         $(this).hide();
         for(i in ajaxCallAgain) {
            ajaxCallAgain[i]();
         }
      }
   } );
 
   $('#ajaxToggle').click(toggleAjaxReload).attr('checked', ajaxRLCookie);
 
   if (getCookie("ajaxload-" + wgPageName) == "on") {
      loadPageData();
   }
}
 
/**
 * Turn refresh on and off by toggling the checkbox
 */
function toggleAjaxReload() {
	if ( $( '#ajaxToggle' ).prop( 'checked' ) == true ) {
		setCookie( "ajaxload-" + wgPageName, "on", 30 );
		doRefresh = true;
		loadPageData();
	} else {
		setCookie( "ajaxload-" + wgPageName, "off", 30 );
		doRefresh = false;
		clearTimeout( ajaxTimer );
	}
}
 
/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = ( $( '#WikiaArticle' ).length ) ? '#WikiaArticle' : '#bodyContent';
	$( cC ).load( location.href + " " + cC, function ( data ) {
		if ( doRefresh ) {
			ajaxTimer = setTimeout( "loadPageData();", ajaxRefresh );
		}
	} );
}
 

!function( $, mw ) {
    var user = mw.config.get( 'wgUserName' );
    if ( !user ) return;
    $( 'span.insertusername' ).text( user ); 
}( this.jQuery, this.mediaWiki );

window.lockOldComments = window.lockOldComments || {};
window.lockOldComments.limit = 180; // Количество дней до закрытия комментариев

 importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LockOldComments.js'
    ]
});

/* Минимальный JS для работы Tabber и AjaxPoll */

/* Загружаем Tabber */
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tabber/code.js'
    ]
});

/* Загружаем AjaxPoll */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxPoll/code.js'
    ]
});