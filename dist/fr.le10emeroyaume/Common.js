/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================

/* Substitute Template:Information into upload page */
$(document).ready(function() {

	if (wgPageName != 'Spécial:Téléverser') {
		return;
	}

	$('#wpUploadDescription').text("{{Fichier\r\n|nom=\r\n|auteur=\r\n|source=\r\n|licence=\r\n|détails=\r\n}}");

});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ShowHide/code.js"
    ]
});