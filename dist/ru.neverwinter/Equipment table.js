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
  }

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

    // Удаляем старые пагинации
    $table.find('tr.pagination-row').remove();

    // Вставляем ТОЛЬКО в конец таблицы
    $table.append(createPaginationRow());

    // Навешиваем события на кнопки
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

  function loadPage() {
    const offset = (currentPage - 1) * itemsPerPage;
    const api = new mw.Api();
    const attrs = currentAttributes.length ? currentAttributes.map(a => a.replace(/"/g, '\\"')).join(",") : "";

    const wikitext = `{{#invoke:Equipment table|getItemsHtml|offset=${offset}|limit=${itemsPerPage}|search=${currentSearch}|category=${currentCategory}|quality=${currentQuality}|attributes=${attrs}|class=${currentClass}|sort=${currentSort}}}`;

    api.post({ action: 'parse', format: 'json', text: wikitext, disablelimitreport: true }).done(response => {
      const html = response && response.parse && response.parse.text && response.parse.text['*'];
      if (!html) return $('#equipment-table').html('<p>Ошибка загрузки данных</p>');
      $('#equipment-table').html(html);

      // Вставляем пагинацию только ВНИЗУ
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