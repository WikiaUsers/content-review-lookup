//*** Фон Профиля ***//

if (wgNamespaceNumber === 2 || wgNamespaceNumber === 1200 || wgNamespaceNumber === -1 || wgNamespaceNumber === 500 && wgPageName.indexOf('/') == -1) {
$('.WikiaUserPagesHeader').css({
    "background": "url('https://images.wikia.nocookie.net/tulensandbox/ru/images/b/ba/Profile_fon.png') bottom no-repeat",
    "background-size": "cover"
});
}


importArticles({
    type: 'script',
    articles: [
        "u:dev:SearchSuggest/code.js",
        "u:dev:ExtendedNavigation/code.js"
    ]
});