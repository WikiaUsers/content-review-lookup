//Автор - Корсар94

(function( $, mw ){
    "use strict";
 
    // Если статья не из основного пространства - возвращаемся
    if ( mw.config.get('wgNamespaceNumber') !== 0 ) return;
 
    $.get( '/api.php', {
        action: 'query',
        list: 'querypage',
        qppage: 'Longpages',
        format: 'json',
        qplimit: 260
    }, function( data ) {
        $.each( data.query.querypage.results, function( i, v ) {
            var link = encodeURIComponent( v.title.replace( /\s/g, '_' ) );
 
            // Парсим недостающие символы
            if ( link.indexOf( "'" ) > -1 ) {
                link = link.replace( /'/g, '%27' );
            }
            if ( link.indexOf( "~" ) > -1 ) {
                link = link.replace( /~/g, '%7E' );
            }
 
            if ( $( '#WikiaArticle a[href$="' + link + '"]' ).length) {
                $( '#WikiaArticle a[href$="' + link + '"]' ).each( function() {
                    if ( $( this ).next( 'sup.size-notify' ).length || $( this ).find( 'img' ).length ) return;
                    $( this ).after( '<sup class="size-notify"><span style="color:red;">>5MB!</span></sup>' );
                });
            }
        });
    });
})( this.jQuery, this.mediaWiki );