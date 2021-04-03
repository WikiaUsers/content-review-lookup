/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

importArticles({
	type: 'script',
	articles: [
        'u:dev:MediaWiki:ExtendedNavigation/code.js',
        'u:zh.pad:MediaWiki:CountDown.js'
    ]
}, {
	type: 'style',
	article: 'u:zh.pad:MediaWiki:CountDown.css'
});