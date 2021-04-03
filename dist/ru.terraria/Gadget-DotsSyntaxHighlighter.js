// Автор RememberTheDot: https://www.mediawiki.org/wiki/User:Remember_the_dot/Syntax_highlighter
if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load('//ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-DotsSyntaxHighlighter.js&action=raw&ctype=text/javascript');
}