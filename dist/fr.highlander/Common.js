/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Import [[MediaWiki:Onlyifuploading.js]] 
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
    importScriptPage('MediaWiki:Onlyifuploading.js');
}

// ============================================================
// BEGIN import Onlyifediting-functions
// SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
    importScriptPage('MediaWiki:Onlyifediting.js');
}
 
// END import Onlyifediting-functions
// ============================================================

/* Substitute Template:Information into upload page */
$(function() {
	if (wgPageName != 'Spécial:Téléverser') { return; }
	$('#wpUploadDescription').text("{{Fichier\r\n|nom=\r\n|thème1=\r\n|thème2=\r\n|licence=\r\n}}");
});

if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '1em',
            clear: 'both',
            fontSize: '75%',
            border: '1px solid #F6A938',
            backgroundColor: '#F2F2F2',
            borderRadius: '8px'
        }
    }).text('LEGO® est une marque commerciale du groupe LEGO. Le wiki LEGO est un site indépendant non autorisé ou sponsorisé par le groupe LEGO.')
    .appendTo('.WikiaArticle');
}