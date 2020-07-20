!function( $, mw ) {
 
    if ($('#picnicpanic').length) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:PicnicPanic.css'
        });
    }
}( jQuery, mediaWiki );