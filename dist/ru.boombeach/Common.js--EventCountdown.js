function timeStamp_DrTerror_js() {
  /* Обновлённый виджет внутриигровых ежедневных событий */
  return '2016.11.03 19:38 (UTC-5)';
}

/* Тело виджета */
function createCountdownWidget() {

  function timeDiff(time1, time2) {
    // Время считается в миллисекундах, но приводится к норме
    var diff = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
    var divisors = [24 * 60, 60, 1];
    var abbrevs = ['Д', 'Ч', 'М'];

    for (i = 0; i < divisors.length; i++) {
      var remainder = diff - Math.floor( diff / divisors[i]) * divisors[i];
      if (diff > remainder || i === divisors.length - 1) {
        abbrevs[i] = ((diff - remainder) / divisors[i]) + abbrevs[i];
      }
      else {
        abbrevs[i] = '';
      }
      diff = remainder;
    }

    while (abbrevs.length > 1 && !abbrevs[0]) {
      abbrevs.shift();
    }
    return abbrevs.join(' ');
  }

  function updateEventsWidget(w, now, eventCycleType) {
    if (!w) {
      w = $('#dr-terror-activity').get(0);
    }
    if (!w) {
      return;
    }
    var divTextMiddle = $(w).find('div#events-text-middle').get(0);
    var divTextBottom = $(w).find('div#events-text-bottom').get(0);

    var utcCutOffHour = 8;
    var todayCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcCutOffHour, 0, 0, 0));
    var tomorrowCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, utcCutOffHour, 0, 0, 0));
    var eventCycleEnd = todayCutOff.getTime() < now.getTime() ? tomorrowCutOff : todayCutOff;

    // Определение текущего и следующего события
    var nextEvent = '';
    var event = '';
    
    if (eventCycleType === 0) {
      event = 'hammerman';
      nextEvent = 'drt';
    }
    else if (eventCycleType === 1) {
      event = 'drt';
      nextEvent = 'volcano';
    }
    else if (eventCycleType === 2) {
      event = 'volcano';
      nextEvent = 'gearheart';
    }
    else if (eventCycleType === 3) {
      event = 'gearheart';
      nextEvent = 'imitation';
    }
    else if (eventCycleType === 4) {
      event = 'imitation';
      nextEvent = 'drt';
    }
    else if (eventCycleType === 5) {
      event = 'drt';
      nextEvent = 'volcano';
    }
    else if (eventCycleType === 6) {
      event = 'volcano';
      nextEvent = 'hammerman';
    }
    /*
    // Старый цикл
    if (eventCycleType === 1) {
      event = 'volcano';
      nextEvent = 'gearheart';
    }
    else if (eventCycleType === 4) {
      event = 'volcano';
      nextEvent = 'hammerman';
    }
    else if (eventCycleType === 2) {
      event = 'gearheart';
      nextEvent = 'terror';
    }
    else if (eventCycleType === 5) {
      event = 'hammerman';
      nextEvent = 'terror';
    }
    else {
      event = 'terror';
      nextEvent = 'volcano';
    }
    */
    var remaining = timeDiff(now, eventCycleEnd);
    var tilNextEvent = '';
    
    if (nextEvent === 'gearheart') {
    divTextBottom.innerHTML = 'Следующее событие: Военная фабрика';
    }
    else if (nextEvent === 'hammerman') {
    divTextBottom.innerHTML = 'Следующее событие: Флот лейтенанта Хаммермана';
    }
    else if (nextEvent === 'drt') {
    divTextBottom.innerHTML = 'Следующее событие: Тропический остров доктора Ти';
    }
    else if (nextEvent === 'volcano') {
    divTextBottom.innerHTML = 'Следующее событие: Вулканический остров доктора Ти';
    }
    else if (nextEvent === 'imitation') {
    divTextBottom.innerHTML = 'Следующее событие: Имитация лейтенанта Хаммермана';
    }

    if (remaining) {
      divTextMiddle.innerHTML = 'ОСТАЛОСЬ ' + remaining;
    }
  }

  function createEventsWidget() {
    var widget = document.getElementById("intel-box-back");
    if (widget !== null) {
      widget.parentNode.removeChild(widget);
    }
    widget = document.createElement("div");
    widget.id = 'events-box-back';
    // Фронтальный блок
    var widgetFront = document.createElement('div');
    widgetFront.id = 'events-box-front';
    // Картинка в блоке
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    // Вторичная картинка
    imgImage.id = 'events-image';
    // Размеры
    imgImage.width="90px";
    imgImage.height="50px";

    // Активное событие
    var divTextTop = document.createElement('div');
    divTextTop.id = 'events-text-top';
    // Таймер
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'events-text-middle';
    // Следующее событие
    var divTextBottom = document.createElement('div');
    divTextBottom.id = 'events-text-bottom';
    // Смена таймера
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = 'Сменить на таймер интела';

    // Вычисление выводимой информации для смены события
    var now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    // Старт события с понедельника
    var eventCycleType = now.getUTCDay() - 1;
    if (eventCycleType < 0) {
        eventCycleType = 6;
    }
    /*
    // Старый код
    */

    // Определяет, какое изображение использовать
    if (eventCycleType === 3) {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/1/14/Colonel_Gearheart.png/revision/latest?cb=20150506115021";
    }
    else if (eventCycleType === 0 || eventCycleType == 4) {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/c/c3/Hammerman.png/revision/latest?cb=20150213181715";
    }
    else {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/0/03/Terrorc.png/revision/latest?cb=20150506231414";
    }
    if (eventCycleType === 3) {
      // Установка классовых имён
      widget.className = 'events-gearheart';
      widgetFront.className = 'events-gearheart';
      divImage.className = 'events-gearheart';
      imgImage.className = 'events-gearheart';
      // Название события
      divTextTop.innerHTML = 'ВОЕННАЯ ФАБРИКА ГИРХАРТ';
    } else if (eventCycleType === 0 || eventCycleType === 4) {
      // Установка классовых имён
      widget.className = 'events-hammerman';
      widgetFront.className = 'events-hammerman';
      divImage.className = 'events-hammerman';
      imgImage.className = 'events-hammerman';
      if (eventCycleType === 0) {
        // Название события
        divTextTop.innerHTML = 'ФЛОТ ЛЕЙТЕНАНТА ХАММЕРМАНА';
      } else {
        // Название события
        divTextTop.innerHTML = 'ИМИТАЦИЯ ЛЕЙТЕНАНТА ХАММЕРМАНА';
      }
    } else {
      // Установка классовых имён
      widget.className = 'events-terror';
      widgetFront.className = 'events-terror';
      divImage.className = 'events-terror';
      imgImage.className = 'events-terror';
      // Название события
      if (eventCycleType === 1 || eventCycleType === 5) {
        divTextTop.innerHTML = 'ТРОПИЧЕСКИЙ ОСТРОВ ДОКТОРА ТИ';
      } else {
        divTextTop.innerHTML = 'ВУЛКАНИЧЕСКИЙ ОСТРОВ ДОКТОРА ТИ';
      }
    }

    // Проявляет счётчик
    divChangeBox.addEventListener("click", createCountdownWidget);

    // Дочерние элементы
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divTextBottom);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);

    // Вычисление показываемой информации
    updateEventsWidget(widget, now, eventCycleType);
    // Построение виджета
    return widget;
  }

  // Таймер для интела
  function createIntelWidget() {
    var widget = document.getElementById('events-box-back');
    if (widget !== null) {
      widget.parentNode.removeChild( widget );
    }
    widget = document.createElement('div');
    widget.id = 'intel-box-back';
    // Фронтальный блок
    var widgetFront = document.createElement('div');
    widgetFront.id = 'intel-box-front';
    // Изображение в блоке
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    // Вторичное изображение
    imgImage.id = 'intel-image';
    // Размеры
    imgImage.width="75px";
    imgImage.height="75px";
    // Ссылка на картинку
    imgImage.src = 'https://vignette.wikia.nocookie.net/boombeach/images/0/05/Intel_75px.png/revision/latest?cb=20151230203622';

    // Текущий отсчёт
    var divTextTop = document.createElement('div');
    divTextTop.id = 'intel-text-top';
    divTextTop.innerHTML = 'СЛЕДУЮЩИЙ СБРОС ИНТЕЛА ЧЕРЕЗ';
    // Оставшееся время
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'intel-text-remaining';
    // Вычисление времени
    var now = new Date();
    var resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                         now.getUTCDate(), 0, 0, 0, 0));
    // Сброс в воскресенье
    resetTime.setDate( resetTime.getUTCDate() + (7 - resetTime.getUTCDay()) );
    divTextMiddle.innerHTML = timeDiff( now, resetTime );

    // Смена таймера
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = 'Сменить на таймер событий';

    // Проявление виджета
    divChangeBox.addEventListener("click", createCountdownWidget);

    // Дочерние элементы
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);

    // Построение виджета
    return widget;
  }

  // Определение текущего виджета
  function getCurrentWidget() {
    if (document.getElementById('events-box-back') !== null) {
      return 'events';
    }
    else {
      return 'intel';
    }
  }

  var widget = null;
  // Оба события будут показаны одновременно
  if (getCurrentWidget() === 'events') {
    // Создание виджета
    widget = createIntelWidget();
  }
  else {
    widget = createEventsWidget();
  }

  // Постановка виджета после построения страницы
  var divParent = null;
  var divBefore = null;
  var divAd = document.getElementById('HOME_TOP_RIGHT_BOXAD');

  if (divAd !== null) {
    divParent = divAd.parentNode;
    divBefore = divAd.nextSibling;
  }
  if (divParent === null) {
    // Постановка сразу после строки поиска в разрешённую рельсу
    var divRail = document.getElementById('WikiaRail');
    var divAfter = null;

    if (divRail !== null) {
      divAfter = divRail.getElementsByClassName('WikiaSearch')[0];
    }

    if (typeof divAfter !== 'undefined' && divAfter !== null) {
      divParent = divAfter.parentNode;
      divBefore = divAfter.nextSibling;
    }
    else if (divRail !== null) {
      // Постановка в любую разрешённую рельсу, если нет строки поиска
      divParent = divRail;
      divBefore = divRail.firstChild;
    }
  }

  if (divParent === null) {
    return;
  }

  // Находит подходящее место на рельсе
  return divParent.insertBefore(widget, divBefore);
}

/* Не работает где-то ещё, кроме Fandom'а */
addOnloadHook(createCountdownWidget);

//window.onload = createCountdownWidget();