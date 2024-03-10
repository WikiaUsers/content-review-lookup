/**
 * @source mediawiki.org/wiki/Snippets/Open_external_links_in_new_window
 * @version 6
 */
mw.hook( 'wikipage.content' ).add( function( $content ) {
	// Second selector is for external links in Parsoid HTML+RDFa output (bug 65243).
	$content.find( 'a.external, a[rel="mw:ExtLink"]' ).each( function () {
		// Can't use wgServer because it can be protocol relative
		// Use this.href property instead of this.getAttribute( 'href' ) because the property
		// is converted to a full URL (including protocol)
		if ( this.href.indexOf( location.protocol + '//' + location.hostname ) !== 0 ) {
			if ( !this.rel.indexOf( 'noopener' ) < 0 ) {
				this.rel += ' noopener'; // the leading space matters, rel attributes have space-separated tokens
			}
			if ( !this.rel.indexOf( 'noreferrer' ) < 0 ) {
				this.rel += ' noreferrer'; // the leading space matters, rel attributes have space-separated tokens
			}
			this.target = '_blank';
		}
	} );
} );