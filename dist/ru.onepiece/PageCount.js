;( function( $, mw ) {
    if ( !$( '#PageCount' ).length ) return;
 
    $( '#PageCount' ).each( function() {
        var $that = $( this ),
            category = $( this ).attr('data-name'),
            count_i = 0;
 
        $.get( '/api.php', {
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 5000,
            format: 'json'
        }, function( data ) {
            if ( data.query.categorymembers.length === 0 ) { 
                $( '#PageCount' ).text( 0 );
                return;
            }
 
            $.each( data.query.categorymembers, function( i, v ) {
                if ( v.ns == '14' ) return;
                count_i++;
            });
 
            $that.text( count_i );
        });
    });
})( this.jQuery, this.mediaWiki );