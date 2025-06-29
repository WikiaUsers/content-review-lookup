/**
 * *
 * This script adds two linked dropdown selectors above the companion table, allowing users to filter and sort the table rows based on selected item attribute parameters.
 * It dynamically updates row visibility and styling, and displays a message when no rows match the selected criteria.
 * 
 */
$(function() {
  const paramGroups = {
    'Параметры атаки': ['Максимум хитов', 'Могущество', 'Точность', 'Боевое преимущество', 'Вероятность критического удара', 'Критический урон'],
    'Параметры обороны': ['Оборона', 'Осведомленность', 'Критическое уклонение', 'Сила парирования', 'Парирование'],
    'Полезные параметры': ['Сильная сторона', 'Бонус к контролю', 'Сопротивляемость контролю', 'Принимаемое лечение', 'Исходящее лечение'],
    'Бонусные параметры': ['Получение очков действия', 'Скорость восстановления', 'Скорость движения', 'Восстановление бодрости', 'Жажда золота', 'Жажда славы'],
  };

  const $table = $('.companion-table');
  if (!$table.length) return;
  const $tbody = $table.find('tbody').first();

  // Заголовок (строка с <th> в tbody)
  const $headerRow = $tbody.find('tr').filter((_, tr) => $(tr).find('th').length).first();

  // Все строки кроме заголовка
  const $allRows = $tbody.find('tr').not($headerRow);

  // Строка "Нет совпадений"
  const colspan = $table.find('thead tr th').length || $headerRow.find('th').length || $tbody.find('tr:first td').length || 1;
  const $noMatch = $(`<tr class="no-match"><td colspan="${colspan}" style="text-align:center; font-style:italic; padding:10px;">Нет совпадений с вашими критериями настроек отображения</td></tr>`)
    .hide();
  $tbody.append($noMatch);

  function createSelect(id) {
    const $select = $(`<select id="${id}" title="Выберите параметр для сортировки" style="padding:5px; border-radius:4px; border:1px solid #ccc; background:#fff; font-size:14px; margin-right:10px; cursor:pointer;"><option value="">-- Выберите параметр --</option></select>`);
    $.each(paramGroups, (group, params) => {
      const $optgroup = $(`<optgroup label="${group}"></optgroup>`);
      params.forEach(p => $optgroup.append(`<option value="${p}">${p}</option>`));
      $select.append($optgroup);
    });
    return $select;
  }

  const $select1 = createSelect('attrSortSelect1');
  const $select2 = createSelect('attrSortSelect2');

  const $container = $(`
    <div style="margin-bottom:15px;">
      <div style="display:flex; align-items:center; margin-bottom:15px; padding:10px; background:#f5f5f5; border-radius:5px; border:1px solid #ddd;">
        <span class="settings-icon" style="margin-right:10px; font-size:18px;">⚙️</span>
        <label style="margin-right:5px;">Сортировка за параметрами: </label>
      </div>
    </div>`);
  $container.find('div').append($select1, $select2);
  $table.before($container);

  function updateOptions(changed, other) {
    const val = changed.val();
    other.find('option').prop('disabled', false);
    if (val) other.find(`option[value="${val}"]`).prop('disabled', true);
    if (other.val() === val) other.val('');
  }

  function filterRows() {
    const val1 = $select1.val();
    const val2 = $select2.val();

    $tbody.empty();
    if ($headerRow.length) $tbody.append($headerRow);

    let visibleCount = 0;
    $allRows.each(function() {
      const attrs = ($(this).attr('data-attributes') || '').split(',').map(s => s.trim());
      const match = (!val1 && !val2)
        || (val1 && val2 && attrs.includes(val1) && attrs.includes(val2))
        || (val1 && !val2 && attrs.includes(val1))
        || (!val1 && val2 && attrs.includes(val2));
      if (match) {
        $tbody.append(this);
        visibleCount++;
      }
    });

    if (visibleCount === 0) {
      $tbody.append($noMatch);
      $noMatch.show();
    } else {
      $noMatch.hide();
    }
  }

  $select1.on('change', () => { updateOptions($select1, $select2); filterRows(); });
  $select2.on('change', () => { updateOptions($select2, $select1); filterRows(); });

  filterRows(); // начальная фильтрация
});