/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Ładowanie WDSIcons na stronie głównej
mw.hook( 'dev.wds' ).add( function( wds ) {
	if ( !!mw.config.get( 'wgIsMainPage' ) ) {
		wds.render( '.intro-stats' );
	}
} );


/* Ograniczenie przewijania szablonu ODPOWIEDNIK do elementu #WikiaArticle */
$(function() {
	var tabs = $('[class^=odpowiednik]'),
        article = $('#WikiaArticle');
    if(!tabs.length || window.stickyFloatingTabsInitiated) return;
    window.stickyFloatingTabsInitiated = true;
    
    $(window).scroll(function() {
        if(tabs.height() >= article.height() - $(window).scrollTop()) {
            if(tabs.css('position') == 'fixed') {
                tabs.css({
                    'position': 'absolute',
                    'bottom': 0,
                    'left': tabs.offset().left - article.offset().left
                });
            }
        } else if(tabs.css('position') == 'absolute') {
            tabs.css({
                'position': '',
                'bottom': '',
                'left': ''
            });
        }
    });
});