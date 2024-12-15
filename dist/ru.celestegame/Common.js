// AddRailModule
window.AddRailModule = [{prepend: true}];


// Стили для категории "Контент модов"
!function( $, mw ) {
    var a = mw.config.get( 'wgCategories' ), p = mw.config.get( 'wgTitle' );
    if ( a.indexOf( 'Контент модов' ) !== -1 ) {
        importArticle({
            type: 'style',
            article: 'MediaWiki:Mods.css'
        });
    }
}( jQuery, mediaWiki );


// GadgetsStateToggler 
nkch_gst_gadgets = [{
    name: "GlobalStylesFix",
    title: "Исправление глобальных стилей",
    description: "Улучшает оформление глобальных элементов"
}];


// Полная ширина страницы 
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Celeste_вики':
            $('body').addClass('is-content-expanded')
        break;
    }
});