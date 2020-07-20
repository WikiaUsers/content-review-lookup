/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/wiki/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
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