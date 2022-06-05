// Використовується видимий текст (розміщений тут для перекладу)
var text = {
	intervalAbbreviations: ['дн', 'год', 'хв'],
	remaining: 'ЗАЛИШАЄТЬСЯ',
	nextEvent: {
		drt: 'Наступна подія: ТРОПІЧНИЙ ДОК. Т',
		volcano: 'Наступна подія: ВУЛКАН ДОК. Т',
		gearheart: 'Наступна подія: ФАБРИКА ВІЙНИ',
		hammerman: 'Наступна подія: ФЛОТ ХАММЕРМАНА',
		imitation: 'Наступна подія: ІМІТАЦІЙНА ГРА'
	},
	activeEvent: {
		drt: 'ТРОПІЧНИЙ ДОК. Т АКТИВНИЙ',
		volcano: 'ВУЛКАН ДОК. Т АКТИВНИЙ',
		gearheart: 'ФАБРИКА ВІЙНИ АКТИВНА',
		hammerman: 'ФЛОТ ХАММЕРМАНА АКТИВНА',
		imitation: 'ІМІТАЦІЙНА ГРА АКТИВНА'
	},
	intel: {
		nextResetIn: 'СКИДАННЯ ІНТЕЛУ ЧЕРЕЗ'
	},
	switchButton: {
		toIntel: 'Звортній відлік скидання інтелу',
		toEvent: 'Звортній відлік подій'
	}
};

// Використані зображення
var img = {
	drt: 'https://vignette.wikia.nocookie.net/boombeach/images/0/03/Terrorc.png/revision/latest?cb=20150506231414',
	hammerman: 'https://vignette.wikia.nocookie.net/boombeach/images/c/c3/Hammerman.png/revision/latest?cb=20150213181715',
	gearheart: 'https://vignette.wikia.nocookie.net/boombeach/images/1/14/Colonel_Gearheart.png/revision/latest?cb=20150506115021',
	intel: 'https://vignette.wikia.nocookie.net/boombeach/images/0/05/Intel_75px.png/revision/latest?cb=20151230203622'
};


/* Створити віджет подій */
function createCountdownWidget() {
  var utcCutOffHour = 8;

  function timeDiff(time1, time2) {
    // Час йде в мілісекундах, але ми просто хочемо різниці в днях, годинах,
    // та хвилнах.
    // І байдуже, який з них вище
    var diff = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
    var divisors = [24 * 60, 60, 1];
    var abbrevs = text.intervalAbbreviations.slice();

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

    
    // Визначте час закінчення сьогоднішньої події
    var todayCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcCutOffHour, 0, 0, 0));
    var tomorrowCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, utcCutOffHour, 0, 0, 0));
    var eventCycleEnd = todayCutOff.getTime() < now.getTime() ? tomorrowCutOff : todayCutOff;


    // Визначення наступної та поточної події
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

	if (nextEvent in text.nextEvent) {
		divTextBottom.innerHTML = text.nextEvent[nextEvent];
	}
	
    var remaining = timeDiff(now, eventCycleEnd);

    if (remaining) {
      divTextMiddle.innerHTML = remaining + ' ' + text.remaining;
    }
  }

  function createEventsWidget() {
    var widget = document.getElementById("intel-box-back");
    if (widget !== null) {
      widget.parentNode.removeChild(widget);
    }
    widget = document.createElement("div");
    widget.id = 'events-box-back';
    // Передня частина коробки
    var widgetFront = document.createElement('div');
    widgetFront.id = 'events-box-front';
    // Зображення - використовуйте div, щоб допомогти
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    imgImage.id = 'events-image';
    // Розміри зображення за замовчуванням
    imgImage.width="90px";
    imgImage.height="50px";

    // Поточна подія
    var divTextTop = document.createElement('div');
    divTextTop.id = 'events-text-top';
    // Залишився час
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'events-text-middle';
    // Наступна подія
    var divTextBottom = document.createElement('div');
    divTextBottom.id = 'events-text-bottom';
    // Змінити зворотний відлік
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = text.switchButton.toIntel;

    // Обчисліть, яку інформацію про подію відображати
    var eventDay = new Date();
    eventDay.setUTCHours(eventDay.getUTCHours() - utcCutOffHour);
    eventDay.setUTCSeconds(0);
    eventDay.setUTCMilliseconds(0);
    // Цикл подій починається з понеділка зараз; getUTCDay() повертає день тижня
    // з неділі (як 0)
    var eventCycleType = eventDay.getUTCDay() - 1;
    if (eventCycleType < 0) {
        eventCycleType = 6;
    }

    // Визначте зображення для використання
    if (eventCycleType === 3) {
      imgImage.src = img.gearheart;
    }
    else if (eventCycleType === 0 || eventCycleType == 4) {
      imgImage.src = img.hammerman;
    }
    else {
      imgImage.src = img.drt;
    }
    if (eventCycleType === 3) {
      // Встановити імена класів
      widget.className = 'events-gearheart';
      widgetFront.className = 'events-gearheart';
      divImage.className = 'events-gearheart';
      imgImage.className = 'events-gearheart';
      // Назва події
      divTextTop.innerHTML = text.activeEvent.gearheart;
    } else if (eventCycleType === 0 || eventCycleType === 4) {
      // Встановити імена класів
      widget.className = 'events-hammerman';
      widgetFront.className = 'events-hammerman';
      divImage.className = 'events-hammerman';
      imgImage.className = 'events-hammerman';
      if (eventCycleType === 0) {
        // Назщва події
        divTextTop.innerHTML = text.activeEvent.hammerman;
      } else {
        // Назщва події
        divTextTop.innerHTML = text.activeEvent.imitation;
      }
    } else {
      // Встановити імена класів
      widget.className = 'events-terror';
      widgetFront.className = 'events-terror';
      divImage.className = 'events-terror';
      imgImage.className = 'events-terror';
      // Назщва події
      if (eventCycleType === 1 || eventCycleType === 5) {
        divTextTop.innerHTML = text.activeEvent.drt;
      } else {
        divTextTop.innerHTML = text.activeEvent.volcano;
      }
    }

    // Зареєструйте подію onclick
    divChangeBox.addEventListener("click", createCountdownWidget);

    // Додайте дітей
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divTextBottom);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);

    // Обчисліть, який віджет ми повинні показати
    var now = new Date();
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);
    updateEventsWidget(widget, now, eventCycleType);
    // Поверніть створений віджет
    return widget;
  }

  // Відлік інтелу
  function createIntelWidget() {
    var widget = document.getElementById('events-box-back');
    if (widget !== null) {
      widget.parentNode.removeChild( widget );
    }
    widget = document.createElement('div');
    widget.id = 'intel-box-back';
    // Передня частина коробки
    var widgetFront = document.createElement('div');
    widgetFront.id = 'intel-box-front';
    // Зображення - використовуйте div, щоб допомогти
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    imgImage.id = 'intel-image';
    // Розміри зображення за замовчуванням
    imgImage.width="75px";
    imgImage.height="75px";
    // URL-адреса зображення
    imgImage.src = img.intel;

    // Поточна подія
    var divTextTop = document.createElement('div');
    divTextTop.id = 'intel-text-top';
    divTextTop.innerHTML = text.intel.nextResetIn;
    // Час залишився
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'intel-text-remaining';
    // Обчисліть час, що залишився
    var now = new Date();
    var resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                         now.getUTCDate(), 0, 0, 0, 0));
    // Він скидається опівночі в неділю
    resetTime.setUTCDate( resetTime.getUTCDate() + (7 - resetTime.getUTCDay()) );
    divTextMiddle.innerHTML = timeDiff( now, resetTime );

    // Змінити зворотній відлік
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = text.switchButton.toEvent;

    // Зареєструйте подію onclick
    divChangeBox.addEventListener("click", createCountdownWidget);

    // Додайте дітей
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);

    // Поверніть створений віджет
    return widget;
  }

  // Визначає поточний віджет
  function getCurrentWidget() {
    if (document.getElementById('events-box-back') !== null) {
      return 'events';
    }
    else {
      return 'intel';
    }
  }

  var widget = null;
   // Відобразити віджет навпроти поточного.
   // Через те, як налаштовано getCurrentWidget, віджет подій завжди
   // перший, який буде показаний.
  if (getCurrentWidget() === 'events') {
    // Створити віджет
    widget = createIntelWidget();
  }
  else {
    widget = createEventsWidget();
  }

  // Додайте віджет після оголошення на головній сторінці, якщо він існує
  var divParent = null;
  var divBefore = null;
  var divAd = document.getElementById('HOME_TOP_RIGHT_BOXAD');

  if (divAd !== null) {
    divParent = divAd.parentNode;
    divBefore = divAd.nextSibling;
  }
  if (divParent === null) {
    // Якщо ні, додайте його після вікна пошуку, якщо він знаходиться на правій рейці
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
      // Якщо ми не знайшли вікно пошуку в правій рейці, ми принаймні знайшли
      // праву рейку, додайте її вгору
      divParent = divRail;
      divBefore = divRail.firstChild;
    }
  }

  if (divParent === null) {
    return;
  }

  // Тепер знайдіть відповідне місце на рейці, щоб додати віджет
  return divParent.insertBefore(widget, divBefore);
}

window.onload = createCountdownWidget();