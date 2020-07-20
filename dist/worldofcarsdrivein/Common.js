importScriptPage('ShowHide/code.js', 'dev');


if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

window.MassCategorizationGroups = ['sysop'];