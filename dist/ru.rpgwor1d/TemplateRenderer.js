(function() {
  function parseTemplateInDiv() {
    // Ищем все элементы с id="parseTemplate" (для лучшей практики лучше использовать класс)
    var parseTemplateDivs = document.querySelectorAll('#parseTemplate');

    parseTemplateDivs.forEach(function(div) {
      var templateName = div.textContent.trim(); // имя шаблона из текста div
      var params = [];

      // Собираем параметры из data-атрибутов
      var attributes = div.attributes;
      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        if (attr.name.startsWith('data-')) {
          var paramKey = attr.name.slice(5); // часть после "data-"
          if (paramKey.startsWith('param-')) {
            // Именованный параметр: data-param-имя="значение"
            var paramName = paramKey.slice(6);
            params.push({ type: 'named', name: paramName, value: attr.value });
          } else if (/^\d+$/.test(paramKey)) {
            // Позиционный параметр: data-1, data-2 и т.д.
            params.push({ type: 'positional', index: parseInt(paramKey, 10), value: attr.value });
          }
          // Остальные data-* атрибуты игнорируются
        }
      }

      // Формируем строку параметров для викитекста
      var positionalParams = params
        .filter(function(p) { return p.type === 'positional'; })
        .sort(function(a, b) { return a.index - b.index; });
      var namedParams = params.filter(function(p) { return p.type === 'named'; });

      var parts = [];
      positionalParams.forEach(function(p) { parts.push(p.value); });
      namedParams.forEach(function(p) { parts.push(p.name + '=' + p.value); });

      var paramString = parts.length > 0 ? '|' + parts.join('|') : '';
      var wikiText = '{{' + templateName + paramString + '}}';

      // Запрос к API парсера
      $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
          action: 'parse',
          text: wikiText,
          contentmodel: 'wikitext',
          format: 'json',
          uselang: mw.config.get('wgUserLanguage'),
          title: mw.config.get('wgPageName') // важно для относительных ссылок
        },
        dataType: 'json',
        success: function(data) {
          if (data.parse && data.parse.text && data.parse.text['*']) {
            div.innerHTML = data.parse.text['*']; // заменяем содержимое div

            // Применяем tooltips (если подключена система подсказок)
            if (typeof tooltips !== 'undefined' && tooltips.applyTooltips) {
              tooltips.applyTooltips($(div));
            }
          } else {
            div.innerHTML = 'Ошибка получения информации о шаблоне: ' + templateName;
            console.error('Ошибка при разборе шаблона:', data);
          }
        },
        error: function(xhr, status, error) {
          div.innerHTML = 'Ошибка получения информации о шаблоне: ' + templateName;
          console.error('Ошибка AJAX:', status, error);
        }
      });
    });
  }

  // Запуск после загрузки страницы
  $(document).ready(function() {
    parseTemplateInDiv();
  });
})();