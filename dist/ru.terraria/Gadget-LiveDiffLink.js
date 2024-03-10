// Автор Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: http://terraria-ru.gamepedia.com/User:Alex_Great

var wgAction = mw.config.get( 'wgAction' );
var wgPageName = mw.config.get( 'wgPageName' );

if (wgAction == 'history') {   // Ничего не делает, если не находиться на странице истории версий.

// Отображает кнопку «сравнить», которая создаёт пустую ссылку после каждой не выбранной версии
   var submitButton = $('.historysubmit:submit');
   submitButton.after("<a class='diffURL' style='border:#999 1px dashed; padding:2px 4px 2px 4px;'></a>");
   var displayDiffField = $('.diffURL');

// Отображает первоначальную версию
   var displayDiffNew = $('[name="diff"]:checked').slice(0,1).attr('value');
   var displayDiffOld = $('[name="oldid"]:checked').slice(0,1).attr('value');

// Помещает изначальную основную ссылку в виде URL, текста и подсказки, затем добавляет стрелку между кнопкой «сравнить» и ссылкой
   displayDiffField.text("http://terraria.fandom.com/ru/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr("href", "http:///terraria.fandom.com/ru/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
   displayDiffField.attr('title', 'http:////terraria.fandom.com/ru/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);
   displayDiffField.before("<b> → </b>");

// Отображает размер версии
   var displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
   var displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

// Добавляет ссылку на разницу версий перед первоначальными размерами версий. Используется ссылка внутри тега <span>, которая позволяет вернуться к вновь добавленному тексту, использующему свой класс.
   var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://terraria-ru.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>‎) . . </span>');
   var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://terraria-ru.gamepedia.com/w/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>‎) . . </span>');

// Устанавливает подсказку для ссылки размера страницы на разницу версий
   $('.historyDiffLink').find('a').attr('title', 'http://terraria.fandom.com/ru/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

// Устанавливает функцию щелчка для переключателей
   $(":radio").click(function(){   

   // Очищает существующие ссылки на размер версии
      $('.historyDiffLink').remove();

   // Отображает выбранные версии, помещает в соответствующие переменные
      if ($(this).attr('name') == 'oldid') displayDiffOld = $(this).attr('value');
      if ($(this).attr('name') == 'diff') displayDiffNew = $(this).attr('value');

   // Обновляет ссылку на основную версию URL, текст и подсказку
      displayDiffField.attr("href", "http://terraria.fandom.com/ru/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.text("http://terraria.fandom.com/ru/index.php?title=" + wgPageName + "&diff=" + displayDiffNew + "&oldid=" + displayDiffOld);
      displayDiffField.attr('title', 'http://terraria.fandom.com/ru/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   // Отображает новые размеры сравнения версий
      displayDiffSizeNew = $('[name="diff"]:checked').slice(0,1).parent('li').find('.history-size');
      displayDiffSizeOld = $('[name="oldid"]:checked').slice(0,1).parent('li').find('.history-size');

   // Добавляет ссылку на разницу версий перед размерами
      var displayDiffMobileNew = displayDiffSizeNew.before('<span class="historyDiffLink">(<a href="http://terraria-ru.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>)‎ . . </span>');
      var displayDiffMobileOld = displayDiffSizeOld.before('<span class="historyDiffLink">(<a href="http://terraria-ru.gamepedia.com/index.php?title=' + wgPageName + 
                              '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld + '">разн.</a>) . . </span>');

   // Устанавливает подсказку для ссылки на разницу версий
      $('.historyDiffLink').find('a').attr('title', 'http://terraria.fandom.com/ru/index.php?title=' + wgPageName + '&diff=' + displayDiffNew + '&oldid=' + displayDiffOld);

   });

}