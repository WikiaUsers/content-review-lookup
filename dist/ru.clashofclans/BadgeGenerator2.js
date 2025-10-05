!function ($) {
  if (!$('#clan-selector-2').length) return;

  // Добавляем canvas и кнопку
  $('#canvas-body-2').append(`
    <canvas id="canvas-gen-2" width="210" height="210"></canvas>
    <img src="" id="canvas-mirror-2" />
    <a href="#" class="button-2" id="dwn-clanbadge-2" download="clan-badge.png">Скачать</a>
  `);

  var img_base = 'https://images.wikia.nocookie.net/clashofclans/images/',
      o2 = {},
      currentlvl2 = 1;

  o2.blank = 'd/d2/Blank.png';
  o2.tags = { 'background': 'Фон', 'pg': 'Символ', 'border': 'Рамка', 'frame': 'Фрейм' };

  // --- Твои объекты ---
  o2.background = [
    "0/01/Background_1.png",
    "3/34/Background_2.png",
    "0/08/Background_3.png",
    "9/97/Background_4.png",
    "7/71/Background_5.png",
    "c/c8/Background_6.png",
    "4/41/Background_7.png",
    "1/11/Background_8.png",
    "4/42/Background_9.png",
    "b/b2/Background_10.png",
    "3/31/Background_11.png",
    "9/91/Background_12.png",
    "b/b4/Background_13.png",
    "2/2a/Background_14.png",
    "1/15/Background_15.png",
    "8/87/Background_16.png",
    "d/d8/Background_17.png",
    "3/3b/Background_18.png",
    "0/04/Background_19.png",
    "a/a3/Background_20.png"
  ];

  o2.pg = [
    "b/bc/Pattern_1.png",
    "8/8f/Pattern_2.png",
    "0/05/Pattern_3.png",
    "9/9f/Pattern_4.png",
    "2/2a/Pattern_5.png",
    "7/72/Pattern_6.png",
    "6/6b/Pattern_7.png",
    "8/81/Pattern_8.png",
    "8/88/Pattern_9.png",
    "a/a6/Pattern_10.png",
    "0/00/Pattern_11.png",
    "6/67/Pattern_12.png",
    "a/a3/Pattern_13.png",
    "7/71/Pattern_14.png",
    "c/c4/Pattern_15.png",
    "2/2b/Pattern_16.png",
    "7/7a/Pattern_17.png",
    "f/f0/Pattern_18.png",
    "7/7e/Pattern_19.png",
    "d/d9/Pattern_20.png"
  ];

  o2.border = [
    "2/2f/Border_1.png",
    "7/72/Border_2.png",
    "9/9a/Border_3.png",
    "3/3d/Border_4.png",
    "7/76/Border_5.png",
    "a/a1/Border_6.png",
    "6/67/Border_7.png",
    "d/d5/Border_8.png",
    "0/06/Border_9.png",
    "3/3c/Border_10.png",
    "a/a2/Border_11.png",
    "7/74/Border_12.png",
    "4/4f/Border_13.png",
    "2/26/Border_14.png",
    "b/b6/Border_15.png",
    "c/c2/Border_16.png",
    "3/3e/Border_17.png",
    "8/80/Border_18.png",
    "2/28/Border_19.png",
    "9/9b/Border_20.png"
  ];

  o2.frame = [
    "1/1f/Hexagon_1.png",
    "2/24/Hexagon_2.png",
    "f/f5/Hexagon_3.png",
    "3/39/Hexagon_4.png",
    "7/7d/Hexagon_5.png",
    "4/49/Hexagon_6.png"
  ];

  o2.lvl = [
    "8/88/Level_1.png",
    "7/75/Level_2.png",
    "9/91/Level_3.png",
    "3/35/Level_4.png",
    "f/f1/Level_5.png",
    "3/39/Level_6.png",
    "1/1f/Level_7.png",
    "7/74/Level_8.png",
    "9/92/Level_9.png",
    "8/8a/Level_10.png",
    "a/a8/Level_11.png",
    "0/0e/Level_12.png",
    "5/54/Level_13.png",
    "b/b9/Level_14.png",
    "2/25/Level_15.png",
    "f/f6/Level_16.png",
    "a/a3/Level_17.png",
    "7/77/Level_18.png",
    "4/4f/Level_19.png",
    "6/6d/Level_20.png"
  ];

  o2.hexagon = [
    "7/7e/HexagonBase.png"
  ];

  o2.levels = [
    "f/f4/Blank_lvl.png",
    "8/88/Level_1.png",
    "7/75/Level_2.png",
    "9/91/Level_3.png",
    "3/35/Level_4.png",
    "f/f1/Level_5.png",
    "3/39/Level_6.png",
    "1/1f/Level_7.png",
    "7/74/Level_8.png",
    "9/92/Level_9.png",
    "8/8a/Level_10.png",
    "a/a8/Level_11.png",
    "0/0e/Level_12.png",
    "5/54/Level_13.png",
    "b/b9/Level_14.png",
    "2/25/Level_15.png",
    "f/f6/Level_16.png",
    "a/a3/Level_17.png",
    "7/77/Level_18.png",
    "4/4f/Level_19.png",
    "6/6d/Level_20.png"
  ];
  // --- Конец объектов ---

  // Генерация UI
  $.each(o2, function (k, v) {
    if (['blank', 'tags', 'lvl', 'hexagon', 'levels'].indexOf(k) !== -1) return;

    var _t = k, _id = 'container-' + k + '-2';
    $('#options-container-2').append(`
      <div id="${_id}" class="container-2">
        <div class="container-header-2">${o2.tags[k]}</div>
        ${k === 'pg' ? '<div class="container-scroll-2"><div class="container-values-2"></div></div>' : '<div class="container-values-2"></div>'}
      </div>
    `);

    $.each(v, function (i, val) {
      var _c = (i == 0) ? ' img-selected-2' : '';
      $(`#${_id} .container-values-2`).append(
        `<img class="img-toggler-2${_c}" src="${c_base2(_t, i)}" data-type="${_t}" data-id="${i}" />`
      );
    });
  });

  // Блок выбора уровня
  $('#options-container-2').append(`
    <div id="container-lvl-2" class="container-2">
      <div class="container-header-2">Уровень</div>
      <div class="container-values-2"></div>
    </div>
  `);

  for (var i = 1; i < 22; i++) {
    var _i = i - 1, _n = (i == 21) ? 'Убрать' : i;
    $('#container-lvl-2 .container-values-2').append(`
      <span class="level-toggler-body-2">${_n}
        <input class="level-toggler-2" type="radio" value="${_i}">
      </span>
    `);
  }
  $('.level-toggler-2[value=0]').attr('checked', 'checked');

  // --- Вспомогательные функции ---
  function c_base2(n, i) {
    if (n == 'blank') return img_base + o2.blank;
    return img_base + o2[n][i];
  }

  // TODO: paintshield2, setBorder2, setBG2, setPattern2, setLevel2 и обработчики кликов

}(jQuery);