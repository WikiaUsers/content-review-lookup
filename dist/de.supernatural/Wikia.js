// Die JavaScript-Änderungen an dieser Stelle wirken sich 
// nur auf den neuen Wikia "Oasis"-Skin aus. //
// Siehe auch: [[MediaWiki:Common.js]] und [[MediaWiki:Monobook.js]] //

// =========================================================
// AdvancedOasisUI
// ===============
// Fügt "Beiträge" in der Benutzer-Navigationsleiste in der 
// Kopfleiste oben hinzu. Außerdem fügt es in dem 
// Grafik-Editor oder Quelltext-Editor unter der Zusammen-
// fassung einen Punkt namens "Versionen" und
// "Links auf dieser Seite" hinzu.
// Siehe: http://dev.wikia.com/wiki/AdvancedOasisUI 
// =========================================================
// "Inactive"-Label
// ================
// Fügt "Inactive"-Symbol auf Benutzerseiten hinzu, die zwei
// Monat lang keine Bearbeitung mehr getätigt haben.
// Siehe: http://dev.wikia.com/wiki/InactiveUsers
// =========================================================
// Force the script to always display in German
window.AdvancedOasisUI = {
    userLang: 'de'
};


importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/AdvancedOasisUI.js",
        "w:c:dev:InactiveUsers/code.js"
    ]
});