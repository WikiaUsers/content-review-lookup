// <nowiki>
(function(mw) {
	'use strict';

	if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;

	mw.loader.using([
		'mediawiki.api',
		'oojs-ui.styles.icons-editing-advanced' // signature
	]).then(function () {
		return new mw.Api().loadMessagesIfMissing([
			'wikieditor-toolbar-tool-signature'
		]);
	}).then(function() {
		mw.hook('wikiEditor.toolbarReady').add(function($textarea) {
			$textarea.wikiEditor('addToToolbar', {
				section: 'main',
				group: 'insert',
				tools: {
					signatureButton: {
						label: mw.msg('wikieditor-toolbar-tool-signature'),
						type: 'button',
						oouiIcon: 'signature',
						action: {
							type: 'encapsulate',
							options: {
								pre: '--~~~~'
							}
						}
					}
				}
			});
		});
	});
})(window.mediaWiki);
// </nowiki>