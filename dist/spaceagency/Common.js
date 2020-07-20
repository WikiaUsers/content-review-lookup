/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'style',
	article: 'u:dev:MediaWiki:TZclock.css'
}, {
	type: 'script',
	articles: [
        'u:dev:FloatingToc/code.js',
        'u:dev:Translator/Translator.js',
		'u:dev:TZclock.js'
	]
});