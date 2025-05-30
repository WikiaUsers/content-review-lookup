( function ( $ ) {
	'use strict';

	if ( window.SpriteEditorModules.settings && window.SpriteEditorModules.settings.loaded ) {
		return;
	}
	window.SpriteEditorModules.settings = { loaded: true };
	const myData = window.SpriteEditorModules.settings,
		modal = {};
	let eleList,
		msg,
		perRowEle,
		shared = {},
		spacingEle;
	myData.modal = modal;

	myData.setSharedData = function ( d ) {
		shared = d;
	};
	function updateSheetWidth() {
		eleList[ 2 ].innerHTML = '<b>' + msg( 'spritesheet width' ).plain() + '</b>: ' + ( ( Number( shared.imgWidth ) + Number( spacingEle.getValue() ) ) * Number( perRowEle.getValue() ) - Number( spacingEle.getValue() ) ) + 'px';
	}
	myData.requestChanges = function () {
		if ( !shared.loaded.full.length ) {
			return; // No changes needed;
		}
		let inputs = document.querySelectorAll( 'input.sprite-settings.wds-toggle__input' );
		inputs.forEach( function ( e ) {
			if ( shared.getEditPermission() ) {
				e.removeAttribute( 'disabled' );
			} else {
				e.setAttribute( 'disabled', '' );
			}
		} );
		perRowEle.setValue( shared.options.spritesPerRow );
		spacingEle.setValue( shared.options.spacing );
		eleList[ 0 ].innerHTML = '<b>' + msg( 'image-path' ).plain() + '</b>: ' + ( shared.spriteData.settings.image || shared.loaded.name + '.png' );
		eleList[ 1 ].innerHTML = '<b>' + msg( 'spritesheet-name' ).plain() + '</b>: ' + shared.loaded.full;
		updateSheetWidth();
		eleList[ 3 ].innerHTML = '<b>' + msg( 'sprite-size' ).plain() + '</b>: ' + shared.imgWidth + 'x' + shared.imgHeight + 'px';
		eleList[ 4 ].innerHTML = '<b>' + msg( 'sprite-per-row' ).plain() + '</b>: ';
		eleList[ 4 ].append( perRowEle.$element.get( 0 ) );
		eleList[ 5 ].innerHTML = '<b>Spacing</b>: ';
		eleList[ 5 ].append( spacingEle.$element.get( 0 ) );
		eleList[ 6 ].innerHTML = '<b>' + msg( 'link-prefix' ).plain() + '</b>: ' + ( shared.spriteData.settings.linkprefix || 'none' );
	};

	// window content
	function formHtml() {
		return '<div style="padding: 0 24px">' +
			'<h2>' + msg( 'spritesheet-info' ).plain() + '</h2>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
			'<div class="settingsInfoline"></div>' +
		'</div>';
	}
	function btn( id, checked, lbl ) {
		let disabled = shared.getEditPermission && shared.getEditPermission() && '' || ' disabled';
		return '<div>' +
			'<input class="sprite-settings wds-toggle__input" id="' + id + '" type="checkbox" ' + ( checked && 'checked' || '' ) + disabled + ' />' +
			'<label class="wds-toggle__label" for="' + id + '">' + msg( lbl ).plain() + '</label>' +
		'</div>';
	}
	function formHtml2() {
		let opt = shared.options || {};
		return '<div style="padding: 0 24px">' +
			'<h2>' + msg( 'save-title' ).plain() + '</h2>' +
			btn( 'se-section', opt.cleanupSectionIDs, 'cleanup-ids' ) +
			btn( 'se-unused', opt.removeUnusedSprites, 'remove-unused' ) +
			btn( 'se-whitespace', opt.removeWhitespace, 'remove-whitespace' ) +
			btn( 'se-deprecated', opt.removeDeprecatedNames, 'remove-deprecated' ) +
		'</div>';
	}
	// create window
	myData.createWindow = function () {
		let OO = window.SpriteEditorModules.main.OO;
		perRowEle = new OO.ui.NumberInputWidget( { min: 1, step: 1 } );
		perRowEle.on( 'change', function () {
			updateSheetWidth();
		} );
		spacingEle = new OO.ui.NumberInputWidget( { min: 0, step: 1 } );
		spacingEle.on( 'change', function () {
			updateSheetWidth();
		} );
		msg = window.SpriteEditorModules.main.msg;
		function SpriteEditorDialog( config ) {
			SpriteEditorDialog.super.call( this, config );
		}
		OO.inheritClass( SpriteEditorDialog, OO.ui.ProcessDialog );
		SpriteEditorDialog.static.name = 'settings';
		SpriteEditorDialog.static.title = msg( 'settings-label' ).plain();
		SpriteEditorDialog.static.actions = [
			{ label: msg( 'dialog-button-close' ).plain(), flags: [ 'safe', 'close' ] },
			{ label: msg( 'save-label' ).plain(), action: 'saveSettings', flags: [ 'primary' ] }
		];

		// initialise dialog, append content
		SpriteEditorDialog.prototype.initialize = function () {
			SpriteEditorDialog.super.prototype.initialize.apply( this, arguments );
			function PageOneLayout( name, config ) {
				PageOneLayout.super.call( this, name, config );
				this.$element.append( formHtml() );
			}
			OO.inheritClass( PageOneLayout, OO.ui.PageLayout );
			PageOneLayout.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( msg( 'spritesheet-info' ).plain() );
				this.outlineItem.setIcon( 'info' );
			};

			function PageTwoLayout( name, config ) {
				PageTwoLayout.super.call( this, name, config );
				this.$element.append( formHtml2() );
			}
			OO.inheritClass( PageTwoLayout, OO.ui.PageLayout );
			PageTwoLayout.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( msg( 'save-title' ).plain() );
				this.outlineItem.setIcon( 'pageSettings' );
			};

			function PageThreeLayout( name, config ) {
				PageTwoLayout.super.call( this, name, config );
				this.$element.append( '<div style="padding: 0 24px"><h2>' + msg( 'about-label' ).plain() + '</h2><br />© Magiczocker 2024<br /><br />Tester:&nbsp;Kingcat<br />Helper:&nbsp;MarkusRost<br /><br />Inspired by:&nbsp;<a href="https://help.fandom.com/wiki/User:Majr/Sprite_editor">Sprite Editor</a></div>' );
			}
			OO.inheritClass( PageThreeLayout, OO.ui.PageLayout );
			PageThreeLayout.prototype.setupOutlineItem = function () {
				this.outlineItem.setLabel( msg( 'about-label' ).plain() );
				this.outlineItem.setIcon( 'helpNotice' );
			};

			let page1 = new PageOneLayout( 'one' ),
				page2 = new PageTwoLayout( 'two' ),
				page3 = new PageThreeLayout( 'three' ),
				booklet = new OO.ui.BookletLayout( {
					outlined: true
				} ),
				sdEle;
			this.content = booklet;
			booklet.addPages( [ page1, page2, page3 ] );
			this.$body.append( this.content.$element );
			booklet.$element.get( 0 ).style.height = '500px';
			this.$content.addClass( 'spriteedit-ui-Dialog' );
			sdEle = document.getElementById( 'se-unused' );
			sdEle.addEventListener( 'click', function () {
				document.getElementById( 'se-whitespace' ).disabled = !this.checked;
			} );
			document.getElementById( 'se-whitespace' ).disabled = !sdEle.checked;
			eleList = document.getElementsByClassName( 'settingsInfoline' );
		};

		// Handle actions
		SpriteEditorDialog.prototype.getActionProcess = function ( action ) {
			if ( action === 'saveSettings' && shared.getEditPermission && shared.getEditPermission() ) {
				shared.options.cleanupSectionIDs = document.getElementById( 'se-section' ).checked;
				shared.options.removeUnusedSprites = document.getElementById( 'se-unused' ).checked;
				shared.options.removeDeprecatedNames = document.getElementById( 'se-deprecated' ).checked;
				shared.options.removeWhitespace = document.getElementById( 'se-whitespace' ).checked;
				shared.options.spritesPerRow = Number( perRowEle.getValue() );
				shared.options.spacing = Number( spacingEle.getValue() );
				modal.seDialog.close();
			}
			return SpriteEditorDialog.super.prototype.getActionProcess.call( this, action );
		};

		// Create the Dialog and add the window manager.
		modal.windowManager = new OO.ui.WindowManager();
		$( OO.ui.getTeleportTarget() ).append( modal.windowManager.$element );

		// Create a new dialog window.
		modal.seDialog = new SpriteEditorDialog( {
			size: 'large'
		} );

		// Add window and open
		modal.windowManager.addWindows( [ modal.seDialog ] );
		// Close dialog when clicked outside the dialog
		modal.seDialog.$frame.parent().on( 'click', function ( e ) {
			if ( !$( e.target ).closest( '.spriteedit-ui-Dialog' ).length ) {
				modal.seDialog.close();
			}
		} );
	};
}( window.jQuery ) );