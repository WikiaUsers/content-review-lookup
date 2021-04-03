/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
/* Главное меню. Табуляция. Взято с http://ru.summonerswar.wikia.com */
// Script for switching tabs on main page
(function($) {
 
    function switchtab() {
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
    }
    mw.hook('wikipage.content').add(switchtab);
 
})(this.jQuery);