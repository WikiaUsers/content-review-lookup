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

/**
 * Динамическая таблица скакунов.
 * Функционал: поиск/фильтрация по имени/EN/бонусам/слотам/качеству, расчёт значений умений с множителями и Общее укрепление для скакуна (%),
 * кэширование HTML из API, табы умений/бонусов. Инициализируется на элементах .dynamic-mounts-table.
 * Требует: jQuery, MediaWiki API. Настройка через data-атрибуты таблицы.
 *
 * Dynamic mounts table.
 * Features: search/filtering by name/EN/bonuses/slots/quality, calculation of skill values with multipliers and General Fortification for mount (%),
 * HTML caching from API, tabs for skills/bonuses. Initializes on .dynamic-mounts-table elements.
 * Requires: jQuery, MediaWiki API. Configuration via table data attributes.
 */

$(function () {
    $('#dynamic-mounts-table').each(function () {
        var $dynamicMountsTable = $(this);
        var bonusesAll = JSON.parse($dynamicMountsTable.attr('data-bonuses-all') || '[]');
        var $mountSearchContainer = $dynamicMountsTable.find('.mount-search');
        var $mountList = $dynamicMountsTable.find('.mount-list');
        var $mountInfoContainer = $dynamicMountsTable.find('.mount-info');

        var qualityMultipliers = {
            common: 0.0062,
            uncommon: 0.0667,
            rare: 0.2,
            epic: 0.4,
            legendary: 0.6667,
            mythic: 1.0
        };

        var currentQuality = '';
        var currentBolster = 0;
        var baseCombatHTMLCache = {};
        var baseEquipHTMLCache = {};
        var baseEquipDescriptionCache = {};

        // === Config ===
        var config = {
            cache: {
                limit: 100,
                ttl: 10 * 60 * 1000
            },
            slots: {
                minPerSlot: 0,
                maxPerSlot: 4,
                maxTotal: 4
            }
        };

        // === Кэш HTML маунтов с ограничением ===
        var parsedDataCache = {};

        function setCache(mountName, html) {
            var keys = Object.keys(parsedDataCache);
            if (keys.length >= config.cache.limit) {
                delete parsedDataCache[keys[0]];
            }
            parsedDataCache[mountName] = {
                html: html,
                timestamp: Date.now()
            };
        }

        function getCache(mountName) {
            var entry = parsedDataCache[mountName];
            if (!entry) return null;
            if (Date.now() - entry.timestamp > config.cache.ttl) {
                delete parsedDataCache[mountName];
                return null;
            }
            return entry.html;
        }

        // === Cached Regular Expressions ===
        var patternNumbersInBraces = /\{[\d,.]+\}/g;
        var patternBracesCleanup = /[\{\}]/g;

        // === Utility ===
        function formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function extractAllValues(text) {
            if (typeof text !== 'string') return [];
            var matches = text.match(patternNumbersInBraces) || [];
            return $.map(matches, function (match) {
                var original = match.replace(patternBracesCleanup, '');
                return {
                    value: parseFloat(original.replace(',', '.')),
                    hasComma: original.indexOf(',') !== -1,
                    original: original
                };
            });
        }

        function debounce(func, delay) {
            var timer;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() { func.apply(context, args); }, delay);
            };
        }

        // === Update Displayed Values ===
        function updateDisplayedValues(selectedName) {
            if (isNaN(currentBolster) || currentBolster < 0 || currentBolster > 100) return;

            var qualityMultiplier = qualityMultipliers[currentQuality] || 1;
            var $combatPowerTarget = $mountInfoContainer.find('.combat-power-target');
            var $equipPowerTarget = $mountInfoContainer.find('.equip-power-target');
            var $equipPowerDescription = $mountInfoContainer.find('.equip-power-description');
            var $mountNameElement = $mountInfoContainer.find('.mount-name');

            function processHTML(baseHTML, $target) {
                if (!baseHTML) {
                    $target.empty();
                    return;
                }
                var values = extractAllValues(baseHTML);
                if (!values.length) {
                    $target.html(baseHTML);
                    return;
                }
                var i = 0;
                var updatedHTML = baseHTML.replace(patternNumbersInBraces, function () {
                    var data = values[i++];
                    var finalValue = data.hasComma
                        ? Math.round(parseFloat(data.original.replace(',', '')) * qualityMultiplier * (1 + currentBolster / 100))
                        : (data.value * qualityMultiplier * (1 + currentBolster / 100)).toFixed(1);
                    return '<b>' + formatNumber(finalValue) + '</b>';
                });
                $target.html(updatedHTML);
            }

            processHTML(baseCombatHTMLCache[selectedName], $combatPowerTarget);
            processHTML(baseEquipHTMLCache[selectedName], $equipPowerTarget);
            processHTML(baseEquipDescriptionCache[selectedName], $equipPowerDescription);

            if ($mountNameElement.length) {
                $mountNameElement[0].className = 'mount-name ' + currentQuality;
                $mountNameElement.attr('data-quality', currentQuality);
            }
        }

        // === Filtering ===
        var $mountItems = $mountList.find('.mount-item');

        // === Cache static data for filtering ===
        $mountItems.each(function () {
            var $item = $(this);
            // Кэшируем заранее всё, что не меняется
            $item.data('_cachedText', ($item.text() || '').toLowerCase());
            $item.data('_cachedEnglish', ($item.data('en') || '').toLowerCase());
            $item.data('_cachedBonuses', ($item.data('bonuses') || '').toLowerCase());
            $item.data('_cachedSlots', $item.data('slots') || '');
        });

        function filterMounts() {
            var searchQuery = ($searchInputField.val() || '').toLowerCase().trim();
            var selectedBonus = ($bonusSelectElement.val() || '').toLowerCase().trim();
            var requestedSlotCounts = getRequestedSlotCounts();
            var requestedSum = requestedSlotCounts.reduce(function (a, b) { return a + b; }, 0);
            var visibleCount = 0;
            $mountItems.css('transition', 'opacity 0.15s ease');

            $mountItems.each(function (_, item) {
                var $mountItem = $(item);
                var text = $mountItem.data('_cachedText');
                var englishName = $mountItem.data('_cachedEnglish');
                var bonusesData = $mountItem.data('_cachedBonuses');
                var slotsData = $mountItem.data('_cachedSlots');
                var matches = (
                    (!searchQuery || text.indexOf(searchQuery) !== -1 || englishName.indexOf(searchQuery) !== -1) &&
                    (!selectedBonus || selectedBonus === 'all' || bonusesData.indexOf(selectedBonus) !== -1) &&
                    (requestedSum === 0 || canSatisfySlotRequest(slotsData, requestedSlotCounts))
                );

                $mountItem.css('opacity', matches ? 1 : 0);
                $mountItem.toggle(matches);
                
                if (matches) visibleCount++;
            });

            var $noResults = $mountList.find('.mount-not-found');
            if (!$noResults.length) {
                $noResults = $('<div class="mount-not-found">Не найдено</div>').appendTo($mountList);
            }
            $noResults.toggle(!visibleCount);
        }

        // === UI Elements ===
        var $searchBlock = $mountSearchContainer.find('.search-block');
        var $bonusBlock = $mountSearchContainer.find('.bonus-block');
        var $qualityBlock = $mountSearchContainer.find('.quality-block');
        var $bolsterBlock = $mountSearchContainer.find('.bolster-block');
        var $bolsterHint = $bolsterBlock.find('.bolster-hint');

        var $searchInputField = $('<input>', {
            type: 'text',
            placeholder: 'Поиск...',
            class: 'mount-search-input'
        }).appendTo($searchBlock);

        // === Slots ===
        var SLOT_TYPES = [
            { key: 'универсальная ячейка', label: 'Универсальная', file: 'Универсальная ячейка знаков.png', needle: 'универсальная' },
            { key: 'ячейка просвещенных знаков', label: 'Просвещенные', file: 'Просвещенный знак.png', needle: 'просвещенных' },
            { key: 'ячейка серповидных знаков', label: 'Серповидные', file: 'Серповидный знак.png', needle: 'серповидных' },
            { key: 'ячейка украшенных знаков', label: 'Украшенные', file: 'Украшенный знак.png', needle: 'украшенных' },
            { key: 'ячейка царственных знаков', label: 'Царственные', file: 'Царственный знак.png', needle: 'царственных' },
            { key: 'ячейка шипастых знаков', label: 'Шипастые', file: 'Шипастый знак.png', needle: 'шипастых' }
        ];

        var $slotsIconContainer = $mountSearchContainer.find('.slots-icons');
        var slotInputFields = [];

        var slotsHTML = '';
        for (var i = 0; i < SLOT_TYPES.length; i++) {
            var slotType = SLOT_TYPES[i];
            var fileEncoded = encodeURIComponent(slotType.file);

            slotsHTML +=
                '<div class="slot-icon-wrapper">' +
                '<img src="/ru/wiki/Special:FilePath/' + fileEncoded + '" alt="' + slotType.label + '" width="32" height="32" loading="lazy" title="' + slotType.label + '">' +
                '<input type="number" min="' + config.slots.minPerSlot + '" max="' + config.slots.maxPerSlot + '" value="0" class="slot-filter" placeholder="0">' +
                '</div>';
        }
        $slotsIconContainer.html(slotsHTML);

        // теперь найди все созданные инпуты один раз
        var $slotInputs = $slotsIconContainer.find('.slot-filter');
        slotInputFields = $slotInputs.toArray().map(function (el) { return $(el); });

        var $slotsLabel = $mountSearchContainer.find('.slots-block .label').css({
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        });

        var $clearSlotsButton = $('<button>', {
            class: 'clear-slots',
            text: 'Очистить',
            title: 'Сбросить все значения ячеек'
        }).appendTo($slotsLabel);

        $clearSlotsButton.on('click', function (e) {
            e.preventDefault();
            $.each(slotInputFields, function (_, $slotInput) { $slotInput.val(0); });
            validateSlotSumHint();
            debouncedFilterMounts();
        });

        var $slotHint = $('<div class="slot-validate-hint"><small>Суммарно (и по каждому типу) не более ' + config.slots.maxTotal + ' знаков.</small></div>')
            .insertAfter($slotsIconContainer);

        function getRequestedSlotCounts() {
            var result = [];
            for (var i = 0; i < slotInputFields.length; i++) {
                var rawVal = slotInputFields[i].val().trim();
                var v = parseInt(rawVal, 10);
                if (isNaN(v)) {
                    v = config.slots.minPerSlot;
                }
                v = Math.max(config.slots.minPerSlot, Math.min(config.slots.maxPerSlot, v));
                result.push(v);
            }
            return result;
        }

        function countSlots(slotsString) {
            var counts = {};
            $.each(SLOT_TYPES, function (_, type) { counts[type.needle] = 0; });
            counts.__total = 0;
            $.each((slotsString || '').toLowerCase().split(','), function (_, s) {
                var slot = $.trim(s);
                if (!slot) return;
                counts.__total++;
                $.each(SLOT_TYPES, function (_, type) {
                    if (slot.indexOf(type.needle) !== -1) {
                        counts[type.needle]++;
                        return false;
                    }
                });
            });
            return counts;
        }

        function canSatisfySlotRequest(slotsString, requested) {
            var counts = countSlots(slotsString);
            var required = {};
            $.each(SLOT_TYPES, function (i, type) {
                required[type.needle] = requested[i] || 0;
            });

            var sum = 0;
            $.each(required, function (_, val) { sum += val; });
            if (sum === 0) return true;
            if (sum > counts.__total) return false;
            if (required['универсальная'] > counts['универсальная']) return false;

            var freeUniversal = counts['универсальная'] - required['универсальная'];
            var specific = SLOT_TYPES.slice(1);
            for (var i = 0; i < specific.length; i++) {
                var type = specific[i].needle;
                var need = required[type];
                if (!need) continue;
                var have = counts[type];
                if (have < need) {
                    freeUniversal -= (need - have);
                    if (freeUniversal < 0) return false;
                }
            }
            return true;
        }

        function validateSlotSumHint() {
            var requested = getRequestedSlotCounts();
            var sum = requested.reduce(function (a, b) { return a + b; }, 0);
            var isInvalid = sum > config.slots.maxTotal;
            $slotHint
                .toggleClass('invalid-value', isInvalid)
                .find('small')
                .text(isInvalid
                    ? 'Суммарно (и по каждому типу) не более ' + config.slots.maxTotal + ' знаков!'
                    : 'Суммарно (и по каждому типу) не более ' + config.slots.maxTotal + ' знаков.'
                );
        }

        $.each(slotInputFields, function (_, $slotInput) {
            $slotInput.on('input', debounce(function () {
                var rawVal = $(this).val().trim();
                var v = parseInt(rawVal, 10);
                if (!isNaN(v)) {
                    v = Math.max(config.slots.minPerSlot, Math.min(config.slots.maxPerSlot, v));
                    $(this).val(v);
                }
                validateSlotSumHint();
                debouncedFilterMounts();
            }, 250));
        });

        // === Bonus Select ===
        var $bonusSelectElement = $('<select>', { class: 'bonus-select' })
            .append('<option value="" disabled selected hidden>Бонус знака</option>')
            .append('<option value="all">Любые</option>');

        $.each(bonusesAll, function (_, b) {
            var name = b.name || b;
            var desc = b.description ? $.trim(b.description.replace(/\s+/g, ' ')) : '';
            $('<option>', { value: name, text: desc ? name + ': ' + desc : name }).appendTo($bonusSelectElement);
        });

        $bonusBlock.append($bonusSelectElement);
        $bonusSelectElement.val('');

        // === Quality Select ===
        var $qualitySelectElement = $('<select>', { class: 'select' })
            .append('<option value="" disabled selected hidden>Качество</option>')
            .append('<option value="default">По умолчанию</option>');

        var qualityLabels = {
            common: 'Обычный',
            uncommon: 'Необычный',
            rare: 'Редкий',
            epic: 'Эпический',
            legendary: 'Легендарный',
            mythic: 'Мифический'
        };

        $.each(qualityLabels, function(val, text) {
            $('<option>', { value: val, text: text }).appendTo($qualitySelectElement);
        });

        $qualityBlock.find('.quality-hint').before($qualitySelectElement);
        $qualitySelectElement.val('');

        // === Bolster Input ===
        var $bolsterInputField = $('<input>', {
            type: 'number',
            min: 0,
            max: 100,
            value: 0,
            class: 'bolster-input'
        }).insertBefore($bolsterHint);

        // === Events ===
        var debouncedFilterMounts = debounce(filterMounts, 300);

        $dynamicMountsTable.on('input', '.mount-search-input', debouncedFilterMounts);
        $bonusSelectElement.on('change', function () {
            var selected = $(this).val();
            if (selected === 'all') {
                $(this).val('');
            }

            debouncedFilterMounts();
        });

        $qualitySelectElement.on('change', function () {
            var selected = $(this).val();
            var defaultQuality = $dynamicMountsTable.data('default-quality') || '';
            currentQuality = (!selected || selected === 'default') ? defaultQuality : selected;
            $(this).val(selected === 'default' ? '' : selected);
            var selectedMount = $dynamicMountsTable.find('.mount-item.active').data('name');
            if (selectedMount) updateDisplayedValues(selectedMount);
        });

        $bolsterInputField.on('input', debounce(function () {
            var value = parseFloat(this.value) || 0;
            var invalid = isNaN(value) || value < 0 || value > 100;
            if (value > 100) value = 100;
            $(this).val(value);
            $bolsterInputField.add($bolsterHint).toggleClass('invalid-value', invalid || value > 100);
            $bolsterHint.text('Введите число от 0 до 100');
            currentBolster = invalid ? 0 : value;
            var selectedMount = $dynamicMountsTable.find('.mount-item.active').data('name');
            if (selectedMount) updateDisplayedValues(selectedMount);
        }, 300));

        // === Click: mount Item ===
        $dynamicMountsTable.on('click', '.mount-item', function () {
            var $clickedItem = $(this);
            var mountName = $clickedItem.data('name');
            var itemQuality = $clickedItem.data('quality') || '';
            $dynamicMountsTable.data('default-quality', itemQuality);
            if (!$qualitySelectElement.val()) currentQuality = itemQuality;

            $dynamicMountsTable.data('current-name', mountName);
            $dynamicMountsTable.find('.mount-item').removeClass('active');
            $clickedItem.addClass('active');

            var cachedHTML = getCache(mountName);
            if (cachedHTML) {
                $mountInfoContainer.html(cachedHTML);
                baseCombatHTMLCache[mountName] = $mountInfoContainer.find('.combat-power-target').html() || '';
                baseEquipHTMLCache[mountName] = $mountInfoContainer.find('.equip-power-target').html() || '';
                baseEquipDescriptionCache[mountName] = $mountInfoContainer.find('.equip-power-description').html() || '';
                updateDisplayedValues(mountName);
                initializeTabs($mountInfoContainer);
                return;
            }

            $mountInfoContainer.html('<div class="mount-loading">Загрузка...</div>');

            new mw.Api().get({
                action: 'parse',
                text: '{{#invoke:DynamicMountTable|get|name=' + mountName + '}}',
                prop: 'text',
                contentmodel: 'wikitext',
                formatversion: 2
            }).done(function (data) {
                if ($dynamicMountsTable.data('current-name') !== mountName) return;
                var html = (data && data.parse && data.parse.text) ? data.parse.text : '<div>Ошибка загрузки</div>';
                setCache(mountName, html);
                $mountInfoContainer.html(html);
                baseCombatHTMLCache[mountName] = $mountInfoContainer.find('.combat-power-target').html() || '';
                baseEquipHTMLCache[mountName] = $mountInfoContainer.find('.equip-power-target').html() || '';
                baseEquipDescriptionCache[mountName] = $mountInfoContainer.find('.equip-power-description').html() || '';
                updateDisplayedValues(mountName);
                initializeTabs($mountInfoContainer);
            }).fail(function (error) {
                console.error('API error:', error);
                $mountInfoContainer.html('<div>Ошибка запроса</div>');
            });
        });

        // === Tabs ===
        function initializeTabs($container) {
            var $tabs = $container.find('.mount-tabs');
            if (!$tabs.length || $tabs.find('.tab-bar').length) return;

            var $tabBar = $('<div class="tab-bar"></div>')
                .append('<div class="tab-btn active" data-target=".tab-abilities">Умения игрока</div>')
                .append('<div class="tab-btn" data-target=".tab-bonus">Бонусы знака</div>');

            $tabs.prepend($tabBar);
            $tabBar.on('click', '.tab-btn', function () {
                var $clickedTab = $(this);
                $tabBar.find('.tab-btn').removeClass('active');
                $clickedTab.addClass('active');
                var target = $clickedTab.data('target');
                $tabs.find('.tab-content').addClass('hidden');
                $tabs.find(target).removeClass('hidden');
            });

            $tabs.find('.tab-content').addClass('hidden');
            $tabs.find('.tab-abilities').removeClass('hidden');
        }
    });
});