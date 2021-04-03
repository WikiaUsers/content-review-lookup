(function( $, mw ) {
    var p = mw.config.get( 'wgTitle' ), a;
 
    a = [
        'User_ScarletRose223_Sandbox'
    ];
 
    if ( a.indexOf( p ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Sandbox.css'
        });
    }
})( jQuery, mediaWiki );