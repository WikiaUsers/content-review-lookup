function preloadUploadDesc() {
	if ( mw.util.getParamValue( 'wpForReUpload' ) ) {
		return;
	}
 
	var uploadDescription = document.getElementById( 'wpUploadDescription' );
	if ( uploadDescription == null ) {
		return;
	}

	if ( uploadDescription.value == '' ) {
		uploadDescription.value = '{' + '{Plik\n | Opis = \n | Platforma = PC/Xbox One/PlayStation 4\n | Wersja gry = {' + '{subst:Wersja|Steam}' + '}\n | Źródło = Oficjalne/Autorskie\n | Autor = [[Piranha Bytes]]/Nick autora\n }}\n';
	}
}
 
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Upload' ) {
	mw.loader.using( 'mediawiki.legacy.upload', function() {
		jQuery( document ).ready( preloadUploadDesc );
	} );
}