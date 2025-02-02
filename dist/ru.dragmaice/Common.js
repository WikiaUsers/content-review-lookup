/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Настройка для окна предпросмотра ссылок (LinkPreview) //
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
    window.pPreview.defimage = 'https://static.wikia.nocookie.net/dragmaicee/images/e/e6/Site-logo.png/revision/latest?cb=20230603171524&path-prefix=ru';
    window.pPreview.noimage = 'https://static.wikia.nocookie.net/dragmaicee/images/e/e6/Site-logo.png/revision/latest?cb=20230603171524&path-prefix=ru';
    window.pPreview.RegExp.ilinks = [new RegExp('(Talk:)|(User:)|(Project:)|(Project_talk:)|(Hibike!_Euphonium_Wiki:)|(Hibike!_Euphonium_Wiki_talk:)|(File:)|(File_talk:)|(MediaWiki:)|(MediaWiki_talk:)|(Template:)|(Template_talk:)|(Help:)|(Help_talk:)|(Category:)|(Category_talk:)|(Forum:)|(Forum_talk:)|(User_blog:)|(User_blog_comment)|(Blog:)|(Blog_talk:)|(Module:)|(Module_talk:)|(Message_Wall:)|(Thread:)|(Message_Wall_Greeting:)')];
    window.pPreview.RegExp.iimages = [/Blank_template\.svg/, /Nuvola_apps_important_recycle\.svg/, /Disambig_blue\.svg/, /Accessories-text-editor\.svg/, /Arrow_Blue_Right_001\.svg/, /Edit-clear\.svg/, /Emblem-important\.svg/, /Symbol_support_vote\.svg/, /Symbol_dab_class\.svg/, /Symbol_book_class\.svg/, /Nuvola_apps_important\.png/, /Red_pog\.png/, /Small_Skew_Star_SVG\.svg/, /Mozilla\.svg/, /Searchtool\.svg/, /StubSectionToBeWrittenByMithgol\.png/, /Merge-split-transwiki default\.svg/, /Ambox_globe\.svg/,  /Ambox_outdated_serious\.svg/, /Ambox_outdated\.svg/, /45px-Rename_icon.svg\.png/, /Mail-mark-junk_red\.svg/, /Translation_Aあ\.svg/, /Wikibooks_textbooks_hybrid2\.svg/, /Silver_-_replace_this_image_male\.svg/, /Stalewarning\.svg/];
    window.pPreview.RegExp.noinclude = ['.lm-plashka-tiny', '.infobox', '#icons', '.dablink', '.infobox geography', '.lm-plashka', '.flagicon', '.infobox vcard', '.noprint', '.ambox-text', '.ambox-text-small', '.ambox-image', 'metadata plainlinks ambox'];

/* Switcher */
'use strict';
$( function () {
	$.each( document.querySelectorAll( '.switcher-container' ), function ( i, container ) {
		var selected, $radio;
		var switchers = []
		var radioName = 'switcher-' + i;
		$.each( container.children, function ( j, switcher ) {
			var label = switcher.querySelector( '.switcher-label' );
			if ( !label || !label.childNodes.length ) {
				return;
			}
			switchers.push( switcher );
			$radio = $( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
				$( selected ).hide();
				$( switcher ).show();
				selected = switcher;
			} );
			if ( !selected ) {
				// Mark the first one as selected
				selected = switcher;
				$radio.prop( 'checked', true );
			} else if ( label.getAttribute( 'data-switcher-default' ) !== null ) {
				// Custom default
				$radio.click();
			} else {
				// Hide non-default
				$( switcher ).hide();
			}
			$( '<label style="display:block"></label>' ).append( $radio, label.childNodes ).appendTo( container );
			$( label ).remove();
		} );
		if ( switchers.length > 1 ) {
			$( '<label style="display:block">Показать всё</label>' ).prepend(
				$( '<input>' ).prop({ type: 'radio', name: radioName }).on( 'click', function () {
					$( switchers ).show();
					selected = switchers;
				} )
			).appendTo( container );
		}
		if ( switchers.length === 1 ) {
			$radio.remove();
		}
	} );
} );