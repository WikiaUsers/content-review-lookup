/*----------------------------------------------------------------------*/
/*   ACHTUNG! Die JavaScript-�nderungen an dieser Stelle wirken sich    */
/*   nur auf den neuen Wikia "Oasis"-Skin aus.                          */
/*   Neue �nderung dauern ein bisschen, bis sie sichtbar werden.        */
/*----------------------------------------------------------------------*/

// ==================================================================
// Importierte Skripte
// ==================================================================
// AdvancedOasisUI
// Dokumentation und Autoren siehe: http://dev.wikia.com/wiki/AdvancedOasisUI 
// ==================================================================
// "Zur�ck zum Anfang"-Schaltfl�che
// Dokumentation und Autoren: http://dev.wikia.com/wiki/BackToTopButton
// ==================================================================

importArticles({
    type: "script",
    articles: [
        "MediaWiki:AdvancedOasisUI.js",
        "MediaWiki:BackToTopButton.js",
        "MediaWiki:Onlyifuploading.js"
    ]
});

/* Versetzt die Bearbeiten-Schaltfl�che auf Benutzerseiten in eine logischere Position */
 
$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});