/**
 * @title        scroll to top
 * @description  scrolls to top through a button
 * @author       clodaghelm
 * @source       clocachelm.fandom.com
 * @version      1.0.0
 * @license      CC-BY-SA-4.0
 */ 
 
$( function() {
	$( '.main-container' ).append( '<div class="scrollToTop"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control-small"></use></svg>️</div>' );
	$( window ).scroll( function() {
		if ( $( this ).scrollTop() > 150 ) {
			$( '.scrollToTop' ).addClass( 'active' ).prop( 'title', 'Scroll to Top' );
		} else {
			$( '.scrollToTop' ).removeClass( 'active' );
		}
	});
	$( '.scrollToTop' ).click( function() {
		$( 'html, body' ).animate({
			scrollTop: 0
		}, 1000 );
		return false;
     });
	importArticle({
		type: 'style',
		article: 'u:clocachelm:MediaWiki:ScrolltoTop.css'
	});
});