/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

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

/**Сприт отмечает неактивных участников параметр 2 месяца */
//Inactive users
InactiveUsers = { 
    months: 2,
    text: 'В СТАЗИСЕ'
};

/** Вставка шаблона при загрузке изображения **/
// выполнение при готовности страницы
$(document).ready(function()
{      
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Описание \n| Описание  = \n| Пояснение = \n| Источник  = \n| Дата      = \n| Автор     = \n| Лицензия  = \n}}\n');
	}
});