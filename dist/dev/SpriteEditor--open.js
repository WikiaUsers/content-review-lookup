( function ( $, mw ) {
	'use strict';

	if ( window.SpriteEditorModules.open && window.SpriteEditorModules.open.loaded ) {
		return;
	}
	window.SpriteEditorModules.open = { loaded: true };
	let api = new mw.Api(),
		main = window.SpriteEditorModules.main,
		myData = window.SpriteEditorModules.open,
		modal = {},
		shared,
		allPages = [],
		base = {
			action: 'query',
			apfilterredir: 'nonredirects',
			apfrom: '',
			aplimit: '500',
			apnamespace: '828',
			format: 'json',
			formatversion: '2',
			list: 'allpages'
		};
	myData.modal = modal;
	function createList() { // Compares images with lists; creates html
		let root = document.getElementsByClassName( 'spriteeditor-items' )[ 0 ];
		function loadSprite2( toOpen ) {
			toOpen = window.SpriteEditorModules.seperatePath( toOpen );
			let historyUrl = new URL( window.location );
			historyUrl.searchParams.set( 'sprite', toOpen.full );
			window.history.pushState( {}, '', historyUrl );
			shared.loadSprite(
				toOpen,
				myData.isNew,
				myData.spriteSizeW,
				myData.spriteSizeH,
				myData.spacing
			);
			modal.seDialog.close();
		}
		myData.loadSprite2 = loadSprite2;
		function loadSprite( event ) {
			loadSprite2( event.target.closest( '.previewBox' ).dataset.sprite );
		}
		function addSprite( i ) {
			let n = allPages[ i ],
				oldSize = modal.seDialog.getBodyHeight();
			api.get( {
				action: 'scribunto-console',
				title: 'Module:SpriteEditorDummy', // Dummy name (Doesn't need to exist)
				question: '=p',
				clear: true,
				content: 'local require2=require\nfunction require() return {getUrl=function() return true end} end\nlocal a = require2("Module:' + n.full + '")\nrequire=require2\n' +
				'return type(a) == "table" and a.settings and mw.text.jsonEncode(a) or "{}"'
			} ).always( function ( a ) {
				let output;
				if ( !modal.seDialog.isOpened() ) {
					return;
				}
				if ( a.return ) {
					const ele = document.createElement( 'div' ),
						ele2 = document.createElement( 'a' ),
						ele3 = document.createElement( 'a' );

					output = JSON.parse( a.return );
					output.settings = output.settings || {};
					output.ids = output.ids || {};
					output.sections = output.sections || [];

					ele.dataset.sprite = 'Module:' + n.full;
					ele.className = 'previewBox';

					let u = main.filepath( output.settings.image || n.name + '.png' );
					ele2.style.backgroundImage = 'url(' + u + ')';
					ele2.onclick = loadSprite;

					ele3.textContent = n.name;
					ele3.onclick = loadSprite;

					ele.append( ele2, ele3 );
					root.appendChild( ele );
				}
				if ( allPages[ i + 1 ] ) {
					addSprite( i + 1 );
				} else {
					while ( modal.seDialog.isPending() ) {
						modal.seDialog.popPending();
					}
				}
				if ( oldSize !== modal.seDialog.getBodyHeight() && modal.seDialog.isOpened() ) {
					modal.windowManager.updateWindowSize( modal.seDialog );
				}
			} );
		}
		if ( allPages[ 0 ] ) {
			addSprite( 0 );
		} else {
			while ( modal.seDialog.isPending() ) {
				modal.seDialog.popPending();
			}
		}
	}
	myData.setSharedData = function ( d ) {
		shared = d;
	};
	function loadModules( c ) {
		api.get( window.Object.assign( {}, base, c || {} ) ).done( function ( data ) {
			let pages = data.query.allpages;
			for ( let i = 0; i < pages.length; i++ ) {
				let names = window.SpriteEditorModules.seperatePath( pages[ i ].title );
				if ( names.module.slice( -6 ) === 'Sprite' &&
				!Array.prototype.includes.call( main.blacklist, names.module.toLowerCase() ) ) {
					allPages.push( {
						full: names.full,
						module: names.module,
						name: names.name
					} );
				}
			}
			if ( !modal.seDialog.isOpened() ) {
				return;
			}
			if ( data.continue ) {
				loadModules( data.continue );
				return;
			}
			createList();
		} );
	}
	myData.requestChanges = function () {
		let root = document.getElementsByClassName( 'spriteeditor-items' )[ 0 ];
		root.innerHTML = '';
		modal.windowManager.updateWindowSize( modal.seDialog );
		modal.seDialog.pushPending();
		myData.isNew = false;
		myData.spriteSizeW = 0;
		myData.spriteSizeH = 0;
		allPages = [];
		// Load lists
		loadModules();
	};
	// window content
	function formHtml() {
		return '<div class="spriteeditor-items"></div>';
	}

	// create window
	myData.createWindow = function () {
		let msg = main.msg;
		modal = main.processDialog( {
			title: msg( 'open-label' ).plain(),
			name: 'open',
			actions: [
				{ label: msg( 'dialog-button-new' ).plain(), action: 'new', flags: [ 'primary' ] },
				{ label: msg( 'dialog-button-close' ).plain(), action: 'close', modes: 'edit', flags: [ 'safe', 'close' ] }
			],
			content: formHtml,
			action: function ( action ) {
				if ( action === 'new' ) {
					shared.openWindow( 'new', msg( 'new-module-missing' ).plain() );
				}
			},
			size: 'larger'
		} );
		myData.modal = modal;
	};
}( window.jQuery, window.mediaWiki ) );