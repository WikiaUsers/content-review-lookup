//Автор - Корсар94

(function( $, mw ){
    "use strict";

    // Если статья не из основного пространства - возвращаемся
    if ( [ 0, 112 ].indexOf( mw.config.get('wgNamespaceNumber') ) == -1 ) return;
    if ( mw.config.get( 'wgAction' ) !== 'view' ) return;
 
    $.get( '/uk/api.php', {
        action: 'query',
        list: 'querypage',
        qppage: 'Longpages',
        format: 'json',
        qplimit: 500
    }, function( data ) {
        $.each( data.query.querypage.results, function( i, v ) {
        	if ( v.value <= 7184 ) return;
			var lp = v.title;

            if ( $( '.mw-parser-output a[title$="' + lp + '"]' ).length ) {
                $( '.mw-parser-output a[title$="' + lp + '"]' ).each( function() {
                    if ( $( this ).next( 'sup.size-notify' ).length || $( this ).find( 'img' ).length ) return;
                    $( this ).after( '<sup class="size-notify"><span style="color:red;">>7MB!</span></sup>' );
                });
            }
        });
    });
})( this.jQuery, this.mediaWiki );