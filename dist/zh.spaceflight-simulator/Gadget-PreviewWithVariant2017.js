/**
 * @file Allow user to preview with different variant in the 2017 wikitext editor.
 * Note that this file's implementation is a bit hacky, and if it is broken in the
 * future, please be bold to remove or fix it.
 * @author [[wikipedia:zh:User:Diskdance]]
 * @license MIT
 */
// <nowiki>

( function () {
	var batchConv = require( 'ext.gadget.HanAssist' ).batchConv;
	var DATA = [
		{ var: 'zh', htmlLang: 'zh', msg: 'pwv-2017-zh' },
		{ var: 'zh-hans', htmlLang: 'zh-Hans', msg: 'pwv-2017-zh-hans' },
		{ var: 'zh-hant', htmlLang: 'zh-Hant', msg: 'pwv-2017-zh-hant' },
		{ var: 'zh-cn', htmlLang: 'zh-Hans-CN', msg: 'pwv-2017-zh-cn' },
		{ var: 'zh-hk', htmlLang: 'zh-Hant-HK', msg: 'pwv-2017-zh-hk' },
		{ var: 'zh-mo', htmlLang: 'zh-Hant-MO', msg: 'pwv-2017-zh-mo' },
		{ var: 'zh-my', htmlLang: 'zh-Hans-MY', msg: 'pwv-2017-zh-my' },
		{ var: 'zh-sg', htmlLang: 'zh-Hans-SG', msg: 'pwv-2017-zh-sg' },
		{ var: 'zh-tw', htmlLang: 'zh-Hant-TW', msg: 'pwv-2017-zh-tw' }
	];
	var isInitialized = false;

	mw.messages.set( batchConv( {
		'pwv-2017-caption': { hans: '选择语言变体', hant: '選擇語言變體' },
		'pwv-2017-zh': { hans: '不转换', hant: '不轉換' },
		'pwv-2017-zh-hans': '简体',
		'pwv-2017-zh-hant': '繁體',
		'pwv-2017-zh-cn': '大陆简体',
		'pwv-2017-zh-hk': '香港繁體',
		'pwv-2017-zh-mo': '澳門繁體',
		'pwv-2017-zh-my': '大马简体',
		'pwv-2017-zh-sg': '新加坡简体',
		'pwv-2017-zh-tw': '臺灣正體'
	} ) );

	function PendingStackLayout( config ) {
		PendingStackLayout.super.call( this, config );
		OO.ui.mixin.PendingElement.call( this );
		this.$element.addClass( 'pwv-2017-pendingStackLayout' );
	}

	OO.inheritClass( PendingStackLayout, OO.ui.StackLayout );
	OO.mixinClass( PendingStackLayout, OO.ui.mixin.PendingElement );

	function entryPoint() {
		var variant, target, dialog, dropdown, stackLayout,
			panelLayouts, windowManager, errorDialog;

		function constructDocument( title, wikitext, categories ) {
			var $result = $( '<div>' ).addClass( 'mw-body mw-body-content' );

			if ( mw.config.get( 'skin' ) === 'vector' ) {
				// Additional classes required in vector to get correct appearance
				$result.addClass( 'vector-body' );
			}

			$result.append(
				$( '<h1>' ).addClass( 'firstHeading' ).html( title ),
				// Classes used here:
				// * mw-content-ltr
				// * mw-content-rtl
				$( '<div>' )
					.addClass( 'mw-content-' + mw.config.get( 'wgVisualEditor' ).pageLanguageDir )
					.attr(
						'lang',
						DATA.filter( function ( item ) {
							return item.var === variant;
						} )[ 0 ].htmlLang
					)
					.html( wikitext ),
				$.parseHTML( categories )
			);

			// Make other things like Reference Tooltip function
			mw.hook( 'wikipage.content' ).fire( $result );
			ve.targetLinksToNewWindow( $result[ 0 ] );
			return $result;
		}

		function fetchPreview() {
			var deferred = $.Deferred();
			// Currently (Aug 2021), Parsoid API does not have full LC functionality,
			// hence use parse API instead.
			target.getContentApi().post( {
				action: 'parse',
				disableeditsection: true,
				errorformat: 'html',
				errorlang: mw.config.get( 'wgUserLanguage' ),
				errorsuselocal: true,
				formatversion: 2,
				prop: 'text|indicators|displaytitle|categorieshtml|parsewarningshtml',
				pst: true,
				preview: true,
				title: target.getPageName(),
				text: target.getDocToSave(),
				uselang: mw.config.get( 'wgUserLanguage' ),
				variant: variant
			} ).then(
				function ( response ) {
					deferred.resolve( constructDocument(
						response.parse.displaytitle,
						response.parse.text,
						response.parse.categorieshtml
					) );
				},
				function ( errorCode, detail ) {
					deferred.reject( detail );
				} );
			return deferred;
		}

		function changeVariant( val ) {
			dialog.previewPanel.$element[ 0 ].focus();
			variant = val;

			var targetPanel = stackLayout.findItemFromData( variant );
			if ( targetPanel.$element.children().length ) {
				stackLayout.setItem( targetPanel );
			} else {
				stackLayout.pushPending();
				dropdown.setDisabled( true );

				fetchPreview().then( function ( $previewContainer ) {
					targetPanel.$element.append( $previewContainer );
					stackLayout.setItem( targetPanel );
				}, function ( detail ) {
					windowManager.openWindow( errorDialog, {
						title: OO.ui.msg( 'ooui-dialog-process-error' ),
						message: ve.init.target.getContentApi().getErrorMessage( detail ),
						actions: [
							{
								action: 'reject',
								label: OO.ui.deferMsg( 'ooui-dialog-message-reject' ),
								flags: 'safe'
							},
							{
								action: 'retry',
								label: OO.ui.deferMsg( 'ooui-dialog-process-retry' ),
								flags: [ 'primary', 'progressive' ]
							}
						]
					} ).closed.then( function ( data ) {
						if ( data && data.action === 'retry' ) {
							// Do not use setValue() since it will not trigger event
							changeVariant( variant );
						} else {
							// "variant" will be set by event handler
							dropdown.setValue( stackLayout.getCurrentItem().getData() );
						}
					} );
				} ).always( function () {
					stackLayout.popPending();
					dropdown.setDisabled( false );
				} );
			}
		}

		function previewWithVariant() {
			var currentPanel = stackLayout.getCurrentItem();

			if ( currentPanel.$element.children().length ) {
				dialog.swapPanel( 'preview' );
				dialog.previewPanel.$element.prepend( dropdown.$element );
			} else {
				target.emit( 'savePreview' );
				dialog.pushPending();

				fetchPreview().then( function ( $previewContent ) {
					target.getSurface().getModel().getDocument().once( 'transact', function () {
						panelLayouts.forEach( function ( item ) {
							item.$element.empty();
						} );
					} );
					dialog.swapPanel( 'preview' );
					currentPanel.$element.append( $previewContent );
					stackLayout.setItem( stackLayout.findItemFromData( variant ) );
					dialog.previewPanel.$element.prepend( dropdown.$element );
				}, function ( detail ) {
					dialog.showErrors(
						new OO.ui.Error(
							ve.init.target.getContentApi().getErrorMessage( detail ),
							{ recoverable: true }
						)
					);
				} ).always( function () {
					dialog.popPending();
				} );
			}
		}

		function init() {
			variant = mw.config.get( 'wgUserVariant' );
			target = ve.init.target;
			dialog = target.saveDialog;
			dropdown = new OO.ui.DropdownInputWidget( {
				$overlay: dialog.$overlay,
				classes: [ 'pwv-2017-variant' ],
				options:
					[ {
						optgroup: mw.msg( 'pwv-2017-caption' )
					} ].concat( DATA.map( function ( item ) {
						return {
							data: item.var,
							label: mw.msg( item.msg ) /* eslint-disable-line mediawiki/msg-doc */
						};
					} ) ),
				value: variant
			} );
			dropdown.on( 'change', changeVariant );
			panelLayouts = DATA.map( function ( item ) {
				return new OO.ui.PanelLayout( {
					expanded: false,
					data: item.var
				} );
			} );
			stackLayout = new PendingStackLayout( {
				expanded: false,
				items: panelLayouts
			} );
			stackLayout.setItem( stackLayout.findItemFromData( variant ) );
			dialog.previewPanel.$element.append( stackLayout.$element );
			errorDialog = new OO.ui.MessageDialog();
			windowManager = new OO.ui.WindowManager();
			windowManager.addWindows( [ errorDialog ] );
			$( document.body ).append( windowManager.$element );

			var handlerToRemove = 'onSaveDialogPreview';
			dialog.off( 'preview', handlerToRemove, target )
				.on( 'preview', previewWithVariant );
		}

		if ( !isInitialized ) {
			init();
			isInitialized = true;
		}
	}

	mw.hook( 've.saveDialog.stateChanged' ).add( entryPoint );

	mw.hook( 've.activationComplete' ).add( function () {
		if ( isInitialized ) {
			// Switching between VE and NWE, requires to be reinitialized
			isInitialized = false;
		}
	} );
}() );

// </nowiki>