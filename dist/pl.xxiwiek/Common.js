// Skrypt dla strony specjalnej [[Special:Upload]]
// Oryginał znajduje się na Nonsensopedii: http://nonsensopedia.wikia.com/wiki/MediaWiki:Gadget-enhanced-upload.js, licencja CC-BY-SA
 
function loadAutoInformationTemplate() {
	if ( mw.util.getParamValue( 'wpForReUpload' ) ) { //Don't show when reuploading
		return;
	}
 
	var uploadDescription = document.getElementById( 'wpUploadDescription' );
	if ( uploadDescription == null ) {
		return;
	}
 
	if ( uploadDescription.value == '' ) {
		uploadDescription.value = '{' + '{Information\n|Description =\n|Date =\n|Source =\n|Author =\n|Permission =\n|other_versions =\n}}\n';
	}
 
	var selector = document.getElementById( "wpLicense" );
 
	var handledLicense = false;
	var onchangeOld = selector.onchange;
	var onsubmitOld = selector.form.onsubmit;
 
	var licenseSelectorHandler = function() {
			if ( onchangeOld ) {
				onchangeOld();
			}
 
			var newTemplate = selector.value != '' ? "{" + "{" + selector.value + "}}" : "";
			var content = uploadDescription.value.replace( /^(\|Permission =).*$/m, "$1 " + newTemplate );
			if ( content != uploadDescription.value ) {
				uploadDescription.value = content;
				handledLicense = true;
			} else {
				handledLicense = false;
			}
		};
 
	onchangeOld = selector.onchange;
	selector.onchange = licenseSelectorHandler;
 
	selector.form.onsubmit = function() {
		if ( onsubmitOld ) {
			onsubmitOld();
		}
 
		selector.value = '';
		return handledLicense;
	}
}
 
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Upload' ) {
	mw.loader.using( 'mediawiki.legacy.upload', function() {
		jQuery( document ).ready( loadAutoInformationTemplate );
	} );
}