/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Podpisy zamiast prefiksów
function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Anime Forever Wiki</h2>');
};
addOnloadHook(FixNs);

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/icons.js",
    ]
});