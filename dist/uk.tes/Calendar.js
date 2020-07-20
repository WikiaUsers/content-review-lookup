// ################################################ //
// ### Календар Тамріеля The Elder Scrolls Wiki ### //
// ### Version 1.5                              ### //
// ################################################ //
//@ By: Сибирский Смотритель
//@ Ukrainian translation: Skyflurry
//@ Polish translation: Skyflurry
//@ Belarusian translation: Mix Gerder
(function( $ ) {
    if (!$('#WikiaRail').length) { return; }
  var i18n = {
    uk: {
      inEmpire: "Сьогодні в Імперії:",
      week: [
        "Сандас", 
        "Морндас", 
        "Тірдас", 
        "Міддас", 
        "Турдас", 
        "Фредас", 
        "Лордас"
      ],
      month: [
        "Ранкової зорі", 
        "Сходу сонця", 
        "Першого зерна", 
        "Руки дощу", 
        "Другого зерна", 
        "Середини року", 
        "Високого сонця", 
        "Останнього зерна", 
        "Домашнього вогнища", 
        "Початку морозів", 
        "Заходу сонця", 
        "Вечірньої зорі"
      ],
      decorateDate: function(date) {return date}
    },
    pl: {
      inEmpire: "Dziś w Imperium:",
      week: [
        "Sundas", 
        "Morndas", 
        "Tirdas", 
        "Middas", 
        "Turdas", 
        "Fridas", 
        "Loredas"
      ],
      month: [
        "Gwiazda Poranna", 
        "Wschodzące Słońce", 
        "Pierwszy Siew", 
        "Deszczowa Dłoń", 
        "Drugi Siew", 
        "Śródrocze", 
        "Pełnia Słońca", 
        "Ostatni Siew", 
        "Domowe Ognisko", 
        "Pierwsze Mrozy", 
        "Zachodzące Słońce", 
        "Gwiazda Wieczorna"
      ],
      decorateDate: function(date) {return date}
    },
    be: {
      inEmpire: "Сёння ў Імперыі:",
      week: [
        "Сандас",
        "Марндас",
        "Цірдас",
        "Міддас",
        "Турдас",
        "Фрэдас",
        "Лордас"
      ],
      month: [
        "Ранішняй зоркі",
        "Ўзыходу сонца",
        "Першага збожжа",
        "Рукі дажджу",
        "Другога збожжа",
        "Сярэдзіны года",
        "Высокага сонца",
        "Апошняга збожжа",
        "Агню ачага",
        "Пачатку марозаў",
        "Заходу сонца",
        "Вячэрняй зоркі"
      ],
      decorateDate: function(date) {return date}
    },
    ru: {
      inEmpire: "Сегодня в Империи:",
      week: [
        "Сандас", 
        "Морндас", 
        "Тирдас", 
        "Миддас", 
        "Турдас", 
        "Фредас", 
        "Лордас"
      ],
      month: [
        "Утренней звезды", 
        "Восхода солнца", 
        "Первого зерна", 
        "Руки дождя", 
        "Второго зерна", 
        "Середины года", 
        "Высокого солнца", 
        "Последнего зерна", 
        "Огня очага", 
        "Начала морозов", 
        "Заката солнца", 
        "Вечерней звезды"
      ],
      // Ця функція, в принципі, неважлива для української й російської мови.
      // Відсутність викличе помилку, оскільки ця функція для оформлення інших мов.
      decorateDate: function(date) {return date}
    },
    en: {
      inEmpire: "Today in Empire:",
      week: [
        "Sundas", 
        "Morndas", 
        "Tirdas", 
        "Middas", 
        "Turdas", 
        "Fredas", 
        "Loredas"
      ],
      month: [
        "Morning Star", 
        "Sun's Dawn", 
        "First Seed", 
        "Rain’s Hand", 
        "Second Seed", 
        "Mid Year", 
        "Sun’s Height", 
        "Last Seed", 
        "Hearthfire", 
        "Frostfall", 
        "Sun’s Dusk", 
        "Evening Star"
      ],
      decorateDate: function(date) {
        var returnThis = 'The ' + date;
        if (date == 1 || date == 21 || date == 31)
          returnThis += 'st';
        else if (date == 2 || date == 22)
          returnThis += 'nd';
        else if (date == 3 || date == 23)
          returnThis += 'rd';
        else
          returnThis += 'th';
 
        returnThis += ' of';
        return returnThis;
      }
    }
  };
  var calendar = (mw.config.get("wgUserLanguage") in i18n) ? i18n[mw.config.get("wgUserLanguage")] : i18n.en;
 
  var date = new Date();
  $('<section class="module CalendarModule">' + 
    '<h2>' + calendar.inEmpire + '</h2>' +
    '<p>' + calendar.decorateDate(date.getDate()) + ' ' + calendar.month[date.getMonth()] + '<br/>' + calendar.week[date.getDay()] + '</p>' +
  '</section>').insertAfter(".ChatModule");
  clearInterval(waitChatModule);
}, 1000);
// ################################################ //
// ################################################ //
// ################################################ //