// <nowiki>
;(function(mw) {
	'use strict';

	if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;

	const buttons = [ // ooui icon, label, pre, post, peri, group, section 
		[
			'strikethrough',
			'Strike',
			'<s>',
			'</s>',
			'Strike-through text',
			'format',
			'main'
		],
		[
			'underline',
			'Underline',
			'<span style="text-decoration: underline">',
			'</span>',
			'Underlined text',
			'format',
			'main'
		],
		[
			'code',
			'Insert code',
			'<code>',
			'</code>',
			'Code',
			'insert',
			'advanced'
		],
		[
			'ongoingConversation',
			'Insert hidden Comment',
			'<!-- ',
			' -->',
			'Comment',
			'insert',
			'advanced'
		],
		[
			'ocr',
			'Insert block of quoted text',
			'<blockquote>\n',
			'\n</blockquote>',
			'Block quote',
			'insert',
			'advanced'
		]
	];

	mw.loader.using([
		'oojs-ui.styles.icons-editing-styling', // strikethrough, underline
		'oojs-ui.styles.icons-editing-advanced', // code, ocr
		'oojs-ui.styles.icons-moderation' // ongoingConversation
	]).then(function() {
		mw.hook( 'wikiEditor.toolbarReady' ).add( function ( $textarea ) {
			buttons.forEach(function(button) {
				$textarea.wikiEditor( 'addToToolbar', {
					section: button[6],
					group: button[5],
					tools: {
						mcwCustomButton: {
							label: button[1],
							type: 'button',
							oouiIcon: button[0],
							action: {
								type: 'encapsulate',
								options: {
									pre: button[2],
									post: button[3],
									peri: button[4]
								}
							}
						}
					}
				} );
			});
		} );
	});
})(window.mediaWiki);
// </nowiki>