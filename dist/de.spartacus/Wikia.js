/*----------------------------------------------------------------------*/
/*   ACHTUNG! Die JavaScript-Änderungen an dieser Stelle wirken sich    */
/*   nur auf den neuen Wikia "Oasis"-Skin aus.                          */
/*   Neue Änderung dauern ein bisschen, bis sie sichtbar werden.        */
/*----------------------------------------------------------------------*/

// ==================================================================
// Importierte Skripte
// ==================================================================
// AdvancedOasisUI
// Dokumentation und Autoren siehe: http://dev.wikia.com/wiki/AdvancedOasisUI 
// ==================================================================
// "Zurück zum Anfang"-Schaltfläche
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

/* Versetzt die Bearbeiten-Schaltfläche auf Benutzerseiten in eine logischere Position */
 
$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});