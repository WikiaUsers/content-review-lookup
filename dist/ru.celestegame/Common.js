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
    name: "SearchBar",
    title: "Удобная поисковая строка",
    description: "Добавляет поисковую строку в правой верхней части экрана, что убирает необходимость нажимать на кнопку для поиска"
}, {
	name: "NoGlobalNav",
    title: "Отключение глобальной навигации",
    description: "Скрывает глобальную навигацию и меняет расположение иконок пользователя и уведомлений"
}];


// Полная ширина страницы 
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Celeste_вики':
      case 'Celeste_вики:Администрация':
            $('body').addClass('is-content-expanded')
        break;
    }
});