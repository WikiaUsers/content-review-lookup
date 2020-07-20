// Die JavaScript-Änderuungen an dieser Stelle wirken sich 
// nur auf den neuen Wikia "Oasis"-Skin aus. //
// Siehe auch: [[MediaWiki:Common.js]] und [[MediaWiki:Monobook.js]] //

// ================================================================== //
// Small Oasis Tweaks von [[Benutzer:Rappy]]                          //
// ================================================================== //

// ================================================================== //
// Versetzt die Bearbeiten-Schaltfläche auf Benutzerseiten in eine    //
// logischere Position                                                //
// ================================================================== //

$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '320px',
        float: 'right',
        marginTop: '4px'
    });
});

// ================================================================== //
// Kleine Erweiterungen                                               //
// ================================================================== //
// AdvancedOasisUI                                                    //
// Dokumentation und Autoren: http://dev.wikia.com/wiki/AdvancedOasisUI 
// ================================================================== //
// "Inaktiv"-Label                                                    //
// Dokumentation und Autoren: http://dev.wikia.com/wiki/InactiveUsers //
// ================================================================== //

importArticles({
    type: "script",
    articles: [
        "w:c:dev:AdvancedOasisUI/code.js",
        "w:c:dev:InactiveUsers/code.js"
    ]
});

/* Ende Wikia JavaScript */