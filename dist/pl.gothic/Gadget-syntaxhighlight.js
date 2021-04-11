// Zapobiegaj ładowaniu skryptu z Dev Wiki
window.UCP = window.UCP || {};
window.UCP.syntaxHighlight = window.UCP.syntaxHighlight || {};
window.UCP.syntaxHighlight.loaded = true;

// Konfiguracja kolorów 
syntaxHighlighterConfig = {
	boldOrItalicColor: '#44466d',
	commentColor: '#4d1a19',
	entityColor: '#474d23',
	externalLinkColor: '',
	headingColor: '#44466d',
	hrColor: '#44466d',
	listOrIndentColor: '#4d1a19',
	parameterColor: '#66331e',
	signatureColor: '#66331e',
	tagColor: '#662946',
	tableColor: '#5e5129',
	templateColor: '#5e5129',
	wikilinkColor: '#245477'
};

// Konfiguracja wewnętrzna
syntaxHighlighterSiteConfig = {
	// Kolory okna edycji
	backgroundColor: 'transparent',
	foregroundColor: 'unset',
	// Czas oczekiwania na skrypt
	timeout: 75,
	// Tagi ze żródłem
	sourceTags: [
		'math',
		'syntaxhighlight',
		'source',
		'timeline',
		'hiero',
		'infobox',
		'templatedata'
	]
};

// Załaduj skrypt
if ( ['edit', 'submit'].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	mw.loader.load( 'https://www.mediawiki.org/wiki/MediaWiki:Gadget-DotsSyntaxHighlighter.js?action=raw&ctype=text/javascript' );
}