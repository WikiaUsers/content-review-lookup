syntaxHighlighterSiteConfig = {
	timeout: 75
};

if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' ) {
	mw.loader.load( 'https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:SyntaxHighlight.js' );
}