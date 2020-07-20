/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Взято с http://ru.elite-dangerous.wikia.com
// Script for switching tabs on main page
(function($) {
    if (!$('.switchtab').length) {
        return;
    }
 
    $('.switchtab').click(function() {
        if ($(this).hasClass('toggledtab')) {
            return;
        }
 
        to_hide = $('.toggledtab').attr('data-tab');
        to_show = $(this).attr('data-tab');
 
        $('.toggledtab').toggleClass('toggledtab');
        $(this).toggleClass('toggledtab');
 
        $('.tab' + to_hide).hide(0);
        $('.tab' + to_show).show(0);
    });
 
})(this.jQuery);