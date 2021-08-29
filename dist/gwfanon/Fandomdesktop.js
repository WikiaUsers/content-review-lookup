// Template:Autor (EN: Author)
if($('.headerek').length) {
   $('<div class="nowyautor">'+$('.headerek').html()+'</div>').appendTo('.page-header__top');
   $('.headerek').remove();
}

// Template:ZobaczTeż (EN: SeeAlso)
if($('.podgłówek').length) {
   $('<div class="page-header__page-subtitle alternatywny-podgłówek">'+$('.podgłówek').html()+'</div>').appendTo('.page-header__title-wrapper');
   $('.podgłówek').remove();
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