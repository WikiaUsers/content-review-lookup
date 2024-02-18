/* AddRailModule */
window.AddRailModule = [{prepend: true}];

/* Полная ширина страницы */
$(function(){   
    switch ( mw.config.get('wgPageName') ) {
      case 'Достижения':
            $('body').addClass('is-content-expanded')
        break;
    }
});