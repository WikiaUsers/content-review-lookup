/* AddRailModule */
window.AddRailModule = [{prepend: true}];

/* Стили для категории "Контент модификаций" */
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
    if ( a.indexOf( 'Контент модификаций' ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Mods.css'
        });
    }
}( jQuery, mediaWiki );

/* Полная ширина страницы */
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Celeste_вики':
      case 'Celeste_вики:Администрация':
            $('body').addClass('is-content-expanded')
        break;
    }
});