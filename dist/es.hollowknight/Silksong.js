
!function( $, mw ) {
    var categories = mw.config.get('wgCategories');
    var pagename = mw.config.get('wgTitle');
    
    function includesSilksong(str) {
        return str.indexOf("Silksong") != -1
    }
 
    if (categories.some(includesSilksong) || includesSilksong(pagename)) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Silksong.css'
        });
    }
}( jQuery, mediaWiki );