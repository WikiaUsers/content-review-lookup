( function ( $, mw ) {
	'use strict';

	if ( window.SpriteEditorModules.new && window.SpriteEditorModules.new.loaded ) {
		return;
	}
	window.SpriteEditorModules.new = { loaded: true };
	const api = new mw.Api(),
		config = mw.config.get( [
			'wgFormattedNamespaces'
		] ),
		main = window.SpriteEditorModules.main,
		moduleName = config.wgFormattedNamespaces[ 828 ],
		myData = window.SpriteEditorModules.new,
		seperatePath = window.SpriteEditorModules.seperatePath;

	let lastInput,
		modal = {},
		msg,
		nameField,
		oldTimeout,
		okButton,
		OO,
		requestState = false,
		shared = {},
		sizeFieldW,
		sizeFieldH,
		spacingField;

	myData.modal = modal;

	function completeName( a ) {
		return a + ( a.slice( -6 ) !== 'Sprite' && 'Sprite' || '' );
	}
	function toggleOkayBtn( state ) {
		if ( !okButton ) {
			return;
		}
		if ( !requestState ||
			!nameField.getValue().length ||
			!sizeFieldW.getValue().length ||
			!sizeFieldH.getValue().length ||
			!spacingField.getValue().length ) {
			okButton.setDisabled( true );
			return;
		}
		okButton.setDisabled( state );
	}

	myData.setSharedData = function ( d ) {
		shared = d;
	};
	function newNumEle() {
		let i = new OO.ui.NumberInputWidget( {
			min: 1,
			step: 1,
			value: shared.options.defaultSpriteSize
		} );
		i.on( 'change', function ( e ) {
			toggleOkayBtn( e.length === 0 );
		} );
		return i;
	}
	function getButton() {
		okButton = modal.seDialog.actions.get()[ 1 ];
		if ( okButton ) {
			okButton.setDisabled( true );
			return;
		}
		setTimeout( getButton, 200 );
	}
	myData.requestChanges = function () {
		okButton = undefined;
		getButton();
		// Input field
		nameField = new OO.ui.TextInputWidget();
		nameField.on( 'change', function ( e ) {
			requestState = false;
			if ( oldTimeout ) {
				clearTimeout( oldTimeout );
			}
			okButton.setDisabled( true );
			let names = seperatePath( 'Module:' + e ),
				newName = completeName( names.module );
			if ( names.module !== newName ) {
				e = newName + e.substring( names.module.length );
				names = seperatePath( 'Module:' + e );
			}
			lastInput = names.full;
			if ( e.length &&
				!Array.prototype.includes.call( main.blacklist, names.module.toLowerCase() ) ) {
				oldTimeout = setTimeout( function () {
					api.get( {
						action: 'query',
						format: 'json',
						titles: moduleName + ':' + names.full + '|File:' + names.name + '.png',
						formatversion: '2'
					} ).done( function ( data ) {
						if ( data.query.pages[ 1 ].title.toLowerCase() === ( moduleName + ':' + lastInput ).toLowerCase() &&
						data.query.pages[ 0 ].missing &&
						data.query.pages[ 1 ].missing ) { requestState = true; }
						toggleOkayBtn( false );
					} );
				}, 1000 );
			} else {
				oldTimeout = undefined;
			}
		} );
		document.getElementById( 'newNamePlaceholder' ).replaceChildren( nameField.$element.get( 0 ) );

		sizeFieldW = newNumEle();
		document.getElementById( 'newWidthPlaceholder' ).replaceChildren( sizeFieldW.$element.get( 0 ) );

		sizeFieldH = newNumEle();
		document.getElementById( 'newHeightPlaceholder' ).replaceChildren( sizeFieldH.$element.get( 0 ) );

		spacingField = newNumEle();
		spacingField.setRange( 0, Infinity );
		spacingField.setValue( 0 );
		document.getElementById( 'newSpacingPlaceholder' ).replaceChildren( spacingField.$element.get( 0 ) );
	};

	// window content
	function formHtml() {
		return '<div id="newRoot" style="padding: 0 24px">' +
			'<p>' + msg( 'new-spritesheet' ).plain() + '</p>' +
			'<div id="newNamePlaceholder"></div>' +
			'<br>' +
			'<p>' + msg( 'sprite-width' ).plain() + '</p>' +
			'<div id="newWidthPlaceholder"></div>' +
			'<br>' +
			'<p>' + msg( 'sprite-height' ).plain() + '</p>' +
			'<div id="newHeightPlaceholder"></div>' +
			'<br>' +
			'<p>' + msg( 'sprite-spacing' ).plain() + '</p>' +
			'<div id="newSpacingPlaceholder"></div>' +
		'</div>';
	}
	myData.createWindow = function () {
		OO = main.OO;
		msg = main.msg;
		modal = main.processDialog( {
			action: function ( action ) {
				if ( action === 'close' ) {
					let mD = window.SpriteEditorModules.open;
					mD.isNew = true;
					mD.spriteSizeW = sizeFieldW.getValue();
					mD.spriteSizeH = sizeFieldH.getValue();
					mD.spacing = spacingField.getValue();
					mD.loadSprite2( completeName( nameField.getValue() ) );
				}
			},
			actions: [
				{ action: 'reject', label: msg( 'dialog-button-cancel' ).plain(), flags: [ 'safe', 'close' ] },
				{ action: 'close', label: msg( 'dialog-button-create' ).plain, flags: [ 'primary', 'progressive' ] }
			],
			content: formHtml,
			isSubdialog: true,
			messageDialog: true,
			name: 'new',
			size: 'medium',
			title: msg( 'dialog-button-new' ).plain()
		} );
		myData.modal = modal;
	};
}( window.jQuery, window.mediaWiki ) );