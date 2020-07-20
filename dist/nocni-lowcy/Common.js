/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Podtytuły by Szynka013 */
function fixPageName(){
	var newPageTitle = getElementsByClassName(document, 'span', 'changePageTitle')[0];
	if(newPageTitle == null) return;
	var oldPageTitle = getElementsByClassName(document, 'header', 'WikiaPageHeader')[0].getElementsByTagName( "h1" )[0];
	if(oldPageTitle == null) return;
	oldPageTitle.innerHTML = newPageTitle.innerHTML;
}
addOnloadHook(fixPageName);

/* Podpisy zamiast prefiksów */
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Nocni Łowcy Wiki</h2>');
    $('.ns-112 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader .header-title').append('<h2>Strona galerii</h2>');
});
importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/icons.js',
        'u:dev:YoutubePlayer/code.js',
        'u:pl.tes:MediaWiki:APIQuery.js',
        'u:pl.tes:MediaWiki:Licenses.js'
    ]
});