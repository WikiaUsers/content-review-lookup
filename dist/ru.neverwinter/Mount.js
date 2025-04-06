/*$(document).ready(function() {
    // Глобальные переменные для качества и Bolster
    var globalQuality = 'mythic';
    var globalBolster = 0;

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
            var value = match.replace(/[\{\},]/g, '');
            return parseFloat(value);
        });
        return values;
    };

    // Проверяем, есть ли десятичная часть в значении
    var hasDecimal = function(text) {
        if (!text) return false;
        return text.match(/\{[\d]+\.[\d]+\}/) !== null;
    };

    // Создаем элементы управления только для первого calculate-mount-power
    var $mainContainer = $('.calculate-mount-power').first();
    if ($mainContainer.length) {
        var $controls = $('<div>').css({
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            border: '1px solid #ddd'
        });

        var $qualitySelect = $('<select>').attr('id', 'quality-select').attr('title', 'Выберите качество скакуна для расчета параметров').append(
            $('<option>').val('common').text('Обычный'),
            $('<option>').val('uncommon').text('Необычный'),
            $('<option>').val('rare').text('Редкий'),
            $('<option>').val('epic').text('Эпический'),
            $('<option>').val('legendary').text('Легендарный'),
            $('<option>').val('mythic').text('Мифический').prop('selected', true)
        ).css({
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            fontSize: '14px',
            marginRight: '10px',
            cursor: 'pointer'
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
            marginRight: '10px'
        });

        $controls.append(
            $('<span>').addClass('settings-icon').html('⚙️').css({
                marginRight: '10px',
                fontSize: '18px'
            }),
            $('<label>').text('Качество скакуна: ').css({
                marginRight: '5px',
            }),
            $qualitySelect,
            $('<label>').text('Общий уровень предметов (%): ').css({
                marginRight: '5px',
            }),
            $bolsterInput
        );

        $mainContainer.append($controls);
    }

    // Сохраняем исходный HTML для каждого target-блока
    $('.calculate-mount-power-target').each(function() {
        var $target = $(this);
        $target.data('base-html', $target.html().trim());
    });

    // Функция расчета и обновления всех target-блоков
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

            updatedHtml = updatedHtml.replace(/\{[\d,.]+\}/g, function(match) {
                var maxValue = values[valueIndex];
                var baseValue = maxValue * qualityLevels[globalQuality];
                var finalValue = baseValue * (1 + globalBolster / 100);
                var isDecimal = match.match(/\{[\d]+\.[\d]+\}/) !== null;
                var formattedValue = isDecimal ? finalValue.toFixed(1) : Math.floor(finalValue);
                formattedValue = formatNumber(formattedValue);
                // Оборачиваем значение в <b>
                var boldValue = '<b>' + formattedValue + '</b>';
                valueIndex++;
                return boldValue;
            });

            $target.html(updatedHtml);
        });
    }

    // Слушатели событий для элементов управления
    $('#quality-select').on('change', updateAllTargets);
    $('#bolster-input').on('input', updateAllTargets);

    // Инициализация
    updateAllTargets();
});*/