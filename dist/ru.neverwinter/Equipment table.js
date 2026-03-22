/* This JavaScript code is responsible for the dynamic rendering of an equipment items table on the wiki platform, using data retrieved from the server via a Lua module call. */
$(function () {
    var $equipmentTable = $('#equipment-table-main');
    if (!$equipmentTable.length) return;

    // --- 1. Конфигурация и состояние ---

    var categoryAttribute = ($equipmentTable.attr('data-category') || '').trim();

    // Лимит страницы берётся из data-атрибута, который выставляет Lua-модуль,
    // чтобы оба модуля всегда работали с одним значением.
    var PAGE_LIMIT = parseInt($equipmentTable.attr('data-limit'), 10) || 15;

    var config = {
        category:    categoryAttribute,
        subcatList:  ($equipmentTable.attr('data-subcat-list')  || '').split(',').filter(Boolean),
        classList:   ($equipmentTable.attr('data-class-list')   || '').split(',').filter(Boolean),
        qualityList: ($equipmentTable.attr('data-quality-list') || '').split(',').filter(Boolean),
        attrGroups:  $equipmentTable.attr('data-attr-groups') || '',
        isStyle:     categoryAttribute === 'Стиль'
    };

    var currentPage = 0;
    var currentRequest = null;
    var selectedAttributes = [];
    var searchDebounceTimer = null;

    // --- 2. Построение интерфейса ---

    // Создаёт HTML-строку тега <select> с переданным списком опций.
    // Элементы списка имеют формат "value:Метка" или просто "value".
    function createSelectElement(id, defaultText, list) {
        var options = '<option value="">' + defaultText + '</option>';
        list.forEach(function (item) {
            var parts = item.split(':');
            var value = parts[0];
            var label = parts[1] || value;
            options += '<option value="' + value + '">' + label + '</option>';
        });
        return '<select id="' + id + '">' + options + '</select>';
    }

    // Строит панель управления (поиск, фильтры, сортировка, пагинация, кнопки атрибутов)
    // и вставляет её перед таблицей. Таблицу оборачивает в #eq-wrap вместе с лоадером.
    function initializeUI() {
        var displayCategory = config.category.charAt(0).toUpperCase() + config.category.slice(1);

        var sortOptions = '<option value="name_asc">А-Я</option>'
            + '<option value="name_desc">Я-А</option>'
            + (config.isStyle ? '' : '<option value="level_desc">Уровень ↓</option><option value="level_asc">Уровень ↑</option>');

        var html = '<div id="eq-controls">'
            + '<div class="eq-top-bar">'
                + '<input id="eq-search" type="text" placeholder="Поиск по названию..." autocomplete="off">'
                + (config.subcatList.length ? createSelectElement('eq-subcat', 'Все: ' + displayCategory, config.subcatList) : '')
                + createSelectElement('eq-quality', 'Любое качество', config.qualityList)
                + (config.classList.length ? createSelectElement('eq-class', 'Любой класс', config.classList) : '')
                + '<select id="eq-sort">' + sortOptions + '</select>'
                + '<button id="eq-reset">Очистить</button>'
                + '<div class="eq-pagination">'
                    + '<button id="eq-prev" class="eq-nav-btn" disabled>&lt;</button>'
                    + '<span id="eq-page-num">Стр. 1</span>'
                    + '<button id="eq-next" class="eq-nav-btn">&gt;</button>'
                + '</div>'
            + '</div>';

        if (config.attrGroups) {
            html += '<div id="eq-attrs">';
            config.attrGroups.split(';').forEach(function (group) {
                var groupParts = group.split('|');
                var slotName = groupParts[0];
                var attributes = groupParts[1];
                html += '<div class="eq-attr-row"><small>' + slotName + ':</small>';
                attributes.split(',').forEach(function (param) {
                    var paramParts = param.split(':');
                    var key = paramParts[0];
                    var label = paramParts[1];
                    html += '<button class="eq-attr-btn" data-key="' + key + '">' + label + '</button>';
                });
                html += '</div>';
            });
            html += '</div>';
        }

        html += '</div>';

        $equipmentTable.wrap('<div id="eq-wrap"></div>');
        $('<div id="eq-loader" style="display:none;">Загрузка...</div>').appendTo('#eq-wrap');
        $('#eq-wrap').before(html);
    }

    // Выполняет fn() только если нет активного запроса.
    // Используется там, где прерывать текущий запрос нежелательно (пагинация, сброс).
    function guardedAction(fn) {
        if (currentRequest) return;
        fn();
    }

    // --- 3. Запрос и обновление таблицы ---

    // Собирает параметры фильтров, отправляет запрос к Lua через mw.Api
    // и заменяет содержимое таблицы полученным HTML.
    // Если shouldResetPage = true — сбрасывает пагинацию на первую страницу.
    // Прерывает предыдущий запрос через abort(), чтобы не было гонки ответов.
    function updateTableContent(shouldResetPage) {
        if (shouldResetPage) currentPage = 0;

        if (currentRequest) {
            currentRequest.abort();
        }

        var $loader = $('#eq-loader');
        $loader.fadeIn(150).css('display', 'flex');
        $equipmentTable.css('opacity', 0.4);
        $('.eq-nav-btn').prop('disabled', true);

        // Экранируем wildcards LIKE, чтобы % и _ в поиске не ломали SQL-запрос.
        // Полная кодировка через encodeURIComponent защищает разделители | и =
        // в query-строке, которую Lua разбирает на стороне сервера.
        var rawSearch = $('#eq-search').val() || '';
        var safeSearch = rawSearch.replace(/%/g, '\\%').replace(/_/g, '\\_');

        var params = {
            category: config.category,
            search:   safeSearch,
            subcat:   $('#eq-subcat').val()  || '',
            quality:  $('#eq-quality').val() || '',
            class:    $('#eq-class').val()   || '',
            sort:     $('#eq-sort').val()    || 'name_asc',
            attrs:    selectedAttributes.join(','),
            limit:    PAGE_LIMIT,
            offset:   currentPage * PAGE_LIMIT
        };

        var queryArray = [];
        for (var key in params) {
            if (params[key] !== '') {
                queryArray.push(key + '=' + encodeURIComponent(params[key]));
            }
        }
        var cargoQueryString = queryArray.join('|');

        currentRequest = new mw.Api().post({
            action: 'parse',
            prop: 'text',
            text: '{{#invoke:EquipmentTable|drawTable|' + cargoQueryString + '}}'
        })
        .done(function (response) {
            var rawHtml = (response && response.parse && response.parse.text)
                ? response.parse.text['*']
                : null;

            // Ищем таблицу и как вложенный элемент, и как корневой —
            // mw.Api оборачивает результат по-разному в зависимости от контента.
            var $parsed = rawHtml ? $(rawHtml) : $();
            var $newTableData = $parsed.find('table#equipment-table-main');
            if (!$newTableData.length) {
                $newTableData = $parsed.filter('table#equipment-table-main');
            }

            if (!$newTableData.length || $newTableData.find('tr').length < 2) {
                $equipmentTable.html('<tr><td colspan="10" style="padding:40px; text-align:center;">Ничего не найдено. Попробуйте изменить фильтры.</td></tr>');
                $('#eq-page-num').text('Стр. 1');
                $('#eq-prev, #eq-next').prop('disabled', true);
                return;
            }

            $equipmentTable.html($newTableData.html());

            var hasNextPage = $newTableData.attr('data-has-next') === '1';
            $('#eq-page-num').text('Стр. ' + (currentPage + 1));
            $('#eq-prev').prop('disabled', currentPage === 0);
            $('#eq-next').prop('disabled', !hasNextPage);

            mw.hook('wikipage.content').fire($equipmentTable);
        })
        .fail(function (_, status) {
            if (status !== 'abort') {
                $equipmentTable.html('<tr><td colspan="10" style="padding:40px; text-align:center; color:red;">Ошибка загрузки. Обновите страницу.</td></tr>');
            }
        })
        .always(function () {
            $loader.fadeOut(150);
            $equipmentTable.css('opacity', 1);
            currentRequest = null;
        });
    }

    // --- 4. Обработчики событий ---

    initializeUI();

    // Присваиваем после initializeUI(), чтобы элемент гарантированно был в DOM.
    var $controlsContainer = $('#eq-controls');

    // Поиск: запрос отправляется с задержкой 400мс после последнего ввода.
    $controlsContainer.on('input', '#eq-search', function () {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(function () {
            updateTableContent(true);
        }, 400);
    });

    // Смена любого селекта немедленно обновляет таблицу.
    $controlsContainer.on('change', 'select', function () {
        updateTableContent(true);
    });

    // Переключение фильтра по атрибуту: обновляет список активных ключей и перезапрашивает таблицу.
    $controlsContainer.on('click', '.eq-attr-btn', function () {
        $(this).toggleClass('active');
        selectedAttributes = $('.eq-attr-btn.active').map(function () {
            return $(this).data('key');
        }).get();
        updateTableContent(true);
    });

    // Сброс всех фильтров в начальное состояние.
    $controlsContainer.on('click', '#eq-reset', function () {
        guardedAction(function () {
            $('#eq-search').val('');
            $('#eq-subcat, #eq-quality, #eq-class').val('');
            $('#eq-sort').val('name_asc');
            $controlsContainer.find('.eq-attr-btn').removeClass('active');
            selectedAttributes = [];
            updateTableContent(true);
        });
    });

    // Пагинация: переход на следующую страницу.
    $controlsContainer.on('click', '#eq-next', function () {
        if (!$(this).prop('disabled')) {
            guardedAction(function () {
                currentPage++;
                updateTableContent(false);
            });
        }
    });

    // Пагинация: переход на предыдущую страницу.
    $controlsContainer.on('click', '#eq-prev', function () {
        if (currentPage > 0) {
            guardedAction(function () {
                currentPage--;
                updateTableContent(false);
            });
        }
    });
});

/**
 * DynamicTable
 * Универсальный клиентский модуль для интерактивных таблиц на вики:
 * фильтрация, сортировка, поиск, перерасчёт параметров по качеству и укреплению.
 *
 * Связан с Lua-модулями:
 *  - Модуль:DynamicTable — серверная генерация HTML-таблицы
 *  - Модуль:DynamicTable/Config — передаёт конфигурацию категорий в JSON
 *
 * Основные возможности:
 *  - Автоматическая загрузка конфига из Lua через MediaWiki API
 *  - Поддержка фильтров: качество, параметры, умение усиления, ячейки
 *  - Перерасчёт значений при смене качества / укрепления
 *  - Динамическая загрузка карточек предметов по клику
 *  - Умная сортировка и кэширование запросов
 *
 * @author Oleksii (Shaleych)
 * @requires MediaWiki API, jQuery
 * @license CC BY-SA 4.0
 */

$(function () {
    // === Конфигурация категорий таблиц ===
    let categoryConfig = {};

    /**
     * Загружает JSON-конфигурацию всех категорий таблиц через MediaWiki API.
     * @returns {Promise} — резолвится после парсинга JSON
     */
    function fetchCategoryConfig() {
        return new mw.Api().get({
            action: "expandtemplates",
            text: "{{#invoke:DynamicTable/Config|json}}",
            prop: "wikitext",
            formatversion: 2
        }).then(data => {
            try {
                categoryConfig = JSON.parse(data.expandtemplates.wikitext);
            } catch (err) {
                mw.notify("Ошибка загрузки конфигурации DynamicTable", { type: "error" });
                categoryConfig = {};
            }
        });
    }

    // === Метки качеств ===
    const QUALITY_LABELS = {
        common: 'Обычный',
        uncommon: 'Необычный',
        rare: 'Редкий',
        epic: 'Эпический',
        legendary: 'Легендарный',
        mythic: 'Мифический',
        celestial: 'Небесный'
    };

    // === Базовая конфигурация категории ===
    const DEFAULT_CATEGORY_CONFIG = {
        supportsQuality: false,
        hasBonuses: false,
        hasBolster: false,
        hasSlots: false,
        hasTabs: false,
        hasAttributes: false,
        hasPowers: false,
        maxAttributes: 2,
        defaultQuality: null
    };

    /**
     * Создаёт конфигурацию для конкретной категории, объединяя с дефолтной.
     * @param {string} category — имя категории (например, "mounts")
     * @returns {Object} — полная конфигурация
     */
    function buildCategoryConfig(category) {
        return Object.assign({}, DEFAULT_CATEGORY_CONFIG, categoryConfig[category] || {});
    }

    // === Иконки ячеек знаков ===
    const slotIcons = [
        { file: 'Универсальная ячейка знаков.png', title: 'Универсальная', key: 'универсальная' },
        { file: 'Просвещенный знак.png', title: 'Просвещенные', key: 'просвещенных' },
        { file: 'Серповидный знак.png', title: 'Серповидные', key: 'серповидных' },
        { file: 'Украшенный знак.png', title: 'Украшенные', key: 'украшенных' },
        { file: 'Царственный знак.png', title: 'Царственные', key: 'царственных' },
        { file: 'Шипастый знак.png', title: 'Шипастые', key: 'шипастых' }
    ];

    // === Регулярки для парсинга ячеек ===
    const SLOT_REGEX = {
        универсальная: /универсальная/g,
        просвещенных: /просвещенных/g,
        серповидных: /серповидных/g,
        украшенных: /украшенных/g,
        царственных: /царственных/g,
        шипастых: /шипастых/g
    };

    // === Кэш API-запросов ===
    const apiCache = new Map();

    /**
     * Ограничивает частоту вызовов функции (debounce или throttle).
     * @param {Function} fn — функция
     * @param {number} delay — задержка в мс
     * @param {string} mode — 'debounce' (по умолчанию) или 'throttle'
     * @returns {Function} — обёрнутая функция
     */
    const rateLimit = (fn, delay, mode = 'debounce') => {
        let timer, lastCall = 0;
        return (...args) => mode === 'throttle'
            ? (Date.now() - lastCall >= delay && (lastCall = Date.now(), fn(...args)))
            : (clearTimeout(timer), timer = setTimeout(() => fn(...args), delay));
    };

    /**
     * Пересчитывает числовые значения в таблице под выбранное качество и укрепление.
     * @param {jQuery} $tableElement — контейнер таблицы
     * @param {string} quality — выбранное качество ('celestial', 'default' и т.д.)
     * @param {number} bolster — значение укрепления (0–125)
     * @param {Object} config — конфигурация категории
     */
    function recalcQualityValues($tableElement, quality = 'default', bolster = 0, config = {}) {
        if (!config || !config.supportsQuality) return;

        const qualityLevels = config.qualityLevels || {};
        const selected = (quality === 'default'
            ? ($tableElement.data('active-quality') || config.defaultQuality || 'celestial')
            : quality);

        const bolsterPercent = config.hasBolster
            ? Math.min(Math.max(+bolster || 0, 0), 125)
            : 0;

        const makeFactor = (multiplier, base) => {
            if (config.calculate && typeof config.calculate === 'string') {
                try {
                    const fn = new Function('multiplier', 'base', 'bolster', `return ${config.calculate};`);
                    return fn(multiplier, base, bolsterPercent);
                } catch (e) {}
            }
            return multiplier / (base || 1);
        };

        const selectedMul = qualityLevels[selected] || 1;

        $tableElement.find('.dt-power-calc-target').each(function () {
            const el = this;
            const baseHtml = el.dataset.baseHtml || (el.dataset.baseHtml = el.innerHTML.trim());
            const baseAttr = (el.dataset.baseQuality || '').toLowerCase();
            let baseQuality;

            if (baseAttr === 'item') {
                baseQuality = ($tableElement.data('active-quality') || config.defaultQuality || 'celestial');
            } else if (baseAttr) {
                baseQuality = baseAttr;
            } else {
                baseQuality = (config.calculateBase || config.defaultQuality || 'celestial');
            }

            const baseMul = qualityLevels[baseQuality] || 1;
            const factor = makeFactor(selectedMul, baseMul);

            const updatedHtml = baseHtml.replace(/\{([\d.,]+)\}/g, (_, rawValue) => {
                let valueStr = rawValue.trim();
                const parseNum = v => parseFloat(v.replace(',', '.').replace(/\s/g, ''));
                const value = parseNum(valueStr);

                if (isNaN(value)) return `{${rawValue}}`;

                const finalValue = value * factor;
                let formatted;
                if (valueStr.includes(',') && !valueStr.includes('.')) {
                    formatted = Math.round(finalValue).toLocaleString('ru-RU');
                } else if (valueStr.includes('.') || valueStr.includes(',')) {
                    formatted = finalValue.toFixed(2).replace(/\.00$/, '');
                } else if (finalValue >= 1000) {
                    formatted = Math.round(finalValue).toLocaleString('ru-RU');
                } else {
                    formatted = +finalValue.toFixed(1);
                }

                return `<b>${formatted}</b>`;
            });

            el.innerHTML = updatedHtml;
        });

		/*
		$tableElement.find('.dt-name span')
		    .removeClass('common uncommon rare epic legendary mythic celestial')
		    .addClass(selected);
		*/
            
        $tableElement.find('.dt-icon')
            .removeClass('common uncommon rare epic legendary mythic celestial')
            .addClass(selected);
    }

    /**
     * Инициализирует универсальный выпадающий список (dropdown).
     * @param {jQuery} $dropdown — контейнер dropdown
     * @param {Function} onSelect — колбэк при выборе элемента
     * @param {boolean} autoClose — закрывать ли после выбора
     */
    function initDropdown($dropdown, onSelect, autoClose = true) {
        const $input = $dropdown.find('[class*="dt-"][class*="-input"]');
        const $list = $dropdown.find('.dt-dropdown-list');
        let hideTimer = null;

        // Открытие/закрытие
        $input.off('click.dropdown').on('click.dropdown', e => {
            e.stopPropagation();
            $('.dt-dropdown-list').not($list).removeClass('open');
            $list.toggleClass('open');
        });

        $list.off('click.dropdown').on('click.dropdown', e => e.stopPropagation());

        $input.add($list)
            .off('mouseenter.dropdown mouseleave.dropdown')
            .on('mouseenter.dropdown', () => clearTimeout(hideTimer))
            .on('mouseleave.dropdown', () => {
                hideTimer = setTimeout(() => $list.removeClass('open'), 250);
            });

        // Выбор
        $list.off('click.dropdownItem').on('click.dropdownItem', '.dt-dropdown-item', function () {
            const $item = $(this);
            onSelect($item);
            if (autoClose) $list.removeClass('open');
        });

        // Закрытие при клике вне
        $(document).off('click.dropdownGlobal').on('click.dropdownGlobal', () => {
            $list.removeClass('open');
        });
    }

    /**
     * Парсит строку вида "универсальная:2,просвещенных:1" → { универсальная: 2, ... }
     * @param {string} str — строка с количеством ячеек
     * @returns {Object} — объект с количеством ячеек по типам
     */
    function parseSlotsCount(str) {
        const result = {};
        str.split(',').forEach(pair => {
            const [slot, countStr] = pair.split(':');
            if (!slot || !countStr) return;
            const count = parseInt(countStr);
            if (isNaN(count)) return;
            for (const key in SLOT_REGEX) {
                if (slot.includes(key) || slot.includes(key.replace(/ых$/, 'ые'))) {
                    result[key] = count;
                    break;
                }
            }
        });
        return result;
    }

    /**
     * Устанавливает значения в инпуты ячеек по объекту ячеек.
     * @param {jQuery} $table — таблица
     * @param {Object} slots — { универсальная: 2, ... }
     */
    function applySlotVisuals($table, slots) {
        $table.find('.dt-slot-input').each(function () {
            $(this).val(slots[$(this).data('key')] || 0);
        });
    }

    /**
     * Обновляет подсказку с рекомендуемыми знаками.
     * @param {jQuery} $hint — элемент подсказки
     * @param {Object} slots — ячейки
     * @param {string} prefix — текст перед списком
     */
    function updateBonusHint($hint, slots, prefix) {
        const parts = Object.entries(slots).map(([key, count]) => {
            const found = slotIcons.find(i => i.key === key);
            return `${count}× ${found ? found.title : key}`;
        });
        $hint.text(prefix + ': ' + parts.join(', '));
    }

    /**
     * Инициализирует все динамические таблицы на странице.
     */
    function initDynamicTables() {
        $('.dynamic-table').each(function () {
            const $table = $(this);
            const $itemsContainer = $table.find('.dt-list');
            const $details = $table.find('.dt-info');
            const $searchContainer = $table.find('.dt-search-container');
            const $mountControls = $table.find('.dt-mount-controls');
            const $slotsContainer = $mountControls.find('.dt-slots-filter');
            const $qualityContainer = $table.find('.dt-quality-select-container');
            const $bolsterContainer = $table.find('.dt-bolster-input-container');
            const category = $table.data('category');

            if ($table.find('.dt-warning-box').length === 0) {
                $('<div>', { class: 'dt-warning-box' }).prependTo($table);
            }

            const config = buildCategoryConfig(category);
            if (!config) return;

            let activeQuality = 'default';
            const activeFilters = {};
            let slotFilterState = {};
            let manualSlotState = {};
            let bonusOverrideActive = false;

            // === Качество ===
            if (config.supportsQuality) {
                const $qualityDropdown = $('<div>', { class: 'dt-quality-dropdown' });
                const $qualityInput = $('<div>', {
                    class: 'dt-dropdown-input dt-quality-input',
                    text: 'Качество'
                }).appendTo($qualityDropdown);
                const $qualityList = $('<div>', { class: 'dt-dropdown-list' }).appendTo($qualityDropdown);

                $('<div>', { class: 'dt-dropdown-item', 'data-value': 'default', text: 'По умолчанию' }).appendTo($qualityList);
                (config.qualityOptions || Object.keys(QUALITY_LABELS)).forEach(key => {
                    $('<div>', {
                        class: 'dt-dropdown-item',
                        'data-value': key,
                        text: QUALITY_LABELS[key] || key
                    }).appendTo($qualityList);
                });

                $qualityContainer.append($qualityDropdown);

                initDropdown($qualityDropdown, $item => {
                    const val = $item.data('value');
                    $qualityDropdown.find('.dt-dropdown-item').removeClass('selected').attr('aria-checked', 'false');
                    if (val === 'default') {
                        activeQuality = 'default';
                        $qualityInput.text('Качество');
                    } else {
                        activeQuality = val;
                        $item.addClass('selected').attr('aria-checked', 'true');
                        $qualityInput.text(QUALITY_LABELS[val] || val);
                    }
                    const bolsterVal = config.hasBolster ? parseFloat($table.find('.dt-bolster-input').val()) || 0 : 0;
                    recalcQualityValues($table, activeQuality, bolsterVal, config);
                });

                if (config.hasBolster && config.bolster) {
                    const { min, max, step, title } = config.bolster;
                    $('<input>', {
                        type: 'number',
                        class: 'dt-bolster-input',
                        min, max, value: 0, step, title
                    }).appendTo($bolsterContainer);
                }
            }

            // === Ячейки ===
            if (config.hasSlots) {
                slotIcons.forEach(icon => {
                    const $slot = $(`
                        <div class="dt-slot-item">
                            <img src="/ru/wiki/Special:FilePath/${encodeURIComponent(icon.file)}" width="32" height="32" title="${icon.title}">
                            <input type="number" min="0" max="4" value="0" data-key="${icon.key}" class="dt-slot-input">
                        </div>
                    `);
                    $slotsContainer.append($slot);
                });
            }

            const $searchInput = $('<input>', {
                type: 'text',
                class: 'dt-search-input',
                placeholder: 'Поиск...'
            }).appendTo($searchContainer);

            // === СОРТИРОВКА ===
            if (config.sortMode) {
                const $sortDropdown = $table.find('.dt-sort-dropdown');
                const $sortInput = $sortDropdown.find('.dt-sort-input');
                const $sortList = $sortDropdown.find('.dt-dropdown-list');
                let activeSortKey = null;

                initDropdown($sortDropdown, $item => {
                    const value = $item.data('value');
                    if (!value) return;

                    $sortList.find('.dt-dropdown-item').removeClass('selected').attr('aria-checked', 'false');
                    $item.addClass('selected').attr('aria-checked', 'true');
                    $sortInput.text($item.text());
                    activeSortKey = value;

                    applySorting();
                }, true);

                /**
                 * Сортирует элементы по выбранному критерию.
                 */
                function applySorting() {
                    const $items = $itemsContainer.find('.dt-item').get();
                    $items.sort((a, b) => {
                        const infoA = JSON.parse($(a).attr('data-info') || '{}');
                        const infoB = JSON.parse($(b).attr('data-info') || '{}');

                        if (activeSortKey === 'name') {
                            return infoA.name.localeCompare(infoB.name, 'ru');
                        }
                        if (activeSortKey === 'itemLevel') {
                            return (infoB.item_level || 0) - (infoA.item_level || 0);
                        }
                        return 0;
                    });
                    $itemsContainer.append($items);

                    $itemsContainer.find('.dt-item').each(function (i) {
                        $(this).removeClass('dt-even dt-odd').addClass(i % 2 === 0 ? 'dt-even' : 'dt-odd');
                    });
                }

                $table.on('filtered.sorting', () => {
                    if (activeSortKey) applySorting();
                });
            }

            // === Фильтры ===
            let $bonusDropdown, $bonusInput, $bonusHint;

            $table.find('.dt-dropdown[data-type="filter"]').each(function () {
                const $dropdown = $(this);
                const field = $dropdown.data('field');
                const $input = $dropdown.find('.dt-dropdown-input');
                const $items = $dropdown.find('.dt-dropdown-item');
                const isMulti = $items.filter('[role="checkbox"]').length > 0;
                const defaultText = $input.text();

                if (field === 'insignia_bonuses') {
                    $bonusDropdown = $dropdown;
                    $bonusInput = $input;
                    $bonusHint = $table.find('#bonus-hint');
                
                    // Скрываем "Любой бонус" при первой загрузке таблицы
                    $bonusDropdown.find('.dt-dropdown-item[data-value=""]').hide();
                }

                const maxCount = field === 'attributes' ? (config.maxAttributes || 2) : Infinity;
                activeFilters[field] = [];

                initDropdown($dropdown, $item => {
                    const value = $item.data('value') || '';

                    if (isMulti) {
                        if ($item.hasClass('selected')) {
                            $item.removeClass('selected').attr('aria-checked', 'false');
                            activeFilters[field] = activeFilters[field].filter(v => v !== value);
                        } else {
                            if (activeFilters[field].length >= maxCount) {
                                showWarning(`Можно выбрать не более ${maxCount} параметров.`, $table);
                                return;
                            }
                            $item.addClass('selected').attr('aria-checked', 'true');
                            activeFilters[field].push(value);
                        }
                        $input.text(activeFilters[field].length ? activeFilters[field].join(', ') : defaultText);
                    } else {
                        $items.removeClass('selected').attr('aria-checked', 'false');
                        if (!value) {
                            activeFilters[field] = [];
                            $input.text(defaultText);
                        } else {
                            $item.addClass('selected').attr('aria-checked', 'true');
                            activeFilters[field] = [value];
                            $input.text($item.find('.name').text().trim() || defaultText);
                        }

                        if (field === 'insignia_bonuses') {
                            const slotsStr = $item.data('slots-count') || '';
                            if (slotsStr) {
                                const required = parseSlotsCount(slotsStr);
                                updateBonusHint($bonusHint, required, 'Требуются');
                            } else {
                                $bonusHint.text('Список бонусов зависит от сочетания выбранных знаков.');
                            }
                        }
                    }
                    applyAllFilters();
                }, !isMulti);
            });

            /**
             * Обновляет фильтры ячеек при ручном изменении.
             */
            function updateSlotFilters() {
                if (activeFilters['insignia_bonuses'] && activeFilters['insignia_bonuses'].length > 0) return;

                bonusOverrideActive = false;
                const slots = {};
                let total = 0;
                const $inputs = $table.find('.dt-slot-input');
                const $slotsText = $table.find('.dt-slots-text');

                $inputs.each(function () {
                    const $this = $(this);
                    let val = parseInt($this.val()) || 0;
                    val = Math.max(0, Math.min(4, val));
                    $this.val(val);

                    const otherTotal = $inputs.not($this).get().reduce((sum, el) => sum + (parseInt(el.value) || 0), 0);
                    $this.attr('max', Math.max(0, 4 - otherTotal));

                    total += val;
                    if (val > 0) slots[$this.data('key')] = val;
                });

                manualSlotState = $.extend({}, slots);
                $slotsText.text(total > 4 ? 'Суммарно не более 4 знаков!' : 'Суммарно не более 4 знаков.')
                    .css('color', total > 4 ? 'red' : '');
                slotFilterState = slots;
                applyAllFilters();
            }

            /**
             * Проверяет, хватает ли ячеек у предмета под фильтр.
             * @param {string} slotsString — строка ячеек предмета
             * @param {Object} requested — требуемые ячейки
             * @returns {boolean}
             */
            function validateSlotRequirements(slotsString = '', requested = {}) {
                const lower = slotsString.toLowerCase();
                const counts = {};
                for (const [key, regex] of Object.entries(SLOT_REGEX)) {
                    counts[key] = (lower.match(regex) || []).length;
                }
                let free = counts['универсальная'] || 0;
                for (const [key, need] of Object.entries(requested)) {
                    const have = counts[key] || 0;
                    if (key !== 'универсальная' && have < need) {
                        free -= need - have;
                        if (free < 0) return false;
                    }
                }
                if (requested['универсальная']) free -= requested['универсальная'];
                return free >= 0;
            }

            /**
             * Нормализует строку для поиска (нижний регистр, ё→е).
             */
            const normalize = str => str ? str.toLowerCase().replace(/ё/g, 'е').trim() : '';

            /**
             * Проверяет совпадение запроса с текстом.
             */
            const textMatches = (query, ...texts) =>
                !query || texts.some(t => query.split(/\s+/).every(w => t.includes(w)));

            /**
             * Применяет все фильтры: поиск, ячейки, параметры, бонусы.
             * Триггерит событие 'filtered'.
             */
            function applyAllFilters() {
                const query = normalize($searchInput.val());
                const hasSlotFilters = Object.keys(slotFilterState).length > 0;
                let visibleCount = 0;

                $itemsContainer.find('.dt-item').each(function () {
                    const $item = $(this);
                    let info = $item.data('parsed');
                    if (!info) {
                        info = JSON.parse($item.attr('data-info') || '{}');
                        $item.data('parsed', info);
                    }

                    const name = normalize(info.name);
                    const nameEn = normalize(info.en);
                    const slots = (info.slots || []).join(',').toLowerCase();

                    let visible = true;

                    if (query && !textMatches(query, name, nameEn)) visible = false;
                    else if (hasSlotFilters && !validateSlotRequirements(slots, slotFilterState)) visible = false;
                    else {
                        for (const [field, values] of Object.entries(activeFilters)) {
                            if (!values.length) continue;

                            let fieldValue = info[field];
                            if (Array.isArray(fieldValue)) {
                                fieldValue = fieldValue.map(v => normalize(v));
                            } else {
                                fieldValue = normalize(fieldValue || '');
                            }

                            const allMatch = values.every(v => {
                                const normV = normalize(v);
                                return Array.isArray(fieldValue)
                                    ? fieldValue.some(fv => fv.includes(normV))
                                    : fieldValue.includes(normV);
                            });

                            if (!allMatch) {
                                visible = false;
                                break;
                            }
                        }
                    }

                    $item.toggle(visible);
                    if (visible) visibleCount++;
                });

                $itemsContainer.find('.dt-no-results').toggle(visibleCount === 0);
                $table.trigger('filtered');
                updateBonusFilter();

                $itemsContainer.find('.dt-item:visible').each(function (index) {
                    $(this)
                        .removeClass('dt-even dt-odd')
                        .addClass(index % 2 === 0 ? 'dt-even' : 'dt-odd');
                });
            }

            /**
             * Проверяет совместимость бонуса с текущими ячейками.
             */
            function isBonusCompatibleWithFilter(bonusSlots, filterSlots) {
                const universal = filterSlots['универсальная'] || 0;
                let usedUniversal = 0;
            
                // Если фильтр пуст — показываем все бонусы
                if (!Object.keys(filterSlots).length) return true;
            
                // Проверяем: каждая выбранная ячейка должна быть допустима для бонуса
                for (const [slotType, count] of Object.entries(filterSlots)) {
                    // если бонус вообще не использует этот тип — несовместим
                    if (!bonusSlots[slotType] && slotType !== 'универсальная') {
                        return false;
                    }
            
                    // если бонус требует меньше, чем выбрано — проверяем, можно ли покрыть универсальными
                    const required = bonusSlots[slotType] || 0;
                    if (count > required) {
                        usedUniversal += count - required;
                        if (usedUniversal > universal) return false;
                    }
                }
            
                return true;
            }

            /**
             * Обновляет видимость пунктов в фильтре бонусов.
             */
            function updateBonusFilter() {
                const $bonusDD = $table.find('.dt-bonus-dropdown');
                if (!$bonusDD.length) return;
            
                const $items = $bonusDD.find('.dt-dropdown-item');
                const $any = $bonusDD.find('.dt-dropdown-item[data-value=""]'); // "Любой бонус"
                const visibleBonuses = new Set();
                const hasSlotFilters = Object.keys(slotFilterState).length > 0;
            
                // --- Скрываем "Любой бонус", если фильтр бонусов пуст ---
                const hasBonusSelected = activeFilters['insignia_bonuses'] && activeFilters['insignia_bonuses'].length > 0;
                if (!hasBonusSelected) {
                    $any.hide();
                } else {
                    $any.show();
                }
            
                // --- Собираем видимые бонусы из списка скакунов ---
                $itemsContainer.find('.dt-item:visible').each(function () {
                    const info = JSON.parse($(this).attr('data-info') || '{}');
                    const bonuses = info.insignia_bonuses;
                    if (!bonuses) return;
                    (Array.isArray(bonuses) ? bonuses : bonuses.split(',')).forEach(b => {
                        const clean = (b || '').trim().toLowerCase();
                        if (clean) visibleBonuses.add(clean);
                    });
                });
            
                // --- Фильтруем бонусы ---
                $items.each(function () {
                    const $item = $(this);
                    const val = ($item.data('value') || '').trim().toLowerCase();
                    if (!val) return; // "Любой бонус" пропускаем (обработан выше)
            
                    let show = visibleBonuses.has(val);
                    if (show && hasSlotFilters) {
                        const slotsStr = $item.data('slots-count') || '';
                        if (slotsStr) {
                            const bonusSlots = parseSlotsCount(slotsStr);
                            show = isBonusCompatibleWithFilter(bonusSlots, slotFilterState);
                        }
                    }
                    $item.toggle(show);
                });
            
                const $visibleBonuses = $items.filter(function () {
                    return $(this).css('display') !== 'none' && $(this).data('value');
                });
            
                // --- Нет видимых бонусов ---
                if ($visibleBonuses.length === 0) {
                    $any.find('.name').text('Бонусы не найдены');
                    $any.find('.bonus-desc').text('Нет доступных бонусов для выбранных ячеек.');
                    $any.show(); // показываем только это сообщение
                    $itemsContainer.find('.dt-item').hide();
                    $itemsContainer.find('.dt-no-results').show();
                } else {
                    // Возвращаем нормальный текст "Любой бонус"
                    $any.find('.name').text('Любой бонус');
                    $any.find('.bonus-desc').text('Показать все бонусы знаков');
                }
            }

			// === Фильтр по типу умения ===
			if (config.hasPowers) {
			    const $bonusSlotRow = $('<div>', { class: 'dt-power-row' }).appendTo($table.find('.dt-controls').first());
			    const $dropdown = $('<div>', {
			        class: 'dt-dropdown',
			        'data-type': 'filter',
			        'data-field': 'bonus_slot'
			    }).appendTo($bonusSlotRow);
			
			    $('<span>', { class: 'dt-dropdown-input', text: 'Тип умения' }).appendTo($dropdown);
			    const $list = $('<div>', { class: 'dt-dropdown-list' }).appendTo($dropdown);
			
			    [
			        { value: '',           label: 'Любой тип' },
			        { value: 'Атака',      label: 'Атака' },
			        { value: 'Оборона',    label: 'Оборона' },
			        { value: 'Полезность', label: 'Полезное' },
			    ].forEach(opt => {
			        $('<span>', {
			            class: 'dt-dropdown-item',
			            'data-value': opt.value,
			            role: 'radio',
			            'aria-checked': 'false',
			            tabindex: '0',
			            text: opt.label
			        }).appendTo($list);
			    });
			
			    activeFilters['bonus_slot'] = [];
			
			    initDropdown($dropdown, $item => {
			        const val = $item.data('value') || '';
			        $list.find('.dt-dropdown-item').removeClass('selected').attr('aria-checked', 'false');
			        if (val) {
			            $item.addClass('selected').attr('aria-checked', 'true');
			            activeFilters['bonus_slot'] = [val];
			        } else {
			            activeFilters['bonus_slot'] = [];
			        }
			        $dropdown.find('.dt-dropdown-input').text($item.text());
			        applyAllFilters();
			    });
			}

            $searchInput.on('input', rateLimit(applyAllFilters, 150, 'debounce'));
            $table.on('input', '.dt-slot-input', updateSlotFilters);

            // === Клик по предмету ===
            $itemsContainer.on('click', '.dt-item', rateLimit(function (e) {
                const $item = $(e.currentTarget);
                const info = JSON.parse($item.attr('data-info') || '{}');
                $table.data('active-quality', info.quality || 'mythic');
                $itemsContainer.find('.dt-item').removeClass('active');
                $item.addClass('active');

                const $target = config.hasTabs ? $details.find('#player-skills') : $details;
                $target.html('Загрузка...');
                if (config.hasTabs) $details.find('#sign-bonuses').html('Загрузка...');

                fetchItemDetails(info.name, category).then(data => {
                    const html = (data && data.parse && data.parse.text) || '<div>Ошибка</div>';
                    const $temp = $('<div>').html(html);

                    if (config.hasTabs) {
                        $details.find('#player-skills').html($temp.find('.dt-player-skills').html() || '—');
                        $details.find('#sign-bonuses').html($temp.find('.dt-sign-bonuses').html() || '—');
                    } else {
                        $target.html($temp.find('.dt-player-skills').html() || html);
                    }

                    if (config.supportsQuality) {
                        $details.find('.dt-power-calc-target').each(function () {
                            $(this).data('base-html', this.innerHTML.trim());
                        });
                        const q = activeQuality || config.defaultQuality || 'mythic';
                        const b = config.hasBolster ? parseFloat($table.find('.dt-bolster-input').val()) || 0 : 0;
                        recalcQualityValues($table, q, b, config);
                    }
                }).catch(() => {
                    $target.html('<div>Ошибка загрузки</div>');
                });
            }, 300, 'throttle'));

            $table.on('input change', '.dt-bolster-input', () => {
                const q = activeQuality || config.defaultQuality || 'mythic';
                const b = config.hasBolster ? parseFloat($table.find('.dt-bolster-input').val()) || 0 : 0;
                recalcQualityValues($table, q, b, config);
            });

            $table.on('click', '.dt-tab-button', function () {
                const $button = $(this);
                const $right = $button.closest('.dt-right');
                const $detailsContainer = $right.find('.dt-info');
                const tabId = $button.data('tab');

                $right.find('.dt-tab-button').removeClass('active');
                $detailsContainer.find('.dt-tab-pane').removeClass('active');

                $button.addClass('active');
                $detailsContainer.find('#' + tabId).addClass('active');
            });

            $itemsContainer.find('.dt-item').each(function (i) {
                $(this).addClass(i % 2 === 0 ? 'dt-even' : 'dt-odd');
            });
        });
    }

    /**
     * Загружает детальную информацию о предмете через API.
     * @param {string} name — название предмета
     * @param {string} category — категория
     * @param {number} retries — попытки
     * @returns {Promise}
     */
    function fetchItemDetails(name, category, retries = 3) {
        const key = name + '|' + category;
        if (apiCache.has(key)) return Promise.resolve(apiCache.get(key));
        return new mw.Api().get({
            action: 'parse',
            text: `{{#invoke:DynamicTable|getItemDetails|name=${name}|category=${category}}}`,
            prop: 'text',
            contentmodel: 'wikitext',
            formatversion: 2
        }).then(data => {
            if (!data || !data.parse || !data.parse.text) throw new Error('Пустой ответ');
            apiCache.set(key, data);
            return data;
        }).catch(err => {
            if (retries > 0) return fetchItemDetails(name, category, retries - 1);
            mw.notify('Ошибка загрузки: ' + name, { type: 'error' });
            throw err;
        });
    }

    /**
     * Показывает временное предупреждение в таблице.
     * @param {string} msg — текст
     * @param {jQuery} $table — таблица
     */
    function showWarning(msg, $table) {
        const $box = $table.find('.dt-warning-box');
        $box.text(msg).addClass('visible');
        clearTimeout($box.data('timer'));
        $box.data('timer', setTimeout(() => $box.removeClass('visible'), 2500));
    }

    // === Запуск ===
    if ($('.dynamic-table').length === 0) return;
    fetchCategoryConfig().then(initDynamicTables).catch(() => initDynamicTables());
});