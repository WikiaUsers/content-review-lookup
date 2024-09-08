/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* HIDDEN CAT - Pulsante [altre] */

/**
 * HiddenCat (idea originale da fr:MediaWiki:Common.js)
 * In presenza di categorie nascoste, e se l'utente non ha abilitato l'opzione
 * 'Mostra le categorie nascoste' nella preferenze, aggiunge un link altre/nascondi
 * per controllarne la visibilità. 
 * 
 * @author [[Utente:Rotpunkt]]
 */
/*global jQuery */
 
( function ( $ ) {
	'use strict';
 
	function addLinkHiddenCat() {
		var $catlinks, $hiddenCatlinks, $toggleAnchor, $catAnchor;
	 
		$catlinks = $( '#catlinks' );
		$hiddenCatlinks = $( '#catlinks #mw-hidden-catlinks' );
		// se ci sono categorie nascoste e la preferenza 'Mostra le categorie nascoste' è disabilitata
		if ( $hiddenCatlinks.length && $hiddenCatlinks.hasClass( 'mw-hidden-cats-hidden' ) ) {
			$toggleAnchor = $( '<a>' )
				.attr( 'href', '#' )
				.attr( 'title', 'Questa voce contiene categorie nascoste' )
				.text( '[altre]' )
				.click( function () {
					$hiddenCatlinks.toggleClass( 'mw-hidden-cats-hidden' ).toggleClass( 'mw-hidden-cats-user-shown' );
					$(this).text( $hiddenCatlinks.hasClass( 'mw-hidden-cats-hidden' ) ? '[altre]' : '[nascondi]' );
					return false;
				} );
			// la posizione del link altre/nascondi è diversa a seconda che ci siano
			// solo categorie nascoste (classe 'catlinks-allhidden') o anche normali 
			if ( $catlinks.hasClass( 'catlinks-allhidden' ) ) {
				$catlinks.removeClass( 'catlinks-allhidden' );
				$catAnchor = $( '<a>' ).attr( 'href', '/wiki/Categoria:Categorie' ).text( 'Categorie' );
				$hiddenCatlinks.before( $catAnchor, ': ', $toggleAnchor );
			} else {
				$( '#mw-normal-catlinks' ).append( '| ', $toggleAnchor );			
			}
		}
	}
	 
	$( addLinkHiddenCat );
}( jQuery ) );