/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({
    type: 'script',
    articles: [
        'u:pad.wikia.com:MediaWiki:FilterTable.js',
	]
});
// FilterTable.js is from http://community.wikia.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables

// Добавление кнопки викификатора
function addWikifButton() {
	var toolbar = document.getElementById('toolbar');
	if (!toolbar) return;
	var i = document.createElement('img');
	i.src = '//upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
	i.alt = i.title = 'викификатор';
	i.onclick = Wikify;
	i.style.cursor = 'pointer';
	i.style.marginLeft = '10px';
	toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
	importArticle({
        type: "script",
        article: "MediaWiki:Wikificator.js"
    });
	addOnloadHook(addWikifButton);
}