/**
 * Supprime en un clic les anciennes versions d'un fichier
 * @author Grunny
 */
function fdImageCheckdelete() {
	if( mw.config.get('wgCanonicalNamespace') === 'File' && mw.config.get('wgAction') === 'delete' ) {
		if( window.location.href.match( /&oldimage=/ ) ) {
			$( '#mw-filedelete-submit' ).click();
		}
	}
}
$( fdImageCheckdelete );