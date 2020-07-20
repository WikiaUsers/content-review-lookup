/**
 * One click deletes on old image revisions
 * @author Grunny
 */
function fdImageCheckdelete() {
	if( wgCanonicalNamespace === 'File' && wgAction === 'delete' ) {
		if( window.location.href.match( /&oldimage=/ ) ) {
			$( '#mw-filedelete-submit' ).click();
		}
	}
}
$( fdImageCheckdelete );