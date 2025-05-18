(function() {
  function parseTemplateInDiv() {
    var parseTemplateDivs = document.querySelectorAll('#parseTemplate');

    parseTemplateDivs.forEach(function(div) {
      var templateName = div.textContent.trim(); // Получаем имя шаблона из содержимого div
      var wikiText = '{{' + templateName + '}}';

      // Используем API Fandom для разбора шаблона
      $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
          action: 'parse',
          text: wikiText,
          contentmodel: 'wikitext',
          format: 'json',
          uselang: mw.config.get('wgUserLanguage'),
          title: mw.config.get('wgPageName'), // **КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Указываем текущее название страницы**
        },
        dataType: 'json',
        success: function(data) {
          if (data.parse && data.parse.text && data.parse.text['*']) {
            div.innerHTML = data.parse.text['*']; // Заменяем содержимое div на результат парсинга

            //  Добавляем эту строку: Применяем tooltips к div элементу, чтобы обновить систему подсказок для добавленного контента
            tooltips.applyTooltips($(div));

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

  // Запускаем функцию parseTemplateInDiv после загрузки страницы
  $(document).ready(function() {
    parseTemplateInDiv();
  });
})();