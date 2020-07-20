// place this into global.js
( function ( mw ) {
if ( mw.config.get( 'wgPageName' ) === 'MediaWiki:Wikia.css' ) {
var normalEdit = document.createElement( 'a' );
normalEdit.className = 'wikia-button';
normalEdit.href = '/wiki/MediaWiki:Wikia.css?action=edit&useskin=monobook';
normalEdit.textContent = 'Normal editing';document.getElementById( 'WikiaPageHeader' ).insertBefore( normalEdit, document.getElementsByClassName( 'tally' )[0]);
}
}( mediaWiki ) );


/* AJAX BATCH DELETE MY TOOLS - CODE FOUND ON DEV WIKI */
importScriptPage('AjaxBatchDelete/code.js', 'dev');

/*
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js',
	]
});
*/