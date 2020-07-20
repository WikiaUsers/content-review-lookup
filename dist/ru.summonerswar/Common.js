/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

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
 
        $('.tab' + to_hide).hide(1000);
        $('.tab' + to_show).show(1000);
    });
 
})(this.jQuery);