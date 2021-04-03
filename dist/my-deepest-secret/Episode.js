(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'Season 1',
		'Season 2',
		'Season 3'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Episode.css'
        });
    }
})( jQuery, mediaWiki );