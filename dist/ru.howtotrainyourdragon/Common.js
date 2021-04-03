/** Автообновление страниц и очистка кэша **/
 
importScriptPage( 'AjaxRC/code.js', 'dev' ); // AJAX-обновление некоторых страниц
var ajaxPages = ["Служебная:Watchlist","Служебная:Contributions","Служебная:WikiActivity","Служебная:RecentChanges"]; // AJAX-обновление некоторых страниц(выбор страниц)
var AjaxRCRefreshText = 'автообновление страницы'; //Отображаемое название
 
importScriptPage( 'PurgeButton/code.js', 'dev' ); // Кнопка очистки кэша страницы
var PurgeButtonText = 'Обновить'; //Отображаемое название

if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/d/d4/%D0%9F%D0%B5%D1%80%D0%B5%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0.png/revision/latest?cb=20190707201037&path-prefix=ru",
		"speedTip": "Перенаправление",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/1/13/Button_enter.png",
		"speedTip": "На другую строку",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/7/74/Button_comment.png",
		"speedTip": "Невидимые чернила",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Введите свой комментарий"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/5/5f/%D0%91%D0%B8%D0%B3.png/revision/latest?cb=20190708073828&path-prefix=ru",
		"speedTip": "Увеличить",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/4/4b/%D0%A1%D0%BC%D0%B0%D0%BB%D0%BB.png/revision/latest?cb=20190708075948&path-prefix=ru",
		"speedTip": "Уменьшить",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/8/8b/%D0%92%D0%B5%D1%80%D1%85%D0%98.png/revision/latest?cb=20190708083909&path-prefix=ru",
		"speedTip": "Верхний индекс",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/e/e4/%D0%9D%D0%B8%D0%B7%D0%98.png/revision/latest?cb=20190708083920&path-prefix=ru",
		"speedTip": "Нижний индекс",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/c/c4/Gjlx.png/revision/latest?cb=20190708084929&path-prefix=ru",
		"speedTip": "Подчеркнуть",
		"tagOpen": "<u>",
		"tagClose": "</u>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://images.wikia.com/central/images/c/c9/Button_strike.png",
		"speedTip": "Зачеркнуть",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/9/9e/%D0%A4%D0%BB%D0%BE%D0%BC.png/revision/latest?cb=20190708081032&path-prefix=ru",
		"speedTip": "Раскрасить",
		"tagOpen": "<font color=#FFFF00>",
		"tagClose": "</font>",
		"sampleText": "Введите текст"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/a/ab/Cgbcjr.png/revision/latest?cb=20190708102800&path-prefix=ru",
		"speedTip": "Вставить список",
		"tagOpen": "*",
		"sampleText": "Введите текст"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/2/23/%D0%93%D0%B0%D0%BB%D0%B5%D1%80%D0%B5%D1%8F.png/revision/latest?cb=20190708114525&path-prefix=ru",
		"speedTip": "Вставить галерею",
		"tagOpen": "<gallery>",
		"tagClose": "</gallery>",
		"sampleText": "Вставьте изображение"
	};
	
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/httyd/images/3/3c/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F.png/revision/latest?cb=20190708125554&path-prefix=ru",
		"speedTip": "Добавить категорию",
		"tagOpen": "[[Категория:",
		"tagClose": "]]",
		"sampleText": "Введите имя категории"
	};

     mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://vignette.wikia.nocookie.net/central/images/a/a4/TableStart.png/revision/latest?cb=20070927085428",
    "speedTip": "Создать таблицу",
    "tagOpen": "{|",
    "tagClose": "|}",
    "sampleText": "Начало новой таблицы"
};
}

window.ArticleRating = {
    title: 'Оцените эту статью!',
    values: ['Ужасная', 'Плохая', 'Сойдёт', 'Неплохая', 'Хорошая'],
    starSize: [24, 24],
    starColor: ['#ccc', '#c70000'],
    starStroke: '#000'