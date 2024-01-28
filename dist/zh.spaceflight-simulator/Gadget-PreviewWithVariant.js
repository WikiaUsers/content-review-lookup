/**
 * @file Add a "Preview with variant" option to the edit form.
 * @author [[wikipedia:zh:User:Diskdance]]
 * @author [[wikipedia:zh:User:Lt2818]]
 * @license MIT
 */
// <nowiki>
( function () {
	var conv = require( 'ext.gadget.HanAssist' ).conv;
	var initialized = false;
	// This is initialized by ext.WikiEditor.realtimepreview.enable hook below
	// which is always called when Realtime Preview is enabled
	var realtimePreviewClass;
	mw.hook( 'ext.WikiEditor.realtimepreview.enable' ).add( function ( realtimePreview ) {
		if ( !realtimePreviewClass ) {
			realtimePreviewClass = realtimePreview;
		}
	} );

	mw.hook( 'wikipage.editform' ).add( function ( $editForm ) {
		if ( initialized ) {
			return;
		}

		var $templateSandboxPreview = $editForm.find( 'input[name="wpTemplateSandboxPreview"]' );
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
		var uriVariant = new mw.Uri().query.variant;

		/**
		 * @param {string|null} variant null for default variant
		 */
		function setVariant( variant ) {
			// Normal Preview
			var originalAction = $editForm.attr( 'action' );
			if ( originalAction ) {
				var uri = new mw.Uri( originalAction );
				if ( variant === null ) {
					delete uri.query.variant;
				} else {
					uri.query.variant = variant;
				}
				$editForm.attr( 'action', uri.getRelativePath() );
			}
			// Live Preview
			mw.config.set( 'wgUserVariant', variant || uriVariant || mw.user.options.get( 'variant' ) );
			// Realtime Preview
			if ( realtimePreviewClass ) {
				realtimePreviewClass.doRealtimePreview( true );
			}
		}

		var checkbox = new OO.ui.CheckboxInputWidget( {
			selected: !!uriVariant
		} );
		var dropdown = new OO.ui.DropdownInputWidget( {
			$overlay: true,
			disabled: !checkbox.isSelected(),
			options: VARIANTS,
			value: mw.config.get( 'wgUserVariant' ) || uriVariant || mw.user.options.get( 'variant' )
		} );

		checkbox.on( 'change', function ( selected ) {
			dropdown.setDisabled( !selected );
			setVariant( selected ? dropdown.getValue() : null );
		} );
		dropdown.on( 'change', setVariant );

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