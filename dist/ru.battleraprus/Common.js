/* Текст шаблона Спойлеры */
window.SpoilerAlertJS = {
    question: 'Эта статья, раздел или область содержит спойлеры результатов еще не опубликованных баттлов. Вы уверены, что хотите это прочитать?',
    yes: 'Да',
    no: 'Нет',
    fadeDelay: 1600
};

/* Кнопки редактирования */
if (mwCustomEditButtons.length) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/battleraprus/images/7/70/Кнопка_шаблона_Баттл-рэпер.png/revision/latest?cb=20180702175420&path-prefix=ru",
        "speedTip": "Баттл-рэпер",
        "tagOpen": "{{Баттл-рэпер\n" +
            "| Псевдоним    = \n" +
            "| Имя          = \n" +
            "| Картинка     = \n" +
            "| Родился      = \n" +
            "| Умер         = \n" +
            "| ДрПсевдонимы = \n" +
            "| Активность   = \n" +
            "| Площадки     = \n" +
            "| Заслуги      = \n" +
            "| Баттлы       = \n" +
            "| Побед        = \n" +
            "| Поражений    = \n" +
            "| Лейбл        = \n" +
            "| Объединения  = \n" +
            "}}\n" +
            "\n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/battleraprus/images/5/5c/Кнопка_шаблона_Баттл-площадка.png/revision/latest?cb=20180703062555&path-prefix=ru",
        "speedTip": "Баттл-площадка",
        "tagOpen": "{{Баттл-площадка\n" +
            "| Сокр             = \n" +
            "| Название         = \n" +
            "| Картинка         = \n" +
            "| Статус           = \n" +
            "| Место проведения = \n" +
            "| Организатор      = \n" +
            "| Основание        = \n" +
            "| Закрытие         = \n" +
            "| Язык             = \n" +
            "| Подписчики       = \n" +
            "| Просмотры        = \n" +
            "}}\n" +
            "\n",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/battleraprus/images/b/bf/Кнопка_шаблона_Филиал.png/revision/latest?cb=20180703062608&path-prefix=ru",
        "speedTip": "Филиал",
        "tagOpen": "{{Филиал\n" +
            "| Сокр             = \n" +
            "| Название         = \n" +
            "| Картинка         = \n" +
            "| Статус           = \n" +
            "| Место проведения = \n" +
            "| Организатор      = \n" +
            "| Основание        = \n" +
            "| Закрытие         = \n" +
            "| Язык             = \n" +
            "}}\n" +
            "\n",
        "tagClose": "",
        "sampleText": ""
    };
}