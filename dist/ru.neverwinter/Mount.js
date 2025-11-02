/**
 * This file serves as a centralized collection of JavaScript code related to mount functionality.
 * Dependencies: jQuery library
 */
window.initializeMountPower = function() {
    // предотвращаем двойную инициализацию
    if ($('.calculate-mount-power .settings-icon').length > 0) {
        return;
    }
    if ($('.calculate-mount-power').length === 0) {
        return;
    }

    // Таблица качества
    var qualityLevels = {
        common: 0.0062,    // 0,62%
        uncommon: 0.0667,  // 6,67%
        rare: 0.2,         // 20%
        epic: 0.4,         // 40%
        legendary: 0.6667, // 66,67%
        mythic: 1.0        // 100%
    };

    // Функция форматирования числа с запятой
    var formatNumber = function(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Функция извлечения всех значений в {}
    var extractAllValues = function(text) {
        if (!text || typeof text !== 'string') {
            return [];
        }
        var matches = text.match(/\{[\d,.]+\}/g) || [];
        var values = matches.map(function(match) {
            var original = match.replace(/[\{\}]/g, '');
            var hasComma = original.includes(',');
            var value = parseFloat(original.replace(',', '.'));
            return { value: value, hasComma: hasComma, original: original };
        });
        return values;
    };

    // Глобальные переменные
    var globalQuality = 'mythic';
    var globalBolster = 0;

    // Основной контейнер
    var $mainContainer = $('.calculate-mount-power').first();

    // Проверяем класс артефактов
    var isArtifactVersion = $mainContainer.hasClass('calculate-mount-power--table');

    // Читаем data-quality
    var dataQuality = $mainContainer.data('quality');
    if (dataQuality && qualityLevels.hasOwnProperty(dataQuality)) {
        globalQuality = dataQuality;
    }

    // Контейнер панели управления
    var $controls = $('<div>').addClass('mount-controls');

    // --- Элементы управления ---
    var $qualitySelect = $('<select>')
        .attr('id', 'quality-select')
        .attr('title', 'Выберите качество скакуна для расчета параметров')
        .css({
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            fontSize: '14px',
            marginRight: isArtifactVersion ? '0' : '10px',
            cursor: 'pointer'
        });

    $.each(qualityLevels, function(key) {
        var $option = $('<option>').val(key).text({
            common: 'Обычный',
            uncommon: 'Необычный',
            rare: 'Редкий',
            epic: 'Эпический',
            legendary: 'Легендарный',
            mythic: 'Мифический'
        }[key] || key);

        if (key === globalQuality) {
            $option.prop('selected', true);
        }

        $qualitySelect.append($option);
    });

    var $bolsterInput = $('<input>').attr({
        type: 'number',
        id: 'bolster-input',
        min: 0,
        max: 100,
        value: 0,
        title: 'Введите процент общего уровня предметов (0-100%)'
    }).css({
        width: '60px',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
        marginRight: isArtifactVersion ? '0' : '10px'
    });

    // --- Структура для артефактов ---
    if (isArtifactVersion) {
        var $qualityRow = $('<div>').addClass('mount-quality-row').css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }).append(
            $('<span>').addClass('settings-icon').html('⚙️').css({ fontSize: '18px' }),
            $('<label>').text('Качество скакуна:'),
            $qualitySelect
        );

        var $bolsterRow = $('<div>').addClass('mount-bolster-row').css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }).append(
            $('<label>').text('Общее укрепление для скакуна (%):'),
            $bolsterInput
        );

        $controls.css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }).append($qualityRow, $bolsterRow);
    } else {
        // --- Старая горизонтальная структура ---
        $controls.css({
            display: 'flex',
            alignItems: 'center'
        }).append(
            $('<span>').addClass('settings-icon').html('⚙️').css({
                marginRight: '10px',
                fontSize: '18px'
            }),
            $('<label>').text('Качество скакуна: ').css({ marginRight: '5px' }),
            $qualitySelect,
            $('<label>').text('Общее укрепление для скакуна (%): ').css({ marginRight: '5px' }),
            $bolsterInput
        );
    }

    // Добавляем панель
    $mainContainer.append($controls);

    // Сохраняем исходный HTML для расчётов
    $('.calculate-mount-power-target').each(function() {
        var $target = $(this);
        $target.data('base-html', $target.html().trim());
    });

    // Функция обновления расчётов
    function updateAllTargets() {
        globalQuality = $('#quality-select').val() || 'mythic';
        globalBolster = parseFloat($('#bolster-input').val()) || 0;

        if (isNaN(globalBolster) || globalBolster < 0 || globalBolster > 100) {
            $('.calculate-mount-power-target').html('Ошибка: Bolster должен быть числом от 0 до 100');
            return;
        }

        $('.calculate-mount-power-target').each(function() {
            var $target = $(this);
            var baseHtml = $target.data('base-html') || '';

            if (!baseHtml) {
                $target.html('Ошибка: Исходный HTML не сохранен');
                return;
            }

            var values = extractAllValues(baseHtml);
            if (values.length === 0) {
                $target.html('Ошибка: Укажите максимальные значения в {}');
                return;
            }

            var updatedHtml = baseHtml;
            var valueIndex = 0;

            updatedHtml = updatedHtml.replace(/\{[\d,.]+\}/g, function() {
                var item = values[valueIndex++];
                var maxValue = item.value;
                var hasComma = item.hasComma;
                var original = item.original;

                var finalValue, formattedValue;

                if (hasComma) {
                    var tempValue = parseFloat(original.replace(',', ''));
                    finalValue = tempValue * qualityLevels[globalQuality] * (1 + globalBolster / 100);
                    var rounded = Math.round(finalValue);
                    formattedValue = rounded.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                } else {
                    finalValue = maxValue * qualityLevels[globalQuality] * (1 + globalBolster / 100);
                    formattedValue = finalValue.toFixed(1);
                }

                formattedValue = formatNumber(formattedValue);
                return '<b>' + formattedValue + '</b>';
            });

            $target.html(updatedHtml);
            
			$('.mount-name').each(function() {
			    var $el = $(this);
			    var quality = $('#quality-select').val();
			    $el.attr('data-quality', quality);
			    $el.find('span').attr('class', quality);
			});
        });
    }

    // Слушатели
    $('#quality-select').on('change', updateAllTargets);
    $('#bolster-input').on('input', updateAllTargets);

    // Первичная инициализация
    updateAllTargets();
};

// Автоматический запуск при загрузке
$(document).ready(function() {
    window.initializeMountPower();
});