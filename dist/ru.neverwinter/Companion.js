/**
 * Динамическая таблица спутников.
 * Функционал: поиск/фильтрация по имени/EN/параметрам/качеству, расчёт значений умений с множителями,
 * кэширование HTML из API, табы умений/бонусов. Инициализируется на элементах #dynamic-companions-table.
 * Требует: jQuery, MediaWiki API. Настройка через data-атрибуты таблицы.
 *
 * Dynamic companions table.
 * Features: search/filtering by name/EN/attrib/quality, calculation of skill values with multipliers,
 * HTML caching from API, tabs for skills/bonuses. Initializes on #dynamic-companions-table elements.
 * Requires: jQuery, MediaWiki API. Configuration via table data attributes.
 */

$(function () {
    $('#dynamic-companions-table').each(function () {
        const $dynamicTable = $(this);
        const $searchContainer = $dynamicTable.find('.mount-search');
        const $list = $dynamicTable.find('.mount-list');
        const $infoContainer = $dynamicTable.find('.companion-info');

        // Константы
        const QUALITY_MULTIPLIERS = {
            common: 75,
            uncommon: 150,
            rare: 250,
            epic: 375,
            legendary: 550,
            mythic: 750,
            celestial: 900
        };

        const ATTRIBUTE_GROUPS = {
            'Параметры атаки': ['Максимум хитов', 'Могущество', 'Точность', 'Боевое преимущество', 'Вероятность критического удара', 'Критический урон'],
            'Параметры обороны': ['Оборона', 'Осведомленность', 'Критическое уклонение', 'Сила парирования', 'Парирование'],
            'Полезные параметры': ['Сильная сторона', 'Бонус к контролю', 'Сопротивляемость контролю', 'Принимаемое лечение', 'Исходящее лечение'],
            'Бонусные параметры': ['Получение очков действия', 'Скорость восстановления', 'Скорость движения', 'Восстановление бодрости', 'Жажда золота', 'Жажда славы']
        };

        const qualityLabels = {
            common: 'Обычный',
            uncommon: 'Необычный',
            rare: 'Редкий',
            epic: 'Эпический',
            legendary: 'Легендарный',
            mythic: 'Мифический',
            celestial: 'Небесный'
        };

        // Переменные состояния
        let currentQuality = '';
        const baseCombatHTMLCache = {};
        const baseEquipHTMLCache = {};
        const baseEquipDescriptionCache = {};
        const parsedDataCache = {};
        let selectedAttributes = [];
        let $items;

        // Утилитарные функции
        const patternNumbersInBraces = /\{[\d,.]+\}/g;
        const patternBracesCleanup = /[\{\}]/g;

        function formatNumber(n) {
            return new Intl.NumberFormat('en-US').format(n);
        }

        function extractAllValues(text) {
            if (typeof text !== 'string') return [];
            const matches = text.match(patternNumbersInBraces) || [];
            return matches.map(match => {
                const original = match.replace(patternBracesCleanup, '');
                const cleaned = original.replace(/,/g, '');
                return {
                    value: parseFloat(cleaned),
                    original
                };
            });
        }

        function debounce(func, delay) {
            let timer;
            return function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(this, args), delay);
            };
        }

        // Абстракция для дропдаун-логики
        function createDropdownHandler($trigger, $list) {
            let isOpen = false;
            let hideTimer = null;

            function openList() {
                $('.dropdown-list').not($list).removeClass('open');
                $list.addClass('open');
                isOpen = true;
            }

            function scheduleHide() {
                if (hideTimer) clearTimeout(hideTimer);
                hideTimer = setTimeout(() => {
                    $list.removeClass('open');
                    isOpen = false;
                }, 200);
            }

            function cancelHide() {
                if (hideTimer) clearTimeout(hideTimer);
            }

            $trigger.on('click', e => {
                e.stopPropagation();
                if (!isOpen) {
                    openList();
                } else {
                    $list.removeClass('open');
                    isOpen = false;
                }
            });

            $trigger.on('mouseenter', cancelHide).on('mouseleave', scheduleHide);
            $list.on('mouseenter', cancelHide).on('mouseleave', scheduleHide).on('click', e => e.stopPropagation());

            return { openList, scheduleHide, cancelHide };
        }

        // Функции кэша
        function setCache(name, html) {
            parsedDataCache[name] = { html, timestamp: Date.now() };
        }

        function getCache(name) {
            const entry = parsedDataCache[name];
            if (!entry) return null;
            return entry.html;
        }

        // Обновление значений
        function updateDisplayedValues(selectedName) {
            const newMultiplier = QUALITY_MULTIPLIERS[currentQuality] || QUALITY_MULTIPLIERS.common;
            const defaultQuality = $dynamicTable.data('default-quality') || 'common';
            const baseLevel = QUALITY_MULTIPLIERS[defaultQuality] || QUALITY_MULTIPLIERS.common;

            const $combatTarget = $infoContainer.find('.combat-power-target');
            const $equipTarget = $infoContainer.find('.equip-power-target');
            const $equipDesc = $infoContainer.find('.equip-power-description');
            const $nameElem = $infoContainer.find('.mount-name');

            function process(baseHTML, $target) {
                if (!baseHTML) {
                    $target.empty();
                    return;
                }
                const values = extractAllValues(baseHTML);
                if (!values.length) {
                    $target.html(baseHTML);
                    return;
                }

                let i = 0;
                const html = baseHTML.replace(patternNumbersInBraces, () => {
                    const data = values[i++];
                    const rawValue = data.value * (newMultiplier / baseLevel);
                    let formatted;

                    if (Math.abs(rawValue) >= 1000) {
                        formatted = formatNumber(Math.round(rawValue));
                    } else if (Math.abs(rawValue) >= 10) {
                        formatted = rawValue.toFixed(1).replace(/\.0$/, '');
                    } else if (Math.abs(rawValue) >= 1) {
                        formatted = rawValue.toFixed(2).replace(/\.?0+$/, '');
                    } else {
                        formatted = rawValue.toFixed(3).replace(/\.?0+$/, '');
                    }

                    return `<b>${formatted}</b>`;
                });

                $target.html(html);
            }

            process(baseCombatHTMLCache[selectedName], $combatTarget);
            process(baseEquipHTMLCache[selectedName], $equipTarget);
            process(baseEquipDescriptionCache[selectedName], $equipDesc);

            if ($nameElem.length) {
                $nameElem.attr('class', `mount-name ${currentQuality}`).attr('data-quality', currentQuality);
            }
        }

        // Универсальный фильтр
        function applyFullFilter() {
            const searchQuery = ($searchInput.val() || '').toLowerCase().trim();
            const selectedEnhancement = $enhSelected.attr('data-value') || '';
            let visibleCount = 0;

            $items.each((_, item) => {
                const $mount = $(item);
                let match = true;

                if (searchQuery) {
                    const isCyrillic = /[а-яА-Я]/.test(searchQuery);
                    const isLatin = /[a-zA-Z]/.test(searchQuery);

                    if (isCyrillic) {
                        const text = $mount.data('_cachedText') || '';
                        match = text.includes(searchQuery);
                    } else if (isLatin) {
                        const en = $mount.data('_cachedEnglish') || '';
                        match = en.includes(searchQuery);
                    } else {
                        const text = $mount.data('_cachedText') || '';
                        const en = $mount.data('_cachedEnglish') || '';
                        match = text.includes(searchQuery) || en.includes(searchQuery);
                    }
                }

                if (match && selectedEnhancement) {
                    const power = $mount.data('enhancement-power') || '';
                    match = power === selectedEnhancement;
                }

                if (match && selectedAttributes.length > 0) {
                    const attrs = ($mount.data('attributes') || '').toLowerCase();
                    match = selectedAttributes.every(a => attrs.includes(a.toLowerCase()));
                }

                $mount.toggle(match);
                if (match) visibleCount++;
            });

            let $noResults = $list.find('.mount-not-found');
            if (!$noResults.length) {
                $noResults = $('<div class="mount-not-found">Не найдено</div>').appendTo($list);
            }
            $noResults.toggle(!visibleCount);
        }

        // Создание UI: Поиск
        const $searchBlock = $searchContainer.find('.search-block');
        const $qualityBlock = $searchContainer.find('.quality-block');

        const $searchInput = $('<input>', {
            type: 'text',
            placeholder: 'Поиск...',
            class: 'mount-search-input'
        }).appendTo($searchBlock);

        // Создание UI: Качество
        const $qualitySelect = $('<select>', { class: 'select' })
            .append('<option value="" disabled selected hidden>Качество</option>')
            .append('<option value="default">По умолчанию</option>');

        $.each(qualityLabels, (val, text) => {
            $('<option>', { value: val, text }).appendTo($qualitySelect);
        });

        $qualityBlock.find('.quality-hint').before($qualitySelect);

        // Создание UI: Умение усиления
        const $enhancementBlock = $('<div class="enhancement-select-block"></div>');
        $('<div class="label">Умение усиления</div>').appendTo($enhancementBlock);

        const $enhDropdown = $(`
            <div class="enhancement-dropdown">
                <div class="enh-selected" data-value="">Любое умение</div>
                <div class="enh-list dropdown-list"></div>
            </div>
        `);
        $enhancementBlock.append($enhDropdown);
        $qualityBlock.before($enhancementBlock);

        const $enhSelected = $enhDropdown.find('.enh-selected');
        const $enhList = $enhDropdown.find('.enh-list');
        createDropdownHandler($enhSelected, $enhList);

        // Загрузка умений
        new mw.Api().get({
            action: 'cargoquery',
            tables: 'Powers',
            fields: 'name,item_ui_equip_power=item_ui_equip_power',
            where: 'type="Усиление"',
            limit: 500,
            format: 'json'
        }).done(data => {
            if (!data || !data.cargoquery) {
                console.error('No data from cargoquery');
                return;
            }

            $('<div class="enh-option option" data-value="">Все умения</div>').appendTo($enhList);

            data.cargoquery.forEach(row => {
                const name = row.title.name;
                const rawDesc = row.title.item_ui_equip_power || '';
                const cleanDesc = rawDesc
                    .replace(/\[\[(?:[^|\]]*\|)?([^|\]]+)\]\]/g, '$1')
                    .replace(/\{\{[^}]+\}\}/g, '')
                    .replace(/<[^>]+>/g, '')
                    .replace(/\{[\d.,]+\}/g, '')
                    .replace(/\s+/g, ' ')
                    .replace(/&nbsp;/g, ' ')
                    .trim();

                $('<div class="enh-option option" data-value="' + name + '"><b>' + name + '</b><div class="desc">' + cleanDesc + '</div></div>')
                    .appendTo($enhList);
            });
        }).fail(() => {
            console.error('Ошибка загрузки умений');
        });

        // Создание UI: Параметры
        const $attrBlock = $('<div class="attribute-filter-block"></div>');
        $('<div class="label">Параметры</div>').appendTo($attrBlock);

        const $attrDropdown = $(`
            <div class="attribute-dropdown">
                <input type="text" class="attribute-input" placeholder="Выберите до 2 параметров" readonly>
                <div class="attr-list dropdown-list"></div>
            </div>
        `);
        $attrBlock.append($attrDropdown);
        $qualityBlock.before($attrBlock);

        const $attrInput = $attrDropdown.find('.attribute-input');
        const $attrList = $attrDropdown.find('.attr-list');
        createDropdownHandler($attrInput, $attrList);

        // Заполнение списка параметров
        $.each(ATTRIBUTE_GROUPS, (groupName, attrs) => {
            const $group = $('<div class="group"></div>');
            $('<div class="group-title"><b>' + groupName + '</b></div>').appendTo($group);
            attrs.forEach(attr => {
                const id = 'attr-' + attr.replace(/\s+/g, '-').toLowerCase();
                const $label = $('<label class="attr-item"></label>');
                const $chk = $('<input type="checkbox" value="' + attr + '" id="' + id + '">');
                $label.append($chk, $('<span>' + attr + '</span>'));
                $group.append($label);
            });
            $attrList.append($group);
        });

        // Инициализация элементов списка
        $items = $list.find('.mount-item');
        $items.each(function () {
            const $item = $(this);
            const text = ($item.data('name') || '').toLowerCase().trim();
            const en = ($item.data('en') || '').toLowerCase().trim();
            $item.data('_cachedText', text);
            $item.data('_cachedEnglish', en);
        });

        // Проверка, есть ли элементы
        if ($items.length === 0) {
            console.warn('No mount items found in .mount-list');
        }

        // Привязка событий
        const debouncedFilter = debounce(applyFullFilter, 350);

        $searchInput.on('input', function () {
            debouncedFilter();
        });

        $qualitySelect.on('change', () => {
            const selected = $qualitySelect.val();
            const defaultQuality = $dynamicTable.data('default-quality') || '';
            currentQuality = (!selected || selected === 'default') ? defaultQuality : selected;
            const selectedMount = $dynamicTable.find('.mount-item.active').data('name');
            if (selectedMount) updateDisplayedValues(selectedMount);
        });

        $enhList.on('click', '.enh-option', function () {
            const val = $(this).data('value');
            const text = $(this).find('b').text() || 'Все умения';
            $enhSelected.text(val ? text : 'Любое умение').attr('data-value', val || '');
            $enhList.removeClass('open');
            applyFullFilter();
        });

        $attrList.on('change', 'input[type=checkbox]', function (e) {
            e.stopPropagation();
            const $chk = $(this);
            const val = $chk.val();

            if ($chk.is(':checked')) {
                if (selectedAttributes.length >= 2) {
                    alert('Можно выбрать не более двух параметров.');
                    $chk.prop('checked', false);
                    return;
                }
                selectedAttributes.push(val);
            } else {
                selectedAttributes = selectedAttributes.filter(v => v !== val);
            }

            $attrInput.val(selectedAttributes.join(', '));
            applyFullFilter();
        });

        $dynamicTable.on('click', '.mount-item', function () {
            const $item = $(this);
            const name = $item.data('name');
            const quality = $item.data('quality') || '';
            $dynamicTable.data('default-quality', quality);
            if (!$qualitySelect.val()) currentQuality = quality;

            $dynamicTable.find('.mount-item').removeClass('active');
            $item.addClass('active');

            $dynamicTable.data('current-name', name);

            const cachedHTML = getCache(name);
            if (cachedHTML) {
                $infoContainer.html(cachedHTML);
                baseCombatHTMLCache[name] = $infoContainer.find('.combat-power-target').html() || '';
                baseEquipHTMLCache[name] = $infoContainer.find('.equip-power-target').html() || '';
                baseEquipDescriptionCache[name] = $infoContainer.find('.equip-power-description').html() || '';
                updateDisplayedValues(name);
                return;
            }

            $infoContainer.html('<div class="mount-loading">Загрузка...</div>');

            new mw.Api().get({
                action: 'parse',
                text: '{{#invoke:DynamicCompanionTable|get|name=' + name + '}}',
                prop: 'text',
                contentmodel: 'wikitext',
                formatversion: 2
            }).done(data => {
                if ($dynamicTable.data('current-name') !== name) return;
                const html = (data && data.parse && data.parse.text) ? data.parse.text : '<div>Ошибка загрузки</div>';
                setCache(name, html);
                $infoContainer.html(html);
                baseCombatHTMLCache[name] = $infoContainer.find('.combat-power-target').html() || '';
                baseEquipHTMLCache[name] = $infoContainer.find('.equip-power-target').html() || '';
                baseEquipDescriptionCache[name] = $infoContainer.find('.equip-power-description').html() || '';
                updateDisplayedValues(name);
            }).fail(() => {
                $infoContainer.html('<div>Ошибка запроса</div>');
            });
        });

        // Закрытие дропдаунов
        $(document).on('click', function () {
            $('.dropdown-list').removeClass('open');
        });
    });
});