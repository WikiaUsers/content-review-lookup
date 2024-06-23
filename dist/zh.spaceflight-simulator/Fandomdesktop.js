/* 这里的任何JavaScript将为所有用户在FandomDesktop皮肤加载 */
/*
 * 在每次页面加载时加载的JavaScript参见[[MediaWiki:Common.js]]
 */

( function () {
	/* 链接 */
	$( '.external' ).attr( 'target', '_self' );
	$( 'a.text[ href^="https://spaceflight-simulator.fandom.com/zh/" ]' ).attr( 'target', '_self' );
	$( '.mw-parser-output a:has( img )[ target="_blank" ]' ).attr( 'target', '_self' );
	
	/* 图像 */
	/** 图库 */
	$( '.wikia-gallery-item:not( :last-child )' ).after( '\n' );
	
	if ( $( 'body' ).hasClass( 'ns--1' ) || $( 'body' ).hasClass( 'ns-14' ) ) {
		var fileThumbs = $( '.wikia-gallery .thumb' );
		var files = $( '.wikia-gallery .gallery-image-wrapper a' );
		for ( var i = 0; i < files.length; i++ ) {
			var fileHref = $( files[ i ] ).attr( 'href' );
			var fullFileName = fileHref.replace( '/zh/wiki/', '' );
			var fileName = fullFileName.replace( 'File:', '' );
			$( fileThumbs[ i ] ).after( '<div class="lightbox-caption"><a href="' + fileHref + '" class="galleryfilename galleryfilename-truncate" title="' + fullFileName + '">' + fileName + '</a></div>' );
		}
		files.removeAttr( 'href title style' );
		$( '.wikia-gallery .gallery-image-wrapper a img' ).removeAttr( 'title' );
	}
	
	/* 扩展 */
	/** TemplateData */
	$( '.mw-templatedata-doc-wrap code:not( :last-child )' ).after( ' ' );
} ) ();