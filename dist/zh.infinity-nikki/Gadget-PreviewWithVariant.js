// script from https://zh.wikipedia.org/wiki/MediaWiki:Gadget-PreviewWithVariant.js
/**
 * @file Add a "Preview with variant" option to the edit form.
 * @author [[zh:User:Diskdance]]
 * @author [[zh:User:Lt2818]]
 * @license MIT
 */
// <nowiki>
( function () {
	var conv = require( 'ext.gadget.HanAssist' ).conv;
	var initialized = false;
	mw.hook( 'wikipage.editform' ).add( function ( $editForm ) {
		if ( initialized ) {
			return;
		}

		var $templateSandboxPreview = $editForm.find( 'input[name="wpPreview"]' );
		// It is possible that a user want to preview a page with a non-wikitext module
		// Do not return in this case
		if (
			mw.config.get( 'wgPageContentModel' ) !== 'wikitext' &&
			!$templateSandboxPreview.length
		) {
			return;
		}

		var $layout = $editForm.find( '.editCheckboxes .oo-ui-horizontalLayout' );
		if ( !$layout.length ) {
			return;
		}
		initialized = true;

		var VARIANTS = [
			{ data: 'zh', label: conv( { hans: '不转换', hant: '不轉換' } ) },
			{ data: 'zh-hans', label: '简体' },
			{ data: 'zh-hant', label: '繁體' },
			{ data: 'zh-cn', label: '大陆简体' },
			{ data: 'zh-hk', label: '香港繁體' },
			{ data: 'zh-mo', label: '澳門繁體' },
			{ data: 'zh-my', label: '大马简体' },
			{ data: 'zh-sg', label: '新加坡简体' },
			{ data: 'zh-tw', label: '臺灣正體' }
		];
		var params = new URLSearchParams(document.location.search);
		var uriVariant = params.get('variant');
		var checkbox = new OO.ui.CheckboxInputWidget( {
			selected: uriVariant
		} );
		var dropdown = new OO.ui.DropdownWidget( {
			$overlay: true,
			disabled: !checkbox.isSelected(),
			menu: {
				items: VARIANTS.map( function ( item ) {
					return new OO.ui.MenuOptionWidget( { data: item.data, label: item.label } );
				} )
			}
		} );
		dropdown.getMenu().selectItemByData( mw.config.get( 'wgUserVariant' ) || uriVariant || mw.user.options.get( 'variant' ) );
		checkbox.on( 'change', function ( selected ) {
			dropdown.setDisabled( !selected );
		} );

		function getSelectedVariant() {
			if ( !checkbox.isSelected() ) {
				return null;
			}
			var selectedItem = dropdown.getMenu().findSelectedItem();
			return selectedItem ? selectedItem.getData() : null;
		}

		function manipulateActionUrl() {
			var selectedVariant = getSelectedVariant(),
				originalAction = $editForm.attr( 'action' );
			if ( selectedVariant && originalAction ) {
				$editForm.attr(
					'action',
					new mw.Uri( originalAction )
						.extend( { variant: selectedVariant } )
						.getRelativePath()
				);
			}
		}

		function manipulateVariantConfig() {
			mw.config.set( 'wgUserVariant', getSelectedVariant() || mw.user.options.get( 'variant' ) );
		}

		$editForm.find( '#wpPreview' ).on(
			'click',
			!mw.user.options.get( 'uselivepreview' ) ? manipulateActionUrl : manipulateVariantConfig
		);
		$templateSandboxPreview.on( 'click', manipulateActionUrl );

		var checkboxField = new OO.ui.FieldLayout( checkbox, {
			align: 'inline',
			label: conv( { hans: '预览字词转换', hant: '預覽字詞轉換' } )
		} );
		var dropdownField = new OO.ui.FieldLayout( dropdown, {
			align: 'top',
			label: conv( { hans: '使用该语言变体显示预览：', hant: '使用該語言變體顯示預覽：' } ),
			invisibleLabel: true
		} );
		$layout.append( checkboxField.$element, dropdownField.$element );
	} );

	// Register 2017 wikitext editor version to VE
	mw.loader.using( 'ext.visualEditor.desktopArticleTarget.init' ).then( function () {
		mw.libs.ve.addPlugin( 'ext.gadget.PreviewWithVariant2017' );
	} );
}() );
// </nowiki>