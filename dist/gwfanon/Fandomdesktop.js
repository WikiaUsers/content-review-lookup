// Template:Autor (EN: Author)
if($('.headerek').length) {
   $('<div class="nowyautor">'+$('.headerek').html()+'</div>').appendTo('.page-header__top');
   $('.headerek').remove();
}

// Template:ZobaczTeż (EN: SeeAlso)
if($('.podgłówek').length) {
   $('<span class="page-header__page-subtitle alternatywny-podgłówek alternatywny-podgłówek2">'+$('.podgłówek').html()+'</span>').appendTo('.page-header__title-wrapper');
   $('.podgłówek').remove();
}
if($('.podgłówek2').length) {
   $('<span class="page-header__page-subtitle alternatywny-podgłówek alternatywny-podgłówek2">'+$('.podgłówek2').html()+'</span>').appendTo('.page-header__title-wrapper');
   $('.podgłówek2').remove();
}
if($('.podgłówek3').length) {
   $('<span class="page-header__page-subtitle alternatywny-podgłówek alternatywny-podgłówek3">'+$('.podgłówek3').html()+'</span>').appendTo('.page-header__title-wrapper');
   $('.podgłówek3').remove();
}

// Anons.css
if ( !mw.config.get( 'wgUserId' ) ) {
    importArticle( {
        type: 'style',
        article: 'MediaWiki:Anons.css'
    } );
}

// Category class
$ ( function ( ) { mw.config.get ( 'wgCategories' ).forEach ( function ( el, id ) { $ ( 'body' ).addClass ( 'cat-' + el.replace(/ /g, '-') ) } ); } );

// File description
$('textarea[name=wpUploadDescription]').val('{{Informacje\r\n| Opis      = \r\n| Autor     = \r\n| Źródło    = \r\n}}\r\n');

// Template:Top like on Wookieepedia (source: https://starwars.fandom.com/wiki/MediaWiki:Common.css)
$( function eraIconsOasis() {
    if ( $( '#kanonicznie' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#kanonicznie' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#kanonicznie' ).show() );
    	}
    }
} );