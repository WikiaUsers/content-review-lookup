window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 28;
window.MultiClockConfig = {
    interval: 500,
    separator: ":",
    clocks: [
        {    
            label: "Американское время", offset: -6, color: "#f26b66", format: "%2H:%2M:%2S %d %b %Y"
        },
        {    
            label: "Московское время", offset: 3, color: "#adff2f", format: "%2H:%2M:%2S %d %b %Y" 
        },
        {    
            label: "Местное время", offset: -(new Date().getTimezoneOffset() / 60), color: "#aaf8ff", format: "%2H:%2M:%2S %d %b %Y" 
        }
    ]
};
importArticles({
	type: 'script',
	articles:
	[        
		'u:dev:MediaWiki:MultiClock.js',
		'u:dev:MediaWiki:EditorColorPicker.js',
		'u:dev:MediaWiki:NullEditButton/code.js',
	]});
	
/* Автоматическое переключение для кастомных табберов .ps-tabber */
$(document).on('click', '.ps-tabber .ps-tab-button', function() {
    var $button = $(this);
    var $tabber = $button.closest('.ps-tabber');
    var targetId = $button.attr('data-target');

    // Переключаем активный класс у кнопок
    $tabber.find('.ps-tab-button').removeClass('wds-is-current is-current');
    $button.addClass('wds-is-current');

    // Переключаем видимость контента
    $tabber.find('.ps-tab-content').hide();
    $tabber.find('#' + targetId).show();
});

(function($) {
    mw.hook('wikipage.content').add(function($content) {
        // Ищем главный контейнер фильтра
        var $container = $content.find('.FilterContainer');
        if (!$container.length) return;

        var $descBox = $container.find('#filter-description-box');
        var $selects = $container.find('.PseudoSelect');
        
        // Автоматически сохраняем дефолтный текст для всех списков
        $selects.each(function() {
            var $sel = $(this);
            var defaultText = $sel.find('.SelectedOption').text();
            $sel.data('default-text', defaultText);
        });

        var activeFilters = {};

        // Функция динамического обновления (без жесткого кэша на старте)
        function updateFilters() {
            // Ищем элементы КРАЙНЕ быстро только внутри целевого контейнера вывода
            var $items = $container.find('.filtrable-item');
            
            $items.each(function() {
                var $item = $(this);
                var show = true;

                $.each(activeFilters, function(group, filterValues) {
                    if (filterValues && filterValues.length > 0) {
                        var itemDataValue = String($item.attr('data-' + group) || '').trim();
                        
                        // Если в кнопке "Все" (пустое значение), пропускаем эту группу
                        if (filterValues.length === 1 && filterValues[0] === "") {
                            return true; 
                        }

                        var itemDataArray = itemDataValue.split(/\s+/); // деление по любым пробелам
                        var hasMatchInGroup = false;

                        for (var i = 0; i < filterValues.length; i++) {
                            var currentFilterVal = filterValues[i];
                            if (currentFilterVal !== "" && itemDataArray.indexOf(currentFilterVal) !== -1) {
                                hasMatchInGroup = true;
                                break;
                            }
                        }

                        if (!hasMatchInGroup) {
                            show = false;
                            return false; // Выход из $.each для этой карточки
                        }
                    }
                });

                // Мгновенное скрытие/отображение через CSS класс
                $item.toggleClass('is-hidden', !show);
            });
        }

        // Клик по кнопкам-иконкам
        $container.off('click', '.filter-btn').on('click', '.filter-btn', function() {
            var $btn = $(this);
            $btn.toggleClass('is-active');
            
            var g = $btn.attr('data-group');
            
            activeFilters[g] = $container.find('.filter-btn[data-group="' + g + '"].is-active').map(function() {
                return String($(this).attr('data-value')).trim();
            }).get();
            
            updateFilters();
        });

        // Клик по пунктам в выпадающих списках
        $container.off('click', '.opt').on('click', '.opt', function(e) {
            e.stopPropagation();
            var $opt = $(this);
            var $parent = $opt.closest('.PseudoSelect');
            var g = $parent.attr('data-group');
            var v = $opt.attr('data-value');
            
            $parent.find('.SelectedOption').text($opt.text());
            
            if (v && v !== "") {
                $parent.addClass('is-active-select');
                activeFilters[g] = [String(v).trim()];
            } else {
                $parent.removeClass('is-active-select');
                activeFilters[g] = []; // Если выбрали "Все", очищаем группу
            }
            updateFilters();
        });

        // Кнопка полного сброса
        $container.off('click', '#filter-reset').on('click', '#filter-reset', function() {
            $container.find('.filter-btn').removeClass('is-active');
            
            $selects.removeClass('is-active-select').each(function() {
                var $sel = $(this);
                $sel.find('.SelectedOption').text($sel.data('default-text'));
            });
            
            activeFilters = {};
            $container.find('.filtrable-item').removeClass('is-hidden');
            $descBox.text("Наведите на иконку").removeClass('is-active-desc');
        });

        // Наведение мыши на кнопки
        $container.off('mouseenter mouseleave', '.filter-btn')
            .on('mouseenter', '.filter-btn', function() {
                var desc = $(this).attr('data-desc');
                if (desc) {
                    $descBox.text(desc).addClass('is-active-desc');
                }
            })
            .on('mouseleave', '.filter-btn', function() {
                $descBox.text("Наведите на иконку").removeClass('is-active-desc');
            });
    });
})(jQuery);