window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 28;

window.MultiClockConfig = {
    interval: 500, 
    clocks: [
        { label: "Американское время", offset: -6, color: "#f26b66", format: "%H:%M:%S %d %b %Y" },
        { label: "Московское время", offset: 3, color: "#adff2f", format: "%H:%M:%S %d %b %Y" },
        { label: "Местное время", offset: -(new Date().getTimezoneOffset()) / 60, color: "#aaf8ff", format: "%H:%M:%S %d %b %Y" }
    ]
};
importArticles({
	type: 'script',
	articles:
	[        
		'u:dev:MediaWiki:MultiClock.js',
	]});

mw.hook('wikipage.content').add(function($content) {
    if (!$content.find('.FilterContainer').length) return;

    // Добавляем стиль для скрытия прямо через JS, чтобы не править CSS файл
    if (!$('#filter-hide-style').length) {
        $('<style id="filter-hide-style">.filtrable-item.is-hidden { display: none !important; }</style>').appendTo('head');
    }

    var activeFilters = {};

    function updateFilters() {
        $content.find('.filtrable-item').each(function() {
            var item = $(this);
            var show = true;

            $.each(activeFilters, function(group, filterValues) {
                if (filterValues && filterValues.length > 0) {
                    var itemDataValue = String(item.attr('data-' + group) || '');
                    var itemDataArray = itemDataValue.split(' ');
                    var hasMatchInGroup = false;

                    $.each(filterValues, function(i, val) {
                        if (itemDataArray.indexOf(String(val)) !== -1) {
                            hasMatchInGroup = true;
                        }
                    });

                    if (!hasMatchInGroup) {
                        show = false;
                    }
                }
            });

            // Вместо toggle() используем строгий класс
            if (show) {
                item.removeClass('is-hidden');
            } else {
                item.addClass('is-hidden');
            }
        });
    }

    // Клик по кнопкам-иконкам
    $content.find('.filter-btn').on('click', function() {
        $(this).toggleClass('is-active');
        var g = $(this).attr('data-group');
        activeFilters[g] = $content.find('.filter-btn[data-group="'+g+'"].is-active').map(function(){
            return String($(this).attr('data-value'));
        }).get();
        updateFilters();
    });

    // Клик по пунктам в выпадающих списках
    $content.find('.opt').on('click', function(e) {
        e.stopPropagation();
        var parent = $(this).closest('.PseudoSelect');
        var g = parent.attr('data-group');
        var v = $(this).attr('data-value');
        
        parent.find('.SelectedOption').text($(this).text());
        
        if (v && v !== "") {
            parent.addClass('is-active-select');
            activeFilters[g] = [String(v)];
        } else {
            parent.removeClass('is-active-select');
            activeFilters[g] = [];
        }
        updateFilters();
    });

    // Кнопка полного сброса
    $content.find('#filter-reset').on('click', function() {
        $content.find('.filter-btn').removeClass('is-active');
        $content.find('.PseudoSelect').removeClass('is-active-select');
        $content.find('.PseudoSelect[data-group="place"] .SelectedOption').text('Размещение');
        $content.find('.PseudoSelect[data-group="season"] .SelectedOption').text('Сезон БП');
        activeFilters = {};
        $content.find('.filtrable-item').removeClass('is-hidden');
    });

    // Наведение мыши
    $content.find('.filter-btn').on('mouseenter', function() {
        var desc = $(this).attr('data-desc');
        if (desc) {
            $content.find('#filter-description-box').text(desc).addClass('is-active-desc');
        }
    }).on('mouseleave', function() {
        $content.find('#filter-description-box').text("Наведите на иконку").removeClass('is-active-desc');
    });
});