(function () {
	'use strict';

	// TODO: remove after UCP migration
	if ( mw.config.get('wgVersion') === "1.19.24" ) return;

	function decode() {
		var text = $( '#wpTextbox1' ).val();
		var new_text = text;

		$.each( text.match( /(%[A-Za-z0-9]{2}){1,}/g ), function( i, v ) {
			try {
				new_text = new_text.replace( v, decodeURIComponent( v ) );
			} catch( e ) {
				console.log( 'There was error ( ' + e + ' ) during attempt to parse this: ' + v );
			}
		});

		$( '#wpTextbox1' ).val( new_text );
	}

	function init(i18n) {
		mw.loader.using( 'ext.wikiEditor' ).then( function () {
			$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
				'section': 'main',
				'group': 'insert',
				'tools': {
					'links': {
						label: i18n.msg( 'label' ).plain(),
						type: 'button',
						icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/External_link_alt.png',
						action: {
							type: 'callback',
							execute: decode
						}
					},
				}
			});
		});
	}

	importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
	mw.hook( 'dev.i18n' ).add(function (i18n) {
		i18n.loadMessages( 'DecodeURI' ).then(init);
	});
})();