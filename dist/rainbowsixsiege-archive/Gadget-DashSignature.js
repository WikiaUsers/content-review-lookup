// <nowiki>
/* eslint-disable no-implicit-globals */
/* global mw, $ */

var customizeToolbar = function ( $ ) {
	var lang = mw.config.get( 'wgUserLanguage' ),
		messages = {
			en: {
				'tiret-signature-label': 'Signature and timestamp'
			},

			fr: {
				'tiret-signature-label': 'Signature'
			}
		};

	mw.messages.set( messages.en );
	if ( lang !== 'en' && lang in messages ) {
		mw.messages.set( messages[ lang ] );
	}

	$( '#wpTextbox1' )
		.wikiEditor( 'removeFromToolbar', { section: 'main', group: 'insert', tool: 'Signature and timestamp' } )
		.wikiEditor( 'addToToolbar', {
			section: 'main',
			group: 'insert',
			tools: {
				signature: {
					labelMsg: 'wikieditor-toolbar-tool-signature',
					label: mw.msg( 'tiret-signature-label' ),
					id: 'signature',
					type: 'button',
					icon: '//upload.wikimedia.org/wikipedia/commons/7/79/Insert-signature.png',
					action: {
						type: 'encapsulate',
						options: {
							pre: '— ~~~~'
						}
					}
				}
			}
		} );
};
/* Check for edit mode and required modules are available. Then, customize */
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
	mw.loader.using( 'user.options', function () {
		if ( mw.user.options.get( 'usebetatoolbar' ) ) {
			mw.loader.using( 'ext.wikiEditor', function () {
				$( customizeToolbar );
			} );
		}
	} );
}
// </nowiki>