/**
 * NoteTAViewer
 * @description Viewer for NoteTA-related templates and modules, original code from https://zh.wikipedia.org/wiki/MediaWiki:Gadget-noteTA.js .
 * @modifier    Winston Sung
 * @license     CC BY-SA 3.0
 * @external    "jQuery 1.12.4"
 * @external    "jQuery UI 1.12.1"
 * @external    "I18n-js"
 */
// <nowiki>
/* mw.loader.load('https://code.jquery.com/jquery-1.12.4.js'); */
mw.loader.load('https://code.jquery.com/ui/1.12.1/jquery-ui.js');
mw.loader.load('/zh/wiki/MediaWiki:Gadget-NoteTAViewer.css?action=raw&ctype=text/css', 'text/css' );

noteTAViewer = ( function() { $( function() {
	var api = null;
	var init = function( hash ) {
		var $dialog = $( '<div class="noteTA-dialog" />' );
		$dialog.html( '<div class="mw-ajax-loader" style="margin-top: 48px;" />' );
		$dialog.dialog( {
			title: wgULS( '字词转换', '字詞轉換' )
		} );
		api = new mw.Api();
		run( $dialog, hash );
		return $dialog;
	}, run = function( $dialog, hash ) {
		var wikitext = '';
		var $dom = $( '#noteTA-' + hash );
		var collapse = true;
		var actualTitle = mw.config.get( 'wgPageName' ).replace( /_/g, ' ' );

		var parse = function() {
			api.post( {
				action: 'parse',
				title: 'Template:CGroup/-',
				text: wikitext,
				prop: 'text',
				variant: mw.config.get( 'wgUserVariant' )
			} ).done( function( results ) {
				$dialog.html( results.parse.text['*'] );
				if ( collapse ) {
					/* $dialog.find( '.mw-collapsible' ).makeCollapsible(); */
					$dialog.find( '.mw-collapsible-toggle' ).on( 'click.mw-collapse', function( e ) {
						var $collapsibleContent = $( this ).parent( '.mw-collapsible' ).find( '.mw-collapsible-content' );
						setTimeout( function() {
							$collapsibleContent.promise().done( function() {
								$dialog.dialog( 'option', 'position', 'center' );
							} );
						}, 0 );
					} );
				}
				$dialog.dialog( 'option', 'width', Math.round( $( window ).width() * 0.8 ) );
				$dialog.css( 'max-height', Math.round( $( window ).height() * 0.8 ) + 'px' );
				$dialog.dialog( 'option', 'position', 'center' );
			} ).fail( parse );
		}, maybeTitle = parse;

		var $noteTAtitle = $dom.find( '.noteTA-title' );
		if ( $noteTAtitle.length ) {
			var titleConv = $noteTAtitle.attr( 'data-noteta-code' );
			var titleDesc = $noteTAtitle.attr( 'data-noteta-desc' );
			if ( titleDesc ) {
				titleDesc = '（' + titleDesc + '）';
			} else {
				titleDesc = '';
			}
			wikitext += '<span class="plainlinks" style="float: right;">[{{fullurl:' + actualTitle + '|action=edit&section=0}} {{int:edit}}]</span>\n';
			wikitext += '; 本文使用標題手動轉換\n';
			wikitext += '* 轉換標題為：-{D|' + titleConv + '}-' + titleDesc + '\n';
			wikitext += '* 實際標題為：-{R|' + actualTitle + '}-\n';
			wikitext += '* 目前顯示為：-{|' + titleConv + '}-\n';
		} else {
			maybeTitle = function() {
				api.post( {
					action: 'parse',
					title: actualTitle,
					text: '{{noteTA/multititle|' + actualTitle + '}}',
					prop: 'text',
					variant: 'zh'
				} ).done( function( results ) {
					var $multititle = $( results.parse.text['*'] ).find( '.noteTA-multititle' );
					if ( $multititle.length ) {
						var textVariant = {}, variantText = {}, multititleText = '';
						$multititle.children().each( function() {
							var $li = $( this );
							var variant = $li.attr( 'data-noteta-multititle-variant' );
							var text = $li.text();
							variantText[variant] = text;
							if ( textVariant[text] ) {
								textVariant[text].push( variant );
							} else {
								textVariant[text] = [ variant ];
							}
						} );
						multititleText += '; 本文標題可能經過轉換\n';
						multititleText += '* 轉換標題為：';
						var multititle = [], titleConverted = variantText[mw.config.get( 'wgUserVariant' )];
						for ( var variant in variantText ) {
							var text = variantText[variant];
							if ( text === null ) {
								continue;
							}
							var variants = textVariant[text];
							$.each( variants, function() {
								variantText[this] = null;
							} );
							var variantsName = $.map( variants, function( variant ) {
								return '-{R|{{MediaWiki:Variantname-' + variant + '}}}-';
							} ).join( '、' );
							multititle.push( variantsName + '：-{R|' + text + '}-' );
						}
						multititleText += multititle.join( '；' );
						multititleText += '\n* 實際標題為：-{R|' + actualTitle + '}-\n* 目前顯示為：-{R|' + titleConverted + '}-\n';
						wikitext = multititleText + wikitext;
					}
					parse();
				} ).fail( maybeTitle );
			};
		}

		var $noteTAgroups = $dom.find( '.noteTA-group > *[data-noteta-group]' );
		if ( $noteTAgroups.length > 1 ) {
			collapse = true;
		}
		$noteTAgroups.each( function() {
			var $this = $( this ), text = '';
			switch ( $this.attr( 'data-noteta-group-source' ) ) {
			case 'template':
				wikitext += '{{CGroup/' + $this.attr( 'data-noteta-group' ) + '}}\n';
				break;
			case 'module':
				wikitext += '{{#invoke:CGroupViewer|dialog|' + $this.attr( 'data-noteta-group' ) + '}}\n';
				break;
			case 'none':
				wikitext += '; 本文使用的公共轉換組「' + $this.attr( 'data-noteta-group' ) + '」尚未建立\n';
				wikitext += '* <span class="plainlinks">[{{fullurl:Module:CGroup/' + $this.attr( 'data-noteta-group' ) + '|action=edit}} 建立公共轉換組「' + $this.attr( 'data-noteta-group' ) + '」]</span>\n';
				break;
			default:
				wikitext += '; 未知公共轉換組「' + $this.attr( 'data-noteta-group' ) + '」來源「' + $this.attr( 'data-noteta-group-source' ) + '」\n';
			}
		} );

		var $noteTAlocal = $dom.find( '.noteTA-local' );
		if ( $noteTAlocal.length ) {
			collapse = true;
			wikitext += '<span style="float: right;">{{edit|' + actualTitle + '|section=0}}</span>\n';
			wikitext += '; 本文使用全文手動轉換\n';
			var $noteTAlocals = $noteTAlocal.children( '*[data-noteta-code]' );
			$noteTAlocals.each( function() {
				var $this = $( this );
				var localConv = $this.attr( 'data-noteta-code' );
				var localDesc = $this.attr( 'data-noteta-desc' );
				if ( localDesc ) {
					localDesc = '（' + localDesc + '）';
				} else {
					localDesc = '';
				}
				wikitext += '* -{D|' + localConv + '}-' + localDesc + '目前顯示為：-{' + localConv + '}-\n';
			} );
		}

		wikitext += '${footer}\n';
		maybeTitle();
	};

	$( '.mw-indicator[id^=mw-indicator-noteTA-]' )
		.css( 'cursor', 'pointer' )
		.each( function() {
			var $dialog = null;
			var $this = $( this );
			var hash = $this.attr( 'id' ).replace( /^mw-indicator-noteTA-/, '' );
			$this.click( function() {
				if ( $dialog === null ) {
					$dialog = init( hash );
				} else {
					$dialog.dialog( 'open' );
				}
			} );
		} );

} ); } );
mw.hook('wikipage.content').add( function ( $content ) {
    setTimeout("noteTAViewer();", 0);
});
// </nowiki>