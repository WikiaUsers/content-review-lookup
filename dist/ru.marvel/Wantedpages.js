!function( $ ) {
    if ( !$( '.wanted-pages' ).length ) return;
 
    $.get( '/api.php', {
        action: 'query',
        list: 'querypage',
        qppage: 'Wantedpages',
        qplimit: 5000,
        format: 'json'
    }, function( d ) {
        var counter = 0;
 
        $.each( d.query.querypage.results, function( i, v ) {
            counter++;
        });
 
        $( '.wanted-pages' ).text( counter );
    });
}( jQuery );