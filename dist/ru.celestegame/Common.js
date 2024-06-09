/* AddRailModule */
window.AddRailModule = [{prepend: true}];

/* Полная ширина страницы */
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Celeste_вики':
      case 'Celeste_вики:Администрация':
            $('body').addClass('is-content-expanded')
        break;
    }
});