function preloadUploadDesc() {
	if ( mw.util.getParamValue( 'wpForReUpload' ) ) {
		return;
	}
 
	var uploadDescription = document.getElementById( 'wpUploadDescription' );
	if ( uploadDescription === null ) {
		return;
	}
 
	if ( uploadDescription.value === '' ) {
		uploadDescription.value = '{' + '{Plik\n | Opis = \n | Źródło = Oficjalne\n | Autor = [[Larian Studios]]\n }}\n';
	}
}
 
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Upload' ) {
	mw.loader.using( 'mediawiki.legacy.upload', function() {
		jQuery( document ).ready( preloadUploadDesc );
	} );
}