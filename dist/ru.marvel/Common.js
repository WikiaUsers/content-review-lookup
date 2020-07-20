//------------------------------------//
/* На вики также подключено "Extension:DynamicPageList" MediaWiki */
//------------------------------------//
/* Подключение страниц */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:InactiveUsers.js',         // Неактивный участник спустя 1 мес
        
        'u:dev:MediaWiki:PreloadFileDescription.js', // Описание изображений (параметры в Wikia.js)
        'u:dev:MediaWiki:DiscordIntegrator/code.js', // Дискорд
        'u:dev:ReferencePopups/code.js',      // Всплывающие примечания
        'u:dev:ProfileTags.js',               // Статусы участников
        'u:dev:ShowHide/code.js',             // Сворачивание таблиц
        'u:dev:ModernProfile/EditButton.js'   // Кнопка редактирования профайла
    ]
});


//------------------------------------//
/* Настройка блокировки статей от спойлеров */

window.SpoilerAlertJS = {
    question: 'Эта статья содержит спойлеры. Вы уверены, что хотите продолжить чтение?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};


// Для инфобокса участников
$(function () {
    if ($('.infobox-avatar').length) {
        $.ajax({
            url: '/wiki/Special:Contributions/' + nickname,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $('.infobox-avatar').html($(data).find('.masthead-avatar').children('img'));
                }
            },
            error: function () {
                console.log('Error: Cannot obtain user avatar.');
                $('.infobox-avatar').html('<span style="color: gray;">Нет данных</span>');
            }
        });
    }
});

//------------------------------------//
/* Кнопки редактирования */

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/7/71/Кнопка_шаблона_Персонаж.png",
    "speedTip": "Персонаж",
    "tagOpen": "{{Персонаж\n" +
        "| Имя      = \n" +
        "| Прозвище = \n" +
        "| Картинка = \n" +
        "| Костюм   = \n" +
        "\n" +
        "| Прозвища = \n" +
        "| Позиция  = \n" +
        "| Личность = \n" +
        "| Занятие  = \n" +
        "\n" +
        "| Родственники = \n" +
        "| Организации  = \n" +
        "| Союзники     = \n" +
        "| Враги        = \n" +
        "\n" +
        "| Вселенная      = \n" +
        "| Место рождения = \n" +
        "| Гражданство    = \n" +
        "| Появление      = \n" +
        "| Появление2     = \n" +
        "| Смерть         = \n" +
        "| Актер          = \n" +
        "| Актриса        = \n" +
        "\n" +
        "| Статус        = \n" +
        "| Вид           = \n" +
        "| Пол           = \n" +
        "| Возраст       = \n" +
        "| Дата рождения = \n" +
        "| Дата смерти   = \n" +
        "| Рост          = \n" +
        "| Вес           = \n" +
        "| Волосы        = \n" +
        "| Глаза         = \n" +
        "| Кожа          = \n" +
		"}}\n" +
        "Дополнительные параметры\n" +
        "| Источник = \n" +
        "| Особенности = \n" +
        "| Подпись = \n" +
        "| ПодписьКостюм = \n" +
        "| ИмяСсылка = \n" +
        "| ПрозвищеСсылка = \n" +
        "\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/8/87/Кнопка_шаблона_Организация.png",
	"speedTip": "Организация",
	"tagOpen": "{{Организация\n" +
		"| Картинка     = \n" +
		"| Название     = \n" +
		"| АльтНазвание = \n" +
		"| Статус       = \n" +
        "\n" +
		"| Публичность = \n" +
		"| Цели        = \n" +
		"| Штаб        = \n" +
		"| Вселенная   = \n" +
		"| Основание   = \n" +
		"| Распад      = \n" +
        "\n" +
		"| Лидер    = \n" +
		"| Лидеры   = \n" +
		"| Члены = \n" +
		"| Союзники = \n" +
		"| Враги    = \n" +
        "\n" +

        "| Появление  = \n" +
        "| Появление2 = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/0/0f/Кнопка_шаблона_Выпуск.png",
	"speedTip": "Выпуск",
	"tagOpen": "{{Выпуск\n" +
		"|Картинка = \n" +
		"|Название = \n" +
		"|Перевод  = \n" +
        "\n" +
		"|Постер1  = \n" +
		"|Подпись1 = \n" +
		"|Постер2  = \n" +
		"|Подпись2 = \n" +
        "\n" +
		"|Серия      = \n" +
		"|Арка       = \n" +
		"|Событие    = \n" +
		"|Публикация = \n" +
		"|Выпуск     = \n" +
        "\n" +
		"|ГлРедактор = \n" +
		"|Обложка    = \n" +
		"|Сценарист  = \n" +
		"|Карандаш   =\n" + 
		"|Туш        =\n" + 
		"|Цвет       =\n" + 
		"|Шрифт      =\n" + 
		"|Редактор   = \n" +
        "\n" +
		"|Предыдущая = \n" +
		"|Следующая  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/8/89/Кнопка_шаблона_Выпуск-Истории.png",
	"speedTip": "Несколько историй",
	"tagOpen": "{{Выпуск/Несколько историй\n" +
		"|Картинка = \n" +
		"|Название = \n" +
		"|Перевод  = \n" +
        "\n" +
		"|Постер1  = \n" +
		"|Подпись1 = \n" +
		"...\n" +
		"|Постер12  = \n" +
		"|Подпись12 = \n" +
        "\n" +
		"|Серия      = \n" +
		"|Арка       = \n" +
		"|Событие    = \n" +
		"|Публикация = \n" +
		"|Выпуск     = \n" +
        "\n" +
		"|История    = \n" +
		"|ГлРедактор = \n" +
		"|Обложка    = \n" +
		"|Сценарист  = \n" +
		"|Карандаш   = \n" +
		"|Туш        = \n" +
		"|Цвет       = \n" +
		"|Шрифт      = \n" +
		"|Редактор   = \n" +
        "\n" +
		"|История2    = \n" +
		"|ГлРедактор2 = \n" +
		"и т.д.\n" +
        "\n" +
		"|Предыдущая = \n" +
		"|Следующая  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/d/d0/Кнопка_шаблона_Комикс.png",
	"speedTip": "Комикс",
	"tagOpen": "{{Комикс\n" +
		"| Название = \n" +
		"| Картинка = \n" +
        "\n" +
		"| Импринт     =\n" +
		"| Тип         =\n" +
		"| Публикация  = \n" +
		"| Выпуски     = \n" +
		"| Вселенная   = \n" +
		"| Вселенная2  = \n" +
		"| КлПерсонажи = \n" +
        "\n" +
		"| Сценарист = \n" +
		"| Художник  =\n" + 
        "\n" +
		"| Предыдущая = \n" +
		"| Следующая  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/f/fa/Кнопка_шаблона_Сборник_комиксов.png",
	"speedTip": "Сборник комиксов",
	"tagOpen": "{{Сборник комиксов\n" +
		"| Название = \n" +
		"| Картинка = \n" +
        "\n" +
		"| Выпуски     = \n" +
		"| Публикация  = \n" +
		"| Выпуск      = \n" +
		"| Издательство= \n" +
        "\n" +
		"| Сценарист = \n" +
		"| Карандаш  = \n" +
        "\n" +
		"| Предыдущий = \n" +
		"| Следующий  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/1/1d/Кнопка_шаблона_Сериал.png",
	"speedTip": "Сериал",
	"tagOpen": "{{Сериал\n" +
		"|Название = \n" +
		"|Оригинал = \n" +
		"|Картинка = \n" +
		"|Подпись  = \n" +
        "\n" +
		"|Постер1  = \n" +
		"|Подпись1 = \n" +
		"...\n" +
		"|Постер12  = \n" +
		"|Подпись12 = \n" + 
        "\n" +
		"|Режиссер  = \n" +
		"|Продюсер  = \n" +
		"|Компания  = \n" +
		"|Эпизоды   = \n" +
		"|Эпизод    = \n" +
		"|Премьера  = \n" +
		"|ПремьераРоссия  =\n" +
		"|Вселенная = \n" +
        "\n" +
		"|Следующий  = \n" +
		"|Предыдущий = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/6/63/Кнопка_шаблона_Событие.png",
	"speedTip": "Событие",
	"tagOpen": "{{Событие\n" +
		"|Название = \n" +
		"|Картинка = \n" +
        "\n" +
		"|Постер1  = \n" +
		"|Подпись1 = \n" +
		"...\n" +
		"|Постер6  = \n" +
		"|Подпись6 = \n" +
        "\n" +
		"|ПрНазвания =\n" +
		"|Вселенная  = \n" +
		"|Создатели  = \n" +
		"|Локации    = \n" +
        "\n" +
		"|Герои  = \n" +
		"|Злодеи = \n" +
		"|Другие =\n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/c/cf/Кнопка_шаблона_Сюжетная_арка.png",
	"speedTip": "Сюжетная арка",
	"tagOpen": "{{Сюжетная арка\n" +
		"|Картинка = \n" +
		"|Название = \n" +
		"|Перевод  = \n" +
        "\n" +
		"|Серия     = \n" +
		"|Вселенная = \n" +
        "\n" +
		"|Создатели = \n" +
		"|Локации   = \n" +
        "\n" +
		"|Герои  = \n" +
		"|Злодеи = \n" +
		"|Другие = \n" +
        "\n" +
		"|Предыдущая = \n" +
		"|Следующая  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/0/00/Кнопка_шаблона_Фильм.png",
	"speedTip": "Фильм",
	"tagOpen": "{{Фильм\n" +
		"| Картинка = \n" +
		"| Название = \n" +
		"| Оригинал = \n" +
		"| Подпись  = \n" +
        "\n" +
		"| Постер1  = \n" +
		"| Подпись1 = \n" +
		"...\n" +
		"| Постер12  = \n" +
		"| Подпись12 =  \n" +
        "\n" +
		"| Режиссер   = \n" +
		"| Продюсер   = \n" +
		"| Сценарист  = \n" +
		"| ГлРоли     = \n" +
		"| Оператор   = \n" +
		"| Композитор = \n" +
		"| Компания   = \n" +
        "\n" +
		"| Бюджет      = \n" +
		"| Сборы       = \n" +
		"| Время       = \n" +
		"| Премьера    = \n" +
		"| ПремьераРос = \n" +
		"| Вселенная   = \n" +
        "\n" +
		"| Серия      = \n" +
		"| Предыдущий = \n" +
		"| Следующий  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/6/6e/Кнопка_шаблона_Эпизод.png",
	"speedTip": "Эпизод",
	"tagOpen": "{{Эпизод \n" +
		"|Название  = \n" +
		"|Картинка  = \n" +
		"|Сериал    = \n" +
		"|Премьера  = \n" +
        "\n" +
		"|Режиссер  = \n" +
		"|Сценарист = \n" +
        "\n" +
		"|Предыдущая = \n" +
		"|Следующая  = \n" +
		"}}\n",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/1/13/Кнопка_шаблона_Образа_персонажа.png",
	"speedTip": "Образ персонажа",
	"tagOpen": "{{Многозначность|Персонаж}} \n" +
	    "{{Образ \n" +
		"|Лого       = \n" +
		"|Картинка   = \n" +
		"|Личность   = [[Вижен (616)|Вижен]]\n" +
		"|Вселенная  = [[Земля-616|Основная вселенная]]\n" +
		"|Год        = [[Avengers Vol 1 57|1968–{{Count/НВ}}]]\n" +
        "\n" +
		"|Описание  = \n" +
		"}}\n" +
		"{{Образ/Заголовки|Основные|Альтернативные версии|Другие|Команды|Связи|Фильмы|Телевидение|Видеоигры}}\n" +
        "\n" +
		"[[en:]]",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/d/d3/Кнопка_шаблона_Реальный_человек.png",
	"speedTip": "Реальный человек",
	"tagOpen": "{{Реальный человек\n" +
        "| Картинка = \n" +
        "| Имя      = \n" +
        "| Прозвище = \n" +
        "| Прозвища = \n" +
        "\n" +
        "| Занятие     = \n" +
        "| Организации = \n" +
        "| Вселенная   = \n" +
        "| Персонаж    = \n" +
        "\n" +
        "| Место рождения = \n" +
        "| Гражданство = \n" +
        "| Появление   = \n" +
        "| Появление2  = \n" +
        "\n" +
        "| Возраст       = \n" +
        "| Дата рождения = \n" +
        "| Дата смерти   = \n" +
        "\n" +
        "| Фильмы  = \n" +
        "| Сериалы = \n" +
        "| Комиксы = \n" +
        "}}",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/c/c4/Кнопка_статьи_Персонаж.png",
	"speedTip": "Шаблон статьи Персонажа",
    "tagOpen": "{{Персонаж\n" +
        "| Имя      = \n" +
        "| Прозвище = \n" +
        "| Картинка = \n" +
        "| Костюм   = \n" +
        "\n" +
        "| Прозвища = \n" +
        "| Позиция  = \n" +
        "| Личность = \n" +
        "| Занятие  = \n" +
        "\n" +
        "| Родственники = \n" +
        "| Организации  = \n" +
        "| Союзники     = \n" +
        "| Враги        = \n" +
        "\n" +
        "| Вселенная      = Земля-\n" +
        "| Место рождения = \n" +
        "| Гражданство    = \n" +
        "| Появление      = {{c|m=3|Название|99}}\n" +
        "| Появление2     = \n" +
        "| Смерть         = \n" +
        "| Актер          = \n" +
        "| Актриса        = \n" +
        "\n" +
        "| Статус       = \n" +
        "| Вид          = \n" +
        "| Пол          = \n" +
        "| Возраст      = \n" +
        "| Дата рождения = \n" +
        "| Дата смерти  = \n" +
        "| Рост         = \n" +
        "| Вес          = \n" +
        "| Волосы       = \n" +
        "| Глаза        = \n" +
        "| Кожа         = \n" +
		"}}\n" +
        "Дополнительные параметры\n" +
        "| Источник = \n" +
        "| Подпись = \n" +
        "| ПодписьКостюм = \n" +
        "}}\n" +
        "{{Цитата|Текст цитаты|Автор цитаты}}\n" +
        "{{Lang|Имя на русском (полное по возможности)|Имя на английском (полное)}} — краткое описание.\n" +
        "\n" +
        "==Биография==\n" +
        "{{Stub|биография}}\n" +
        "\n" +
        "==Силы и способности==\n" +
        "Такие же как у [[ (616)| ]] из [[Земля-616|Земли-616]].\n" +
        "\n" +
        "==Примечания==\n" +
        "<references />\n" +
        "\n" +
        "[[en: (Earth-616)]]",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/0/06/Кнопка_шаблона_Изображение.png",
	"speedTip": "Изображение",
	"tagOpen": "{{Изображение\n" +
        "| Описание  = \n" +
        "| Источник  = \n" +
        "| Появления = \n" +
        "| Автор     = \n" +
        "| Категория = \n" +
        "| Лицензия  = \n" +
        "}}",
	"tagClose": "",
	"sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "https://images.wikia.nocookie.net/marvel/ru/images/e/e6/Кнопка_шаблона_Раса.png",
	"speedTip": "Раса",
	"tagOpen": "{{Раса\n" +
        "| Название = \n" +
        "| Картинка = \n" +
        "| АльтНазвание = \n" +
        "| Статус   = \n" +
        "\n" +
        "| Строение тела = \n" +
        "| Рост        = \n" +
        "| Вес         = \n" +
        "| Волосы      = \n" +
        "| Глаза       = \n" +
        "| Кожа        = \n" +
        "| Конечности  = \n" +
        "| Пальцы      = \n" +
        "| Кол-воГлаза = \n" +
        "| Способности = \n" +
        "\n" +
        "| Происхождение = \n" +
        "| Галактика  = \n" +
        "| Плнета     = \n" +
        "| Вселенная  = \n" +
        "| Появление  = \n" +
        "}}",
	"tagClose": "",
	"sampleText": ""
};

//------------------------------------------------------------------------

/* Настройка для dev:PreloadTemplates */ 
preloadTemplates_subpage =  "case-by-case" ;