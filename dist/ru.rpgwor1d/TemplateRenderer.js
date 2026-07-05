(function() {
  function parseTemplateInDiv() {
    var parseTemplateDivs = document.querySelectorAll('#parseTemplate');

    parseTemplateDivs.forEach(function(div) {
      var templateName;
      // Проверяем, есть ли внутри скрытый блок с именем шаблона
      var nameDiv = div.querySelector('#parseTemplateName');
      if (nameDiv) {
        // Новый способ: имя берётся из #parseTemplateName,
        // содержимое #parseReplace игнорируется при считывании имени
        templateName = nameDiv.textContent.trim();
      } else {
        // Старый способ: имя шаблона — это текстовое содержимое div
        templateName = div.textContent.trim();
      }

      var params = [];

      // Сбор параметров из data-атрибутов
      var attributes = div.attributes;
      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];
        if (attr.name.startsWith('data-')) {
          var paramKey = attr.name.slice(5);
          if (paramKey.startsWith('param-')) {
            var paramName = paramKey.slice(6);
            params.push({ type: 'named', name: paramName, value: attr.value });
          } else if (/^\d+$/.test(paramKey)) {
            params.push({ type: 'positional', index: parseInt(paramKey, 10), value: attr.value });
          }
        }
      }

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
          title: mw.config.get('wgPageName')
        },
        dataType: 'json',
        success: function(data) {
          if (data.parse && data.parse.text && data.parse.text['*']) {
            // Замена содержимого div результатом парсинга (при этом #parseReplace удаляется)
            div.innerHTML = data.parse.text['*'];

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

  $(document).ready(function() {
    parseTemplateInDiv();
  });
})();