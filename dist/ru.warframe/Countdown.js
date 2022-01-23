/*
 * Таймер обратного отсчета с точностью до секунды, учитывающий настройки
 * перевода на летнее время (DST), если не указано иное. Любой элемент
 * использующий CSS-класс ".customcountdown" будет предназначен для создания
 * таймера обратного отсчета
 * 
 * Простой сценарий: Таймер обратного отсчета со следующими параметрами:
 * loopTime=30с и delayTime=10с
 * заставит сначала отсчитать время "таймера задержки" (delayTime) с 9 до 0 секунд
 * а затем "таймер события" отсчитает с 19 до 0 секунд до общего времени
 * цикла (loopTime) 30 секунд.
 * 
 * @author	User:FINNER (original author) from warframe.fandom.com (en)
 * @author	User:Cephalon Scientia (refactor) from warframe.fandom.com (en)
 * @author	User:Max.Archy (traslator) from warframe.fandom.com (ru)
 * @requires	mediawiki
 * 
 * Reference: https://www.w3schools.com/howto/howto_js_countdown.asp
 */

//далее будут прописаны комментарии для облегчения понимания
/*
 * Массив классов CSS, которые должны присутствовать на странице,
 * чтобы работал таймер обратного отсчета.
 * @constant	COUNTDOWN_CLASSES
 * @type {string[]}
 */
const COUNTDOWN_CLASSES = ["seedDate", "bText", "bDelayText", "timer",
		"aText", "aDelayText", "loopTime", "loopLimit", "endText", 
		"delayTime", "delayDisplay", "dst", "dateFormat", "dateLabels"];
Object.freeze(COUNTDOWN_CLASSES); //защита от случайного изменения

/*
 * Определение единиц измерения для "single" и "full". 
 * @constant	TIME_UNIT_ABBR
 * @constant	TIME_UNIT_ABBR_RUS
 * @constant	TIME_UNIT_ABBR_RUS_FULL
 * @type {Object.<string,.., string>}
 * в отличии от английского языка в русском наименование зависит от числительного
 * @type {Object.<{string,.., string},..,{string,.., string}>}
 */
const TIME_UNIT_ABBR = { //используется в функциях
	Year: "Y",
	Month: "M",
	Day: "D",
	Hour: "h",
	Minute: "m",
	Second: "s"
};
Object.freeze(TIME_UNIT_ABBR); //защита от случайного изменения

//применяется для вывода единиц времени на страницу с "таймером"
//подмассивы для определения корректных окончаний единиц времени функции plural()
const TIME_UNIT_ABBR_RUS_FULL = {
	Year: {one:" год", few:" года", many:" лет"},
	Month: {one:" месяц", few:" месяца", many:" месяцев"},
	Day: {one:" день", few:" дня", many:" дней"},
	Hour: {one:" час", few:" часа", many:" часов"},
	Minute: {one:" минута", few:" минуты", many:" минут"},
	Second: {one:" секунда", few:" секунды", many:" секунд"},
};
Object.freeze(TIME_UNIT_ABBR_RUS_FULL); //защита от случайного изменения

const TIME_UNIT_ABBR_RUS = { 
	Year: {one:" Г", few:" Г", many:" Л"},
	Month: {one:" М", few:" М", many:" М"},
	Day: {one:" Д", few:" Д", many:" Д"},
	Hour: {one:" ч", few:" ч", many:" ч"},
	Minute: {one:" м", few:" м", many:" м"},
	Second: {one:" с", few:" с", many:" с"},
};
Object.freeze(TIME_UNIT_ABBR_RUS); //защита от случайного изменения

/*
 * Определение длительности в миллисекндах.
 * @constant	TIME_IN_MILLISECONDS
 * @type {Object.<string, number>}
 */
const TIME_IN_MILLISECONDS = {
	Y: 31536000000, // без привязки к високосному году (миллисекунд за один день * 365)
	M: 2628000000,  // среднее количество на месяц (миллисекунд в году / 12)
	D: 86400000,
	h: 3600000,
	m: 60000,
	s: 1000,
// используется для loopTime и delayTime с русскими окончаниями
	Г: 31536000000,  
	М: 2628000000,
	Д: 86400000,
	ч: 3600000,
	м: 60000,
	с: 1000,
};
Object.freeze(TIME_IN_MILLISECONDS); //защита от случайного изменения

var countdownTimers;

/*
 * Имя страницы на которой находится Пользователь.
 * @constant	PAGE_NAME
 * @type {string}
 */
const PAGE_NAME = mw.config.get("wgPageName");

// Точка входа "таймера"
if (document.getElementsByClassName("customcountdown").length > 0) {
	countdownInit();
}

/*
 * Определение корректных обозначений наименований аббривиатур,
 * например, "1 год", "2 года", "5 лет".
 * @function	plural
 * @param {string} one	- единицы времени для единиц
 * @param {string} few	- единицы времени для нескольких
 * @param {string} many	- единицы времени для остальных
 */
function plural(n, one, few, many) {
    // @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
    if (n % 10 === 1 && n % 100 !== 11) return one;
    else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
    else return many;
}

/*
 * Инициализация счетчика обратного отсчета.
 * @function	countdownInit
 */
function countdownInit() {
	// Сохраняет innerHTML элементы из CSS-класса
	// каждый элемент содержит объект, определяющий параметры "таймера"
	countdownTimers = getTimersElements();
	console.log("Элементы таймера обратного отсчета определены.");

	updateTimers();
	console.log("Таймер запущен.");

	// Обновление "таймера" каждую секунду.
	// Уменьшать время не рекомендуется, так как приводит к повышенной нагрузке на сервер
	setInterval(function() {
		updateTimers();
	}, 1000);
}

/*
 * Обновление каждого "таймера" на странице.
 * @function	updateTimers
 */
function updateTimers() {
	// проходит по всем "таймерам" класса .customcountdown на странице
	for (var i = 0; i < countdownTimers.length; i++) {
		updateTimer(countdownTimers[i], i);
	}
}

/*
 * Расчет разницы во времени и обновление "таймера" каждую секунду.
 * @function	updateTimer
 * @param {Object.<string, string>} timerParams - список, содержащий параметры "таймера"
 * @param {number} - экземпляр "таймера".
 */
function updateTimer(timerParams, num) {
	var now = new Date();

	// Параметры, сохранённые в innerHTML
	var seedDate = new Date((timerParams.seedDate === "") ? "December 3, 2015 00:00:00 UTC" 
		: timerParams.seedDate);

	if (isNaN(seedDate.getTime())) {
		throw "ОШИБКА: некорректный формат даты параметра seedDate (д.б. \"December 3, 2015 00:00:00 UTC\").";
	}

	// Время между итерациями цикла (т.е. продолжительность цикла)
	var loopTime = convertTimeToMilliseconds(timerParams.loopTime);
	// Максимальное количество итераций цикла; 
	// если loopLimit меньше 0, то предполагается что должно работать бесконечное количество циклов
	var loopLimit = (isNaN(timerParams.loopLimit)) ? 0 : 
		(timerParams.loopLimit < 0) ? Number.MAX_SAFE_INTEGER 
		: Number(timerParams.loopLimit);

	// Разбивает общее время цикла на два периода времени, один из которых является "таймером задержки"
	// (т.е. время до наступления "события"), а другой — временем "таймера события";
	// переключение между ними происходит при достижении нуля (например, если 
	// delayTime == 20 с и loopTime = 60 с, то первые 20 с будут 20-секундным "таймером задержки" с её
	// собственными текстами, а следующие 40 с будут временем "таймера события" и его текстами) 
	var delayTime = convertTimeToMilliseconds(timerParams.delayTime);

	// Отображение "таймера задержки" если "ИСТИНА"
	var delayDisplay = timerParams.delayDisplay === "";

	// параметр delayTime должен быть всегда меньше чем loopTime
	if (delayTime >= loopTime) {
		throw "ОШИБКА: Параметр \"delayTime\" должен быть меньше параметра \"loopTime\".";
	}

	var numLoops = calculateNumLoops(now, seedDate, 0, loopTime, loopLimit);
	var numLoopsDelay = calculateNumLoops(now, seedDate, delayTime, loopTime, loopLimit);

	var endDate = findEndDate(seedDate, 0, numLoops, loopTime);
	var endDateDelay = findEndDate(seedDate, delayTime, numLoopsDelay, loopTime);

	// Для Пользователей с региональными настройками, где есть "летнее время" (DST)
	// между "now" и необходимой "endDate" если не указано иное
	var dstOffset = (timerParams.dst === "") ? 
		(now.getTimezoneOffset() - endDate.getTimezoneOffset()) * 60 * 1000 : 0;
	var dstOffsetDelay = (timerParams.dst === "") ? 
		(now.getTimezoneOffset() - endDateDelay.getTimezoneOffset()) * 60 * 1000 : 0;
	
	// Общее время между "now" и "endDate" в миллисекундах преобразованное в определённый период
	// времени (например, для 120 минут: лет = 0; месяцев = 0; дней = 0; часов = 2; минут = 120; секунд = 7200)
	// time string будет иметь результат "00021207200" для данного примера
	var timeDiff = calculateTimeDiff(now, endDate, dstOffset);  // в миллисекундах, округлённое до ближайшей "тысячи"
	var timeDiffDelay = calculateTimeDiff(now, endDateDelay, dstOffsetDelay);
	// console.log("Время цикла: " + loopTime + 
	//	 " | Период \"таймера\": " + timeDiff + 
	//	 " | Время \"таймера задержки\": " + timeDiffDelay + 
	//	 " | Время \"таймера события\" " + (loopTime - timeDiff)
	// );

	var dateFormat = (timerParams.dateFormat === "") ? "YY MM DD hh mm ss" 
		: timerParams.dateFormat;

	// В зависимости от заданных параметров отображения результат присоединяет к каждому времени
	// определённые единицы (например, для 120 минут & "hh mm ss" & "single":
	// лет = 0Г; месяцев = 0М; дней = 0Д; часов = 02ч; минут = 00м; секунд = 00с)
	// будет иметь результат "0Г 0М 0Д 02ч 00м 00с" для данного примера
	var timeUnits = getDisplayUnits(timerParams.dateLabels);

	// Когда число циклов доходит до заданного параметра "loopLimit", 
	// скрыть тексты "таймера события", "таймера задержки", время "таймера события"
	// и "таймера задержки" и отобразить только текст окончания работы цикла "endText"
	if ((numLoops === loopLimit) && (endDate.getTime() <= now.getTime())) {
		document.getElementById("endText_" + num).setAttribute("style", "display:visible");
		document.getElementById("bText_" + num).setAttribute("style", "display:none");
		document.getElementById("aText_" + num).setAttribute("style", "display:none");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:none");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:none");
		$("#timer_" + num).html("");

	// После окончания работы "таймера задержки" отображать тексты "таймера события", скрыть тексты
	// "таймера задержки", отобразить время "таймера события" в заданных единицах
	} else if (Math.min(timeDiff, timeDiffDelay) === timeDiffDelay) {
		document.getElementById("endText_" + num).setAttribute("style", "display:none");
		document.getElementById("bText_" + num).setAttribute("style", "display:visible");
		document.getElementById("aText_" + num).setAttribute("style", "display:visible");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:none");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:none");
		// Отображение времени "таймера события" на странице 
		$("#timer_" + num).html(formatTimerNumbers(dateFormat, timeDiffDelay, timeUnits));
	
	// В течение "таймера задержки" отображать тексты "таймера задержки", скрыть тексты
	// "таймера события", отобразить время "таймера задержки" в заданных единицах
	} else {
		document.getElementById("endText_" + num).setAttribute("style", "display:none");
		document.getElementById("bText_" + num).setAttribute("style", "display:none");
		document.getElementById("aText_" + num).setAttribute("style", "display:none");
		document.getElementById("bDelayText_" + num).setAttribute("style", "display:visible");
		document.getElementById("aDelayText_" + num).setAttribute("style", "display:visible");
		// Отображение времени "таймера задержки" на странице
		if (delayDisplay) {
			$("#timer_" + num).html(formatTimerNumbers(dateFormat, timeDiff, timeUnits));
		} else {
			$("#timer_" + num).html("");
		}
	}
}

/*
 * Проверка наличия всех необходимых параметров каждого "таймера" на странице.
 * Предполагается что для каждого элемента .customcountdown все необходимые 
 * параметры будут определены
 * @function	getTimersElements
 */
function getTimersElements() {
	var count = document.getElementsByClassName("customcountdown");
	countdownTimers = [];

	for (var i = 0; i < count.length; i++) {
		// Перебираем все таймеры, каждый записывается как отдельный элемент
		countdownTimers[i] = {};
		for (var index in COUNTDOWN_CLASSES) {
			var className = COUNTDOWN_CLASSES[index];
			var element = document.getElementsByClassName(className)[i];
			if (element === null) {
				throw "ОШИБКА: " + className + " CSS class имеет недостающий параметр #" + i + " для корректной работы.";
			}
			// Задаем идентичному параметру каждого "таймера" уникальный идентификатор
			// (например, #seedDate_1)
			element.id = className + "_" + i;
			countdownTimers[i][className] = element.innerHTML;
		}
	}
	return countdownTimers;
}

/*
 * Преобразует введённое время в миллисекунды. Игнорирует знак и дробную часть. 
 * По умолчанию единицы времени в секундах ("с"), а число по умолчанию равно 0.
 * @function	convertTimeToMilliseconds
 * @param {string} time - строка с "числом" и "единицами" измерения времени 
 *						(например, "50с" это 50 секунд) 
 * @returns {number} - число переведённое в миллисекунды
 */
function convertTimeToMilliseconds(time) {
	var number = parseFloat(time);
	var unit = time.match(/[A-Za-zА-Яа-я]+/);
	if (unit === null) {
		unit = "s";
	}
	if (isNaN(number)) {
		number = 0;
	}
	if (TIME_IN_MILLISECONDS[unit] !== undefined) {
		return number * TIME_IN_MILLISECONDS[unit];
	}
	throw "ОШИБКА: Введён некорректный тип единиц времени (" + unit + ") в .loopTime и/или .delayTime CSS class. " + 
			"Требуется один из типов определенных шабоном \"Счетчики\"";
}

/*
 * Рассчитывает количество циклов между введёнными датами.
 * @function	calculateNumLoops
 * @param {Date} now - текущий момент
 * @param {Date} seedDate		- заданная дата начала работы "таймера"
 * @param {number} delayTime	- "время задержки" в миллисекундах
 * @param {number} loopTime		- "время цикла" в миллисекундах
 * @param {number} loopLimit	- предел количества циклов
 * @returns {number} - количество циклов, которое проработал "таймер"
 */
function calculateNumLoops(now, seedDate, delayTime, loopTime, loopLimit) {
	// Math.ceil() is needed to account for the fact that timer can reach 0 
	// during an unfinished loop
	var numLoops = Math.ceil((now.getTime() - seedDate.getTime() + delayTime) / loopTime);
	if (numLoops > loopLimit) {
		return loopLimit;
	}
	return numLoops;
}

/*
 * Определение конечной даты на основе начальной даты, продолжительности цикла и
 * количества циклов, которые заданы для "таймера".
 * @function	findEndDate
 * @param {Date} seedDate		- Заданная дата начала работы "таймера
 * @param {number} delayTime	- "время задержки" в миллисекундах
 * @param {number} loopTime		- "время цикла" в миллисекундах
 * @param {number} numLoops		- количество циклов, которое проработает "таймер"
 * @returns {Date} - конечная дата
 */
function findEndDate(seedDate, delayTime, numLoops, loopTime) {
	return new Date(seedDate.getTime() - delayTime + (numLoops * loopTime));
}

/*
 * Общее время между текущим моментом и конечной датой в миллисекундах,
 * преобразованное в определенный период времени.
 * @function	calculateTimeDiff
 * @param {Date} now			- текущий момент
 * @param {Date} endDate		- дата окончания работы "таймера"
 * @param {number} dstOffset	- "летнее время" в миллисекундах
 * @returns {number} - разница времени в миллисекундах, округленное до тысяч
 */
function calculateTimeDiff(now, endDate, dstOffset) {
	// Помнить, что изредка возможен пропуск секунд
	// особенно если предыдущий подсчет был близок к "нулю" очередной секунды
	// поскольку вызовы функций не являются мгновенными и требуют времени для запуска
	// (например: 7041 миллисекунд => 5999 миллисекунд)
	var timeDiff = (endDate.getTime() - now.getTime()) + dstOffset;
	return timeDiff;
}

/*
 * Определение окончания для каждого разряда "таймера"
 * @function	getDisplayUnits
 * @param {string} dateLabels - параметр, который задаёт форму записи единиц времени
 * @returns {Object.<string,..,string>} - список, содержащий все "таймеры" страницы
 */
function getDisplayUnits(dateLabels) {
	var timeUnits = {};
	var unitAbbr;

	switch(dateLabels) {
		case "full":
			for (var unit in TIME_UNIT_ABBR) { 
				unitAbbr = TIME_UNIT_ABBR[unit];
				timeUnits[unitAbbr] = TIME_UNIT_ABBR_RUS_FULL[unit];
			}
			break;
		case "single":
			for (var unit in TIME_UNIT_ABBR) {
				unitAbbr = TIME_UNIT_ABBR[unit];
				timeUnits[unitAbbr] = TIME_UNIT_ABBR_RUS[unit];
			}
			break;
		default:
			for (var unit in TIME_UNIT_ABBR) {
				unitAbbr = TIME_UNIT_ABBR[unit];
				//так как окончания в русском - подмассив, то задается так
				timeUnits[unitAbbr] = {one:" ", few:" ", many:" "}; 
			}
			break;
	}
	return timeUnits;
}

/*
 * Преобразование "таймера" с присоединением единиц времени
 * @function	formatTimerNumbers
 * @param {string} dateFormat - строка "таймер" в date format; каждый блок цифр
 * разделён единицами времени (например "YY-MM-DD hh:mm:ss")
 * @param {number} timeDiff - разница в миллисекундах
 * @param {Object.<{string,.., string},..,{string,.., string}>} timeUnits - список
 *						содержащий все единицы времени
 * @returns {string} - отформатированный текст
 */
function formatTimerNumbers(dateFormat, timeDiff, timeUnits) {
	var timerText = dateFormat;
	var formatArr = dateFormat.split(/[^A-Za-z]/);  // то есть ["YYYY", "MM", "DD"]
	for (var index in formatArr) {
		var elem = formatArr[index];
		var unitAbbr = elem.charAt(0);
		// подсчитывает блок цифр очередного разряда
		var timeInMilliseconds = TIME_IN_MILLISECONDS[unitAbbr];
		var numTimeUnits = Math.floor(timeDiff / timeInMilliseconds);
		timeDiff -= numTimeUnits * timeInMilliseconds;
		// запись в "строку" для вывода на экран
		var text = numTimeUnits + "";
		text = text.padStart(elem.length, "0");  // отбрасывание "0" в начале "строки"
		 // добавление корректный единиц времени (например "1 год" или "5 лет")
		text += plural(numTimeUnits, timeUnits[elem.charAt(0)].one, timeUnits[elem.charAt(0)].few, timeUnits[elem.charAt(0)].many);
		var regex = new RegExp(elem);
		timerText = timerText.replace(regex, text);
	}
	return timerText;
}