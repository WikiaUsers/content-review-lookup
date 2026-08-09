// WC3 Battle.net Sound Effect on Link Hover
$(document).ready(function() {
    // Добавляем класс 'wc3-btn' всем ссылкам в навигации для стилизации
    $('.vector-menu-tabs li a, .mw-portlet-body li a').addClass('wc3-btn');
    
    // Эффект "нажатия" при клике на меню
    $('.wc3-btn').on('mousedown', function() {
        $(this).css({
            'transform': 'scale(0.95)',
            'background': '#b89b40',
            'color': '#000000'
        });
    }).on('mouseup mouseleave', function() {
        $(this).css({
            'transform': 'scale(1)',
            'background': '',
            'color': ''
        });
    });
    
    // Добавление рунического разделителя перед заголовками h2 (как в книге заклинаний)
    $('h2').each(function() {
        $(this).prepend('<span style="color:#b89b40; margin-right:10px;">❖</span>');
    });
});
$(document).ready(function() {
    // Перемещаем TOC в контейнер под инфобоксом
    var toc = $('#toc, .toc').first();
    var target = $('.strategy-toc-target').first();
    
    if (toc.length && target.length) {
        // Убираем стандартный флоат у TOC
        toc.css({
            'float': 'none',
            'width': 'auto',
            'margin': '0',
            'border-radius': '0 0 6px 6px',
            'border-top': 'none'
        });
        
        // Переносим TOC в контейнер
        target.append(toc);
    }
});