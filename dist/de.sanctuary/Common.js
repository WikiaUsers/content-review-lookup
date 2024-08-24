/* JavaScript an dieser Stelle wirkt sich auf alle Skins für jeden Benutzer aus. */
/* Siehe auch: [[MediaWiki:Wikia.js]] und [[MediaWiki:Monobook.js]] */

/* Wiederherstellen des normalen Hochladen-Formulars als Standard */
$(document).ready(function(){
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});

// ================================================================
// Importierte Skripte
// ================================================================

importArticles({
    type: "script",
    articles: [
        "w:dev:Standard_Edit_Summary/code.js",
        "w:c:dev:Countdown/code.js",
        "MediaWiki:RevealAnonIP.js",
        "MediaWiki:Onlyifuploading.js",
        "w:c:dev:DISPLAYTITLE/code.js"
    ]
});

/* Ende JavaScript */