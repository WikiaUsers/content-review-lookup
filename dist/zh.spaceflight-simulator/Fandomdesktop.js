/* 这里的任何JavaScript将为所有用户在FandomDesktop皮肤加载 */
/*
 * 在每次页面加载时加载的JavaScript参见[[MediaWiki:Common.js]]
 */

mw.hook( 'wikipage.content' ).add( function ( $content ) {
	/* 链接 */
	$( '.external, a.text[ href^="https://spaceflight-simulator.fandom.com/zh/" ], .mw-parser-output a:has( img )[ target="_blank" ]' ).attr( 'target', '_self' );
	
	/* 图像 */
	/** 图库 */
	$( '.wikia-gallery-item:not( :last-child )' ).after( '\n' );
	
	if ( $( 'body' ).hasClass( 'ns--1' ) || $( 'body' ).hasClass( 'ns-14' ) ) {
		$( '.wikia-gallery .thumb' ).each( function () {
			var $thumb = $( this );
			var $file = $thumb.find( 'a.image' );
			var fileHref = $file.attr( 'href' );
			var fullFileName = fileHref.replace( '/zh/wiki/', '' );
			var fileName = fullFileName.replace( 'File:', '' );
			var $caption = $thumb.next( 'div.lightbox-caption' );
			if ( $caption.length === 0 ) {
				$caption = $( '<div class="lightbox-caption"></div>' ).insertAfter( $thumb );
			}
			$caption.prepend( '<a href="' + fileHref + '" class="galleryfilename galleryfilename-truncate" title="' + fullFileName + '">' + fileName + '</a>' );
			$file.removeAttr( 'href title style' );
			$file.children( 'img' ).removeAttr( 'title' );
		} );
	}
	
	/* 扩展 */
	/** TemplateData */
	$( '.mw-templatedata-doc-wrap code:not( :last-child )' ).after( ' ' );
} ) ();