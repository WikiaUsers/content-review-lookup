/* Импорт JS-страниц Fixes.js, Scroll.js */
importArticles({
	    type: 'script',
	    articles: [
	        'MediaWiki:Fixes.js',
	        'MediaWiki:Scroll.js'
	    ]
	});

document.querySelectorAll('[id^="cite_ref"]').forEach((ref) => {
	
	ref.appendChild(
		document.querySelector(`[id="${ref.children[0].href.split('#').slice(-1)[0]}"]`)
		.querySelector('.reference-text').cloneNode(true)
	)

})