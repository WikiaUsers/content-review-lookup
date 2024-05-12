/**
 * Add "Purge" content action link.
 *
 * Dependencies: mediawiki.util, mediawiki.api, mediawiki.notify
 *
 * @source https://www.mediawiki.org/wiki/Snippets/Purge_action
 * @revision 2016-05-22
 */
$( function () {
	if ( $( '#ca-purge' ).length || !mw.config.get( 'wgIsArticle' ) ) return;
	var node = mw.util.addPortletLink(
		'p-cactions',
		mw.util.getUrl( null, { action: 'purge' } ),
		mw.config.get( 'skin' ) === 'vector' ? 'Purge' : '*',
		'ca-purge',
		'Purge the server cache of this page',
		'*'
	);
	$(node).on( 'click', function (e) {
		new mw.Api().post( { action: 'purge', titles: mw.config.get( 'wgPageName' ) } ).then(function () {
			location.reload();
		}, function () {
			mw.notify( 'Purge failed', { type: 'error' } );
		});
		e.preventDefault();
	});
});