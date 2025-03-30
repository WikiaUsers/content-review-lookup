$(function () {
mw.hook('wikiEditor.toolbarReady').add(function () {

	/******* DATA *******/
	var data = window.infoboxesInsert || {
		"templates": [
			"Аномалия",
			"Артефакт",
			"Группировка",
			"Игра",
			"Квест",
			"Костюм",
			"Локация",
			"Мод",
			"Мутант",
			"Объект на локации",
			"Оружие",
			"Персонаж",
			"Предмет",
			"Транспорт"
		],
		"codes": {
			"Аномалия": "{{Аномалия\n|Название           = \n|Изображение        = \n|Подпись            = \n|Моды               = \n|Воздействие        = \n|Поражающий фактор  = \n|Места появления    = \n|Артефакты          = \n}}\n",
			"Артефакт": "{{Артефакт\n|Название      = \n|Изображение   = \n|Подпись       = \n|Иконка        = \n|Моды          = \n|Аномалия      = \n|Особенности   = \n|Тип           = \n}}\n",
			"Группировка": "{{Группировка\n|Название                = \n|Изображение             = \n|Подпись                 = \n|Эмблема                 = \n|Моды                    = \n|Основатели              = \n|Цели                    = \n|Тип                     = \n|Союзники                = \n|Враги                   = \n|Оружие                  = \n|Экипировка              = \n|Лидеры                  = \n|Известные представители = \n|Торговцы                = \n|Механики                = \n|Контролируемые позиции  = \n|Основная база           = \n|Девиз                   = \n}}\n",
			"Игра": "{{Игра\n|Изображение = \n|Разработчик = \n|Жанр = \n|Платформа = \n|Год выпуска = \n|Место действия = \n|Протагонист = \n|Антагонисты = \n|Локации = \n|Группировки = \n|Предыдущая игра серии = \n|Следующая игра серии = \n}}\n",
			"Квест": "{{Квест\n|Название           = \n|Изображение        = \n|Подпись            = \n|Мод                = \n|Тип                = \n|Квестодатель       = \n|Место действия     = \n|Сложность          = \n|Срок на выполнение = \n|Этапы выполнения   = \n|Условия выполнения = \n|Условия отмены     = \n|Условия провала    = \n|Награда            = \n}}\n",
			"Костюм": "{{Костюм\n|Название    = \n|Изображение = \n|Подпись     = \n|Иконка      = \n|Моды        = \n|Группировки = \n}}\n",
			"Локация": "{{Локация\n|Название          = \n|Изображение       = \n|Подпись           = \n|Моды              = \n|Соседние локации  = \n|Тип               = \n|Размер            = \n|Группировки       = \n|Мутанты           = \n|Аномалии          = \n|Персонажи         = \n|Объекты           = \n|Карта             = \n}}\n",
			"Мод": "{{Мод\n|Название                   = \n|Изображение                = \n|Подпись                    = \n|Логотип                    = \n|Игра серии                 = \n|Разработчик                = \n|Дата выхода                = \n|Платформа                  = \n|Тип мода                   = \n|Последняя версия           = \n|Дата последнего обновления = \n|Официальная страница       = \n}}\n",
			"Мутант": "{{Мутант\n|Название       = \n|Изображение    = \n|Подпись        = \n|Моды           = \n|Происхождение  = \n|Поведение      = \n|Живучесть      = неизвестно\n|Урон           = неизвестно\n|Скорость       = неизвестно\n|Подвиды        = \n|Внешность      = \n|Места обитания = \n|Особенности    =  \n}}\n",
			"Объект на локации": "{{Объект на локации\n|Название         = \n|Изображение      = \n|Подпись          = \n|Моды             = \n|Локация          = \n|Соседние объекты = \n|Персонажи        = \n|Группировки      = \n|Мутанты          = \n|Аномалии         = \n}}\n",
			"Оружие": "{{Оружие\n|Название    = \n|Изображение = \n|Подпись     = \n|Иконка      = \n|Моды        = \n|Класс       = \n|Группировки = \n}}\n",
			"Персонаж": "{{Персонаж\n|Название    = \n|Изображение = \n|Подпись     = \n|Моды        = \n|Имя         = \n|Фамилия     = \n|Прозвище    = \n|Ранг        = \n|Репутация   = \n|Звание      = \n|Группировка = \n|Занятие      = \n|Статус      = \n|Смерть       = \n|Место смерти = \n|Оружие      = \n|Снаряжение  = \n}}\n",
			"Предмет": "{{Предмет\n|Название      = \n|Изображение   = \n|Подпись       = \n|Иконка        = \n|Моды          = \n|Класс         = \n|Эффект        = \n}}\n",
			"Транспорт": "{{Транспорт\n|Название       = \n|Изображение    = \n|Подпись        = \n|Моды           = \n|Название       = \n|Производитель  = \n|Сборка         = \n|Группировки    = \n|Класс          = \n}}\n"
		}
	}
	
	/******* VARIABLES *******/
	var $tabs = $('.wikiEditor-ui-top .tabs')
	var $sections = $('.wikiEditor-ui-top .sections')
	var $textbox = $('#wpTextbox1');

	//var data = require('./infoboxesInsert.json'); 

	/******* MAIN *******/
	var $sect = $('<div/>', {
		id: 'wikiEditor-section-infoboxes',
		class: 'toolbar section section-infoboxes section-hidden',
		rel: 'infoboxes',
		'aria-expanded': false
	}).appendTo($sections)

	for (var k in data.templates) {
		var name = data.templates[k];
		$('<span/>', {
			class: 'tool oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-frameless oo-ui-iconElement oo-ui-buttonWidget'
		}).wrapInner(
			$('<a/>', {
				class: 'oo-ui-buttonElement-button',
				'data-template': name,
				text: name,
				click: function () {
					$textbox.textSelection('encapsulateSelection', {
						pre: data.codes[$(this).attr('data-template')]
					})
				}
			})
		).appendTo($sect)
	}

	$('<span/>', {
		class: 'tab tab-infoboxes',
		rel: 'infoboxes'
	}).wrapInner(
		$('<a/>', {
			tabindex: 0,
			role: 'button',
			'aria-expanded': 'false',
			'aria-controls': 'wikiEditor-section-infoboxes',
			text: 'Инфобоксы' ,
			click: function () {
				var $this = $(this)
							
				if ($this.attr('aria-expanded') == 'false') {
					$this.addClass('current')
					$this.attr('aria-expanded', true)
					$sect.attr('aria-expanded', true)
					$sect.removeClass('section-hidden')
					$sect.addClass('section-visible')
				} else if ($this.attr('aria-expanded') == 'true') {
					$this.removeClass('current')
					$this.attr('aria-expanded', false)
					$sect.attr('aria-expanded', false)
					$sect.removeClass('section-visible')
					$sect.addClass('section-hidden')
				}
			}
		})
	).appendTo($tabs)

});
});