//------------------------------------//
/* Подключение страниц */
 
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:CustomEditButtons.js',
        'MediaWiki:BacktoTop.js',
        'MediaWiki:InactiveUsers.js',
        'u:dev:PurgeButton/code.js'
    ]
});


/* Кнопки редактирования */

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Персонаж",
    "tagOpen": "{{Персонаж\n" +
    "|Картинка = \n" +

    "|Яп. имя = \n" +
    "|Раса    = \n" +
    "|Происхождение = \n" +
    "|Клан    = \n" +
    "|Организация    = \n" +
    "|Профессия = \n" +
    "|Сэйю    = \n" +
    "|Дубляж  = \n" +

    "|Появление  = \n" +
    "|Смерть     =\n" +
    "|Появление2 = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Эпизод",
    "tagOpen": "{{Эпизод \n" +
    "|Название = \n" +
    "|Картинка = \n" +
    "|Премьера  = \n" +

    "|Кандзи    = \n" +
    "|Ромадзи   = \n" +
    "|Режиссер  = \n" +
    "|Сценарист = \n" +
    "|Главы манги = \n" +

    "|Предыдущий = \n" +
    "|Следующий  = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Глава",
    "tagOpen": "{{Глава \n" +
    "|Название = \n" +
    "|Картинка =\n" +
    "|Выпуск    =  \n" +

    "|Том       = \n" +
    "|Кандзи    = \n" +
    "|Ромадзи   = \n" +
    "|Страниц   = \n" +
    "|Том       = \n" +
    "|Эпизод аниме = \n" +

    "|Предыдущая = \n" +
    "|Следующая  = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Том",
    "tagOpen": "{{Том \n" +
    "|Название = \n" +
    "|Картинка = \n" +

    "|Том       = \n" +
    "|Кандзи    = \n" +
    "|Ромадзи   = \n" +
    "|Страниц   = \n" +
    "|Выпуск    = \n" +

    "|Предыдущий = \n" +
    "|Следующий  = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Ганмен",
    "tagOpen": "{{Ганмен \n" +
    "|Название = \n" +
    "|Картинка = \n" +

    "|Японское  = \n" +
    "|Появление = \n" +
    "|Пилот     = \n" +
    "|Статус    = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Место",
    "tagOpen": "{{Место \n" +
    "|Название = \n" +
    "|Картинка = \n" +

    "|Японское  = \n" +
    "|Появление = \n" +
    "|Регион    = \n" +
    "|Население = \n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

mwCustomEditButtons[mwCustomEditButtons.length] = {
    "imageFile": "",
    "speedTip": "Место",
    "tagOpen": "{{Организация \n" +
    "|Название = \n" +
    "|Картинка = \n" +

    "|Японское  = \n" +
    "|Появление = \n" +
    "|Принадлежность = \n" +
    "|Деятельность   = \n" +
    "|Лидер     = \n" +
    "|Транспорт =\n" +
	"}}\n",
    "tagClose": "",
    "sampleText": ""
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});

Medals/code.js

 
//------------------------------------------------------------------------