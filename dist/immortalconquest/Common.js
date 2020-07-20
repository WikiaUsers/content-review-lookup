/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'script',
	articles: [
        'u:dev:DiscordIntegrator/code.js',
		'u:dev:ShowHide/code.js',
		'u:dev:CollapsibleInfobox/code.js'
	]
});

$(function() {
    var conf = mw.config.get([
            'wgAction',
            'wgNamespaceNumber'
        ]);

	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <http://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if ( conf.wgNamespaceNumber === 1201 && $( '.mw-geshi' ).length ) {
		mw.loader.load( 'ext.geshi.local' );
	}
	
	if (
        conf.wgAction === 'edit' &&
        conf.wgNamespaceNumber === 0
    ) {
        // causing some duplication bugs atm, will revisit soon TM
        // importScript('MediaWiki:CodeEditor.js');
	}
	
});