/* This JavaScript code is responsible for the dynamic rendering of an equipment items table on the wiki platform, using data retrieved from the server via a Lua module call. */
$(function() {
  if (!$('#equipment-table').length) return;

  const itemsPerPage = 20;
  let currentPage = 1;
  let currentSearch = '';
  let currentCategory = '';
  let currentQuality = '';
  let currentAttributes = [];
  let currentClass = '';
  let currentSort = 'name_asc';

  const categories = ["", "Голова", "Доспехи", "Руки", "Ноги", "Рубаха", "Пояс", "Штаны", "Шея", "Кольцо", "Правая рука", "Левая рука", "Только для спутников"];

  const qualityLabels = {
    "": "Любое качество",
    "common": "Обычное",
    "uncommon": "Необычное",
    "rare": "Редкое",
    "epic": "Эпическое",
    "legendary": "Легендарное",
    "mythic": "Мифическое",
    "celestial": "Небесное"
  };

  const classes = ["", "Бард", "Волшебник", "Клирик", "Варвар", "Воин", "Следопыт", "Плут", "Чернокнижник", "Паладин"];

  const attributeGroups = {
    "Параметры атаки": [
      { key: "hit_points", label: "Максимум хитов" },
      { key: "power", label: "Могущество" },
      { key: "accuracy", label: "Точность" },
      { key: "combat_advantage", label: "Боевое преимущество" },
      { key: "critical_strike", label: "Вероятность критического удара" },
      { key: "critical_severity", label: "Критический урон" }
    ],
    "Параметры обороны": [
      { key: "defense", label: "Оборона" },
      { key: "awareness", label: "Осведомленность" },
      { key: "critical_avoidance", label: "Критическое уклонение" },
      { key: "deflect", label: "Парирование" },
      { key: "deflect_severity", label: "Сила парирования" }
    ],
    "Полезные параметры": [
      { key: "forte", label: "Сильная сторона" },
      { key: "control_bonus", label: "Бонус к контролю" },
      { key: "control_resist", label: "Сопротивляемость контролю" },
      { key: "incoming_healing", label: "Принимаемое лечение" },
      { key: "outgoing_healing", label: "Исходящее лечение" }
    ]
  };

  const styleSelect = 'padding:5px; border-radius:4px; border:1px solid #ccc; background:#fff; font-size:14px; margin-bottom:10px; cursor:pointer; width:100%; box-sizing: border-box;';

  const createOptions = (options, labels = null) => options.map(v => `<option value="${v}">${labels ? labels[v] : v}</option>`).join('');

  // ---------- Чтение начальных параметров из div ----------
  const $tableDiv = $('#equipment-table');
  currentClass = $tableDiv.data('class') || '';
  currentCategory = $tableDiv.data('category') || '';
  currentQuality = $tableDiv.data('quality') || '';
  currentAttributes = $tableDiv.data('attributes') ? $tableDiv.data('attributes').split(',') : [];
  currentSort = $tableDiv.data('sort') || 'name_asc';

  // ---------- Создание фильтров ----------
  function buildSelectors() {
    const $container = $('#filter-controls');
    if (!$container.length) $('#equipment-table').before('<div id="filter-controls" style="margin-bottom:15px;"></div>');
    const $filters = $('#filter-controls').empty().css({
      padding: '10px',
      background: '#f5f5f5',
      borderRadius: '5px',
      border: '1px solid #ddd',
      display: 'flex',
      gap: '15px',
      minHeight: '350px',
      height: '350px',
      boxSizing: 'border-box',
    });

    const htmlLeft = $(
      `<div style="flex:1 1 300px; display:flex; flex-direction: column;">
        <input type="text" id="search-input" placeholder="Поиск по названию..." style="padding:6px 8px; border-radius:4px; border:1px solid #ccc; font-size:14px; margin-bottom:15px;">

        <div style="margin-bottom:5px;">Сортировка по</div>
        <select id="sort-select" style="${styleSelect}">
          <option value="name_asc">По названию (А–Я)</option>
          <option value="name_desc">По названию (Я–А)</option>
          <option value="item_level_asc">По уровню предмета (по возрастанию)</option>
          <option value="item_level_desc">По уровню предмета (по убыванию)</option>
        </select>

         <div style="margin-bottom:5px;">Класс</div>
        <select id="class-select" style="${styleSelect}">
          <option value="">Любой класс</option>
          ${createOptions(classes.filter(c => c))}
        </select>

         <div style="margin-bottom:5px;">Категория</div>
        <select id="category-select" style="${styleSelect}">
          <option value="">Любая категория</option>
          ${createOptions(categories.filter(c => c))}
        </select>

         <div style="margin-bottom:5px;">Качество</div>
        <select id="quality-select" style="${styleSelect}">
          ${createOptions(Object.keys(qualityLabels), qualityLabels)}
        </select>
      </div>`
    );

    const htmlRight = $('<div style="flex:1 1 300px; display:flex; flex-direction: column;"></div>')
      .append('<div style="margin-bottom:8px;">Параметры (можно выбрать макс. три параметра)</div>')
      .append(
        $('<div id="attributes-scroll" style="border:1px solid #919191; border-radius:5px; flex-grow:1; overflow-y:auto; background:#fafafa; padding:10px;"></div>')
          .append(Object.entries(attributeGroups).flatMap(([group, attrs]) => [
            `<strong style="display:block;">${group}</strong>`,
            ...attrs.map(({ key, label }) =>
              `<label style="display:block; margin-bottom:6px; cursor:pointer; user-select:none;">
                <input type="checkbox" class="attribute-checkbox" value="${key}" style="margin-right:8px;">${label}
              </label>`)
          ]))
      );

    $filters.append(htmlLeft, htmlRight);

    // ---------- Навешивание событий ----------
    $('#search-input').on('input', () => updateState('search'));
    $('#sort-select, #class-select, #category-select, #quality-select').on('change', function () {
      updateState($(this).attr('id').replace('-select', ''));
    });
    $filters.on('change', '.attribute-checkbox', function () {
      const checked = $('.attribute-checkbox:checked').map((_, el) => el.value).get();
      if (checked.length > 3) {
        $(this).prop('checked', false);
        return alert('Можно выбрать максимум 3 параметра');
      }
      currentAttributes = checked;
      currentPage = 1;
      loadPage();
    });

    // ---------- Установка начальных значений фильтров ----------
    $('#class-select').val(currentClass);
    $('#category-select').val(currentCategory);
    $('#quality-select').val(currentQuality);
    $('#sort-select').val(currentSort);
    $('.attribute-checkbox').each(function() {
      $(this).prop('checked', currentAttributes.includes($(this).val()));
    });
  }

  // ---------- Обновление состояния ----------
  function updateState(type) {
    const map = {
      search: () => currentSearch = $('#search-input').val().trim(),
      sort: () => currentSort = $('#sort-select').val(),
      class: () => currentClass = $('#class-select').val(),
      category: () => currentCategory = $('#category-select').val(),
      quality: () => currentQuality = $('#quality-select').val()
    };
    map[type]();
    currentPage = 1;
    loadPage();
  }

  // ---------- Пагинация ----------
  function insertPaginationRows() {
    const $table = $('#equipment-table table.wikitable');
    if (!$table.length) return;

    function createPaginationRow() {
      return $(`
        <tr class="pagination-row">
          <td colspan="5" style="text-align:center; padding:6px;">
            <button class="prev-page" style="margin-right:12px;">Предыдущая</button>
            <span class="current-page">Страница ${currentPage}</span>
            <button class="next-page" style="margin-left:12px;">Следующая</button>
          </td>
        </tr>
      `);
    }

    $table.find('tr.pagination-row').remove();
    $table.append(createPaginationRow());

    $table.find('button.prev-page').off('click').on('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadPage();
      }
    });

    $table.find('button.next-page').off('click').on('click', () => {
      if (!$('.next-page').prop('disabled')) {
        currentPage++;
        loadPage();
      }
    });
  }

  // ---------- Загрузка страницы ----------
  function loadPage() {
    const offset = (currentPage - 1) * itemsPerPage;
    const api = new mw.Api();
    const attrs = currentAttributes.length ? currentAttributes.map(a => a.replace(/"/g, '\\"')).join(",") : "";

    const wikitext = `{{#invoke:Equipment table|getItemsHtml|offset=${offset}|limit=${itemsPerPage}|search=${currentSearch}|category=${currentCategory}|quality=${currentQuality}|attributes=${attrs}|class=${currentClass}|sort=${currentSort}}}`;

    api.post({ action: 'parse', format: 'json', text: wikitext, disablelimitreport: true }).done(response => {
      const html = response && response.parse && response.parse.text && response.parse.text['*'];
      if (!html) return $('#equipment-table').html('<p>Ошибка загрузки данных</p>');
      $('#equipment-table').html(html);

      insertPaginationRows();

      checkHasNextPage().then(hasNext => {
        $('#equipment-table table.wikitable tr.pagination-row button.prev-page').prop('disabled', currentPage === 1);
        $('#equipment-table table.wikitable tr.pagination-row button.next-page').prop('disabled', !hasNext);
        $('#equipment-table table.wikitable tr.pagination-row span.current-page').text(`Страница ${currentPage}`);
      });
    });
  }

  function checkHasNextPage() {
    const offset = currentPage * itemsPerPage;
    const attrs = currentAttributes.length ? currentAttributes.map(a => a.replace(/"/g, '\\"')).join(",") : "";

    const wikitext = `{{#invoke:Equipment table|getItemsHtml|offset=${offset}|limit=1|search=${currentSearch}|category=${currentCategory}|quality=${currentQuality}|attributes=${attrs}|class=${currentClass}|sort=${currentSort}}}`;

    return new mw.Api().post({
      action: 'parse',
      format: 'json',
      text: wikitext,
      disablelimitreport: true
    }).then(res => {
      if (res && res.parse && res.parse.text && res.parse.text['*']) {
        return res.parse.text['*'].includes('<tr');
      }
      return false;
    }).catch(() => false);
  }

  buildSelectors();
  loadPage();
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
     * @param {string} quality — выбранное качество ('mythic', 'default' и т.д.)
     * @param {number} bolster — значение укрепления (0–100)
     * @param {Object} config — конфигурация категории
     */
    function recalcQualityValues($tableElement, quality = 'default', bolster = 0, config = {}) {
        if (!config || !config.supportsQuality) return;

        const qualityLevels = config.qualityLevels || {};
        const selected = (quality === 'default'
            ? ($tableElement.data('active-quality') || config.defaultQuality || 'mythic')
            : quality);

        const bolsterPercent = config.hasBolster
            ? Math.min(Math.max(+bolster || 0, 0), 100)
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
                baseQuality = ($tableElement.data('active-quality') || config.defaultQuality || 'mythic');
            } else if (baseAttr) {
                baseQuality = baseAttr;
            } else {
                baseQuality = (config.calculateBase || config.defaultQuality || 'mythic');
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

        $tableElement.find('.dt-name span')
            .removeClass('common uncommon rare epic legendary mythic celestial')
            .addClass(selected);
            
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
                                if (!bonusOverrideActive) {
                                    manualSlotState = $.extend({}, slotFilterState);
                                    bonusOverrideActive = true;
                                }
                                applySlotVisuals($table, required);
                                slotFilterState = required;
                                updateBonusHint($bonusHint, required, 'Требуются');
                            } else {
                                if (bonusOverrideActive) {
                                    applySlotVisuals($table, manualSlotState);
                                    slotFilterState = $.extend({}, manualSlotState);
                                    bonusOverrideActive = false;
                                }
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
                const visibleBonuses = new Set();
                const hasSlotFilters = Object.keys(slotFilterState).length > 0;

                $itemsContainer.find('.dt-item:visible').each(function () {
                    const info = JSON.parse($(this).attr('data-info') || '{}');
                    const bonuses = info.insignia_bonuses;
                    if (!bonuses) return;
                    (Array.isArray(bonuses) ? bonuses : bonuses.split(',')).forEach(b => {
                        const clean = (b || '').trim().toLowerCase();
                        if (clean) visibleBonuses.add(clean);
                    });
                });

                $items.each(function () {
                    const $item = $(this);
                    const val = ($item.data('value') || '').trim().toLowerCase();
                    if (!val) { $item.show(); return; }
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